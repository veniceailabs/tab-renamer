// Tab Renamer: remembers a custom title per page address and keeps it, even if the site rewrites its own title.
(() => {
  if (window.__tabRenamerLoaded) return; window.__tabRenamerLoaded = true;
  const keyOf = () => 'title:' + location.origin + location.pathname + location.search;
  let custom = null, original = document.title, lastKey = keyOf(), applying = false;

  function apply() {
    if (!custom || document.title === custom) return;
    applying = true; document.title = custom; applying = false;
  }
  async function refresh() {
    lastKey = keyOf();
    try { custom = (await chrome.storage.local.get(lastKey))[lastKey] || null; } catch { custom = null; }
    if (custom) apply(); else if (original && document.title !== original) { /* site's own title stays */ }
  }
  new MutationObserver(() => {
    if (applying) return;
    if (keyOf() !== lastKey) { refresh(); return; }       // single-page app moved to another page
    if (custom) apply(); else original = document.title;   // remember the site's own title for Reset
  }).observe(document.head || document.documentElement, { childList: true, subtree: true, characterData: true });
  chrome.storage.onChanged.addListener((ch, area) => { if (area === 'local' && ch[keyOf()]) refresh(); });

  function openBox() {
    if (document.getElementById('__tab_renamer_host')) { document.getElementById('__tab_renamer_host').remove(); }
    const host = document.createElement('div'); host.id = '__tab_renamer_host';
    host.style.cssText = 'all:initial;position:fixed;inset:0;z-index:2147483647;';
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        .bg{position:fixed;inset:0;background:rgba(0,0,0,.35);display:flex;align-items:flex-start;justify-content:center;padding-top:18vh;font:14px -apple-system,system-ui,sans-serif}
        .box{width:min(460px,90vw);background:#1f1f1f;color:#f1f1f1;border:1px solid #444;border-radius:12px;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.5)}
        label{display:block;font-weight:600;margin-bottom:8px}
        input{width:100%;box-sizing:border-box;padding:10px;border-radius:8px;border:1px solid #666;background:#2b2b2b;color:#fff;font-size:15px;outline:none}
        input:focus{border-color:#7aa7ff}
        .hint{margin-top:8px;color:#aaa;font-size:12px}
      </style>
      <div class="bg"><div class="box"><label>Rename this tab</label><input type="text" maxlength="200" spellcheck="false">
      <div class="hint">Enter to save · Esc to cancel · empty name puts the original title back</div></div></div>`;
    const input = root.querySelector('input'); input.value = custom || document.title;
    const close = () => host.remove();
    root.querySelector('.bg').addEventListener('mousedown', (e) => { if (e.target.classList.contains('bg')) close(); });
    input.addEventListener('keydown', async (e) => {
      e.stopPropagation();
      if (e.key === 'Escape') return close();
      if (e.key !== 'Enter') return;
      const name = input.value.trim(); const k = keyOf();
      try {
        if (name) { await chrome.storage.local.set({ [k]: name }); custom = name; apply(); }
        else { await chrome.storage.local.remove(k); custom = null; document.title = original; }
      } catch {}
      close();
    });
    for (const t of ['keyup', 'keypress']) input.addEventListener(t, (e) => e.stopPropagation());
    document.documentElement.appendChild(host); input.focus(); input.select();
  }
  chrome.runtime.onMessage.addListener((m) => { if (m && m.type === 'tab-renamer-open') openBox(); });
  refresh();
})();
