import {getHtmlSelection, turndownServie, copyToClipboard} from './types'

const onExtensionMessage = (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
  console.log('receive message ' + request)
  if (request['copy-as-markdown'] != undefined) {
    const markdown = turndownServie.turndown(getHtmlSelection())
    copyToClipboard(markdown)
    sendResponse({selection: markdown});
  }
}
const initContentScript: () => void = async () => {
  console.log('loading script')
  chrome.runtime.onMessage.addListener(onExtensionMessage);
}

initContentScript();
