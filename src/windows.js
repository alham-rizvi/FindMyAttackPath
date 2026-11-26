/* ==========================================================================
   Window Manager — 8-edge/corner resize, drag, viewport clamp, unified dock
   ========================================================================== */
(function(global){
  "use strict";
  const FMAP = (global.FMAP = global.FMAP || {});

  const EDGE_DIRS = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
  const managed = new Map();
  let lastInteractionTs = 0;

  function clamp(v, lo, hi){ return Math.max(lo, Math.min(hi, v)); }
  function vw(){ return global.innerWidth || document.documentElement.clientWidth || 1280; }
  function vh(){ return global.innerHeight || document.documentElement.clientHeight || 800; }

  function markInteraction(){ lastInteractionTs = Date.now(); }
  function wasRecentInteraction(ms){ return Date.now() - lastInteractionTs < (ms || 260); }

  function updateReaderResponsive(el){
    if(!el || el.id !== "readerShell") return;
    const rect = el.getBoundingClientRect();
    const w = rect.width || vw();
    el.classList.toggle("narrow-toc", w < 960);
    el.classList.toggle("narrow-side", w < 680);
  }

  function pinToViewport(el){
    const r = el.getBoundingClientRect();
    if(!r.width || !r.height) return null;
    const pad = 6;
    const left = clamp(r.left, pad, Math.max(pad, vw() - 120));
    const top = clamp(r.top, pad, Math.max(pad, vh() - 80));
    el.style.position = "fixed";
    el.style.left = `${Math.round(left)}px`;
    el.style.top = `${Math.round(top)}px`;
    el.style.width = `${Math.round(r.width)}px`;
    el.style.height = `${Math.round(r.height)}px`;
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.maxWidth = "none";
    el.style.maxHeight = "none";
    el.style.margin = "0";
    el.dataset.winPinned = "1";
    return { left, top, width: r.width, height: r.height };
  }

  function saveBounds(el){
    if(!el || !el.dataset.winPinned) return null;
    return {
      position: el.style.position, left: el.style.left, top: el.style.top,
      width: el.style.width, height: el.style.height,
      right: el.style.right, bottom: el.style.bottom,
      maxWidth: el.style.maxWidth, maxHeight: el.style.maxHeight, margin: el.style.margin
    };
  }

  function restoreBounds(el, b){
    if(!el) return;
    if(!b){ clearBounds(el); return; }
    Object.assign(el.style, b);
    el.dataset.winPinned = "1";
    clampIntoViewport(el);
    updateReaderResponsive(el);
  }

  function clearBounds(el){
    if(!el) return;
    ["position","left","top","width","height","right","bottom","maxWidth","maxHeight","margin"].forEach(k=>{ el.style[k] = ""; });
    delete el.dataset.winPinned;
    updateReaderResponsive(el);
  }

  function clampIntoViewport(el){
    if(!el || !el.dataset.winPinned) return;
    const cfg = managed.get(el) || {};
    const minW = cfg.minW || 260, minH = cfg.minH || 180, pad = 6;
    const W = vw(), H = vh();
    const curW = parseFloat(el.style.width) || el.getBoundingClientRect().width || minW;
    const curH = parseFloat(el.style.height) || el.getBoundingClientRect().height || minH;
    const w = clamp(curW, Math.min(minW, W - pad * 2), Math.max(minW, W - pad * 2));
    const h = clamp(curH, Math.min(minH, H - pad * 2), Math.max(minH, H - pad * 2));
    const left = clamp(parseFloat(el.style.left) || pad, pad, Math.max(pad, W - w - pad));
    const top = clamp(parseFloat(el.style.top) || pad, pad, Math.max(pad, H - h - pad));
    el.style.width = `${Math.round(w)}px`;
    el.style.height = `${Math.round(h)}px`;
    el.style.left = `${Math.round(left)}px`;
    el.style.top = `${Math.round(top)}px`;
    updateReaderResponsive(el);
  }

  function makeWindowInteractive(el, opts){
    if(!el || managed.has(el)) return;
    const cfg = Object.assign({
      handle: null,
      minW: 280,
      minH: 200,
      isBlocked: null,
      onResize: null
    }, opts || {});
    managed.set(el, cfg);
    el.classList.add("win-interactive");

    /* Attach all 8 directional resize handles directly to the window frame */
    EDGE_DIRS.forEach(dir=>{
      if(el.querySelector(`:scope > .win-rz-${dir}`)) return;
      const h = document.createElement("div");
      h.className = `win-rz win-rz-${dir}`;
      h.dataset.rzDir = dir;
      h.setAttribute("aria-hidden", "true");
      el.appendChild(h);

      h.addEventListener("pointerdown", ev=>{
        if(ev.button !== 0) return;
        if(cfg.isBlocked && cfg.isBlocked()) return;
        ev.preventDefault();
        ev.stopPropagation();

        const start = pinToViewport(el);
        if(!start) return;
        const startX = ev.clientX, startY = ev.clientY;
        const W = vw(), H = vh(), pad = 6;
        const minW = Math.min(cfg.minW, W - pad * 2);
        const minH = Math.min(cfg.minH, H - pad * 2);
        const hasN = dir.includes("n"), hasS = dir.includes("s");
        const hasW = dir.includes("w"), hasE = dir.includes("e");

        document.body.classList.add("win-resizing");
        try{ h.setPointerCapture(ev.pointerId); }catch{}

        const onMove = mv=>{
          const dx = mv.clientX - startX;
          const dy = mv.clientY - startY;
          let left = start.left, top = start.top, width = start.width, height = start.height;

          if(hasE){
            width = clamp(start.width + dx, minW, W - start.left - pad);
          }
          if(hasS){
            height = clamp(start.height + dy, minH, H - start.top - pad);
          }
          if(hasW){
            const rightEdge = start.left + start.width;
            left = clamp(start.left + dx, pad, rightEdge - minW);
            width = rightEdge - left;
          }
          if(hasN){
            const bottomEdge = start.top + start.height;
            top = clamp(start.top + dy, pad, bottomEdge - minH);
            height = bottomEdge - top;
          }

          el.style.left = `${Math.round(left)}px`;
          el.style.top = `${Math.round(top)}px`;
          el.style.width = `${Math.round(width)}px`;
          el.style.height = `${Math.round(height)}px`;
          updateReaderResponsive(el);
          if(cfg.onResize) cfg.onResize({ left, top, width, height });
        };

        const onUp = ()=>{
          document.body.classList.remove("win-resizing");
          markInteraction();
          h.removeEventListener("pointermove", onMove);
          h.removeEventListener("pointerup", onUp);
          h.removeEventListener("pointercancel", onUp);
          global.removeEventListener("pointermove", onMove);
          global.removeEventListener("pointerup", onUp);
        };

        h.addEventListener("pointermove", onMove);
        h.addEventListener("pointerup", onUp);
        h.addEventListener("pointercancel", onUp);
        global.addEventListener("pointermove", onMove);
        global.addEventListener("pointerup", onUp);
      });
    });

    /* Header drag */
    const dragHandle = typeof cfg.handle === "string" ? el.querySelector(cfg.handle) : cfg.handle;
    if(dragHandle){
      dragHandle.classList.add("win-drag-handle");
      dragHandle.addEventListener("pointerdown", ev=>{
        if(ev.button !== 0) return;
        if(cfg.isBlocked && cfg.isBlocked()) return;
        if(ev.target.closest("button, a, input, select, textarea, label, [contenteditable], .win-rz")) return;

        const startX = ev.clientX, startY = ev.clientY;
        let pinned = null, moved = false;

        const onMove = mv=>{
          const dx = mv.clientX - startX;
          const dy = mv.clientY - startY;
          if(!moved && Math.hypot(dx, dy) < 4) return;
          if(!moved){
            pinned = pinToViewport(el);
            if(!pinned) return;
            moved = true;
            document.body.classList.add("win-resizing");
          }
          const pad = 6;
          const maxL = Math.max(pad, vw() - pinned.width - pad);
          const maxT = Math.max(pad, vh() - 48);
          el.style.left = `${Math.round(clamp(pinned.left + dx, pad, maxL))}px`;
          el.style.top = `${Math.round(clamp(pinned.top + dy, pad, maxT))}px`;
        };

        const onUp = ()=>{
          if(moved){
            document.body.classList.remove("win-resizing");
            markInteraction();
          }
          global.removeEventListener("pointermove", onMove);
          global.removeEventListener("pointerup", onUp);
          global.removeEventListener("pointercancel", onUp);
        };

        global.addEventListener("pointermove", onMove);
        global.addEventListener("pointerup", onUp);
        global.addEventListener("pointercancel", onUp);
      });
    }
  }

  /* Keep pinned windows inside the viewport when the browser resizes */
  global.addEventListener("resize", ()=>{
    managed.forEach((_, el)=>{
      if(el.dataset.winPinned) clampIntoViewport(el);
      updateReaderResponsive(el);
    });
  });

  /* Unified bottom Window Dock */
  const docked = new Map();
  let dockEl = null;

  function renderDock(){
    if(!dockEl) dockEl = document.getElementById("windowDock");
    if(!dockEl) return;
    dockEl.replaceChildren();
    const hasItems = docked.size > 0;
    dockEl.classList.toggle("has-items", hasItems);
    const watermark = document.getElementById("watermark");
    if(watermark) watermark.style.opacity = hasItems ? "0" : "";

    docked.forEach(item=>{
      const pill = document.createElement("div");
      pill.className = "dock-pill";
      pill.dataset.dockId = item.id;

      const mainBtn = document.createElement("button");
      mainBtn.type = "button";
      mainBtn.className = "dock-pill-main";
      mainBtn.title = `Restore ${item.label || item.id}`;

      const dot = document.createElement("span");
      dot.className = "dock-dot";
      dot.style.background = item.color || "var(--accent)";

      const label = document.createElement("span");
      label.className = "dock-label";
      label.textContent = item.label || item.id;

      mainBtn.append(dot, label);
      mainBtn.addEventListener("click", ()=>{
        docked.delete(item.id);
        renderDock();
        if(item.onRestore) item.onRestore();
      });

      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "dock-close";
      closeBtn.title = `Close ${item.label || item.id}`;
      closeBtn.setAttribute("aria-label", `Close ${item.label || item.id}`);
      closeBtn.textContent = "✕";
      closeBtn.addEventListener("click", ev=>{
        ev.stopPropagation();
        docked.delete(item.id);
        renderDock();
        if(item.onClose) item.onClose();
      });

      pill.append(mainBtn, closeBtn);
      dockEl.appendChild(pill);
    });
  }

  function minimizeToDock(item){
    if(!item || !item.id) return;
    docked.set(item.id, item);
    renderDock();
  }

  function removeFromDock(id){
    if(docked.delete(id)) renderDock();
  }

  function isDocked(id){ return docked.has(id); }

  FMAP.win = {
    EDGE_DIRS,
    makeWindowInteractive,
    pinToViewport,
    saveBounds,
    restoreBounds,
    clearBounds,
    clampIntoViewport,
    updateReaderResponsive,
    wasRecentInteraction,
    minimizeToDock,
    removeFromDock,
    isDocked,
    renderDock
  };
})(window);
