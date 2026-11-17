// Click the toolbar button or press the shortcut: ask the page to open the rename box.
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || tab.id == null) return;
  const ask = () => chrome.tabs.sendMessage(tab.id, { type: 'tab-renamer-open' });
  try { await ask(); }
  catch {
    // Tab was open before the extension was installed or reloaded: inject, then ask again.
    try {
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
      await ask();
    } catch {
      // chrome:// pages, the Web Store and the PDF viewer cannot be scripted.
      chrome.action.setBadgeText({ tabId: tab.id, text: 'X' });
      chrome.action.setBadgeBackgroundColor({ tabId: tab.id, color: '#b00020' });
      setTimeout(() => chrome.action.setBadgeText({ tabId: tab.id, text: '' }), 2500);
    }
  }
});
