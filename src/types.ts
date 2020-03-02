import TurndownServie from 'turndown';
import {gfm} from 'turndown-plugin-gfm';

export const turndownServie = new TurndownServie({headingStyle: 'atx', codeBlockStyle: 'fenced'});
turndownServie.use(gfm)

export const getHtmlSelection: () => string | undefined = () => {
  const selection = window.getSelection()
  if (selection && selection.anchorNode) {
    const range = selection.getRangeAt(0);
    const div = document.createElement("div");
    div.appendChild(range.cloneContents());
    return div.innerHTML;
  } else {
    return undefined
  }
}

export const showMessage = () => {
  const div = document.createElement('div');
  div.setAttribute('style', `
  width: 200px;
  height: 50px;
  background: transparent;
  position: fixed;
  right: 10px;
  bottom: 20px;
  border-radius: 5px;
  display: flex;
    `)

  const mark = document.createElement('div');
  mark.setAttribute('style', `
  height: 100%;
  width: 5px;
  background: green;
  border-radius: 5px 0px 0px 5px;
    `)

  const message = document.createElement('div');
  message.setAttribute('style', `
  background: whitesmoke;
  height: 100%;
  flex-grow: 1;
  text-align: center;
  padding-top: 15px;
  font-size: medium;
  color: darkgray;
    `)
  message.textContent = 'Copied as Markdown'

  div.appendChild(mark)
  div.appendChild(message)
  document.body.appendChild(div)
  setTimeout(() => document.body.removeChild(div), 1500)
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
