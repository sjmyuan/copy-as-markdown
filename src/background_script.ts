import {turndownServie, copyToClipboard} from './types'

const sendMessageToTab = () => {
  console.log('Fetching selected html')
  chrome.tabs.query({active: true}, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.executeScript(tabs[0].id as number, {file: 'js/content_script_get_selection.bundle.js'})
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

const onBrowserActionClicked = () => {
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
    if (sender.tab) {
      chrome.tabs.executeScript(sender.tab.id as number, {file: 'js/content_script_show_message.bundle.js'})
    }
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
      contexts: ['selection'],
    })
  });

  chrome.contextMenus.onClicked.addListener(onContextMenuClicked)

  chrome.commands.onCommand.addListener(onCommandTriggered);

  chrome.runtime.onMessage.addListener(onMessageReceived)

  chrome.browserAction.onClicked.addListener(onBrowserActionClicked)
}

initBackgroundScript();
