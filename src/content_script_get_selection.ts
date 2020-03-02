import {getHtmlSelection} from './types'

const selectedHTML: string | undefined = getHtmlSelection();

console.log('Fetched selected html')
console.log(selectedHTML)

chrome.runtime.sendMessage({selection: selectedHTML})
