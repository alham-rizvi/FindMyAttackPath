/* ==========================================================================
   Workspace Toolbox, Modals (Index / About / Diagram) & App Bootstrap
   ========================================================================== */
(function(global){
  "use strict";
  const FMAP = (global.FMAP = global.FMAP || {});

  function initToolboxAndModals(){
    const {
      escapeHtml, mdInline, renderMarkdown, renderMermaid, wireInteractions,
      safeFilename, saveFile, copyText, flashButton
    } = FMAP.md;
    const {
      makeWindowInteractive, wasRecentInteraction, minimizeToDock, removeFromDock
    } = FMAP.win;
    const data = FMAP.data;
    const graph = FMAP.graph;
    const reader = FMAP.reader;

    /* 1. Top-Right Menu & Docs Button ------------------------------------- */
    const menuBtn = document.getElementById("menuBtn");
    const menuPanel = document.getElementById("menuPanel");
    menuBtn.addEventListener("click", ev=>{
      ev.stopPropagation();
      const open = menuPanel.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });
    document.addEventListener("click", ev=>{
      if(!menuPanel.contains(ev.target) && !menuBtn.contains(ev.target)){
        menuPanel.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
    document.getElementById("docsBtn").addEventListener("click", ()=> reader.open());
    document.getElementById("openMarkdownDocs").addEventListener("click", ev=>{
      ev.stopPropagation();
      reader.open();
    });

    /* 2. Workspace Toolbox Window (#toolboxPanel) ------------------------- */
    const toolboxBtn = document.getElementById("toolboxBtn");
    const toolboxPanel = document.getElementById("toolboxPanel");
    const phaseChoices = document.getElementById("phaseChoices");
    const colorTarget = document.getElementById("colorTarget");
    const nodeColorInput = document.getElementById("nodeColor");
    const backgroundColorInput = document.getElementById("backgroundColor");

    makeWindowInteractive(toolboxPanel, { handle: ".tb-head", minW: 290, minH: 260 });

    function openToolbox(){
      removeFromDock("toolbox");
      toolboxPanel.classList.add("open");
      toolboxBtn.setAttribute("aria-expanded", "true");
    }
    function closeToolbox(){
      removeFromDock("toolbox");
      toolboxPanel.classList.remove("open");
      toolboxBtn.setAttribute("aria-expanded", "false");
    }
    function minimizeToolbox(){
      toolboxPanel.classList.remove("open");
      toolboxBtn.setAttribute("aria-expanded", "false");
      minimizeToDock({
        id: "toolbox",
        label: "Toolbox",
        color: "var(--accent)",
        onRestore: openToolbox,
        onClose: closeToolbox
      });
    }

    toolboxBtn.addEventListener("click", ev=>{
      ev.stopPropagation();
      if(toolboxPanel.classList.contains("open")) closeToolbox(); else openToolbox();
    });
    document.getElementById("minimizeToolbox").addEventListener("click", minimizeToolbox);
    document.getElementById("closeToolbox").addEventListener("click", closeToolbox);
    document.getElementById("openToolbox").addEventListener("click", ev=>{
      ev.stopPropagation();
      openToolbox();
      menuPanel.classList.remove("open");
    });

    /* Toolbox 3-Tab Switcher */
    document.querySelectorAll(".tb-tab").forEach(tab=>{
      tab.addEventListener("click", ()=>{
        document.querySelectorAll(".tb-tab").forEach(t=>{
          const on = t === tab;
          t.classList.toggle("active", on);
          t.setAttribute("aria-selected", on);
        });
        document.querySelectorAll(".tb-pane").forEach(p=> p.classList.toggle("active", p.id === tab.dataset.pane));
      });
    });

    /* Tab 1: Graph Controls & Color Pickers */
    document.querySelectorAll("#layoutPresets button").forEach(btn=>{
      btn.addEventListener("click", ()=> graph.applyLayout(btn.dataset.layout));
    });
    const toggleFreezeBtn = document.getElementById("toggleFreeze");
    toggleFreezeBtn.addEventListener("click", ()=>{
      const frozen = graph.setFreeze(!graph.isFrozen());
      toggleFreezeBtn.classList.toggle("active", frozen);
      toggleFreezeBtn.setAttribute("aria-pressed", frozen);
      toggleFreezeBtn.textContent = frozen ? "Resume layout" : "Freeze layout";
    });
    document.getElementById("fitGraph").addEventListener("click", ()=> graph.fitAll());
    document.getElementById("unpinNodes").addEventListener("click", ()=>{
      graph.unpinAll();
      document.querySelectorAll("#layoutPresets button").forEach(b=> b.classList.toggle("active", b.dataset.layout === "force"));
      toggleFreezeBtn.classList.remove("active");
      toggleFreezeBtn.setAttribute("aria-pressed", "false");
      toggleFreezeBtn.textContent = "Freeze layout";
    });
    const cycleLabelsBtn = document.getElementById("cycleLabels");
    cycleLabelsBtn.addEventListener("click", ()=>{
      const mode = graph.cycleLabels();
      cycleLabelsBtn.textContent = `Labels: ${mode === "all" ? "All" : mode === "key" ? "Key" : "Off"}`;
    });
    const spacingSlider = document.getElementById("spacingSlider");
    const spacingVal = document.getElementById("spacingVal");
    spacingSlider.addEventListener("input", ()=>{
      const v = Number(spacingSlider.value) || 240;
      spacingVal.textContent = String(v);
      graph.setSpacing(v);
    });

    function syncColorInputs(){
      const val = colorTarget.value;
      const cs = graph.getColorSettings();
      const defaults = graph.getDefaultPalette();
      if(val && val.startsWith("node:")){
        const n = graph.nodeIndex.get(val.slice(5));
        nodeColorInput.value = cs.nodes[val.slice(5)] || (n ? graph.nodeColor(n) : defaults.phase) || "#3d6b66";
      } else {
        nodeColorInput.value = cs.types[val] || defaults[val] || defaults.phase || "#3d6b66";
      }
      backgroundColorInput.value = cs.background || graph.getLiveVar("--bg") || "#f2f4f2";
    }

    function refreshColorTargets(){
      const prev = colorTarget.value;
      colorTarget.replaceChildren();
      ["phase","technique","tool","cve"].forEach(type=>{
        const opt = document.createElement("option");
        opt.value = type;
        opt.textContent = `${type[0].toUpperCase()}${type.slice(1)} nodes`;
        colorTarget.appendChild(opt);
      });
      graph.nodes.forEach(node=>{
        const opt = document.createElement("option");
        opt.value = `node:${node.id}`;
        opt.textContent = node.label;
        colorTarget.appendChild(opt);
      });
      if(prev && [...colorTarget.options].some(o=> o.value === prev)) colorTarget.value = prev;
      syncColorInputs();
    }

    refreshColorTargets();
    colorTarget.addEventListener("change", syncColorInputs);
    nodeColorInput.addEventListener("input", ()=> graph.setColorOverride(colorTarget.value, nodeColorInput.value));
    backgroundColorInput.addEventListener("input", ()=> graph.setColorOverride("__bg", backgroundColorInput.value));
    document.getElementById("resetColors").addEventListener("click", ()=>{
      graph.resetColors();
      syncColorInputs();
    });

    /* Tab 2A: Shortest Path Finder (BFS) */
    const pathFromSel = document.getElementById("pathFrom");
    const pathToSel = document.getElementById("pathTo");
    const pathResultEl = document.getElementById("pathResult");

    function populatePathSelectors(){
      const prevFrom = pathFromSel.value, prevTo = pathToSel.value;
      const sorted = [...graph.nodes].sort((a, b)=> a.type.localeCompare(b.type) || a.label.localeCompare(b.label));
      [pathFromSel, pathToSel].forEach(sel=>{
        sel.replaceChildren();
        sorted.forEach(n=>{
          const opt = document.createElement("option");
          opt.value = n.id;
          opt.textContent = `[${n.type}] ${n.label}`;
          sel.appendChild(opt);
        });
      });
      if(prevFrom && graph.nodeIndex.has(prevFrom)) pathFromSel.value = prevFrom;
      else if(graph.nodeIndex.has("recon")) pathFromSel.value = "recon";
      if(prevTo && graph.nodeIndex.has(prevTo)) pathToSel.value = prevTo;
      else if(graph.nodeIndex.has("dcsync")) pathToSel.value = "dcsync";
      else if(sorted.length > 1) pathToSel.value = sorted[sorted.length - 1].id;
    }
    populatePathSelectors();

    document.getElementById("findPathBtn").addEventListener("click", ()=>{
      const from = pathFromSel.value, to = pathToSel.value;
      if(!from || !to) return;
      const path = graph.findShortestPath(from, to);
      if(!path){
        pathResultEl.textContent = "No connected path found between these two nodes.";
        return;
      }
      graph.highlightPathIds(path);
      pathResultEl.replaceChildren();
      const summary = document.createElement("div");
      summary.textContent = `${path.length - 1} hop${path.length - 1 === 1 ? "" : "s"} found:`;
      const chain = document.createElement("div");
      chain.className = "tb-hop-chain";
      path.forEach((id, idx)=>{
        const n = graph.nodeIndex.get(id);
        const chip = document.createElement("button");
        chip.type = "button"; chip.className = "tb-hop"; chip.textContent = n ? n.label : id;
        chip.addEventListener("click", ()=> graph.locateNodeOnGraph(id));
        chain.appendChild(chip);
        if(idx < path.length - 1){
          const arr = document.createElement("span");
          arr.className = "tb-hop-arrow"; arr.textContent = "→";
          chain.appendChild(arr);
        }
      });
      pathResultEl.append(summary, chain);
    });
    document.getElementById("clearPathBtn").addEventListener("click", ()=>{
      pathResultEl.textContent = "";
      graph.clearPathHighlight();
    });
    document.getElementById("useCurrentFrom").addEventListener("click", ()=>{
      const cur = reader.getCurrentDetailNode();
      if(cur && graph.nodeIndex.has(cur.id)) pathFromSel.value = cur.id;
    });

    /* Tab 2B: Bookmarks & Study Checklist */
    const bookmarkListEl = document.getElementById("bookmarkList");
    const bookmarkCountEl = document.getElementById("bookmarkCount");
    let savedBookmarks = [];
    try{
      const parsed = JSON.parse(localStorage.getItem("findmyattackpath-bookmarks") || "[]");
      if(Array.isArray(parsed)) savedBookmarks = parsed.filter(b=> b && b.id);
    }catch{}

    function saveBookmarks(){ try{ localStorage.setItem("findmyattackpath-bookmarks", JSON.stringify(savedBookmarks)); }catch{} }
    function hasBookmark(id){ return savedBookmarks.some(b=> b.id === id); }

    function renderBookmarks(){
      bookmarkCountEl.textContent = String(savedBookmarks.length);
      bookmarkListEl.replaceChildren();
      if(!savedBookmarks.length){
        const empty = document.createElement("p");
        empty.className = "toolbox-note"; empty.style.margin = "0";
        empty.textContent = "Click ☆ in any writeup or node detail to bookmark it here.";
        bookmarkListEl.appendChild(empty);
        reader.updateBookmarkButtons();
        return;
      }
      savedBookmarks.forEach(item=>{
        const row = document.createElement("div"); row.className = "tb-list-item";
        const cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = !!item.done; cb.title = "Mark as studied";
        const main = document.createElement("div"); main.className = "tb-list-main";
        const span = document.createElement("span"); span.textContent = item.label || item.id;
        if(item.done){ span.style.textDecoration = "line-through"; span.style.opacity = "0.6"; }
        cb.addEventListener("change", ()=>{
          item.done = cb.checked; saveBookmarks();
          span.style.textDecoration = item.done ? "line-through" : "";
          span.style.opacity = item.done ? "0.6" : "";
        });
        main.append(cb, span);
        main.addEventListener("click", ev=>{
          if(ev.target === cb) return;
          if(graph.nodeIndex.has(item.id)) graph.locateNodeOnGraph(item.id);
          else { const doc = data.docById.get(item.id); if(doc) reader.open(doc); }
        });
        const del = document.createElement("button");
        del.type = "button"; del.className = "dock-close"; del.textContent = "✕"; del.title = "Remove bookmark";
        del.addEventListener("click", ()=>{
          savedBookmarks = savedBookmarks.filter(b=> b.id !== item.id);
          saveBookmarks(); renderBookmarks();
        });
        row.append(main, del);
        bookmarkListEl.appendChild(row);
      });
      reader.updateBookmarkButtons();
    }

    function toggleBookmark(id, label, type){
      if(!id) return;
      if(hasBookmark(id)) savedBookmarks = savedBookmarks.filter(b=> b.id !== id);
      else savedBookmarks.unshift({ id, label: label || id, type: type || "doc", done: false });
      saveBookmarks();
      renderBookmarks();
    }
    document.getElementById("clearBookmarksBtn").addEventListener("click", ()=>{ savedBookmarks = []; saveBookmarks(); renderBookmarks(); });
    FMAP.bookmarks = { has: hasBookmark, toggle: toggleBookmark, render: renderBookmarks };
    renderBookmarks();

    /* Tab 2C: Markdown Scratchpad */
    const scratchInput = document.getElementById("scratchInput");
    const scratchPreview = document.getElementById("scratchPreview");
    const toggleScratchBtn = document.getElementById("toggleScratchPreview");
    try{ scratchInput.value = localStorage.getItem("findmyattackpath-scratchpad") || ""; }catch{}

    function updateScratchPreview(){
      if(!scratchPreview.classList.contains("open")) return;
      const rendered = renderMarkdown(scratchInput.value || "*No notes yet.*");
      scratchPreview.innerHTML = rendered.html;
      wireInteractions(scratchPreview, rendered.codeBlocks, "");
    }
    scratchInput.addEventListener("input", ()=>{
      try{ localStorage.setItem("findmyattackpath-scratchpad", scratchInput.value); }catch{}
      updateScratchPreview();
    });
    toggleScratchBtn.addEventListener("click", ()=>{
      const open = scratchPreview.classList.toggle("open");
      scratchInput.style.display = open ? "none" : "";
      toggleScratchBtn.textContent = open ? "Edit" : "Preview";
      if(open) updateScratchPreview();
    });
    document.getElementById("copyScratchBtn").addEventListener("click", async ev=>{
      const ok = await copyText(scratchInput.value);
      flashButton(ev.currentTarget, ok ? "Copied ✓" : "Failed");
    });
    document.getElementById("exportScratchBtn").addEventListener("click", ()=>{
      saveFile("attack-path-notes.md", "text/markdown;charset=utf-8", scratchInput.value || "# Attack Path Notes\n");
    });

    /* Tab 2D: Custom Graph Nodes */
    const customNodeParent = document.getElementById("customNodeParent");
    const customNodeLabel = document.getElementById("customNodeLabel");
    const customNodeNote = document.getElementById("customNodeNote");
    const customNodeList = document.getElementById("customNodeList");

    data.phases.forEach(p=>{
      const opt = document.createElement("option"); opt.value = p.id; opt.textContent = p.label;
      customNodeParent.appendChild(opt);
    });

    function removeCustomNodeUI(id){
      graph.removeCustomNode(id);
      refreshColorTargets();
      populatePathSelectors();
      renderCustomNodeList();
      if(reader.getCurrentDetailNode()?.id === id) reader.closeDetail();
    }

    function renderCustomNodeList(){
      const list = graph.customNodesData();
      customNodeList.replaceChildren();
      if(!list.length){
        const empty = document.createElement("p");
        empty.className = "toolbox-note"; empty.style.margin = "0";
        empty.textContent = "Add custom targets, lab hosts, or findings directly onto the graph.";
        customNodeList.appendChild(empty);
        return;
      }
      list.forEach(c=>{
        const row = document.createElement("div"); row.className = "tb-list-item";
        const main = document.createElement("div"); main.className = "tb-list-main";
        main.innerHTML = `<span class="dock-dot" style="background:var(--custom)"></span><span>${escapeHtml(c.label)}</span>`;
        main.addEventListener("click", ()=> graph.locateNodeOnGraph(c.id));
        const del = document.createElement("button");
        del.type = "button"; del.className = "dock-close"; del.textContent = "✕"; del.title = "Delete custom node";
        del.addEventListener("click", ()=> removeCustomNodeUI(c.id));
        row.append(main, del);
        customNodeList.appendChild(row);
      });
    }
    renderCustomNodeList();

    document.getElementById("addCustomNodeBtn").addEventListener("click", ()=>{
      const label = customNodeLabel.value.trim();
      if(!label){ customNodeLabel.focus(); return; }
      const added = graph.addCustomNode(label, customNodeParent.value, customNodeNote.value.trim());
      refreshColorTargets();
      populatePathSelectors();
      renderCustomNodeList();
      customNodeLabel.value = "";
      customNodeNote.value = "";
      if(added) reader.showDetail(added);
    });
    document.getElementById("clearCustomNodesBtn").addEventListener("click", ()=>{
      graph.customNodesData().map(c=> c.id).forEach(removeCustomNodeUI);
    });

    /* Tab 3: Phase Selection & Exports */
    data.phases.forEach(phase=>{
      const lbl = document.createElement("label");
      const cb = document.createElement("input");
      cb.type = "checkbox"; cb.value = phase.id; cb.checked = true;
      lbl.append(cb, document.createTextNode(phase.label));
      phaseChoices.appendChild(lbl);
    });
    document.getElementById("selectAllPhases").addEventListener("click", ()=> phaseChoices.querySelectorAll("input").forEach(i=> i.checked = true));
    document.getElementById("selectNoPhases").addEventListener("click", ()=> phaseChoices.querySelectorAll("input").forEach(i=> i.checked = false));
    document.getElementById("downloadSelection").addEventListener("click", ()=>{
      const selectedPhases = new Set([...phaseChoices.querySelectorAll("input:checked")].map(i=> i.value));
      const note = document.querySelector("#tbExportPane .toolbox-note");
      if(!selectedPhases.size){ note.textContent = "Select at least one phase before exporting."; return; }
      const count = graph.exportSelection(selectedPhases, document.getElementById("exportFormat").value, scratchInput.value);
      note.textContent = `Exported ${count} nodes from ${selectedPhases.size} selected phase${selectedPhases.size === 1 ? "" : "s"}.`;
    });

    /* 3. Resource Index Modal (#indexModal) ------------------------------- */
    const indexOverlay = document.getElementById("indexOverlay");
    const indexModal = document.getElementById("indexModal");
    makeWindowInteractive(indexModal, { handle: ".modal-head", minW: 440, minH: 320 });

    function openIndexModal(){
      removeFromDock("index");
      indexOverlay.classList.add("open");
      menuPanel.classList.remove("open");
    }
    function closeIndexModal(){
      removeFromDock("index");
      indexOverlay.classList.remove("open");
    }
    function minimizeIndexModal(){
      indexOverlay.classList.remove("open");
      minimizeToDock({ id: "index", label: "Resource index", color: "var(--tool)", onRestore: openIndexModal, onClose: closeIndexModal });
    }
    document.getElementById("openIndex").addEventListener("click", ev=>{ ev.stopPropagation(); openIndexModal(); });
    document.getElementById("minimizeIndex").addEventListener("click", minimizeIndexModal);
    document.getElementById("closeIndex").addEventListener("click", closeIndexModal);
    indexOverlay.addEventListener("click", ev=>{ if(ev.target === indexOverlay && !wasRecentInteraction()) minimizeIndexModal(); });

    document.querySelector("#indexModal .sub").textContent =
      `${data.tools.length} repositories behind the graph's tool nodes, plus reference material — sourced from docs/tools/. Repo locations and maintenance shift, verify before cloning into anything but a lab.`;

    const tbody = document.querySelector("#resTable tbody");
    data.tools.forEach(t=>{
      const tr = document.createElement("tr");
      tr.dataset.search = (t.repo + " " + t.cat + " " + t.purpose).toLowerCase();
      tr.innerHTML = `<td class="repo"><a href="https://github.com/${escapeHtml(t.repo)}" target="_blank" rel="noopener">${escapeHtml(t.repo)}</a></td><td><span class="cat-pill">${escapeHtml(t.cat)}</span></td><td>${mdInline(t.purpose, { currentPath: t.docPath })}</td>`;
      tbody.appendChild(tr);
    });

    const refBody = document.querySelector("#referenceTable tbody");
    const seenRefs = new Set();
    [
      ...data.phases.map(i=> ({ label: i.label, extra: i.extra })),
      ...data.tech.map(i=> ({ label: i.label, extra: i.extra })),
      ...data.tools.map(i=> ({ label: i.repo, extra: i.extra })),
      ...data.cves.map(i=> ({ label: i.label, extra: i.extra, source: i.source }))
    ].forEach(rec=>{
      const found = [];
      (rec.extra || []).forEach(sec=>{
        for(const m of sec.text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)) found.push({ title: m[1], url: m[2] });
      });
      if(rec.source && /^https?:\/\//i.test(rec.source)) found.push({ title: "Source", url: rec.source });
      found.forEach(ref=>{
        const key = `${rec.label}\n${ref.title}\n${ref.url}`;
        if(seenRefs.has(key)) return;
        seenRefs.add(key);
        const tr = document.createElement("tr");
        tr.dataset.search = `${rec.label} ${ref.title} ${ref.url}`.toLowerCase();
        const td1 = document.createElement("td"); td1.textContent = ref.title;
        const td2 = document.createElement("td"); td2.textContent = rec.label;
        const td3 = document.createElement("td");
        const a = document.createElement("a"); a.href = ref.url; a.textContent = ref.url; a.target = "_blank"; a.rel = "noopener";
        td3.appendChild(a);
        tr.append(td1, td2, td3);
        refBody.appendChild(tr);
      });
    });

    /* Index Modal: Embedded Markdown Tab */
    const markdownList = document.getElementById("markdownList");
    const markdownViewer = document.getElementById("markdownViewer");
    const markdownSearch = document.getElementById("markdownSearch");
    const orderedDocs = reader.getOrderedDocs();
    let activeModalMdFile = null;

    function openMarkdownInModal(file){
      activeModalMdFile = file;
      markdownList.querySelectorAll(".markdown-file").forEach(b=> b.classList.toggle("active", b.dataset.path === file.entry.path));
      const rendered = renderMarkdown(file.body, { stripFirstH1: true, currentPath: file.entry.path });
      const title = reader.docDisplayTitle(file);
      markdownViewer.innerHTML =
        `<h1 style="margin-top:0">${escapeHtml(title)}</h1>` +
        `<small class="mono" style="color:var(--muted);display:block;margin:-6px 0 16px">${escapeHtml(file.entry.path)}</small>` +
        rendered.html;
      markdownViewer.scrollTop = 0;
      wireInteractions(markdownViewer, rendered.codeBlocks, file.entry.path);
      if(rendered.hasMermaid) renderMermaid(markdownViewer, rendered.mermaidSources, title);
    }

    orderedDocs.forEach(file=>{
      const b = document.createElement("button");
      b.type = "button"; b.className = "markdown-file"; b.dataset.path = file.entry.path;
      b.dataset.search = `${file.entry.path} ${reader.docDisplayTitle(file)} ${file.body}`.toLowerCase();
      b.innerHTML = `<strong>${escapeHtml(reader.docDisplayTitle(file))}</strong><small>${escapeHtml(file.entry.path)}</small>`;
      b.addEventListener("click", ()=> openMarkdownInModal(file));
      markdownList.appendChild(b);
    });
    markdownSearch.addEventListener("input", ()=>{
      const q = markdownSearch.value.trim().toLowerCase();
      markdownList.querySelectorAll(".markdown-file").forEach(b=> { b.hidden = Boolean(q) && !b.dataset.search.includes(q); });
    });
    if(orderedDocs.length) openMarkdownInModal(orderedDocs[0]);
    document.getElementById("popoutMarkdownReader").addEventListener("click", ()=> reader.open(activeModalMdFile || orderedDocs[0]));

    /* Index Modal: TXT & JSON viewers */
    async function openTextFile(path, viewer, type){
      const clean = path.trim().replace(/^\/+/, "");
      if(!clean) return;
      viewer.innerHTML = '<p class="resource-note">Loading…</p>';
      try{
        const res = await fetch(clean);
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        let out = await res.text();
        if(type === "json"){
          try{ out = JSON.stringify(JSON.parse(out), null, 2); }
          catch(err){ out = `JSON parse error: ${err.message}\n\n${out}`; }
        }
        viewer.innerHTML = `<pre>${escapeHtml(out)}</pre>`;
      }catch(err){
        viewer.innerHTML = `<p class="resource-note">Could not load ${escapeHtml(clean)} (${escapeHtml(err.message)}).</p>`;
      }
    }

    function wireFileViewer(list, viewer, input, type, paths){
      list.replaceChildren();
      paths.forEach(p=>{
        const b = document.createElement("button");
        b.type = "button"; b.className = "text-file"; b.dataset.path = p; b.textContent = p;
        b.addEventListener("click", ()=>{
          list.querySelectorAll(".text-file").forEach(x=> x.classList.remove("active"));
          b.classList.add("active"); input.value = p;
          openTextFile(p, viewer, type);
        });
        list.appendChild(b);
      });
      if(!input._fmapWired){
        input._fmapWired = true;
        input.addEventListener("keydown", ev=>{ if(ev.key === "Enter") openTextFile(input.value, viewer, type); });
        input.addEventListener("input", ()=>{
          const q = input.value.trim().toLowerCase();
          list.querySelectorAll(".text-file").forEach(b=> { b.hidden = Boolean(q) && !b.dataset.path.toLowerCase().includes(q); });
        });
      }
    }

    const txtList = document.getElementById("txtList"), txtViewer = document.getElementById("txtViewer"), txtPath = document.getElementById("txtPath");
    wireFileViewer(txtList, txtViewer, txtPath, "text", []);
    (async function discoverTxt(){
      const found = [];
      if(location.pathname.endsWith("/") || location.pathname.endsWith("/index.html")){
        try{
          const res = await fetch(location.origin + location.pathname.replace(/index\.html$/, ""));
          if(res.ok){
            const html = await res.text();
            for(const m of html.matchAll(/href=["']([^"'?#]+\.txt)["']/gi)) found.push(m[1].replace(/^\.?\//, ""));
          }
        }catch{}
      }
      const unique = [...new Set(found)];
      if(unique.length) wireFileViewer(txtList, txtViewer, txtPath, "text", unique);
      else txtViewer.innerHTML = '<p class="resource-note">Enter a same-origin TXT path above to view it.</p>';
    })();

    const jsonList = document.getElementById("jsonList"), jsonViewer = document.getElementById("jsonViewer"), jsonPath = document.getElementById("jsonPath");
    wireFileViewer(jsonList, jsonViewer, jsonPath, "json", ["docs/manifest.json", "vercel.json"]);
    document.getElementById("openTxtDocs").addEventListener("click", ev=>{ ev.stopPropagation(); openIndexModal(); document.getElementById("txtTab").click(); });
    document.getElementById("openJsonDocs").addEventListener("click", ev=>{ ev.stopPropagation(); openIndexModal(); document.getElementById("jsonTab").click(); });

    /* Index Modal: Recent Commits Tab */
    let commitsLoaded = false;
    async function loadRecentCommits(){
      if(commitsLoaded) return;
      const list = document.getElementById("commitList");
      list.innerHTML = '<p class="resource-note">Loading recent commits…</p>';
      try{
        const res = await fetch("https://api.github.com/repos/alham-rizvi/FindMyAttackPath/commits?per_page=8", { headers: { Accept: "application/vnd.github+json" } });
        if(!res.ok) throw new Error(`GitHub returned ${res.status}`);
        const commits = await res.json();
        list.replaceChildren();
        commits.forEach(c=>{
          const art = document.createElement("article"); art.className = "commit-item";
          const p = document.createElement("p");
          const a = document.createElement("a"); a.href = c.html_url; a.target = "_blank"; a.rel = "noopener";
          a.textContent = (c.commit.message.split("\n")[0] || "Commit").slice(0, 160);
          p.appendChild(a);
          const sm = document.createElement("small");
          sm.textContent = `${c.sha.slice(0, 7)} · ${new Date(c.commit.author.date).toLocaleDateString()}`;
          art.append(p, sm); list.appendChild(art);
        });
        if(!commits.length) list.textContent = "No recent commits were returned.";
        commitsLoaded = true;
      }catch(err){
        list.innerHTML = `<p class="resource-note">Recent commits could not be loaded (${escapeHtml(err.message)}).</p><a href="https://github.com/alham-rizvi/FindMyAttackPath/commits/main" target="_blank" rel="noopener">View commits on GitHub</a>`;
      }
    }

    document.querySelectorAll(".resource-tab").forEach(tab=>{
      tab.addEventListener("click", ()=>{
        document.querySelectorAll(".resource-tab").forEach(item=>{
          const on = item === tab;
          item.classList.toggle("active", on);
          item.setAttribute("aria-selected", on);
        });
        document.querySelectorAll(".resource-panel").forEach(p=> p.classList.toggle("active", p.id === tab.dataset.panel));
        const search = document.getElementById("tableSearch");
        search.hidden = tab.dataset.panel === "commitsPanel";
        search.placeholder =
          tab.dataset.panel === "referencesPanel" ? "Filter by reference, topic or URL…" :
          tab.dataset.panel === "markdownPanel"   ? "Search all Markdown paths and content…" :
          tab.dataset.panel === "txtPanel"        ? "Search TXT file paths…" :
          tab.dataset.panel === "jsonPanel"       ? "Search JSON file paths…" :
          "Filter by name, category or purpose…";
        search.value = "";
        if(tab.dataset.panel === "commitsPanel") loadRecentCommits();
        if(tab.dataset.panel === "markdownPanel" && activeModalMdFile) openMarkdownInModal(activeModalMdFile);
      });
    });

    document.getElementById("tableSearch").addEventListener("input", ev=>{
      const q = ev.target.value.trim().toLowerCase();
      const activePanel = document.querySelector(".resource-tab.active")?.dataset.panel;
      if(activePanel === "referencesPanel"){
        document.querySelectorAll("#referenceTable tbody tr").forEach(tr=> { tr.hidden = Boolean(q) && !tr.dataset.search.includes(q); });
      } else if(activePanel === "toolsPanel"){
        document.querySelectorAll("#resTable tbody tr").forEach(tr=> { tr.hidden = Boolean(q) && !tr.dataset.search.includes(q); });
      } else if(activePanel === "markdownPanel"){
        markdownSearch.value = q; markdownSearch.dispatchEvent(new Event("input"));
      } else if(activePanel === "txtPanel"){
        txtPath.value = q; txtPath.dispatchEvent(new Event("input"));
      } else if(activePanel === "jsonPanel"){
        jsonPath.value = q; jsonPath.dispatchEvent(new Event("input"));
      }
    });

    /* 4. About Modal (#aboutModal) ---------------------------------------- */
    const aboutOverlay = document.getElementById("aboutOverlay");
    const aboutModal = document.getElementById("aboutModal");
    makeWindowInteractive(aboutModal, { handle: ".modal-head", minW: 360, minH: 260 });

    function openAbout(){ removeFromDock("about"); aboutOverlay.classList.add("open"); menuPanel.classList.remove("open"); }
    function closeAbout(){ removeFromDock("about"); aboutOverlay.classList.remove("open"); }
    function minimizeAbout(){
      aboutOverlay.classList.remove("open");
      minimizeToDock({ id: "about", label: "About", color: "var(--muted)", onRestore: openAbout, onClose: closeAbout });
    }
    document.getElementById("openAbout").addEventListener("click", ev=>{ ev.stopPropagation(); openAbout(); });
    document.getElementById("closeAbout").addEventListener("click", closeAbout);
    const minAboutBtn = document.getElementById("minimizeAbout");
    if(minAboutBtn) minAboutBtn.addEventListener("click", minimizeAbout);
    aboutOverlay.addEventListener("click", ev=>{ if(ev.target === aboutOverlay && !wasRecentInteraction()) closeAbout(); });
    aboutOverlay.querySelectorAll("a[data-md-href]").forEach(a=>{
      a.addEventListener("click", ev=>{ ev.preventDefault(); reader.openByRef(a.dataset.mdHref, ""); });
    });

    /* 5. Diagram Modal (#diagramModal) ------------------------------------ */
    const diagramOverlay = document.getElementById("diagramOverlay");
    const diagramModal = document.getElementById("diagramModal");
    const diagramStage = document.getElementById("diagramStage");
    const diagramTitle = document.getElementById("diagramTitle");
    let activeDiagramSource = "", diagramReturnFocus = null;

    makeWindowInteractive(diagramModal, { handle: ".modal-head", minW: 400, minH: 280 });

    function closeDiagram(){
      diagramOverlay.classList.remove("open");
      diagramOverlay.setAttribute("aria-hidden", "true");
      diagramStage.replaceChildren();
      if(diagramReturnFocus && typeof diagramReturnFocus.focus === "function") diagramReturnFocus.focus();
    }
    function openDiagram(wrap, source, title){
      const svgEl = wrap.querySelector("svg");
      if(!svgEl) return;
      diagramReturnFocus = document.activeElement;
      activeDiagramSource = source;
      diagramTitle.textContent = title;
      diagramStage.replaceChildren(svgEl.cloneNode(true));
      diagramOverlay.classList.add("open");
      diagramOverlay.setAttribute("aria-hidden", "false");
      document.getElementById("closeDiagram").focus();
    }
    document.getElementById("closeDiagram").addEventListener("click", closeDiagram);
    diagramOverlay.addEventListener("click", ev=>{ if(ev.target === diagramOverlay && !wasRecentInteraction()) closeDiagram(); });
    document.getElementById("downloadDiagramSvg").addEventListener("click", ()=>{
      const svgEl = diagramStage.querySelector("svg");
      if(!svgEl) return;
      const copy = svgEl.cloneNode(true);
      copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      saveFile(`${safeFilename(diagramTitle.textContent)}.svg`, "image/svg+xml;charset=utf-8", new XMLSerializer().serializeToString(copy));
    });
    document.getElementById("downloadDiagramSource").addEventListener("click", ()=>{
      saveFile(`${safeFilename(diagramTitle.textContent)}.mmd`, "text/plain;charset=utf-8", activeDiagramSource);
    });

    /* 6. Global Esc Key Priority Handler ---------------------------------- */
    document.addEventListener("keydown", ev=>{
      if(ev.key !== "Escape") return;
      if(diagramOverlay.classList.contains("open")){ closeDiagram(); return; }
      if(reader.isOpen()){
        if(reader.isMobileDrawerOpen()){ reader.closeMobileDrawer(); return; }
        reader.close(); return;
      }
      if(indexOverlay.classList.contains("open")){ closeIndexModal(); return; }
      if(aboutOverlay.classList.contains("open")){ closeAbout(); return; }
      if(reader.isDetailOpen()){ reader.closeDetail(); return; }
      if(toolboxPanel.classList.contains("open")){ closeToolbox(); return; }
    });

    FMAP.toolbox = { open: openToolbox, close: closeToolbox, minimize: minimizeToolbox, removeCustomNode: removeCustomNodeUI };
    FMAP.modals = { openIndex: openIndexModal, closeIndex: closeIndexModal, openAbout, closeAbout, openDiagram, closeDiagram };
  }

  /* 7. App Bootstrap ------------------------------------------------------ */
  function bootstrap(){
    FMAP.data.load().then(()=>{
      const hint = document.getElementById("hintOverlay");
      if(hint) hint.textContent = "drag · scroll to zoom · click a node";
      if(FMAP.data.usingEmbeddedFallback){
        const foot = document.querySelector("#menuPanel .menu-foot");
        if(foot) foot.insertAdjacentHTML(
          "beforebegin",
          '<p class="menu-foot">Running from the snapshot bundled in this file (live docs/ wasn\u2019t reachable) — edits merged to docs/ since this file was built won\u2019t show until it\u2019s rebuilt.</p>'
        );
      }
      FMAP.initGraph();
      FMAP.initReader();
      initToolboxAndModals();
      FMAP.theme.init();
      FMAP.reader.handleDocHash();
    }).catch(err=>{
      console.error(err);
      const hint = document.getElementById("hintOverlay");
      if(hint) hint.textContent = "couldn't load the attack graph — see console";
      const empty = document.getElementById("detailEmpty");
      if(empty){
        empty.innerHTML =
          'Couldn\u2019t load the attack-path data from <code>docs/</code> or from the snapshot bundled in this file. ' +
          'Check that <code>#embedded-docs</code> is intact, or serve this folder over http(s) with <code>docs/</code> alongside <code>index.html</code>.';
      }
    });
  }

  FMAP.bootstrap = bootstrap;
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootstrap);
  else bootstrap();
})(window);
