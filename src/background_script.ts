import {turndownServie, copyToClipboard} from './types'

const sendMessageToTab = () => {
  chrome.tabs.query({active: true}, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id as number, {'copy-as-markdown': true}, (response: {selection?: string}) => {
        if (response.selection) {
          const markdown = turndownServie.turndown(response.selection)
          copyToClipboard(markdown)
          console.log('Copied')
          console.log(markdown)
        } else {
          console.log('There is no selection.')
        }
      })
    }
    else {
      console.log('No active tab')
    }
  })
}
const onContextMenuClicked = (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
  if (info.menuItemId === 'copy-as-markdown') {
    sendMessageToTab()
  }
}

const onCommandTriggered = (command: string) => {
  if (command === 'copy-as-markdown') {
    sendMessageToTab()
  }
}

const initBackgroundScript = () => {
  console.log('background running');
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'copy-as-markdown',
      title: 'Copy as Markdown',
      contexts: ['selection']
    })
    chrome.contextMenus.onClicked.addListener(onContextMenuClicked)

    chrome.commands.onCommand.addListener(onCommandTriggered);
  });
}

initBackgroundScript();
