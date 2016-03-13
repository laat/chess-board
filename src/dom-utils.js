export function removeNodeContent (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}
