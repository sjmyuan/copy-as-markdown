import {turndownServie, copyToClipboard} from './types'

const sendMessageToTab = () => {
  chrome.tabs.query({active: true}, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.executeScript(tabs[0].id as number, {file: 'js/content_script.bundle.js'})
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

const onPageActionClicked = (tab: chrome.tabs.Tab) => {
  sendMessageToTab()
}

const onMessageReceived = (message: {selection?: string},
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void) => {
  if (message && message.selection) {
    const markdown = turndownServie.turndown(message.selection)
    copyToClipboard(markdown)
    console.log('Copied')
    console.log(markdown)
    sendResponse(true)
  } else {
    console.log('There is no selection.')
    sendResponse(false)
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

    chrome.runtime.onMessage.addListener(onMessageReceived)

    chrome.pageAction.onClicked.addListener(onPageActionClicked)

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {schemes: ['http', 'https']}
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

  });
}

initBackgroundScript();
