import escapeHtml from "escape-html"
import { Node, Text } from "slate"

type TElementType =
    | "block-quote"
    | "bulleted-list"
    | "h1"
    | "h2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "heading6"
    | "image"
    | "link"
    | "list-item"
    | "numbered-list"
    | "paragraph"
    | "pre"

type TElementAttributes = {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    code?: boolean
    type?: TElementType
    url?: string
    alt?: string
    align?: string
}

type TNodeWithAttributes = Node & TElementAttributes

const serialize = (node: TNodeWithAttributes): string => {
    if (node?.type?.includes("variable")) {
        switch (node.type.split("-")[1]) {
            case "date":
                return "{{ current_date }}"
            case "patient":
                return "{{ patient_name }}"
        }
    }

    if (Text.isText(node)) {
        let html = escapeHtml(node.text)

        if (node.bold) {
            html = `<strong>${html}</strong>`
        }

        if (node.italic) {
            html = `<em>${html}</em>`
        }

        if (node.underline) {
            html = `<u>${html}</u>`
        }

        if (node.strikethrough) {
            html = `<s>${html}</s>`
        }

        if (node.code) {
            html = `<code>${html}</code>`
        }
        return html
    }

    switch (node.type) {
        case "image": {
            const url = escapeHtml(node.url)

            const alt = escapeHtml(node.alt)
            return `<img src="${url}" alt="${alt}" class="rf-img" />`
        }
    }

    const children = node.children.map(n => serialize(n as TNodeWithAttributes)).join("")
    const textAlign = node.align ? `style="text-align:${node.align};"` : ""

    switch (node.type) {
        case "block-quote":
            return `<blockquote>${children}</blockquote>`
        case "bulleted-list":
            return `<ul>${children}</ul>`
        case "h1":
            return `<h1 ${textAlign}>${children}</h1>`
        case "h2":
            return `<h2 ${textAlign}>${children}</h2>`
        // case "heading3":
        //     return `<h3 ${textAlign}>${children}</h3>`
        // case "heading4":
        //     return `<h4 ${textAlign}>${children}</h4>`
        // case "heading5":
        //     return `<h5 ${textAlign}>${children}</h5>`
        // case "heading6":
        //     return `<h6 ${textAlign}>${children}</h6>`
        case "list-item":
            return `<li ${textAlign}>${children}</li>`
        case "numbered-list":
            return `<ol ${textAlign}>${children}</ol>`
        case "paragraph":
            return `<p ${textAlign}>${children}</p>`
        case "pre":
            return `<pre>${children}</pre>`
        default:
            return children
    }
}

export const serializeToHtml = (value: Array<Node>) =>
    serialize({
        children: value,
    })
