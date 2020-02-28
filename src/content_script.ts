import {getHtmlSelection, turndownServie, copyToClipboard} from './types'

const onExtensionMessage = (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
  console.log('receive message:')
  console.log(request)
  if (request['copy-as-markdown'] != undefined) {
    sendResponse({selection: getHtmlSelection()});
  }
}
const initContentScript: () => void = async () => {
  console.log('loading script')
  chrome.runtime.onMessage.addListener(onExtensionMessage);
}

initContentScript();
