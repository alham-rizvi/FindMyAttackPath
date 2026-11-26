/* ==========================================================================
   Markdown Engine — frontmatter, GFM renderer, syntax highlight, Mermaid
   ========================================================================== */
(function(global){
  "use strict";
  const FMAP = (global.FMAP = global.FMAP || {});

  function parseFrontmatter(raw){
    const m = String(raw || "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if(!m) return { meta: {}, body: String(raw || "") };
    const meta = {};
    m[1].split(/\r?\n/).forEach(line=>{
      const idx = line.indexOf(":");
      if(idx < 0) return;
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      if(val === "" || val === "null"){ meta[key] = null; return; }
      if(val.startsWith("[")){
        const inner = val.slice(1, val.lastIndexOf("]")).trim();
        meta[key] = inner ? inner.split(",").map(s=> s.trim().replace(/^"|"$/g, "")) : [];
        return;
      }
      if(/^".*"$/.test(val)){ meta[key] = val.slice(1, -1).replace(/\\"/g, '"'); return; }
      if(/^-?\d+(\.\d+)?$/.test(val)){ meta[key] = Number(val); return; }
      meta[key] = val;
    });
    return { meta, body: m[2].replace(/^\n+/, "") };
  }

  function splitSections(body){
    const sections = [];
    let cur = { title: null, lines: [] };
    String(body || "").split(/\r?\n/).forEach(line=>{
      const h = line.match(/^##\s+(.+)$/);
      if(h){ sections.push(cur); cur = { title: h[1].trim(), lines: [] }; }
      else cur.lines.push(line);
    });
    sections.push(cur);
    return sections
      .map(s=> ({ title: s.title, text: s.lines.join("\n").trim() }))
      .filter(s=> s.title || s.text);
  }

  function escapeHtml(s){
    return String(s ?? "").replace(/[&<>"]/g, c=> ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  }

  function stripLeadingHeading(md){
    if(!md) return "";
    return String(md).replace(/^\s*#\s+[^\r\n]+(?:\r?\n|$)/, "").replace(/^\s*\r?\n/, "");
  }

  function cleanToolSummary(md){
    return stripLeadingHeading(md).replace(/\r?\n---\s*$/, "").trim();
  }

  function slugifyHeading(text){
    const plain = String(text || "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_~]/g, "")
      .trim()
      .toLowerCase();
    return plain.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
  }

  function sanitizeUrl(rawUrl){
    const u = String(rawUrl || "").trim();
    if(!u) return null;
    if(/^#/.test(u) || /^(?:https?:|mailto:)/i.test(u)) return u;
    if(/^[a-z][a-z0-9+.-]*:/i.test(u)) return null;
    return u;
  }

  function isInternalMdHref(href){
    return Boolean(href) && !/^(?:https?:|mailto:|#)/i.test(href) && /\.md(?:$|[#?])/i.test(href);
  }

  function resolveDocByRef(ref, currentPath){
    const files = (FMAP.data && FMAP.data.docFiles) || [];
    if(!ref || !files.length) return null;
    const clean = String(ref).trim().split("#")[0].split("?")[0].replace(/^\.\//, "");
    if(!clean) return null;
    const lower = clean.toLowerCase();
    let found = files.find(f=> f.entry.path.toLowerCase() === lower || f.entry.id.toLowerCase() === lower);
    if(found) return found;
    if(currentPath && clean.includes("/")){
      const baseParts = currentPath.split("/").slice(0, -1);
      clean.split("/").forEach(seg=>{
        if(seg === "..") baseParts.pop();
        else if(seg && seg !== ".") baseParts.push(seg);
      });
      const resolved = baseParts.join("/").toLowerCase();
      found = files.find(f=> f.entry.path.toLowerCase() === resolved);
      if(found) return found;
    }
    const base = clean.split("/").pop().toLowerCase();
    found = files.find(f=> f.entry.path.split("/").pop().toLowerCase() === base);
    if(found) return found;
    if(base.endsWith(".md")){
      const stem = base.slice(0, -3);
      found = files.find(f=> f.entry.id.toLowerCase() === stem);
      if(found) return found;
    }
    return null;
  }

  function mdInline(s, opts){
    if(!s) return "";
    const cfg = opts || {};
    const linkDocRefs = cfg.linkDocRefs !== false;
    const currentPath = cfg.currentPath || "";
    const tokens = [];
    const stash = html => { tokens.push(html); return `\u0000T${tokens.length - 1}\u0000`; };

    let out = String(s);
    out = out.replace(/``([^`]+?)``|`([^`\n]+?)`/g, (_, dbl, sgl)=>{
      const rawCode = dbl !== undefined ? dbl.trim() : sgl;
      const codeHtml = `<code>${escapeHtml(rawCode)}</code>`;
      if(linkDocRefs && /^[A-Za-z0-9_./-]+\.md$/i.test(rawCode.trim())){
        const matched = resolveDocByRef(rawCode.trim(), currentPath);
        if(matched){
          return stash(`<a href="#doc=${encodeURIComponent(matched.entry.id)}" class="md-internal-link" data-md-href="${escapeHtml(matched.entry.path)}" title="Open ${escapeHtml(matched.meta.label || matched.entry.path)}">${codeHtml}</a>`);
        }
      }
      return stash(codeHtml);
    });

    out = escapeHtml(out);
    out = out.replace(/\[([^\]]+)\]\(([^\s()]+(?:\([^\s()]*\)[^\s()]*)*)\)/g, (_, label, rawHref)=>{
      const unescapedHref = rawHref.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
      const safe = sanitizeUrl(unescapedHref);
      const formattedLabel = mdInline(
        label.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"'),
        { linkDocRefs: false, currentPath }
      );
      if(!safe) return formattedLabel;
      if(isInternalMdHref(safe)){
        const target = resolveDocByRef(safe, currentPath);
        const hrefAttr = target ? `#doc=${encodeURIComponent(target.entry.id)}` : escapeHtml(safe);
        const dataAttr = target ? target.entry.path : safe;
        return stash(`<a href="${hrefAttr}" class="md-internal-link" data-md-href="${escapeHtml(dataAttr)}">${formattedLabel}</a>`);
      }
      if(/^#/.test(safe)) return stash(`<a href="${escapeHtml(safe)}">${formattedLabel}</a>`);
      return stash(`<a href="${escapeHtml(safe)}" target="_blank" rel="noopener">${formattedLabel}</a>`);
    });

    out = out.replace(/(^|[\s(])(https?:\/\/[^\s<>"'\u0000]+)/g, (_, lead, rawUrl)=>{
      let url = rawUrl, trail = "";
      while(/[.,;:!?)]$/.test(url)){
        if(url.endsWith(")") && (url.match(/\(/g) || []).length >= (url.match(/\)/g) || []).length) break;
        trail = url.slice(-1) + trail;
        url = url.slice(0, -1);
      }
      const cleanUrl = url.replace(/&amp;/g, "&");
      return lead + stash(`<a href="${escapeHtml(cleanUrl)}" target="_blank" rel="noopener">${url}</a>`) + trail;
    });

    out = out.replace(/~~([^~\n]+?)~~/g, "<del>$1</del>");
    out = out.replace(/\*\*((?:(?!\*\*).)+?)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/(^|[^\w])__([^_\n]+?)__(?=[^\w]|$)/g, "$1<strong>$2</strong>");
    out = out.replace(/(^|[^*\w])\*([^*\n]+?)\*(?!\*)/g, "$1<em>$2</em>");
    out = out.replace(/(^|[^\w])_([^_\n]+?)_(?=[^\w]|$)/g, "$1<em>$2</em>");

    let guard = 0;
    while(out.includes("\u0000T") && guard++ < 6){
      out = out.replace(/\u0000T(\d+)\u0000/g, (_, idx)=> tokens[Number(idx)] ?? "");
    }
    return out;
  }

  /* Syntax highlighting (preserves raw text verbatim) */
  const HL_CMD_SET = new Set([
    "nxc","netexec","kerbrute","bloodhound-python","sharphound.exe","certipy","certify.exe",
    "nltest","ntlmrelayx.py","responder","mitm6","donpapi.py","dploot","bloodyad","hashcat",
    "timeroast.py","pywhisker.py","whisker.exe","rubeus.exe","forgecert.exe","certutil",
    "dnscmd","sc","sharpgpoabuse.exe","evil-winrm","xfreerdp","mstsc","coercer","ldapsearch",
    "windapsearch","rundll32","pypykatz","procdump.exe","ntdsutil","sharpdpapi.exe",
    "gpp-decrypt","roadtx","roadrecon","reg","export","sudo","python3","python","proxychains",
    "netdom","qwinsta","net","gpupdate","ls","tee","cat","grep","curl","wget","git","cd",
    "goldengmsa.exe","adsearch.exe","snaffler.exe","adcollector.exe","inveigh.exe"
  ]);

  function highlightShellValue(val){
    return val.split(/(<[A-Za-z0-9_.:-]+>)/g).map(part=>
      /^<[A-Za-z0-9_.:-]+>$/.test(part)
        ? `<span class="hl-var">${escapeHtml(part)}</span>`
        : escapeHtml(part)
    ).join("");
  }

  function highlightShellLine(line){
    if(!line) return "";
    let out = "", i = 0, expectCmd = true;
    const n = line.length;
    const mimiPrompt = line.match(/^(\s*mimikatz\s+#)(\s*)/i);
    if(mimiPrompt){
      out += `<span class="hl-prompt">${escapeHtml(mimiPrompt[1])}</span>${escapeHtml(mimiPrompt[2])}`;
      i = mimiPrompt[0].length;
    }
    while(i < n){
      const ch = line[i];
      if(/\s/.test(ch)){
        let j = i;
        while(j < n && /\s/.test(line[j])) j++;
        out += escapeHtml(line.slice(i, j));
        i = j;
        continue;
      }
      if(ch === "#" && (i === 0 || /\s/.test(line[i - 1]))){
        out += `<span class="hl-com">${escapeHtml(line.slice(i))}</span>`;
        break;
      }
      if(ch === "'" || ch === '"'){
        let j = i + 1;
        while(j < n){
          if(ch === '"' && line[j] === "\\" && j + 1 < n){ j += 2; continue; }
          if(line[j] === ch){ j++; break; }
          j++;
        }
        out += `<span class="hl-str">${escapeHtml(line.slice(i, j))}</span>`;
        i = j; expectCmd = false; continue;
      }
      if(ch === "<"){
        const ph = line.slice(i).match(/^<[A-Za-z0-9_.:-]+>/);
        if(ph){
          out += `<span class="hl-var">${escapeHtml(ph[0])}</span>`;
          i += ph[0].length; expectCmd = false; continue;
        }
      }
      if(ch === "$" || ch === "%"){
        const vm = line.slice(i).match(/^(?:\$\{[^}]+\}|\$[A-Za-z_][A-Za-z0-9_.]*|%[A-Za-z_][A-Za-z0-9_]*%)/);
        if(vm){
          out += `<span class="hl-var">${escapeHtml(vm[0])}</span>`;
          i += vm[0].length; expectCmd = false; continue;
        }
      }
      if(ch === "|" || ch === ";" || (ch === "&" && line[i + 1] === "&") || (ch === "\\" && i === n - 1)){
        const op = (line[i] === "|" && line[i + 1] === "|") || (line[i] === "&" && line[i + 1] === "&") ? line.slice(i, i + 2) : ch;
        out += `<span class="hl-op">${escapeHtml(op)}</span>`;
        i += op.length;
        if(op !== "\\") expectCmd = true;
        continue;
      }
      let j = i;
      while(j < n && !/[\s'"|;&]/.test(line[j])){
        if(line[j] === "<" && /^<[A-Za-z0-9_.:-]+>/.test(line.slice(j))) break;
        j++;
      }
      if(j === i){ out += escapeHtml(ch); i++; continue; }
      const tok = line.slice(i, j), low = tok.toLowerCase();
      const prevIsSpace = i === 0 || /\s/.test(line[i - 1]);
      if(expectCmd && (HL_CMD_SET.has(low) || /^impacket-[\w-]+$/i.test(tok) || /^(?:Get|Set|Add|Invoke|New|Reset|Find|Install|Import)-[A-Za-z0-9]+$/.test(tok) || /^[a-z]+::[a-z0-9_]+$/i.test(tok) || /^\.\/[\w.-]+\.(?:py|sh|exe|ps1)$/i.test(tok) || /^[\w.-]+\.(?:py|exe|ps1)$/i.test(tok))){
        out += `<span class="hl-cmd">${escapeHtml(tok)}</span>`;
        expectCmd = low === "sudo" || low === "proxychains" || low === "python3" || low === "python";
      } else if(prevIsSpace && /^--?[A-Za-z0-9][A-Za-z0-9_-]*$/.test(tok)){
        out += `<span class="hl-flag">${escapeHtml(tok)}</span>`;
        expectCmd = false;
      } else if(prevIsSpace && /^\/[A-Za-z][A-Za-z0-9_-]*:?$/.test(tok)){
        out += `<span class="hl-flag">${escapeHtml(tok)}</span>`;
        expectCmd = false;
      } else if(prevIsSpace && /^(\/[A-Za-z][A-Za-z0-9_-]*:)([\s\S]+)$/.test(tok)){
        const m = tok.match(/^(\/[A-Za-z][A-Za-z0-9_-]*:)([\s\S]+)$/);
        out += `<span class="hl-flag">${escapeHtml(m[1])}</span>${highlightShellValue(m[2])}`;
        expectCmd = false;
      } else if(/^[a-z]+::[a-z0-9_]+$/i.test(tok)){
        out += `<span class="hl-cmd">${escapeHtml(tok)}</span>`;
        expectCmd = false;
      } else if(/^\d+(?:\.\d+){3}(?:\/\d+)?$/.test(tok)){
        out += `<span class="hl-num">${escapeHtml(tok)}</span>`;
        expectCmd = false;
      } else {
        out += highlightShellValue(tok);
        expectCmd = false;
      }
      i = j;
    }
    return out;
  }

  function highlightCode(raw, lang){
    if(!raw) return "";
    const l = String(lang || "").toLowerCase();
    if(l === "markdown" || l === "md"){
      return raw.split("\n").map(line=>{
        if(/^#{1,6}\s/.test(line)) return `<span class="hl-cmd">${escapeHtml(line)}</span>`;
        if(/^---\s*$/.test(line)) return `<span class="hl-op">${escapeHtml(line)}</span>`;
        if(/^[a-zA-Z0-9_-]+:/.test(line)){
          const idx = line.indexOf(":");
          return `<span class="hl-flag">${escapeHtml(line.slice(0, idx + 1))}</span><span class="hl-str">${escapeHtml(line.slice(idx + 1))}</span>`;
        }
        return escapeHtml(line);
      }).join("\n");
    }
    if(["bash","sh","shell","zsh","powershell","ps1","ps","cmd","plaintext","text",""].includes(l)){
      return raw.split("\n").map(highlightShellLine).join("\n");
    }
    return escapeHtml(raw);
  }

  function displayLangLabel(lang){
    const l = String(lang || "").toLowerCase();
    if(["bash","sh","shell","zsh"].includes(l)) return "bash";
    if(["powershell","ps1","ps"].includes(l)) return "powershell";
    if(!l || l === "plaintext" || l === "text") return "commands";
    if(l === "md" || l === "markdown") return "markdown";
    return l;
  }

  function splitTableRow(line){
    const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
    const cells = [];
    let cur = "", inCode = false;
    for(let i = 0; i < trimmed.length; i++){
      const ch = trimmed[i];
      if(ch === "`"){ inCode = !inCode; cur += ch; continue; }
      if(ch === "\\" && trimmed[i + 1] === "|"){ cur += "|"; i++; continue; }
      if(ch === "|" && !inCode){ cells.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    cells.push(cur.trim());
    return cells;
  }

  function renderMarkdown(md, opts, _state){
    const cfg = opts || {};
    const state = _state || { headings: [], mermaidSources: [], codeBlocks: [], slugCounts: new Map() };
    const { headings, mermaidSources, codeBlocks, slugCounts } = state;
    if(!md) return { html: "", hasMermaid: false, mermaidSources, codeBlocks, headings };

    let source = String(md).replace(/\r\n/g, "\n");
    if(cfg.stripFirstH1) source = stripLeadingHeading(source);
    if(!_state) source = source.replace(/(?:\n|^)[ \t]*(?:---+|___+|\*\*\*+)[ \t]*\n*$/, "");

    const lines = source.split("\n");
    const inlineOpts = { currentPath: cfg.currentPath || "", linkDocRefs: cfg.linkDocRefs !== false };
    const blocks = [];
    let paragraph = [];

    function uniqueSlug(text){
      const base = slugifyHeading(text);
      const n = slugCounts.get(base) || 0;
      slugCounts.set(base, n + 1);
      return n === 0 ? base : `${base}-${n + 1}`;
    }

    function flushParagraph(){
      if(!paragraph.length) return;
      let combined = "";
      for(let k = 0; k < paragraph.length; k++){
        const part = paragraph[k];
        if(k < paragraph.length - 1 && (/\s{2}$/.test(part) || /\\$/.test(part))){
          combined += mdInline(part.replace(/(?:\s{2}|\\)$/, ""), inlineOpts) + "<br>";
        } else {
          combined += mdInline(part.trim(), inlineOpts) + (k < paragraph.length - 1 ? " " : "");
        }
      }
      blocks.push(`<p>${combined}</p>`);
      paragraph = [];
    }

    for(let i = 0; i < lines.length; i++){
      const line = lines[i];
      /* 1. Fenced code blocks (CommonMark 0-3 leading spaces) */
      const fence = line.match(/^[ ]{0,3}(`{3,}|~{3,})\s*([\w-]*)\s*$/);
      if(fence){
        flushParagraph();
        const markerChar = fence[1][0], markerLen = fence[1].length;
        const lang = (fence[2] || "").toLowerCase();
        const code = [];
        i++;
        const closeRe = new RegExp(`^[ ]{0,3}${markerChar}{${markerLen},}\\s*$`);
        while(i < lines.length && !closeRe.test(lines[i])) code.push(lines[i++]);
        const rawCode = code.join("\n");
        if(lang === "mermaid"){
          const mIdx = mermaidSources.length;
          mermaidSources.push(rawCode);
          blocks.push(`<div class="mermaid-wrap" data-mermaid-idx="${mIdx}"><pre class="mermaid">${escapeHtml(rawCode)}</pre></div>`);
        } else {
          const cIdx = codeBlocks.length;
          codeBlocks.push(rawCode);
          blocks.push(
            `<div class="md-code-block" data-code-idx="${cIdx}">` +
              `<div class="md-code-head">` +
                `<span class="md-code-lang">${escapeHtml(displayLangLabel(lang))}</span>` +
                `<div class="md-code-actions">` +
                  `<button type="button" class="md-code-btn md-wrap-btn" aria-pressed="false" title="Toggle line wrap">Wrap</button>` +
                  `<button type="button" class="md-code-btn md-copy-btn" title="Copy code">Copy</button>` +
                `</div>` +
              `</div>` +
              `<pre><code>${highlightCode(rawCode, lang)}</code></pre>` +
            `</div>`
          );
        }
        continue;
      }
      if(!line.trim()){ flushParagraph(); continue; }
      if(/^\s*(?:(?:\*\s*){3,}|(?:-\s*){3,}|(?:_\s*){3,})$/.test(line)){ flushParagraph(); blocks.push("<hr>"); continue; }

      /* ATX headings */
      const heading = line.match(/^\s*(#{1,6})\s+(.+?)\s*#*\s*$/);
      if(heading){
        flushParagraph();
        const level = heading[1].length, rawHeading = heading[2].trim(), id = uniqueSlug(rawHeading);
        if(level >= 2 && level <= 4){
          headings.push({ level, text: rawHeading.replace(/`([^`]+)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1"), id });
        }
        blocks.push(`<h${level} id="${escapeHtml(id)}">${mdInline(rawHeading, inlineOpts)}</h${level}>`);
        continue;
      }

      /* Blockquotes & warning callouts */
      if(/^\s*>/.test(line)){
        flushParagraph();
        const qLines = [];
        while(i < lines.length && (/^\s*>/.test(lines[i]) || (lines[i].trim() !== "" && qLines.length && !/^\s*(?:#{1,6}\s|```|~~~|[-*+]\s|\d+[.)]\s)/.test(lines[i])))){
          qLines.push(lines[i].replace(/^\s*>\s?/, ""));
          i++;
        }
        i--;
        const innerRaw = qLines.join("\n").trim();
        const inner = renderMarkdown(innerRaw, { ...cfg, stripFirstH1: false }, state);
        const isWarn = /^(?:⚠️|⚠|\*\*warning|\*\*caution|\*\*authorisation)/i.test(innerRaw);
        blocks.push(`<blockquote${isWarn ? ' class="md-callout-warn"' : ""}>${inner.html}</blockquote>`);
        continue;
      }

      /* GFM Tables */
      if(line.trim().includes("|") && i + 1 < lines.length && lines[i + 1].trim().includes("|")){
        const header = splitTableRow(line), sep = splitTableRow(lines[i + 1]);
        if(header.length >= 2 && header.length === sep.length && sep.every(c=> /^:?-{3,}:?$/.test(c))){
          flushParagraph();
          const aligns = sep.map(c=> c.startsWith(":") && c.endsWith(":") ? "center" : c.endsWith(":") ? "right" : "");
          const rows = [];
          i += 2;
          while(i < lines.length && lines[i].trim().includes("|") && lines[i].trim() !== "") rows.push(splitTableRow(lines[i++]));
          i--;
          const headHtml = header.map((cell, idx)=> `<th${aligns[idx] ? ` style="text-align:${aligns[idx]}"` : ""}>${mdInline(cell, inlineOpts)}</th>`).join("");
          const bodyHtml = rows.map(row=> `<tr>${header.map((_, idx)=> `<td${aligns[idx] ? ` style="text-align:${aligns[idx]}"` : ""}>${mdInline(row[idx] || "", inlineOpts)}</td>`).join("")}</tr>`).join("");
          blocks.push(`<div class="md-table-wrap"><table class="md-table"><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`);
          continue;
        }
      }

      /* Nested ul / ol + GFM task checklists */
      if(/^([ \t]*)(?:([-*+])|(\d+)[.)])\s+([\s\S]+)$/.test(line)){
        flushParagraph();
        const items = [];
        while(i < lines.length){
          const lm = lines[i].match(/^([ \t]*)(?:([-*+])|(\d+)[.)])\s+([\s\S]+)$/);
          if(lm){
            items.push({ indent: lm[1].replace(/\t/g, "  ").length, type: lm[3] ? "ol" : "ul", text: lm[4].trim() });
            i++;
          } else if(lines[i].trim() === ""){
            let look = i + 1;
            while(look < lines.length && lines[look].trim() === "") look++;
            if(look < lines.length && /^([ \t]*)(?:([-*+])|(\d+)[.)])\s+/.test(lines[look])) i++;
            else break;
          } else if(/^[ \t]{2,}\S/.test(lines[i]) && items.length){
            items[items.length - 1].text += " " + lines[i].trim();
            i++;
          } else break;
        }
        i--;
        let listHtml = "";
        const stack = [];
        items.forEach(item=>{
          while(stack.length && item.indent < stack[stack.length - 1].indent) listHtml += `</li></${stack.pop().type}>`;
          if(!stack.length || item.indent > stack[stack.length - 1].indent){
            listHtml += `<${item.type}>`;
            stack.push({ indent: item.indent, type: item.type });
          } else if(stack[stack.length - 1].type !== item.type){
            listHtml += `</li></${stack.pop().type}><${item.type}>`;
            stack.push({ indent: item.indent, type: item.type });
          } else {
            listHtml += "</li>";
          }
          const task = item.text.match(/^\[([ xX])\]\s+([\s\S]+)$/);
          if(task){
            const checked = task[1].toLowerCase() === "x";
            listHtml += `<li class="task-item"><input type="checkbox" disabled${checked ? " checked" : ""}><span>${mdInline(task[2], inlineOpts)}</span>`;
          } else {
            listHtml += `<li>${mdInline(item.text, inlineOpts)}`;
          }
        });
        while(stack.length) listHtml += `</li></${stack.pop().type}>`;
        blocks.push(listHtml);
        continue;
      }

      paragraph.push(line);
    }
    flushParagraph();
    return { html: blocks.join("\n"), hasMermaid: mermaidSources.length > 0, mermaidSources, codeBlocks, headings };
  }

  /* Clipboard, download, and Mermaid rendering helpers */
  function safeFilename(name){
    return String(name || "attack-path").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "attack-path";
  }

  function saveFile(filename, type, content){
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement("a");
    link.href = url; link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(()=> URL.revokeObjectURL(url), 1000);
  }

  async function copyText(text){
    if(navigator.clipboard && window.isSecureContext){
      try{ await navigator.clipboard.writeText(text); return true; }catch{}
    }
    try{
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    }catch{ return false; }
  }

  function flashButton(btn, tempText, ms){
    const orig = btn.dataset.origLabel || btn.textContent;
    btn.dataset.origLabel = orig;
    btn.textContent = tempText;
    btn.classList.add("copied");
    clearTimeout(btn._flashTimer);
    btn._flashTimer = setTimeout(()=>{
      btn.textContent = orig;
      btn.classList.remove("copied");
    }, ms || 1500);
  }

  let mermaidUid = 0;
  const renderTokens = new WeakMap();

  function attachMermaidToolbar(wrap, source, title){
    const existing = wrap.querySelector(".mermaid-actions");
    if(existing) existing.remove();
    const actions = document.createElement("div");
    actions.className = "mermaid-actions";
    const mkBtn = (label, onClick, tooltip)=>{
      const b = document.createElement("button");
      b.className = "mermaid-action"; b.type = "button"; b.textContent = label;
      if(tooltip) b.title = tooltip;
      b.addEventListener("click", onClick);
      return b;
    };
    const openFn = ()=> FMAP.modals && FMAP.modals.openDiagram(wrap, source, title);
    const svgFn = ()=>{
      const svgEl = wrap.querySelector("svg");
      if(!svgEl) return;
      const copy = svgEl.cloneNode(true);
      copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      saveFile(`${safeFilename(title)}.svg`, "image/svg+xml;charset=utf-8", new XMLSerializer().serializeToString(copy));
    };
    actions.append(
      mkBtn("Full size", openFn),
      mkBtn("SVG", svgFn, "Download SVG"),
      mkBtn("Mermaid", ()=> saveFile(`${safeFilename(title)}.mmd`, "text/plain;charset=utf-8", source), "Download Mermaid source")
    );
    wrap.insertBefore(actions, wrap.firstChild);
    const svgEl = wrap.querySelector("svg");
    if(svgEl){ svgEl.style.cursor = "zoom-in"; svgEl.addEventListener("click", openFn); }
  }

  async function renderMermaid(container, sources, label){
    if(!container) return;
    const wraps = [...container.querySelectorAll(".mermaid-wrap")];
    if(!wraps.length) return;
    const token = (renderTokens.get(container) || 0) + 1;
    renderTokens.set(container, token);
    const resolved = wraps.map((wrap, idx)=>{
      const s = (sources && sources[idx] !== undefined) ? sources[idx]
        : (wrap._mermaidSource !== undefined ? wrap._mermaidSource : (wrap.querySelector(".mermaid")?.textContent || ""));
      wrap._mermaidSource = s;
      wrap._mermaidTitle = `${label || "Attack path"} diagram ${idx + 1}`;
      return s;
    });
    if(!global.mermaid){
      wraps.forEach((wrap, idx)=>{
        wrap.innerHTML = `<div class="mermaid-fallback"><div class="mermaid-fallback-label">Mermaid diagram (source preview)</div><pre class="mono" style="margin:0;white-space:pre;overflow-x:auto">${escapeHtml(resolved[idx] || "")}</pre></div>`;
      });
      return;
    }
    const dark = FMAP.theme && FMAP.theme.getEffective() === "dark";
    try{
      global.mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: dark ? "dark" : "default",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        flowchart: { useMaxWidth: true, htmlLabels: true },
        sequence: { useMaxWidth: true }
      });
    }catch(e){ console.warn("mermaid.initialize warning", e); }

    for(let idx = 0; idx < wraps.length; idx++){
      if(renderTokens.get(container) !== token) return;
      const wrap = wraps[idx], source = resolved[idx], title = wrap._mermaidTitle;
      try{
        if(typeof global.mermaid.render === "function"){
          const result = await global.mermaid.render(`fmap-mmd-${++mermaidUid}`, source);
          if(renderTokens.get(container) !== token) return;
          const svgMarkup = typeof result === "string" ? result : (result && result.svg ? result.svg : "");
          if(svgMarkup){
            wrap.innerHTML = svgMarkup;
            attachMermaidToolbar(wrap, source, title);
            continue;
          }
        }
        const pre = document.createElement("pre");
        pre.className = "mermaid"; pre.textContent = source;
        wrap.replaceChildren(pre);
        await Promise.resolve(global.mermaid.run ? global.mermaid.run({ nodes: [pre] }) : global.mermaid.init(undefined, [pre]));
        if(renderTokens.get(container) !== token) return;
        if(wrap.querySelector("svg")) attachMermaidToolbar(wrap, source, title);
      }catch(err){
        console.warn("mermaid render failed", err);
        if(renderTokens.get(container) !== token) return;
        wrap.innerHTML = `<div class="mermaid-fallback"><div class="mermaid-fallback-label">Mermaid diagram</div><pre class="mono" style="margin:0;white-space:pre;overflow-x:auto">${escapeHtml(source)}</pre></div>`;
      }
    }
  }

  function wireInteractions(container, codeBlocks, currentPath){
    if(!container) return;
    container.querySelectorAll(".md-code-block").forEach(block=>{
      const idx = Number(block.dataset.codeIdx);
      const rawCode = (codeBlocks && Number.isFinite(idx) && codeBlocks[idx] !== undefined)
        ? codeBlocks[idx] : (block.querySelector("pre")?.textContent || "");
      const copyBtn = block.querySelector(".md-copy-btn");
      if(copyBtn){
        copyBtn.addEventListener("click", async ()=>{
          const ok = await copyText(rawCode);
          flashButton(copyBtn, ok ? "Copied ✓" : "Failed");
        });
      }
      const wrapBtn = block.querySelector(".md-wrap-btn");
      if(wrapBtn){
        wrapBtn.addEventListener("click", ()=>{
          const wrapped = block.classList.toggle("wrapped");
          wrapBtn.classList.toggle("active", wrapped);
          wrapBtn.setAttribute("aria-pressed", wrapped);
        });
      }
    });
    container.querySelectorAll("a.md-internal-link, a[data-md-href]").forEach(anchor=>{
      anchor.addEventListener("click", ev=>{
        ev.preventDefault();
        const ref = anchor.dataset.mdHref || anchor.getAttribute("href");
        if(FMAP.reader) FMAP.reader.openByRef(ref, currentPath);
      });
    });
    container.querySelectorAll('a[href^="#"]').forEach(anchor=>{
      if(anchor.classList.contains("md-internal-link")) return;
      anchor.addEventListener("click", ev=>{
        const href = anchor.getAttribute("href") || "";
        if(href.startsWith("#doc=")){
          ev.preventDefault();
          if(FMAP.reader) FMAP.reader.openByRef(decodeURIComponent(href.slice(5)), currentPath);
          return;
        }
        const targetId = href.slice(1);
        if(!targetId) return;
        const targetEl = container.querySelector(`[id="${CSS.escape(targetId)}"]`);
        if(targetEl){ ev.preventDefault(); targetEl.scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    });
  }

  FMAP.md = {
    parseFrontmatter, splitSections, escapeHtml, stripLeadingHeading, cleanToolSummary,
    slugifyHeading, sanitizeUrl, isInternalMdHref, resolveDocByRef, mdInline,
    renderMarkdown, renderMermaid, wireInteractions, safeFilename, saveFile, copyText, flashButton
  };
})(window);
