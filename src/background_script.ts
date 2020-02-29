import {turndownServie, copyToClipboard} from './types'

let selectedTabId: number = -1

const sendMessageToTab = () => {
  chrome.tabs.query({active: true}, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id as number, {'copy-as-markdown': true}, (response: {selection?: string}) => {
        if (response && response.selection) {
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

const onTabUpdated = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (changeInfo.status == "complete" && tabId == selectedTabId) {
    //chrome.tabs.executeScript(tabId, {file: chrome.runtime.getURL('js/content_script.bundle.js')}, (result: any) => {
    //console.log("Inject script result:")
    //console.log(result)
    //})
    console.log(changeInfo)
    console.log(tab)
    chrome.tabs.executeScript(tabId, {code: 'console.log("injected")'}, (result: any) => {
      console.log("Inject script result:")
      console.log(result)
    })
  }
}

const onTabActivated = (activeInfo: chrome.tabs.TabActiveInfo) => {
  selectedTabId = activeInfo.tabId
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

    chrome.tabs.onUpdated.addListener(onTabUpdated)

    chrome.tabs.onActivated.addListener(onTabActivated)
  });

  chrome.tabs.query({active: true, currentWindow: true}, (tabs: chrome.tabs.Tab[]) => {
    selectedTabId = tabs[0].id as number;
  });
}

initBackgroundScript();
