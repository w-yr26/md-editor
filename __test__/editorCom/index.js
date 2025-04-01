import { buildAST, HTMLRender, renderAST, tokenizer } from '../../dist/main.js'

const editor = document.querySelector('textarea')
const preview = document.querySelector('.preview-container')

function previewMd(htmlStr) {
  preview.innerHTML = htmlStr
}

editor.addEventListener('input', (e) => {
  console.log(e.target.value)

  const tokenArr = tokenizer.tokenize(e.target.value)
  console.log('token arr', tokenArr)
  const ast = buildAST(tokenArr)
  const renderer = new HTMLRender()
  const htmlStr = renderAST(ast, renderer)
  console.log('htmlStr', htmlStr)
  previewMd(htmlStr)
})
