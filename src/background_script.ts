const onContextMenuClicked = (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
  if (info.menuItemId === 'copy-as-markdown') {
    chrome.tabs.query({active: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0], {'copy-as-markdown': true}, (response: any) => {
          if (response) {
            console.log('Copied ' + response)
          } else {
            console.log('There is no selection.')
          }
        })
      }
      else {
        console.log('No active tab')
      }
    })
  })
}
}
const initBackgroundScript = () => {
  console.log('background running');
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({id: 'copy-as-markdown', title: 'Copy as Markdown', contexts: ['page', 'browser_action']})
    chrome.contextMenus.onClicked.addListener(onContextMenuClicked)
  });
}

initBackgroundScript();
