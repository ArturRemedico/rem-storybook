/* eslint-disable @typescript-eslint/no-explicit-any */
export const Leaf = (props: any) => {
    let { children } = props
    const { attributes, leaf } = props

    if (leaf.bold) {
        children = <strong style={{ fontWeight: 600 }}>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }
    return <span {...attributes}>{children}</span>
}
