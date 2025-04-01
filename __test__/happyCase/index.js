// import '../../dist/main.js'

import { buildAST, HTMLRender, renderAST, tokenizer } from '../../dist/main.js'
;(function fn() {
  const res1 = tokenizer.tokenize('# Header1\nChild Text Msg')
  const res2 = tokenizer.tokenize('Text msg')
  console.log(res1, res2)
  console.log('build1', buildAST(res1))
  console.log('build2', buildAST(res2))

  const renderer = new HTMLRender()
  const htmlStr = renderAST(buildAST(res1), renderer)
  console.log('htmlStr', htmlStr)
  // const container = document.querySelector('#app')
  // if (container) {
  //   container.innerHTML = htmlStr
  // } else {
  //   console.log('容器不存在')
  // }
})()
