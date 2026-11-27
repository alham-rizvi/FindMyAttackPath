/* ==========================================================================
   Data Loader & Force Graph Engine — D3 graph, layouts, pathfinder, exports
   ========================================================================== */
(function(global){
  "use strict";
  const FMAP = (global.FMAP = global.FMAP || {});
  const GRAPH_FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  /* 1. Data Loading (live docs/manifest.json with #embedded-docs fallback) - */
  async function fetchText(path){
    const r = await fetch(path);
    if(!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
    return r.text();
  }

  async function loadLiveDocs(){
    const manifest = JSON.parse(await fetchText("docs/manifest.json"));
    const raws = await Promise.all(manifest.map(entry=> fetchText(entry.path)));
    return { manifest, raws };
  }

  function loadEmbeddedDocs(){
    const el = document.getElementById("embedded-docs");
    if(!el) throw new Error("no embedded docs/ snapshot found");
    const embedded = JSON.parse(el.textContent);
    const raws = embedded.manifest.map(entry=> embedded.files[entry.path]);
    return { manifest: embedded.manifest, raws };
  }

  const data = {
    phases: [],
    tech: [],
    tools: [],
    cves: [],
    docFiles: [],
    docById: new Map(),
    usingEmbeddedFallback: false,
    fetchText,
    phaseLabel(id){
      const p = data.phases.find(x=> x.id === id);
      return p ? p.label : id;
    }
  };
  FMAP.data = data;

  async function loadData(){
    const { parseFrontmatter, splitSections, cleanToolSummary } = FMAP.md;
    let manifest, raws;
    try{
      ({ manifest, raws } = await loadLiveDocs());
    }catch(liveErr){
      console.warn(`Live docs/ fetch failed (${liveErr.message}) — falling back to #embedded-docs.`);
      data.usingEmbeddedFallback = true;
      ({ manifest, raws } = loadEmbeddedDocs());
    }

    const files = manifest.map((entry, i)=>{
      const { meta, body } = parseFrontmatter(raws[i]);
      return { entry, meta, raw: raws[i], body, sections: splitSections(body) };
    });

    data.docFiles = files;
    data.docById.clear();
    data.phases.length = 0;
    data.tech.length = 0;
    data.tools.length = 0;
    data.cves.length = 0;

    files.forEach(file=>{
      const { entry, meta, sections } = file;
      const intro = sections[0] && !sections[0].title ? sections[0].text : "";
      const rest = sections[0] && !sections[0].title ? sections.slice(1) : sections;
      const id = meta.id || entry.id;
      data.docById.set(id, file);
      if(entry.id !== id) data.docById.set(entry.id, file);

      if(entry.type === "phase"){
        data.phases.push({ id, label: meta.label, desc: intro, extra: rest, docPath: entry.path });
      } else if(entry.type === "tool"){
        data.tools.push({ id, repo: meta.repo, cat: meta.category, purpose: cleanToolSummary(intro), rawPurpose: intro, extra: rest, docPath: entry.path });
      } else if(entry.type === "cve"){
        data.cves.push({ id, label: meta.label, year: meta.year, source: meta.source || "", desc: intro, extra: rest, docPath: entry.path });
      } else if(entry.type === "technique"){
        const prereqSec = rest.find(s=> (s.title || "").trim().toLowerCase() === "prerequisite");
        const extra = rest.filter(s=> s !== prereqSec);
        data.tech.push({
          id, label: meta.label, phase: meta.phase, tools: meta.tools || [], cve: meta.cve || null,
          detect: meta.detect || "", mitre: meta.mitre || "", tag: meta.tag || null,
          desc: intro, prereq: prereqSec ? prereqSec.text : "", extra, docPath: entry.path
        });
      }
    });
  }
  data.load = loadData;

  /* 2. Force Graph Engine -------------------------------------------------- */
  function initGraph(){
    const { escapeHtml, saveFile } = FMAP.md;
    const { phases: PHASES, tech: TECH, tools: TOOLS, cves: CVES } = data;
    const nodes = [], links = [];
    const nodeIndex = new Map();
    const addNode = n => { nodeIndex.set(n.id, n); nodes.push(n); };

    PHASES.forEach(p=> addNode({ id: p.id, type: "phase", label: p.label, data: p }));
    TECH.forEach(t=> addNode({ id: t.id, type: "technique", label: t.label, data: t, tag: t.tag }));
    TOOLS.forEach(tl=>{ if(!nodeIndex.has(tl.id)) addNode({ id: tl.id, type: "tool", label: tl.repo.split("/")[1] || tl.repo, data: tl }); });
    CVES.forEach(c=> addNode({ id: c.id, type: "cve", label: c.label, data: c, tag: "new" }));

    for(let i = 0; i < PHASES.length - 1; i++) links.push({ source: PHASES[i].id, target: PHASES[i + 1].id, kind: "chain" });
    TECH.forEach(t=>{
      links.push({ source: t.phase, target: t.id, kind: "belongs" });
      (t.tools || []).forEach(tid=>{ if(nodeIndex.has(tid)) links.push({ source: t.id, target: tid, kind: "uses" }); });
      if(t.cve && nodeIndex.has(t.cve)) links.push({ source: t.id, target: t.cve, kind: "exploits" });
    });

    const usedTools = new Set();
    links.forEach(l=>{ if(nodeIndex.get(l.target)?.type === "tool") usedTools.add(l.target); });
    const graphNodes = nodes.filter(n=> n.type !== "tool" || usedTools.has(n.id));
    const graphIds = new Set(graphNodes.map(n=> n.id));
    const graphLinks = links.filter(l=> graphIds.has(l.source) && graphIds.has(l.target));

    /* Colors & localStorage persistence */
    const rootStyle = document.documentElement.style;
    const getLiveVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const getDefaultPalette = ()=> ({
      phase: getLiveVar("--phase") || "#3d6b66",
      technique: getLiveVar("--tech") || "#0f8a8a",
      tool: getLiveVar("--tool") || "#b4790f",
      cve: getLiveVar("--cve") || "#b2402f",
      custom: getLiveVar("--custom") || "#4b5563"
    });
    const validColor = v => typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v);

    let colorSettings = { background: "", edge: "", edgeDim: "", types: {}, nodes: {} };
    try{
      const saved = JSON.parse(localStorage.getItem("findmyattackpath-colors") || "{}");
      if(validColor(saved.background)) colorSettings.background = saved.background;
      if(validColor(saved.edge)) colorSettings.edge = saved.edge;
      if(validColor(saved.edgeDim)) colorSettings.edgeDim = saved.edgeDim;
      ["phase","technique","tool","cve","custom"].forEach(type=>{
        if(validColor(saved.types?.[type])) colorSettings.types[type] = saved.types[type];
      });
      if(saved.nodes && typeof saved.nodes === "object"){
        Object.entries(saved.nodes).forEach(([id, v])=>{ if(validColor(v)) colorSettings.nodes[id] = v; });
      }
    }catch{}

    if(colorSettings.background) rootStyle.setProperty("--bg", colorSettings.background);
    if(colorSettings.edge) rootStyle.setProperty("--edge", colorSettings.edge);
    if(colorSettings.edgeDim) rootStyle.setProperty("--edge-dim", colorSettings.edgeDim);
    Object.entries(colorSettings.types).forEach(([type, value])=>{
      rootStyle.setProperty(`--${type === "technique" ? "tech" : type}`, value);
    });

    const nodeColor = d =>{
      if(colorSettings.nodes[d.id]) return colorSettings.nodes[d.id];
      if(d.type === "custom") return colorSettings.types.custom || getLiveVar("--custom") || "#4b5563";
      return colorSettings.types[d.type] || getDefaultPalette()[d.type] || "#3d6b66";
    };

    function saveColorSettings(){
      try{ localStorage.setItem("findmyattackpath-colors", JSON.stringify(colorSettings)); }catch{}
    }

    /* Saved custom nodes */
    let customNodesData = [];
    try{
      const raw = JSON.parse(localStorage.getItem("findmyattackpath-custom-nodes") || "[]");
      if(Array.isArray(raw)) customNodesData = raw.filter(c=> c && c.id && c.label);
    }catch{}

    function attachCustomNode(c){
      if(nodeIndex.has(c.id)) return;
      const phaseId = PHASES.some(p=> p.id === c.phase) ? c.phase : (PHASES[0]?.id || null);
      const n = { id: c.id, type: "custom", label: c.label, data: { phase: phaseId, note: c.note || "", custom: true } };
      nodeIndex.set(n.id, n);
      graphNodes.push(n);
      graphIds.add(n.id);
      if(phaseId && nodeIndex.has(phaseId)) graphLinks.push({ source: phaseId, target: n.id, kind: "belongs", custom: true });
    }
    customNodesData.forEach(attachCustomNode);

    /* D3 SVG & Force simulation */
    const svg = d3.select("#graph");
    let W = global.innerWidth, H = global.innerHeight;
    svg.attr("viewBox", [0, 0, W, H]);
    const g = svg.append("g");
    const linkLayer = g.append("g").attr("class", "links");
    const nodeLayer = g.append("g").attr("class", "nodes");
    let linkSel = linkLayer.selectAll("line");
    let nodeSel = nodeLayer.selectAll("g.node");

    const radius = d => d.type === "phase" ? 16 : d.type === "cve" ? 9 : d.type === "tool" ? 6.5 : d.type === "custom" ? 10.5 : 11;
    let isSimFrozen = false;
    let currentLayout = "force";
    let labelMode = "all";
    let activePathIds = null;
    let activePathEdges = null;
    let simSpacing = 240;
    const TYPES = [["phase","phases"], ["technique","techniques"], ["tool","tools"], ["cve","CVEs"]];
    const activeTypes = new Set(["phase","technique","tool","cve","custom"]);

    function updatePositions(){
      linkSel.attr("x1", d=> d.source.x).attr("y1", d=> d.source.y).attr("x2", d=> d.target.x).attr("y2", d=> d.target.y);
      nodeSel.attr("transform", d=> `translate(${d.x},${d.y})`);
    }

    const sim = d3.forceSimulation(graphNodes)
      .force("link", d3.forceLink(graphLinks).id(d=> d.id).distance(d=> d.kind === "chain" ? 155 : d.kind === "belongs" ? 66 : 52).strength(0.5))
      .force("charge", d3.forceManyBody().strength(-simSpacing))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide().radius(d=> radius(d) + 15))
      .on("tick", updatePositions);

    function applyLabelVisibility(){
      const selected = FMAP.reader ? FMAP.reader.getCurrentDetailNode() : null;
      nodeSel.select("text").style("display", d=>{
        if(activePathIds && activePathIds.has(d.id)) return null;
        if(selected && selected.id === d.id) return null;
        if(labelMode === "off") return "none";
        if(labelMode === "key") return d.type === "tool" ? "none" : null;
        return null;
      });
    }

    function applyTypeFilter(){
      nodeSel.style("display", d=> activeTypes.has(d.type) ? null : "none");
      linkSel.style("display", d=>{
        const s = typeof d.source === "string" ? nodeIndex.get(d.source) : d.source;
        const t = typeof d.target === "string" ? nodeIndex.get(d.target) : d.target;
        return (s && t && activeTypes.has(s.type) && activeTypes.has(t.type)) ? null : "none";
      });
    }

    function syncGraphElements(){
      linkSel = linkLayer.selectAll("line")
        .data(graphLinks, d=> `${typeof d.source === "string" ? d.source : d.source.id}->${typeof d.target === "string" ? d.target : d.target.id}:${d.kind}`)
        .join("line")
        .attr("stroke", "var(--edge)")
        .attr("stroke-width", d=> d.kind === "chain" ? 2 : 1)
        .attr("stroke-dasharray", d=> d.kind === "uses" ? "2,3" : (d.custom ? "4,3" : null))
        .attr("opacity", 0.72);

      let dragMoved = false;
      const dragBehavior = d3.drag()
        .on("start", (ev, d)=>{
          dragMoved = false;
          if(!isSimFrozen && !ev.active) sim.alphaTarget(0.25).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on("drag", (ev, d)=>{
          if(Math.hypot(ev.x - d.x, ev.y - d.y) > 3) dragMoved = true;
          d.fx = ev.x; d.fy = ev.y;
          if(isSimFrozen){ d.x = ev.x; d.y = ev.y; updatePositions(); }
        })
        .on("end", (ev, d)=>{
          if(!isSimFrozen && !ev.active) sim.alphaTarget(0);
          if(!dragMoved && currentLayout === "force" && !isSimFrozen){ d.fx = null; d.fy = null; }
        });

      nodeSel = nodeLayer.selectAll("g.node")
        .data(graphNodes, d=> d.id)
        .join(enter=>{
          const grp = enter.append("g").attr("class", "node").style("cursor", "pointer");
          grp.append("circle")
            .attr("r", radius)
            .attr("fill", nodeColor)
            .attr("fill-opacity", d=> d.type === "phase" ? 0.94 : 0.88)
            .attr("stroke", d=> d.tag === "new" ? "var(--new)" : d.type === "custom" ? "var(--fg)" : "var(--bg)")
            .attr("stroke-width", d=> d.tag === "new" ? 2.5 : d.type === "custom" ? 2 : 1.5)
            .attr("stroke-dasharray", d=> d.type === "custom" ? "3,2" : null);
          grp.append("text")
            .text(d=> d.label.length > 24 ? d.label.slice(0, 22) + "…" : d.label)
            .attr("x", d=> radius(d) + 6).attr("y", 4)
            .attr("font-size", d=> d.type === "phase" ? 12 : 10.5)
            .attr("font-family", GRAPH_FONT)
            .attr("font-weight", d=> d.type === "phase" ? 600 : 500)
            .attr("fill", "var(--fg)")
            .style("paint-order", "stroke").style("stroke", "var(--bg)").style("stroke-width", "3.5px").style("stroke-opacity", 0.9);
          grp.append("title").text(d=> d.label);
          return grp;
        });

      nodeSel.call(dragBehavior);
      nodeSel.on("click", (ev, d)=>{
        ev.stopPropagation();
        if(FMAP.reader) FMAP.reader.showDetail(d);
      });
      applyLabelVisibility();
      applyTypeFilter();
    }
    syncGraphElements();

    const zoom = d3.zoom().scaleExtent([0.22, 3.2]).on("zoom", ev=> g.attr("transform", ev.transform));
    svg.call(zoom);
    svg.on("click", ()=>{ if(FMAP.reader) FMAP.reader.closeDetailIfOpen(); });

    function resetZoom(){
      svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
    }

    function fitNodesInView(targetNodes, duration){
      const list = (targetNodes && targetNodes.length ? targetNodes : graphNodes)
        .filter(n=> Number.isFinite(n.x) && Number.isFinite(n.y));
      if(!list.length) return;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      list.forEach(n=>{
        if(n.x < minX) minX = n.x; if(n.x > maxX) maxX = n.x;
        if(n.y < minY) minY = n.y; if(n.y > maxY) maxY = n.y;
      });
      const pad = 90;
      const bw = Math.max(120, (maxX - minX) + pad * 2);
      const bh = Math.max(120, (maxY - minY) + pad * 2);
      const scale = Math.min(1.65, Math.max(0.28, Math.min((W - 80) / bw, (H - 110) / bh)));
      const tx = W / 2 - ((minX + maxX) / 2) * scale;
      const ty = H / 2 - ((minY + maxY) / 2) * scale;
      svg.transition().duration(duration ?? 450).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
    }

    function applyLayout(mode){
      currentLayout = mode;
      document.querySelectorAll("#layoutPresets button").forEach(btn=>{
        btn.classList.toggle("active", btn.dataset.layout === mode);
      });
      if(mode === "force"){
        graphNodes.forEach(n=>{ n.fx = null; n.fy = null; });
        if(!isSimFrozen) sim.alpha(0.75).restart();
        return;
      }
      const cx = W / 2, cy = H / 2;
      if(mode === "chain"){
        const colGap = 240, startX = cx - ((PHASES.length - 1) * colGap) / 2;
        const phasePos = new Map();
        PHASES.forEach((p, idx)=>{
          const n = nodeIndex.get(p.id);
          if(!n) return;
          const x = startX + idx * colGap;
          n.x = n.fx = x; n.y = n.fy = cy;
          phasePos.set(p.id, { x, y: cy });
        });
        const byPhase = new Map();
        graphNodes.forEach(n=>{
          if(n.type === "technique" || n.type === "custom"){
            const pid = n.data?.phase || PHASES[0]?.id;
            if(!byPhase.has(pid)) byPhase.set(pid, []);
            byPhase.get(pid).push(n);
          }
        });
        byPhase.forEach((list, pid)=>{
          const base = phasePos.get(pid) || { x: cx, y: cy };
          list.forEach((n, i)=>{
            const dir = i % 2 === 0 ? -1 : 1;
            const tier = Math.floor(i / 2) + 1;
            n.x = n.fx = base.x + (tier % 2 === 0 ? 18 : -18);
            n.y = n.fy = base.y + dir * (62 + tier * 38);
          });
        });
        const placed = new Set(graphNodes.filter(n=> Number.isFinite(n.fx)).map(n=> n.id));
        let auxIdx = 0;
        graphNodes.forEach(n=>{
          if(placed.has(n.id)) return;
          const linked = graphLinks.map(l=>{
            const s = typeof l.source === "string" ? l.source : l.source.id;
            const t = typeof l.target === "string" ? l.target : l.target.id;
            if(s === n.id) return nodeIndex.get(t);
            if(t === n.id) return nodeIndex.get(s);
            return null;
          }).filter(x=> x && Number.isFinite(x.fx));
          const avgX = linked.length ? linked.reduce((a, b)=> a + b.fx, 0) / linked.length : cx;
          const avgY = linked.length ? linked.reduce((a, b)=> a + b.fy, 0) / linked.length : cy;
          const side = avgY < cy ? -1 : 1;
          n.x = n.fx = avgX + ((auxIdx++ % 5) - 2) * 32;
          n.y = n.fy = avgY + side * (86 + (auxIdx % 3) * 28);
        });
        updatePositions();
        if(!isSimFrozen) sim.alpha(0.08).restart();
        fitNodesInView(graphNodes, 480);
      } else if(mode === "radial"){
        const rPhase = 155, rTech = 325, rLeaf = 470;
        const phaseAngle = new Map();
        PHASES.forEach((p, idx)=>{
          const ang = (idx / Math.max(1, PHASES.length)) * Math.PI * 2 - Math.PI / 2;
          phaseAngle.set(p.id, ang);
          const n = nodeIndex.get(p.id);
          if(n){ n.x = n.fx = cx + Math.cos(ang) * rPhase; n.y = n.fy = cy + Math.sin(ang) * rPhase; }
        });
        const sectorSpan = (Math.PI * 2) / Math.max(1, PHASES.length);
        const byPhase = new Map();
        graphNodes.forEach(n=>{
          if(n.type === "technique" || n.type === "custom"){
            const pid = n.data?.phase || PHASES[0]?.id;
            if(!byPhase.has(pid)) byPhase.set(pid, []);
            byPhase.get(pid).push(n);
          }
        });
        byPhase.forEach((list, pid)=>{
          const baseAng = phaseAngle.get(pid) ?? 0;
          const usable = sectorSpan * 0.84;
          list.forEach((n, i)=>{
            const frac = list.length === 1 ? 0 : (i / (list.length - 1)) - 0.5;
            const ang = baseAng + frac * usable;
            const r = rTech + ((i % 2) * 44);
            n.x = n.fx = cx + Math.cos(ang) * r; n.y = n.fy = cy + Math.sin(ang) * r;
          });
        });
        const leaves = graphNodes.filter(n=> n.type === "tool" || n.type === "cve");
        leaves.forEach((n, idx)=>{
          const ang = (idx / Math.max(1, leaves.length)) * Math.PI * 2 - Math.PI / 2;
          const r = rLeaf + ((idx % 2) * 34);
          n.x = n.fx = cx + Math.cos(ang) * r; n.y = n.fy = cy + Math.sin(ang) * r;
        });
        updatePositions();
        if(!isSimFrozen) sim.alpha(0.08).restart();
        fitNodesInView(graphNodes, 480);
      }
    }

    /* Wire highlighting & BFS Shortest Path Finder */
    function clearHighlight(){
      linkSel
        .attr("stroke", "var(--edge)")
        .attr("stroke-width", d=> d.kind === "chain" ? 2 : 1)
        .attr("opacity", 0.72);
    }

    function highlightWiresFor(id){
      if(activePathIds) return;
      const touches = d=> d.source.id === id || d.target.id === id;
      linkSel
        .attr("stroke", d=> touches(d) ? "var(--accent)" : "var(--edge-dim)")
        .attr("stroke-width", d=> touches(d) ? (d.kind === "chain" ? 3 : 2.2) : (d.kind === "chain" ? 2 : 1))
        .attr("opacity", d=> touches(d) ? 1 : 0.25);
    }

    function findShortestPath(startId, endId){
      if(startId === endId) return [startId];
      const adj = new Map();
      graphLinks.forEach(l=>{
        const s = typeof l.source === "string" ? l.source : l.source.id;
        const t = typeof l.target === "string" ? l.target : l.target.id;
        if(!adj.has(s)) adj.set(s, []);
        if(!adj.has(t)) adj.set(t, []);
        adj.get(s).push(t);
        adj.get(t).push(s);
      });
      const q = [startId], prev = new Map([[startId, null]]);
      while(q.length){
        const cur = q.shift();
        for(const nxt of (adj.get(cur) || [])){
          if(prev.has(nxt)) continue;
          prev.set(nxt, cur);
          if(nxt === endId){
            const path = [];
            for(let p = endId; p !== null; p = prev.get(p)) path.push(p);
            return path.reverse();
          }
          q.push(nxt);
        }
      }
      return null;
    }

    function clearPathHighlight(){
      activePathIds = null;
      activePathEdges = null;
      nodeSel.select("circle")
        .attr("opacity", 1)
        .attr("stroke", d=> d.tag === "new" ? "var(--new)" : d.type === "custom" ? "var(--fg)" : "var(--bg)")
        .attr("stroke-width", d=> d.tag === "new" ? 2.5 : d.type === "custom" ? 2 : 1.5);
      nodeSel.select("text").attr("opacity", 1);
      clearHighlight();
      applyLabelVisibility();
    }

    function highlightPathIds(path){
      activePathIds = new Set(path);
      activePathEdges = new Set();
      for(let i = 0; i < path.length - 1; i++){
        activePathEdges.add(`${path[i]}::${path[i + 1]}`);
        activePathEdges.add(`${path[i + 1]}::${path[i]}`);
      }
      nodeSel.select("circle")
        .attr("opacity", d=> activePathIds.has(d.id) ? 1 : 0.16)
        .attr("stroke", d=> activePathIds.has(d.id) ? "var(--accent)" : (d.tag === "new" ? "var(--new)" : "var(--bg)"))
        .attr("stroke-width", d=> activePathIds.has(d.id) ? 3.2 : (d.tag === "new" ? 2.5 : 1.5));
      nodeSel.select("text").attr("opacity", d=> activePathIds.has(d.id) ? 1 : 0.14);
      const isEdge = d=>{
        const s = typeof d.source === "string" ? d.source : d.source.id;
        const t = typeof d.target === "string" ? d.target : d.target.id;
        return activePathEdges.has(`${s}::${t}`);
      };
      linkSel
        .attr("stroke", d=> isEdge(d) ? "var(--accent)" : "var(--edge-dim)")
        .attr("stroke-width", d=> isEdge(d) ? 3.2 : (d.kind === "chain" ? 2 : 1))
        .attr("opacity", d=> isEdge(d) ? 1 : 0.14);
      applyLabelVisibility();
      fitNodesInView(path.map(id=> nodeIndex.get(id)).filter(Boolean), 480);
    }

    /* Search, filter & navigation */
    function filterBySearch(query){
      const q = String(query || "").trim().toLowerCase();
      const match = d => !q || (d.label + " " + JSON.stringify(d.data || {})).toLowerCase().includes(q);
      nodeSel.select("circle").attr("opacity", d=> match(d) ? 1 : 0.1);
      nodeSel.select("text").attr("opacity", d=> match(d) ? 1 : 0.1);
      linkSel.attr("opacity", 0.72 * (q ? 0.2 : 1));
    }

    function toolLabel(id){
      const n = nodeIndex.get(id);
      return n ? (n.data.repo || n.label) : id;
    }

    function focusNode(id){
      const n = graphNodes.find(x=> x.id === id);
      if(n && FMAP.reader) FMAP.reader.showDetail(n);
    }

    function locateNodeOnGraph(id){
      const n = graphNodes.find(x=> x.id === id);
      if(!n) return;
      if(!activeTypes.has(n.type)){
        activeTypes.add(n.type);
        const chip = document.querySelector(`#typeFilters .chip[data-key="${n.type}"]`);
        if(chip) chip.classList.add("active");
        applyTypeFilter();
      }
      if(FMAP.reader) FMAP.reader.showDetail(n);
      if(Number.isFinite(n.x) && Number.isFinite(n.y)){
        const scale = 1.25;
        svg.transition().duration(500).call(
          zoom.transform,
          d3.zoomIdentity.translate((W / 2) - (n.x * scale), (H / 2) - (n.y * scale)).scale(scale)
        );
      }
    }

    /* Custom nodes CRUD */
    function saveCustomNodes(){
      try{ localStorage.setItem("findmyattackpath-custom-nodes", JSON.stringify(customNodesData)); }catch{}
    }

    function addCustomNode(label, phase, note){
      const id = `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
      const item = { id, label, phase: phase || PHASES[0]?.id, note: note || "" };
      customNodesData.push(item);
      saveCustomNodes();
      attachCustomNode(item);
      const parent = nodeIndex.get(item.phase), added = nodeIndex.get(id);
      if(parent && added && Number.isFinite(parent.x)){
        added.x = parent.x + (Math.random() - 0.5) * 70;
        added.y = parent.y + (Math.random() - 0.5) * 70;
      }
      sim.nodes(graphNodes);
      sim.force("link").links(graphLinks);
      syncGraphElements();
      if(!isSimFrozen) sim.alpha(0.45).restart();
      else updatePositions();
      return added;
    }

    function removeCustomNode(id){
      customNodesData = customNodesData.filter(c=> c.id !== id);
      saveCustomNodes();
      nodeIndex.delete(id);
      graphIds.delete(id);
      for(let i = graphNodes.length - 1; i >= 0; i--) if(graphNodes[i].id === id) graphNodes.splice(i, 1);
      for(let i = graphLinks.length - 1; i >= 0; i--){
        const s = typeof graphLinks[i].source === "string" ? graphLinks[i].source : graphLinks[i].source.id;
        const t = typeof graphLinks[i].target === "string" ? graphLinks[i].target : graphLinks[i].target.id;
        if(s === id || t === id) graphLinks.splice(i, 1);
      }
      sim.nodes(graphNodes);
      sim.force("link").links(graphLinks);
      syncGraphElements();
      if(!isSimFrozen) sim.alpha(0.3).restart();
    }

    /* Simulation & Color Controls */
    function refreshNodeColors(){ nodeSel.select("circle").attr("fill", nodeColor); }

    function setFreeze(frozen){
      isSimFrozen = Boolean(frozen);
      if(isSimFrozen) sim.stop();
      else sim.alpha(0.35).restart();
      return isSimFrozen;
    }

    function unpinAll(){
      graphNodes.forEach(n=>{ n.fx = null; n.fy = null; });
      currentLayout = "force";
      isSimFrozen = false;
      sim.alpha(0.6).restart();
    }

    function cycleLabels(){
      labelMode = labelMode === "all" ? "key" : labelMode === "key" ? "off" : "all";
      applyLabelVisibility();
      return labelMode;
    }

    function setSpacing(val){
      simSpacing = Number(val) || 240;
      sim.force("charge", d3.forceManyBody().strength(-simSpacing));
      sim.force("collide", d3.forceCollide().radius(d=> radius(d) + Math.round(simSpacing / 16)));
      if(!isSimFrozen) sim.alpha(0.35).restart();
    }

    function setColorOverride(target, hex){
      if(target === "__bg"){
        colorSettings.background = hex;
        rootStyle.setProperty("--bg", hex);
      } else if(target === "__edge" || target === "__edge-dim"){
        const key = target === "__edge" ? "edge" : "edgeDim";
        const variable = target === "__edge" ? "--edge" : "--edge-dim";
        colorSettings[key] = hex;
        rootStyle.setProperty(variable, hex);
      } else if(target.startsWith("node:")){
        colorSettings.nodes[target.slice(5)] = hex;
      } else {
        colorSettings.types[target] = hex;
        rootStyle.setProperty(`--${target === "technique" ? "tech" : target}`, hex);
      }
      refreshNodeColors();
      saveColorSettings();
    }

    function resetColors(){
      colorSettings = { background: "", edge: "", edgeDim: "", types: {}, nodes: {} };
      ["--bg","--edge","--edge-dim","--phase","--tech","--tool","--cve","--custom"]
        .forEach(variable=> rootStyle.removeProperty(variable));
      try{ localStorage.removeItem("findmyattackpath-colors"); }catch{}
      refreshNodeColors();
    }

    /* Exports (JSON / CSV / CSS / SVG / PNG / Markdown briefing) */
    function getSelectedData(selectedPhases){
      const selectedIds = new Set(graphNodes.filter(n=> n.type === "phase" && selectedPhases.has(n.id)).map(n=> n.id));
      TECH.filter(t=> selectedPhases.has(t.phase)).forEach(t=> selectedIds.add(t.id));
      graphNodes.filter(n=> n.type === "custom" && selectedPhases.has(n.data?.phase)).forEach(n=> selectedIds.add(n.id));
      graphLinks.forEach(l=>{
        const s = typeof l.source === "string" ? l.source : l.source.id;
        const t = typeof l.target === "string" ? l.target : l.target.id;
        if(selectedIds.has(s) && ["tool","cve"].includes(nodeIndex.get(t)?.type)) selectedIds.add(t);
      });
      return {
        selectedPhases,
        selectedNodes: graphNodes.filter(n=> selectedIds.has(n.id)),
        selectedLinks: graphLinks.filter(l=>{
          const s = typeof l.source === "string" ? l.source : l.source.id;
          const t = typeof l.target === "string" ? l.target : l.target.id;
          return selectedIds.has(s) && selectedIds.has(t);
        })
      };
    }

    function buildSvg(nodesList, linksList){
      if(!nodesList.length) return "";
      const pad = 70;
      const bgVal = colorSettings.background || getLiveVar("--bg");
      const fgVal = getLiveVar("--fg"), edgeVal = getLiveVar("--edge"), mutedVal = getLiveVar("--muted");
      const minX = Math.min(...nodesList.map(n=> Number.isFinite(n.x) ? n.x : 0));
      const minY = Math.min(...nodesList.map(n=> Number.isFinite(n.y) ? n.y : 0));
      const maxX = Math.max(...nodesList.map(n=> (Number.isFinite(n.x) ? n.x : 0) + n.label.length * 7 + 35));
      const maxY = Math.max(...nodesList.map(n=> (Number.isFinite(n.y) ? n.y : 0) + 35));
      const width = Math.max(500, Math.round(maxX - minX + pad * 2));
      const height = Math.max(300, Math.round(maxY - minY + pad * 2));
      const nid = n => typeof n === "string" ? n : n.id;

      const lines = linksList.map(l=>{
        const s = nodeIndex.get(nid(l.source)), t = nodeIndex.get(nid(l.target));
        if(!s || !t) return "";
        return `<line x1="${s.x - minX + pad}" y1="${s.y - minY + pad}" x2="${t.x - minX + pad}" y2="${t.y - minY + pad}" stroke="${edgeVal}" stroke-width="1.5"/>`;
      }).join("");
      const marks = nodesList.map(n=>{
        const x = (Number.isFinite(n.x) ? n.x : 0) - minX + pad;
        const y = (Number.isFinite(n.y) ? n.y : 0) - minY + pad;
        const stroke = n.tag === "new" ? (colorSettings.types.cve || getDefaultPalette().cve) : bgVal;
        return `<g data-node-id="${escapeHtml(n.id)}" data-node-type="${n.type}"><circle cx="${x}" cy="${y}" r="${radius(n)}" fill="${nodeColor(n)}" stroke="${stroke}" stroke-width="2"/><text x="${x + radius(n) + 7}" y="${y + 4}" fill="${fgVal}" font-family="Inter, system-ui, sans-serif" font-size="13">${escapeHtml(n.label)}</text></g>`;
      }).join("");
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><rect width="100%" height="100%" fill="${bgVal}"/><g>${lines}${marks}</g><text x="${width - 14}" y="${height - 12}" text-anchor="end" fill="${mutedVal}" font-family="Inter, system-ui, sans-serif" font-size="9">Created by Alham Rizvi</text></svg>`;
    }

    function saveSvgAsPng(svgString, filename){
      const url = URL.createObjectURL(new Blob([svgString], { type: "image/svg+xml;charset=utf-8" }));
      const img = new Image();
      img.onload = ()=>{
        const scale = 2, canvas = document.createElement("canvas");
        canvas.width = img.width * scale; canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        canvas.toBlob(pngBlob=>{
          if(!pngBlob) return;
          const dl = URL.createObjectURL(pngBlob);
          const a = document.createElement("a");
          a.href = dl; a.download = filename;
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(()=> URL.revokeObjectURL(dl), 1000);
        }, "image/png");
      };
      img.onerror = ()=> URL.revokeObjectURL(url);
      img.src = url;
    }

    function exportSelection(selectedPhases, format, scratchpadText){
      const { selectedNodes, selectedLinks } = getSelectedData(selectedPhases);
      const filename = `attack-path-${[...selectedPhases].join("-")}`;
      const palette = { ...getDefaultPalette(), ...colorSettings.types };
      const csvCell = v => `"${String(v ?? "").replace(/"/g, '""')}"`;

      if(format === "json"){
        const payload = {
          phases: [...selectedPhases],
          background: colorSettings.background || getLiveVar("--bg"),
          colors: {
            types: palette,
            nodes: colorSettings.nodes,
            connectors: {
              normal: colorSettings.edge || getLiveVar("--edge"),
              faded: colorSettings.edgeDim || getLiveVar("--edge-dim")
            }
          },
          nodes: selectedNodes.map(n=> ({ id: n.id, type: n.type, label: n.label, phase: n.data.phase || null, data: n.data })),
          links: selectedLinks.map(l=> ({ source: typeof l.source === "string" ? l.source : l.source.id, target: typeof l.target === "string" ? l.target : l.target.id, kind: l.kind }))
        };
        saveFile(`${filename}.json`, "application/json;charset=utf-8", JSON.stringify(payload, null, 2));
      } else if(format === "csv"){
        const rows = [["id","type","label","phase","color"], ...selectedNodes.map(n=> [n.id, n.type, n.label, n.data.phase || "", nodeColor(n)])];
        saveFile(`${filename}.csv`, "text/csv;charset=utf-8", rows.map(r=> r.map(csvCell).join(",")).join("\r\n"));
      } else if(format === "css"){
        const vars = Object.entries(palette).map(([t, v])=> `  --${t === "technique" ? "tech" : t}: ${v};`).join("\n");
        const typeRules = Object.entries(palette).map(([t, v])=> `[data-node-type="${t}"] circle { fill: ${v}; }`).join("\n");
        const nodeRules = selectedNodes.map(n=> `[data-node-id="${n.id.replace(/["\\]/g, "\\$&")}"] circle { fill: ${nodeColor(n)}; }`).join("\n");
        saveFile(`${filename}.css`, "text/css;charset=utf-8", `:root {\n${vars}\n  --bg: ${colorSettings.background || getLiveVar("--bg")};\n  --edge: ${colorSettings.edge || getLiveVar("--edge")};\n  --edge-dim: ${colorSettings.edgeDim || getLiveVar("--edge-dim")};\n}\n${typeRules}\n${nodeRules}\n`);
      } else if(format === "png"){
        const svgStr = buildSvg(selectedNodes, selectedLinks);
        if(svgStr) saveSvgAsPng(svgStr, `${filename}.png`);
      } else if(format === "md"){
        const lines = ["# Active Directory Attack Path Briefing", "", `_Generated from Find My Attack Path · ${selectedNodes.length} nodes across ${selectedPhases.size} phase(s)_`, ""];
        PHASES.filter(p=> selectedPhases.has(p.id)).forEach(p=>{
          lines.push(`## ${p.label}`, "");
          TECH.filter(t=> t.phase === p.id).forEach(t=>{
            const meta = [t.mitre ? `ATT&CK ${t.mitre}` : "", t.cve ? t.cve.toUpperCase() : ""].filter(Boolean).join(" · ");
            lines.push(`- **${t.label}**${meta ? ` (${meta})` : ""}`);
            if(t.detect) lines.push(`  - _Detection:_ ${t.detect}`);
            if(t.tools && t.tools.length) lines.push(`  - _Tools:_ ${t.tools.map(toolLabel).join(", ")}`);
          });
          customNodesData.filter(c=> c.phase === p.id).forEach(c=>{
            lines.push(`- **[Custom] ${c.label}**${c.note ? ` — ${c.note}` : ""}`);
          });
          lines.push("");
        });
        if(scratchpadText && scratchpadText.trim()) lines.push("## Workspace Scratchpad Notes", "", scratchpadText.trim(), "");
        saveFile(`${filename}.md`, "text/markdown;charset=utf-8", lines.join("\n"));
      } else {
        const svgStr = buildSvg(selectedNodes, selectedLinks);
        if(svgStr) saveFile(`${filename}.svg`, "image/svg+xml;charset=utf-8", svgStr);
      }
      return selectedNodes.length;
    }

    global.addEventListener("resize", ()=>{
      W = global.innerWidth; H = global.innerHeight;
      svg.attr("viewBox", [0, 0, W, H]);
      sim.force("center", d3.forceCenter(W / 2, H / 2));
      if(!isSimFrozen && currentLayout === "force") sim.alpha(0.1).restart();
    });

    /* Populate top-right menu search & type filter chips */
    const filterBar = document.getElementById("typeFilters");
    TYPES.forEach(([key, label])=>{
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.className = "chip active";
      btn.dataset.key = key;
      btn.addEventListener("click", ev=>{
        ev.stopPropagation();
        if(activeTypes.has(key)) activeTypes.delete(key); else activeTypes.add(key);
        btn.classList.toggle("active");
        applyTypeFilter();
      });
      filterBar.appendChild(btn);
    });
    document.getElementById("search").addEventListener("input", ev=> filterBySearch(ev.target.value));
    document.getElementById("resetZoom").addEventListener("click", resetZoom);

    FMAP.graph = {
      nodes: graphNodes,
      links: graphLinks,
      nodeIndex,
      customNodesData: ()=> customNodesData,
      nodeColor,
      getDefaultPalette,
      getColorSettings: ()=> colorSettings,
      getLiveVar,
      toolLabel,
      refreshNodeColors,
      applyLayout,
      setFreeze,
      isFrozen: ()=> isSimFrozen,
      unpinAll,
      fitAll: ()=> fitNodesInView(graphNodes, 450),
      cycleLabels,
      setSpacing,
      setColorOverride,
      resetColors,
      highlightWiresFor,
      clearHighlight,
      findShortestPath,
      highlightPathIds,
      clearPathHighlight,
      applyLabelVisibility,
      focusNode,
      locateNodeOnGraph,
      addCustomNode,
      removeCustomNode,
      exportSelection
    };
  }

  FMAP.initGraph = initGraph;
})(window);
