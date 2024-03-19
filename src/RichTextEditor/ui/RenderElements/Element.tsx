// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Element = (props: any) => {
    const { attributes, children, element } = props

    const style = { textAlign: element.align }

    switch (element.type) {
        case "block-quote":
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case "bulleted-list":
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case "h1":
            return (
                <h1 style={{ fontSize: "24px", fontWeight: 400, ...style }} {...attributes}>
                    {children}
                </h1>
            )
        case "h2":
            return (
                <h2 style={{ fontSize: "20px", fontWeight: 400, style }} {...attributes}>
                    {children}
                </h2>
            )
        case "list-item":
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case "numbered-list":
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}
