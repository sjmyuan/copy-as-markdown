import {getHtmlSelection} from './types'

const selectedHTML: string | undefined = getHtmlSelection();

chrome.runtime.sendMessage({selection: selectedHTML})
