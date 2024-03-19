/* eslint-disable @typescript-eslint/no-explicit-any */
export function filterEmptyChildren(nodes: any) {
    return nodes.filter((node: any) => {
        if ("children" in node && Array.isArray(node.children)) {
            node.children = filterEmptyChildren(node.children)
            return node.children.length > 0
        }
        return true
    })
}
