/* ==========================================================================
   Writeup Reader Window, Node Detail Window & Theme Controller
   ========================================================================== */
(function(global){
  "use strict";
  const FMAP = (global.FMAP = global.FMAP || {});

  /* 1. Theme Controller ---------------------------------------------------- */
  function getEffectiveTheme(){
    const explicit = document.documentElement.dataset.theme;
    if(explicit === "dark" || explicit === "light") return explicit;
    return global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateThemeButtonIcon(){
    const btn = document.getElementById("readerThemeToggle");
    if(!btn) return;
    const dark = getEffectiveTheme() === "dark";
    btn.title = dark ? "Switch to light theme" : "Switch to dark theme";
    btn.setAttribute("aria-label", btn.title);
    btn.innerHTML = dark
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  function rerenderVisibleMermaid(){
    const { renderMermaid } = FMAP.md;
    const ro = document.getElementById("readerOverlay");
    if(ro && ro.classList.contains("open")){
      const rc = document.getElementById("readerContent");
      if(rc && rc.querySelector(".mermaid-wrap")){
        renderMermaid(rc, null, document.getElementById("readerDocTitle")?.textContent || "Diagram");
      }
    }
    const dc = document.getElementById("detailContent");
    const detailEl = document.getElementById("detail");
    if(detailEl && detailEl.classList.contains("open") && dc && dc.querySelector(".mermaid-wrap")){
      renderMermaid(dc, null, FMAP.reader?.getCurrentDetailNode()?.label || "Diagram");
    }
    const mv = document.getElementById("markdownViewer");
    if(mv && document.getElementById("indexOverlay")?.classList.contains("open") && mv.querySelector(".mermaid-wrap")){
      renderMermaid(mv, null, "Documentation");
    }
  }

  function applyTheme(theme, persist){
    if(theme === "dark" || theme === "light"){
      document.documentElement.dataset.theme = theme;
      if(persist){ try{ localStorage.setItem("findmyattackpath-theme", theme); }catch{} }
    }
    updateThemeButtonIcon();
    if(FMAP.graph){
      FMAP.graph.refreshNodeColors();
      const bgInput = document.getElementById("backgroundColor");
      if(bgInput && !FMAP.graph.getColorSettings().background){
        bgInput.value = FMAP.graph.getLiveVar("--bg");
      }
    }
    rerenderVisibleMermaid();
  }

  function initTheme(){
    try{
      const saved = localStorage.getItem("findmyattackpath-theme");
      if(saved === "dark" || saved === "light") document.documentElement.dataset.theme = saved;
    }catch{}
    updateThemeButtonIcon();
  }

  function toggleTheme(){
    applyTheme(getEffectiveTheme() === "dark" ? "light" : "dark", true);
  }

  FMAP.theme = { getEffective: getEffectiveTheme, init: initTheme, apply: applyTheme, toggle: toggleTheme, rerenderVisibleMermaid };

  /* 2. Reader & Node Detail Windows --------------------------------------- */
  function initReader(){
    const {
      parseFrontmatter, splitSections, escapeHtml, sanitizeUrl, resolveDocByRef,
      mdInline, renderMarkdown, renderMermaid, wireInteractions, saveFile, copyText, flashButton
    } = FMAP.md;
    const {
      makeWindowInteractive, saveBounds, restoreBounds, clearBounds,
      updateReaderResponsive, wasRecentInteraction, minimizeToDock, removeFromDock, isDocked
    } = FMAP.win;
    const data = FMAP.data;
    const graph = FMAP.graph;

    /* ---- DOM References ---- */
    const detailEl = document.getElementById("detail");
    const detailToolbar = document.getElementById("detailToolbar");
    const detailContent = document.getElementById("detailContent");

    const readerOverlay = document.getElementById("readerOverlay");
    const readerShell = document.getElementById("readerShell");
    const readerBody = document.getElementById("readerBody");
    const readerSidebar = document.getElementById("readerSidebar");
    const readerSidebarBackdrop = document.getElementById("readerSidebarBackdrop");
    const readerList = document.getElementById("readerList");
    const readerSearch = document.getElementById("readerSearch");
    const readerSearchClear = document.getElementById("readerSearchClear");
    const readerMatchCount = document.getElementById("readerMatchCount");
    const readerCatFilters = document.getElementById("readerCatFilters");
    const readerMain = document.getElementById("readerMain");
    const readerDocEyebrow = document.getElementById("readerDocEyebrow");
    const readerDocTitle = document.getElementById("readerDocTitle");
    const readerDocRelations = document.getElementById("readerDocRelations");
    const readerDocDetect = document.getElementById("readerDocDetect");
    const readerContent = document.getElementById("readerContent");
    const readerRawWrap = document.getElementById("readerRawWrap");
    const readerRawPre = document.getElementById("readerRawPre");
    const readerNav = document.getElementById("readerNav");
    const readerToc = document.getElementById("readerToc");
    const readerTocList = document.getElementById("readerTocList");
    const readerCrumbCat = document.getElementById("readerCrumbCat");
    const readerCrumbTitle = document.getElementById("readerCrumbTitle");
    const readerModeRendered = document.getElementById("readerModeRendered");
    const readerModeRaw = document.getElementById("readerModeRaw");
    const readerLocateGraph = document.getElementById("readerLocateGraph");
    const readerCopyMd = document.getElementById("readerCopyMd");
    const readerDownloadMd = document.getElementById("readerDownloadMd");
    const readerBookmarkBtn = document.getElementById("readerBookmarkBtn");
    const maximizeReaderBtn = document.getElementById("maximizeReader");

    /* ---- State ---- */
    let currentDetailNode = null;
    let savedDetailBounds = null;
    let activeReaderFile = null;
    let activeReaderCat = "all";
    let activeReaderMode = "rendered";
    let readerReturnFocus = null;
    let readerFontSize = 15;
    let readerHeadings = [];
    let savedReaderScrollTop = 0;
    let isReaderMaximized = false;
    let savedReaderBounds = null;
    const collapsedGroups = new Set();

    const CAT_LABELS = { phase: "Kill-Chain Phases", technique: "Techniques", cve: "CVEs", tool: "Tools", root: "Guides" };
    const CAT_SHORT  = { phase: "Phase", technique: "Technique", cve: "CVE", tool: "Tool", root: "Guide" };
    const CAT_ORDER  = ["root", "phase", "technique", "cve", "tool"];
    const PHASE_ORDER = new Map(data.phases.map((p, i)=> [p.id, i]));

    const TECHS_BY_PHASE = new Map(), TECHS_BY_TOOL = new Map(), TECHS_BY_CVE = new Map();
    data.tech.forEach(t=>{
      if(t.phase){ (TECHS_BY_PHASE.get(t.phase) || TECHS_BY_PHASE.set(t.phase, []).get(t.phase)).push(t); }
      (t.tools || []).forEach(tid=>{ (TECHS_BY_TOOL.get(tid) || TECHS_BY_TOOL.set(tid, []).get(tid)).push(t); });
      if(t.cve){ (TECHS_BY_CVE.get(t.cve) || TECHS_BY_CVE.set(t.cve, []).get(t.cve)).push(t); }
    });

    function docDisplayTitle(file){
      if(file.meta && file.meta.label) return file.meta.label;
      const h1 = file.body.match(/^\s*#\s+([^\r\n]+)/);
      if(h1) return h1[1].trim();
      return file.entry.id || file.entry.path.split("/").pop().replace(/\.md$/i, "");
    }

    function docSearchHaystack(file){
      const m = file.meta || {};
      return [
        docDisplayTitle(file), file.entry.id, file.entry.path, file.entry.type,
        m.phase ? data.phaseLabel(m.phase) : "", m.mitre || "", m.category || "",
        m.repo || "", m.cve || "", m.detect || "", file.body
      ].join(" ").toLowerCase();
    }

    function buildOrderedDocs(){
      return data.docFiles.slice().sort((a, b)=>{
        const ca = CAT_ORDER.indexOf(a.entry.type), cb = CAT_ORDER.indexOf(b.entry.type);
        if(ca !== cb) return (ca < 0 ? 99 : ca) - (cb < 0 ? 99 : cb);
        if(a.entry.type === "phase") return (PHASE_ORDER.get(a.meta.id || a.entry.id) ?? 99) - (PHASE_ORDER.get(b.meta.id || b.entry.id) ?? 99);
        if(a.entry.type === "cve"){
          const d = (Number(b.meta.year) || 0) - (Number(a.meta.year) || 0);
          if(d !== 0) return d;
        }
        return docDisplayTitle(a).localeCompare(docDisplayTitle(b));
      });
    }

    let orderedDocs = buildOrderedDocs();
    let filteredDocs = orderedDocs.slice();

    /* ---- Make #detail and #readerShell fully 8-edge/corner resizable + draggable ---- */
    makeWindowInteractive(detailEl, {
      handle: detailToolbar,
      minW: 290,
      minH: 220,
      isBlocked: ()=> detailEl.classList.contains("detail-expanded")
    });

    makeWindowInteractive(readerShell, {
      handle: "#readerHeader",
      minW: 480,
      minH: 340,
      isBlocked: ()=> isReaderMaximized || global.innerWidth <= 880
    });

    /* ---- Node Detail Window ---- */
    function closeDetail(){
      removeFromDock("detail");
      if(detailEl.classList.contains("detail-expanded")){
        detailEl.classList.remove("detail-expanded");
        if(savedDetailBounds) restoreBounds(detailEl, savedDetailBounds);
        savedDetailBounds = null;
      }
      detailEl.classList.remove("open");
      currentDetailNode = null;
      graph.clearHighlight();
      graph.applyLabelVisibility();
    }

    function closeDetailIfOpen(){
      if(detailEl.classList.contains("open")) closeDetail();
    }

    function minimizeDetail(){
      const savedNode = currentDetailNode;
      if(!savedNode) return;
      detailEl.classList.remove("open", "detail-expanded");
      minimizeToDock({
        id: "detail",
        label: savedNode.label,
        color: graph.nodeColor(savedNode),
        onRestore: ()=> showDetail(savedNode),
        onClose: ()=> closeDetail()
      });
    }

    function renderDetailToolbar(d, docFile){
      const starred = FMAP.bookmarks ? FMAP.bookmarks.has(d.id) : false;
      const expanded = detailEl.classList.contains("detail-expanded");
      detailToolbar.innerHTML =
        (docFile ? `<button id="openDetailInReader" class="primary" type="button">Read writeup</button>` : "") +
        `<button id="detailBookmarkBtn" class="${starred ? "starred" : ""}" type="button" title="${starred ? "Remove bookmark" : "Bookmark node"}">${starred ? "★ Saved" : "☆ Save"}</button>` +
        `<button id="expandDetail" type="button" aria-expanded="${expanded}">${expanded ? "Collapse" : "Expand"}</button>` +
        `<button id="minimizeDetail" class="icon-sm" type="button" aria-label="Minimize detail" title="Minimize to dock">—</button>` +
        `<button id="closeDetail" class="icon-sm" type="button" aria-label="Close detail" title="Close">✕</button>`;

      const openReaderBtn = document.getElementById("openDetailInReader");
      if(openReaderBtn && docFile) openReaderBtn.addEventListener("click", ()=> openReader(docFile));
      document.getElementById("detailBookmarkBtn").addEventListener("click", ()=>{
        if(FMAP.bookmarks) FMAP.bookmarks.toggle(d.id, d.label, d.type);
      });
      document.getElementById("expandDetail").addEventListener("click", ev=>{
        const willExpand = !detailEl.classList.contains("detail-expanded");
        if(willExpand){
          savedDetailBounds = saveBounds(detailEl);
          clearBounds(detailEl);
          detailEl.classList.add("detail-expanded");
        } else {
          detailEl.classList.remove("detail-expanded");
          if(savedDetailBounds) restoreBounds(detailEl, savedDetailBounds);
          savedDetailBounds = null;
        }
        ev.currentTarget.textContent = willExpand ? "Collapse" : "Expand";
        ev.currentTarget.setAttribute("aria-expanded", willExpand);
      });
      document.getElementById("minimizeDetail").addEventListener("click", minimizeDetail);
      document.getElementById("closeDetail").addEventListener("click", closeDetail);
    }

    function showDetail(d){
      removeFromDock("detail");
      currentDetailNode = d;
      const t = d.data || {};
      const docFile = data.docById.get(d.id) || null;
      const currentPath = (docFile && docFile.entry.path) || t.docPath || "";
      const allCodeBlocks = [], allMermaidSources = [];
      const renderChunk = (mdText, stripH1)=>{
        const state = { headings: [], mermaidSources: allMermaidSources, codeBlocks: allCodeBlocks, slugCounts: new Map() };
        return renderMarkdown(mdText, { stripFirstH1: !!stripH1, currentPath }, state).html;
      };
      const renderExtra = extra => (!extra || !extra.length) ? "" : extra.map(s=>
        `<div class="field"><label>${escapeHtml(s.title || "More")}</label><div class="md-prose md-prose-compact">${renderChunk(s.text, false)}</div></div>`
      ).join("");

      renderDetailToolbar(d, docFile);

      let body = `<h3>${escapeHtml(d.label)}${d.tag === "new" ? '<span class="tag-new">new</span>' : ""}</h3>`;
      body += `<div class="type-badge type-${escapeHtml(d.type)}">${escapeHtml(d.type)}</div>`;

      if(d.type === "phase"){
        body += `<div class="field"><div class="md-prose md-prose-compact">${renderChunk(t.desc, true)}</div></div>` + renderExtra(t.extra);
      } else if(d.type === "technique"){
        body += `<div class="phase-of">Phase: <button type="button" class="tool-pill" data-jump="${escapeHtml(t.phase)}">${escapeHtml(data.phaseLabel(t.phase))}</button>${t.mitre ? `<span class="doc-chip" style="padding:2px 8px;font-size:11px;cursor:default">${escapeHtml(t.mitre)}</span>` : ""}</div>`;
        if(t.detect) body += `<div class="detail-detect"><strong>Detection:</strong> ${mdInline(t.detect, { currentPath })}</div>`;
        if(t.tools && t.tools.length) body += `<div class="field"><label>Tool(s)</label><div class="toollist">${t.tools.map(x=> `<span class="tool-pill" data-jump="${escapeHtml(x)}">${escapeHtml(graph.toolLabel(x))}</span>`).join("")}</div></div>`;
        if(t.cve) body += `<div class="field"><label>CVE</label><div class="toollist"><span class="tool-pill" data-jump="${escapeHtml(t.cve)}">${escapeHtml(t.cve)}</span></div></div>`;
        body += `<div class="field"><div class="md-prose md-prose-compact">${renderChunk(t.desc, true)}</div></div>`;
        if(t.prereq && t.prereq.trim()) body += `<div class="field"><label>Prerequisite</label><div class="md-prose md-prose-compact">${renderChunk(t.prereq, false)}</div></div>`;
        body += renderExtra(t.extra);
      } else if(d.type === "tool"){
        body += `<div class="field"><label>Repository</label><p><a href="https://github.com/${escapeHtml(t.repo)}" target="_blank" rel="noopener">${escapeHtml(t.repo)}</a></p></div>`;
        body += `<div class="field"><label>Category</label><p>${mdInline(t.cat, { currentPath })}</p></div>`;
        body += `<div class="field"><label>Summary</label><div class="md-prose md-prose-compact">${renderChunk(t.rawPurpose || t.purpose, true)}</div></div>`;
        body += renderExtra(t.extra);
      } else if(d.type === "cve"){
        body += `<div class="field"><label>Disclosed</label><p>${escapeHtml(t.year)}${t.source ? ` · <a href="${escapeHtml(sanitizeUrl(t.source) || "#")}" target="_blank" rel="noopener">Advisory ↗</a>` : ""}</p></div>`;
        body += `<div class="field"><div class="md-prose md-prose-compact">${renderChunk(t.desc, true)}</div></div>`;
        body += renderExtra(t.extra);
      } else if(d.type === "custom"){
        if(t.phase) body += `<div class="phase-of">Linked phase: <button type="button" class="tool-pill" data-jump="${escapeHtml(t.phase)}">${escapeHtml(data.phaseLabel(t.phase))}</button></div>`;
        body += `<div class="field"><label>Custom note</label><div class="md-prose md-prose-compact">${renderChunk(t.note || "*No notes added for this custom node.*", false)}</div></div>`;
        body += `<div class="field"><button class="tb-btn" id="deleteCustomFromDetail" type="button">Delete custom node</button></div>`;
      }

      /* Updating #detailContent preserves #detailToolbar and all 8 .win-rz handles! */
      detailContent.innerHTML = body;
      detailContent.scrollTop = 0;
      detailEl.classList.add("open");

      detailContent.querySelectorAll("[data-jump]").forEach(el=> el.addEventListener("click", ()=> graph.focusNode(el.dataset.jump)));
      const delCustom = document.getElementById("deleteCustomFromDetail");
      if(delCustom) delCustom.addEventListener("click", ()=>{
        if(FMAP.toolbox) FMAP.toolbox.removeCustomNode(d.id);
        closeDetail();
      });

      wireInteractions(detailContent, allCodeBlocks, currentPath);
      if(allMermaidSources.length) renderMermaid(detailContent, allMermaidSources, d.label);
      graph.highlightWiresFor(d.id);
      graph.applyLabelVisibility();
    }

    /* ---- GitBook Writeup Reader ---- */
    function applyFontSize(px, persist){
      readerFontSize = Math.min(19, Math.max(13, Number(px) || 15));
      readerOverlay.style.setProperty("--reader-font-size", `${readerFontSize}px`);
      if(persist){ try{ localStorage.setItem("findmyattackpath-reader-size", String(readerFontSize)); }catch{} }
    }
    try{
      const savedSize = parseFloat(localStorage.getItem("findmyattackpath-reader-size"));
      if(Number.isFinite(savedSize)) applyFontSize(savedSize, false);
    }catch{}

    function setMaximized(max, persist){
      const next = Boolean(max);
      if(next && !isReaderMaximized){
        savedReaderBounds = saveBounds(readerShell);
        clearBounds(readerShell);
      } else if(!next && isReaderMaximized){
        if(savedReaderBounds) restoreBounds(readerShell, savedReaderBounds);
        savedReaderBounds = null;
      }
      isReaderMaximized = next;
      readerOverlay.classList.toggle("maximized", isReaderMaximized);
      if(maximizeReaderBtn){
        maximizeReaderBtn.title = isReaderMaximized ? "Restore windowed size" : "Maximize to fullscreen";
        maximizeReaderBtn.setAttribute("aria-label", maximizeReaderBtn.title);
        maximizeReaderBtn.innerHTML = isReaderMaximized
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/></svg>'
          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
      }
      if(persist){ try{ localStorage.setItem("findmyattackpath-reader-max", isReaderMaximized ? "1" : "0"); }catch{} }
      requestAnimationFrame(()=> updateReaderResponsive(readerShell));
    }
    try{
      if(localStorage.getItem("findmyattackpath-reader-max") === "1") setMaximized(true, false);
    }catch{}

    function updateCategoryCounts(){
      const counts = { all: orderedDocs.length, phase: 0, technique: 0, cve: 0, tool: 0, root: 0 };
      orderedDocs.forEach(f=>{ if(counts[f.entry.type] !== undefined) counts[f.entry.type]++; });
      readerCatFilters.querySelectorAll(".reader-cat-chip").forEach(btn=>{
        const cat = btn.dataset.cat;
        const base = btn.dataset.baseLabel || btn.textContent;
        btn.dataset.baseLabel = base;
        btn.textContent = `${base} (${counts[cat] ?? 0})`;
      });
    }
    updateCategoryCounts();

    function renderSidebar(){
      const q = readerSearch.value.trim().toLowerCase();
      readerSearchClear.classList.toggle("visible", q.length > 0);
      filteredDocs = orderedDocs.filter(file=>{
        if(activeReaderCat !== "all" && file.entry.type !== activeReaderCat) return false;
        if(!q) return true;
        if(!file._haystack) file._haystack = docSearchHaystack(file);
        return file._haystack.includes(q);
      });
      readerMatchCount.textContent = `${filteredDocs.length} of ${orderedDocs.length} writeups`;
      readerList.replaceChildren();
      if(!filteredDocs.length){
        const empty = document.createElement("div");
        empty.className = "reader-empty";
        empty.textContent = "No matching writeups. Try a technique name, MITRE ID (e.g. T1649), tool, or command.";
        readerList.appendChild(empty);
        return;
      }
      const showGroups = activeReaderCat === "all";
      let lastType = null;
      filteredDocs.forEach(file=>{
        const type = file.entry.type;
        if(showGroups && type !== lastType){
          lastType = type;
          const isCollapsed = !q && collapsedGroups.has(type);
          const gHead = document.createElement("button");
          gHead.type = "button";
          gHead.className = "reader-group-title" + (isCollapsed ? " collapsed" : "");
          const count = filteredDocs.filter(x=> x.entry.type === type).length;
          gHead.innerHTML = `<span class="group-left"><span class="group-chev">▾</span><span>${escapeHtml(CAT_LABELS[type] || type)}</span></span><span>${count}</span>`;
          gHead.addEventListener("click", ()=>{
            if(collapsedGroups.has(type)) collapsedGroups.delete(type);
            else collapsedGroups.add(type);
            renderSidebar();
          });
          readerList.appendChild(gHead);
        }
        if(showGroups && !q && collapsedGroups.has(type)) return;
        const item = document.createElement("button");
        item.type = "button";
        item.className = "reader-item" + (activeReaderFile && activeReaderFile.entry.path === file.entry.path ? " active" : "");
        item.dataset.path = file.entry.path;
        const title = docDisplayTitle(file);
        const subParts = [];
        if(type === "technique"){
          if(file.meta.phase) subParts.push(data.phaseLabel(file.meta.phase));
          if(file.meta.mitre) subParts.push(file.meta.mitre);
        } else if(type === "tool"){
          if(file.meta.category) subParts.push(file.meta.category);
          if(file.meta.repo) subParts.push(file.meta.repo);
        } else if(type === "cve"){
          if(file.meta.year) subParts.push(String(file.meta.year));
          subParts.push(file.entry.id.toUpperCase());
        } else {
          subParts.push(file.entry.path);
        }
        const isNew = file.meta && file.meta.tag === "new";
        item.innerHTML =
          `<div class="reader-item-row"><span class="reader-item-dot dot-${escapeHtml(type)}"></span><span class="reader-item-title">${escapeHtml(title)}${isNew ? '<span class="tag-new" style="margin-left:5px">new</span>' : ""}</span></div>` +
          `<div class="reader-item-sub">${escapeHtml(subParts.join(" · "))}</div>`;
        item.addEventListener("click", ()=> selectDoc(file, { closeMobileDrawer: true }));
        readerList.appendChild(item);
      });
    }

    function setMobileDrawerOpen(open){
      readerSidebar.classList.toggle("mobile-open", open);
      readerSidebarBackdrop.classList.toggle("open", open);
    }

    function setDesktopSidebarCollapsed(collapsed){
      readerSidebar.classList.toggle("collapsed", collapsed);
      readerBody.classList.toggle("sidebar-collapsed", collapsed);
    }

    function syncTocHiddenState(){
      const hidden = activeReaderMode === "raw" || readerHeadings.length < 2;
      readerToc.classList.toggle("empty", hidden);
      readerBody.classList.toggle("toc-hidden", hidden);
    }

    function setReaderMode(mode){
      activeReaderMode = mode === "raw" ? "raw" : "rendered";
      const isRaw = activeReaderMode === "raw";
      readerModeRendered.classList.toggle("active", !isRaw);
      readerModeRaw.classList.toggle("active", isRaw);
      readerContent.style.display = isRaw ? "none" : "";
      readerRawWrap.classList.toggle("open", isRaw);
      syncTocHiddenState();
    }

    function updateToc(headings){
      readerHeadings = headings || [];
      readerTocList.replaceChildren();
      syncTocHiddenState();
      if(readerHeadings.length < 2 || activeReaderMode === "raw") return;
      readerHeadings.forEach((h, idx)=>{
        const a = document.createElement("a");
        a.className = `toc-link toc-l${h.level}${idx === 0 ? " active" : ""}`;
        a.href = `#${h.id}`;
        a.dataset.targetId = h.id;
        a.textContent = h.text;
        a.addEventListener("click", ev=>{
          ev.preventDefault();
          const target = readerContent.querySelector(`[id="${CSS.escape(h.id)}"]`);
          if(target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        readerTocList.appendChild(a);
      });
    }

    function updateTocScrollSpy(){
      if(readerHeadings.length < 2 || activeReaderMode === "raw") return;
      const mainRect = readerMain.getBoundingClientRect();
      let activeId = readerHeadings[0].id;
      for(const h of readerHeadings){
        const el = readerContent.querySelector(`[id="${CSS.escape(h.id)}"]`);
        if(!el) continue;
        if(el.getBoundingClientRect().top - mainRect.top <= 110) activeId = h.id;
        else break;
      }
      readerTocList.querySelectorAll(".toc-link").forEach(link=> link.classList.toggle("active", link.dataset.targetId === activeId));
    }
    readerMain.addEventListener("scroll", updateTocScrollSpy, { passive: true });

    function renderDocHeader(file){
      const m = file.meta || {}, type = file.entry.type || "root";
      const title = docDisplayTitle(file), id = m.id || file.entry.id;
      readerCrumbCat.textContent = CAT_LABELS[type] || "Writeups";
      readerCrumbTitle.textContent = title;
      readerDocTitle.textContent = title;

      /* Eyebrow pills — intentionally NO read-time tag */
      const bits = [`<span class="type-badge type-${escapeHtml(type)}" style="margin:0">${escapeHtml(CAT_SHORT[type] || type)}</span>`];
      if(m.tag === "new") bits.push(`<span class="tag-new" style="margin:0">new</span>`);
      if(m.mitre) bits.push(`<span class="doc-meta-pill">ATT&amp;CK ${escapeHtml(m.mitre)}</span>`);
      if(m.year) bits.push(`<span class="doc-meta-pill">${escapeHtml(m.year)}</span>`);
      if(m.category) bits.push(`<span class="doc-meta-pill">${escapeHtml(m.category)}</span>`);
      bits.push(`<span class="doc-path-pill">${escapeHtml(file.entry.path)}</span>`);
      readerDocEyebrow.innerHTML = bits.join("");

      /* Bidirectional relation chips */
      readerDocRelations.replaceChildren();
      const addChip = (labelText, opts)=>{
        const o = opts || {};
        if(o.href){
          const a = document.createElement("a");
          a.className = "doc-chip external"; a.href = o.href; a.target = "_blank"; a.rel = "noopener";
          a.innerHTML = `${o.prefix ? `<span class="chip-k">${escapeHtml(o.prefix)}</span>` : ""}${escapeHtml(labelText)} ↗`;
          readerDocRelations.appendChild(a);
        } else {
          const btn = document.createElement("button");
          btn.type = "button"; btn.className = "doc-chip";
          btn.innerHTML = `${o.prefix ? `<span class="chip-k">${escapeHtml(o.prefix)}</span>` : ""}${escapeHtml(labelText)}`;
          btn.addEventListener("click", o.onClick);
          readerDocRelations.appendChild(btn);
        }
      };
      const addChipList = (items, prefix, maxVisible)=>{
        const lim = maxVisible || 10;
        items.slice(0, lim).forEach(it=> addChip(it.label, { prefix: it.prefix || prefix, onClick: it.onClick }));
        if(items.length > lim){
          const more = document.createElement("button");
          more.type = "button"; more.className = "doc-chip"; more.textContent = `+${items.length - lim} more`;
          more.addEventListener("click", ()=>{
            more.remove();
            items.slice(lim).forEach(it=> addChip(it.label, { prefix: it.prefix || prefix, onClick: it.onClick }));
          });
          readerDocRelations.appendChild(more);
        }
      };

      if(type === "technique"){
        if(m.phase){ const pf = data.docById.get(m.phase); if(pf) addChip(data.phaseLabel(m.phase), { prefix: "Phase", onClick: ()=> selectDoc(pf) }); }
        if(m.cve){ const cf = data.docById.get(m.cve); if(cf) addChip(m.cve.toUpperCase(), { prefix: "CVE", onClick: ()=> selectDoc(cf) }); }
        addChipList((m.tools || []).map(tid=> data.docById.get(tid)).filter(Boolean).map(tf=> ({ label: docDisplayTitle(tf), prefix: "Tool", onClick: ()=> selectDoc(tf) })), "Tool", 8);
      } else if(type === "phase"){
        const techs = (TECHS_BY_PHASE.get(id) || []).map(t=> data.docById.get(t.id)).filter(Boolean).map(tf=> ({ label: docDisplayTitle(tf), onClick: ()=> selectDoc(tf) }));
        if(techs.length) addChipList(techs, "", 10);
      } else if(type === "tool"){
        if(m.repo) addChip(m.repo, { prefix: "GitHub", href: `https://github.com/${m.repo}` });
        addChipList((TECHS_BY_TOOL.get(id) || []).map(t=> data.docById.get(t.id)).filter(Boolean).map(tf=> ({ label: docDisplayTitle(tf), prefix: "Used in", onClick: ()=> selectDoc(tf) })), "Used in", 8);
      } else if(type === "cve"){
        if(m.source && sanitizeUrl(m.source)) addChip("Official advisory", { href: sanitizeUrl(m.source) });
        addChipList((TECHS_BY_CVE.get(id) || []).map(t=> data.docById.get(t.id)).filter(Boolean).map(tf=> ({ label: docDisplayTitle(tf), prefix: "Technique", onClick: ()=> selectDoc(tf) })), "Technique", 8);
      }
      readerDocRelations.style.display = readerDocRelations.childElementCount ? "" : "none";

      if(m.detect){
        readerDocDetect.hidden = false;
        readerDocDetect.innerHTML = `<span class="detect-k">Detection signal: </span>${mdInline(m.detect, { currentPath: file.entry.path })}`;
      } else {
        readerDocDetect.hidden = true;
        readerDocDetect.textContent = "";
      }

      const hasNode = graph.nodeIndex.has(id);
      readerLocateGraph.hidden = !hasNode;
      readerLocateGraph.dataset.nodeId = hasNode ? id : "";
    }

    function renderPrevNext(file){
      readerNav.replaceChildren();
      const list = filteredDocs.some(f=> f.entry.path === file.entry.path) ? filteredDocs : orderedDocs;
      const idx = list.findIndex(f=> f.entry.path === file.entry.path);
      if(idx < 0) return;
      const prev = idx > 0 ? list[idx - 1] : null;
      const next = idx < list.length - 1 ? list[idx + 1] : null;
      if(prev){
        const b = document.createElement("button");
        b.type = "button"; b.className = "reader-nav-btn";
        b.innerHTML = `<span class="nav-dir">← Previous</span><span class="nav-title">${escapeHtml(docDisplayTitle(prev))}</span>`;
        b.addEventListener("click", ()=> selectDoc(prev));
        readerNav.appendChild(b);
      } else {
        readerNav.appendChild(document.createElement("div"));
      }
      if(next){
        const b = document.createElement("button");
        b.type = "button"; b.className = "reader-nav-btn next";
        b.innerHTML = `<span class="nav-dir">Next →</span><span class="nav-title">${escapeHtml(docDisplayTitle(next))}</span>`;
        b.addEventListener("click", ()=> selectDoc(next));
        readerNav.appendChild(b);
      }
    }

    function updateBookmarkButtons(){
      if(readerBookmarkBtn && activeReaderFile && FMAP.bookmarks){
        const docId = activeReaderFile.meta?.id || activeReaderFile.entry.id;
        const on = FMAP.bookmarks.has(docId);
        readerBookmarkBtn.textContent = on ? "★" : "☆";
        readerBookmarkBtn.classList.toggle("active", on);
        readerBookmarkBtn.title = on ? "Remove bookmark" : "Bookmark writeup";
      }
      const dBtn = document.getElementById("detailBookmarkBtn");
      if(dBtn && currentDetailNode && FMAP.bookmarks){
        const on = FMAP.bookmarks.has(currentDetailNode.id);
        dBtn.textContent = on ? "★ Saved" : "☆ Save";
        dBtn.classList.toggle("starred", on);
      }
    }

    function selectDoc(file, opts){
      if(!file) return;
      const cfg = opts || {};
      activeReaderFile = file;
      if(cfg.closeMobileDrawer) setMobileDrawerOpen(false);
      renderDocHeader(file);

      const rendered = renderMarkdown(file.body, { stripFirstH1: true, currentPath: file.entry.path });
      readerContent.innerHTML = rendered.html || '<p class="resource-note">This document has no body text yet.</p>';
      readerRawPre.textContent = file.raw || file.body || "";
      readerMain.scrollTop = 0;

      wireInteractions(readerContent, rendered.codeBlocks, file.entry.path);
      updateToc(rendered.headings);
      setReaderMode(activeReaderMode);
      renderPrevNext(file);
      if(rendered.hasMermaid) renderMermaid(readerContent, rendered.mermaidSources, docDisplayTitle(file));

      readerList.querySelectorAll(".reader-item").forEach(btn=>{
        const isActive = btn.dataset.path === file.entry.path;
        btn.classList.toggle("active", isActive);
        if(isActive && cfg.scrollSidebar !== false) btn.scrollIntoView({ block: "nearest" });
      });
      updateBookmarkButtons();

      if(cfg.updateHash !== false && readerOverlay.classList.contains("open")){
        const docId = file.meta.id || file.entry.id;
        const nextHash = `#doc=${encodeURIComponent(docId)}`;
        if(location.hash !== nextHash){ try{ history.replaceState(null, "", nextHash); }catch{} }
      }
    }

    function restoreReaderFromDock(){
      removeFromDock("reader");
      readerOverlay.classList.add("open");
      readerOverlay.setAttribute("aria-hidden", "false");
      document.getElementById("indexOverlay")?.classList.remove("open");
      document.getElementById("aboutOverlay")?.classList.remove("open");
      document.getElementById("menuPanel")?.classList.remove("open");
      updateReaderResponsive(readerShell);
      if(activeReaderFile){
        requestAnimationFrame(()=>{ readerMain.scrollTop = savedReaderScrollTop; updateTocScrollSpy(); });
      } else {
        openReader();
      }
      readerMain.focus({ preventScroll: true });
    }

    function openReader(file){
      const wasMinimized = isDocked("reader");
      removeFromDock("reader");
      if(!readerOverlay.classList.contains("open")){
        readerReturnFocus = document.activeElement;
        readerOverlay.classList.add("open");
        readerOverlay.setAttribute("aria-hidden", "false");
        document.getElementById("indexOverlay")?.classList.remove("open");
        document.getElementById("aboutOverlay")?.classList.remove("open");
        document.getElementById("menuPanel")?.classList.remove("open");
        updateReaderResponsive(readerShell);
      }
      if(!file && wasMinimized && activeReaderFile){
        requestAnimationFrame(()=>{ readerMain.scrollTop = savedReaderScrollTop; updateTocScrollSpy(); });
        readerMain.focus({ preventScroll: true });
        return;
      }
      const target = file
        || (currentDetailNode && data.docById.get(currentDetailNode.id))
        || activeReaderFile
        || data.docById.get("readme-start-here")
        || orderedDocs[0];
      renderSidebar();
      if(target) selectDoc(target);
      readerMain.focus({ preventScroll: true });
    }

    function minimizeReader(){
      if(!readerOverlay.classList.contains("open")) return;
      savedReaderScrollTop = readerMain.scrollTop;
      readerOverlay.classList.remove("open");
      readerOverlay.setAttribute("aria-hidden", "true");
      setMobileDrawerOpen(false);
      const title = activeReaderFile ? docDisplayTitle(activeReaderFile) : "Writeups";
      const type = activeReaderFile?.entry?.type;
      const dotColor = type === "phase" ? "var(--phase)" : type === "technique" ? "var(--tech)" : type === "cve" ? "var(--cve)" : type === "tool" ? "var(--tool)" : "var(--accent)";
      minimizeToDock({
        id: "reader",
        label: title,
        color: dotColor,
        onRestore: restoreReaderFromDock,
        onClose: ()=>{
          if(location.hash.startsWith("#doc=")){ try{ history.replaceState(null, "", location.pathname + location.search); }catch{} }
          savedReaderScrollTop = 0;
        }
      });
    }

    function closeReader(){
      removeFromDock("reader");
      savedReaderScrollTop = 0;
      if(!readerOverlay.classList.contains("open")) return;
      readerOverlay.classList.remove("open");
      readerOverlay.setAttribute("aria-hidden", "true");
      setMobileDrawerOpen(false);
      if(location.hash.startsWith("#doc=")){ try{ history.replaceState(null, "", location.pathname + location.search); }catch{} }
      if(readerReturnFocus && typeof readerReturnFocus.focus === "function"){ try{ readerReturnFocus.focus(); }catch{} }
    }

    async function openByRef(ref, currentPath){
      if(!ref) return;
      const matched = resolveDocByRef(ref, currentPath);
      if(matched){ openReader(matched); return; }
      const clean = String(ref).trim().replace(/^\/+/, "");
      if(/\.md$/i.test(clean) && !/^https?:/i.test(clean)){
        try{
          const raw = await data.fetchText(clean);
          const { meta, body } = parseFrontmatter(raw);
          const id = clean.replace(/[^a-z0-9]+/gi, "-").toLowerCase().replace(/^-|-$/g, "");
          const dynFile = { entry: { id, type: "root", path: clean }, meta: { label: meta.label || clean, ...meta }, raw, body, sections: splitSections(body) };
          if(!data.docFiles.some(f=> f.entry.path.toLowerCase() === clean.toLowerCase())){
            data.docFiles.push(dynFile);
            data.docById.set(id, dynFile);
            orderedDocs = buildOrderedDocs();
            updateCategoryCounts();
          }
          openReader(dynFile);
          return;
        }catch(err){ console.warn("Could not fetch referenced markdown file:", clean, err); }
      }
      global.open(ref, "_blank", "noopener");
    }

    /* ---- Event Wiring ---- */
    document.getElementById("closeReader").addEventListener("click", closeReader);
    document.getElementById("minimizeReader").addEventListener("click", minimizeReader);
    if(maximizeReaderBtn) maximizeReaderBtn.addEventListener("click", ()=> setMaximized(!isReaderMaximized, true));
    readerOverlay.addEventListener("click", ev=>{
      if(ev.target === readerOverlay && !wasRecentInteraction()) minimizeReader();
    });
    if(readerBookmarkBtn){
      readerBookmarkBtn.addEventListener("click", ()=>{
        if(!activeReaderFile || !FMAP.bookmarks) return;
        const docId = activeReaderFile.meta?.id || activeReaderFile.entry.id;
        FMAP.bookmarks.toggle(docId, docDisplayTitle(activeReaderFile), activeReaderFile.entry.type);
      });
    }
    document.getElementById("readerSidebarToggle").addEventListener("click", ()=>{
      if(global.innerWidth <= 880 || readerShell.classList.contains("narrow-side")){
        setMobileDrawerOpen(!readerSidebar.classList.contains("mobile-open"));
      } else {
        setDesktopSidebarCollapsed(!readerSidebar.classList.contains("collapsed"));
      }
    });
    readerSidebarBackdrop.addEventListener("click", ()=> setMobileDrawerOpen(false));
    readerModeRendered.addEventListener("click", ()=> setReaderMode("rendered"));
    readerModeRaw.addEventListener("click", ()=> setReaderMode("raw"));
    document.getElementById("readerFontDown").addEventListener("click", ()=> applyFontSize(readerFontSize - 1, true));
    document.getElementById("readerFontUp").addEventListener("click", ()=> applyFontSize(readerFontSize + 1, true));
    document.getElementById("readerThemeToggle").addEventListener("click", toggleTheme);
    readerCopyMd.addEventListener("click", async ()=>{
      if(!activeReaderFile) return;
      const ok = await copyText(activeReaderFile.raw || activeReaderFile.body || "");
      flashButton(readerCopyMd, ok ? "Copied ✓" : "Failed");
    });
    readerDownloadMd.addEventListener("click", ()=>{
      if(!activeReaderFile) return;
      const fname = activeReaderFile.entry.path.split("/").pop() || `${activeReaderFile.entry.id}.md`;
      saveFile(fname, "text/markdown;charset=utf-8", activeReaderFile.raw || activeReaderFile.body || "");
    });
    readerLocateGraph.addEventListener("click", ()=>{
      const nid = readerLocateGraph.dataset.nodeId;
      if(!nid) return;
      minimizeReader();
      graph.locateNodeOnGraph(nid);
    });
    readerSearch.addEventListener("input", renderSidebar);
    readerSearchClear.addEventListener("click", ()=>{ readerSearch.value = ""; renderSidebar(); readerSearch.focus(); });
    readerCatFilters.querySelectorAll(".reader-cat-chip").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        activeReaderCat = btn.dataset.cat;
        readerCatFilters.querySelectorAll(".reader-cat-chip").forEach(b=> b.classList.toggle("active", b === btn));
        renderSidebar();
      });
    });

    /* Deep-link (#doc=<id>) */
    function handleDocHash(){
      const m = location.hash.match(/^#doc=(.+)$/);
      if(!m) return;
      const ref = decodeURIComponent(m[1]);
      const target = data.docById.get(ref) || resolveDocByRef(ref, "");
      if(target) openReader(target);
    }
    global.addEventListener("hashchange", handleDocHash);

    /* Reader keyboard shortcuts */
    document.addEventListener("keydown", ev=>{
      if(!readerOverlay.classList.contains("open")) return;
      const tag = document.activeElement && document.activeElement.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if((ev.key === "/" && !typing) || ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === "k")){
        ev.preventDefault();
        if(global.innerWidth <= 880 || readerShell.classList.contains("narrow-side")) setMobileDrawerOpen(true);
        else setDesktopSidebarCollapsed(false);
        readerSearch.focus(); readerSearch.select();
      } else if(ev.altKey && (ev.key === "ArrowLeft" || ev.key === "ArrowRight") && activeReaderFile){
        const list = filteredDocs.some(f=> f.entry.path === activeReaderFile.entry.path) ? filteredDocs : orderedDocs;
        const idx = list.findIndex(f=> f.entry.path === activeReaderFile.entry.path);
        const nextIdx = ev.key === "ArrowLeft" ? idx - 1 : idx + 1;
        if(nextIdx >= 0 && nextIdx < list.length){ ev.preventDefault(); selectDoc(list[nextIdx]); }
      }
    });

    FMAP.reader = {
      open: openReader,
      close: closeReader,
      minimize: minimizeReader,
      openByRef,
      docDisplayTitle,
      getOrderedDocs: ()=> orderedDocs,
      isOpen: ()=> readerOverlay.classList.contains("open"),
      isMobileDrawerOpen: ()=> readerSidebar.classList.contains("mobile-open"),
      closeMobileDrawer: ()=> setMobileDrawerOpen(false),
      showDetail,
      closeDetail,
      closeDetailIfOpen,
      isDetailOpen: ()=> detailEl.classList.contains("open"),
      getCurrentDetailNode: ()=> currentDetailNode,
      updateBookmarkButtons,
      handleDocHash
    };
  }

  FMAP.initReader = initReader;
})(window);
