import TurndownServie from 'turndown';
import {gfm} from 'turndown-plugin-gfm';

export const turndownServie = new TurndownServie({headingStyle: 'atx', codeBlockStyle: 'fenced'});
turndownServie.use(gfm)

export const getHtmlSelection: () => string | undefined = () => {
  const selection = window.getSelection()
  if (selection) {
    const range = selection.getRangeAt(0);
    const div = document.createElement("div");
    div.appendChild(range.cloneContents());
    return div.innerHTML;
  } else {
    return undefined
  }
}

export const copyToClipboard = (content: string) => {
  const input = document.createElement('textarea');
  document.body.appendChild(input)
  input.value = content
  input.focus()
  input.select()
  document.execCommand('copy')
  input.blur()
  document.body.removeChild(input)
}
