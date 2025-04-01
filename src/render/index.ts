/**
 * MarkdownNode: {
 *  type: xxx,
 *  value: xxx,
 *  children: [MarkdownNode1, MarkdownNode2]
 * }
 */

import { ASTNode } from '../ast'

interface ASTVisitor {
  visit(node: ASTNode): string
}

export class HTMLRender implements ASTVisitor {
  visit(node: ASTNode): string {
    switch (node.type) {
      case 'header1':
        return `<h1>${node.value}</h1>`
      case 'header2':
        return `<h2>${node.value}</h2>`
      case 'header3':
        return `<h3>${node.value}</h3>`
      case 'header4':
        return `<h4>${node.value}</h4>`
      case 'paragraph':
        return `${node.value}`
      default:
        return node.children.map((child) => this.visit(child)).join('')
    }
  }
}

export const renderAST = (node: ASTNode, renderer: ASTVisitor, id: string) => {
  const toHtmlDOM = () => {
    return renderer.visit(node)
  }

  const htmlStr = toHtmlDOM()
  const container = document.querySelector(id)
  if (container) {
    container.innerHTML = htmlStr
  } else {
    console.log('容器不存在')
  }
}
