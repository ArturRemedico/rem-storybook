/* eslint-disable  */

import { Element, Node, Text } from "slate"
import { jsx } from "slate-hyperscript"

export const EmptyDocument: Array<Node> = [
    {
        type: "paragraph",
        children: [
            {
                text: "",
            },
        ],
    } as any,
]

const ELEMENT_TAGS: { [key: string]: (el: any) => any } = {
    A: el => ({
        type: "link",
        url: el.getAttribute("href"),
        openInNewTab: el.getAttribute("target") === "_blank",
    }),
    BLOCKQUOTE: () => ({ type: "block-quote" }),
    H1: () => ({ type: "h1" }),
    H2: () => ({ type: "h2" }),
    H3: () => ({ type: "heading3" }),
    H4: () => ({ type: "heading4" }),
    H5: () => ({ type: "heading5" }),
    H6: () => ({ type: "heading6" }),
    IMG: el => ({
        type: "image",
        url: el.getAttribute("src"),
        alt: el.getAttribute("alt"),
    }),
    LI: () => ({ type: "list-item" }),
    OL: () => ({ type: "numbered-list" }),
    P: data => {
        return { type: "paragraph", align: data.style["text-align"] }
    },
    PRE: () => ({ type: "pre" }),
    UL: () => ({ type: "bulleted-list" }),
}

const VARIABLES_TAGS = {
    "VARIABLE-DATE": () => ({
        type: "variable-date",
    }),
    "VARIABLE-PATIENT": () => ({
        type: "variable-patient",
    }),
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS: { [key: string]: (el: any) => any } = {
    CODE: () => ({ code: true }),
    DEL: () => ({ strikethrough: true }),
    EM: () => ({ italic: true }),
    I: () => ({ italic: true }),
    S: () => ({ strikethrough: true }),
    STRONG: () => ({ bold: true }),
    U: () => ({ underline: true }),
}

const deserialize = (el: any): any => {
    if (el.nodeType === 3) {
        return el.textContent
    } else if (el.nodeType !== 1) {
        return null
    } else if (el.nodeName === "BR") {
        return "\n"
    }

    const { nodeName } = el
    let parent = el

    if (nodeName === "PRE" && el.childNodes[0] && el.childNodes[0].nodeName === "CODE") {
        // eslint-disable-next-line prefer-destructuring
        parent = el.childNodes[0]
    }
    const children = Array.from(parent.childNodes).map(deserialize).flat()

    if (el.nodeName === "BODY" || el.nodeName === "body") {
        if (el.children?.length === 0) {
            children.splice(0, 1, { type: "paragraph", children: [{ text: el.textContent }] })
        }
        return jsx("fragment", {}, children)
    }

    if ((VARIABLES_TAGS as any)[nodeName]) {
        const attrs = (VARIABLES_TAGS as any)[nodeName](el)
        return jsx("element", attrs, [{ text: "" }])
    }
    if (ELEMENT_TAGS[nodeName]) {
        const attrs = ELEMENT_TAGS[nodeName](el)
        return jsx("element", attrs, children)
    }

    if (TEXT_TAGS[nodeName]) {
        const attrs = TEXT_TAGS[nodeName](el)
        return children.map(child => {
            return jsx("text", attrs, child)
        })
    }

    return children
}

const normalize = (node: Node) => {
    if (Text.isText(node)) {
        return
    }

    // Ensure that block and inline nodes have at least one text child.
    if (
        Element.isElement(node) &&
        (node.children.length === 0 ||
            (node.children[node.children.length - 1] as any)?.type?.includes("variable"))
    ) {
        node.children.push({ text: "" })
        return
    }
}

/**
 * If input is undefined, null or blank, an empty document will be returned
 */
export const deserializeFromHtml = (html: string | undefined | null): Array<Node> => {
    if (!html || html.trim().length === 0) {
        return EmptyDocument
    }

    let htmlToParse = html
    htmlToParse = htmlToParse.replace(
        /{{\s*current_date\s*}}/gi,
        `<variable-date>${String.fromCodePoint(160) /* Non-breaking space */}</variable-date>`
    )
    htmlToParse = htmlToParse.replace(
        /{{\s*patient_name\s*}}/gi,
        `<variable-patient>${String.fromCodePoint(160) /* Non-breaking space */}</variable-patient>`
    )
    // parse html into a DOM document
    const document = new DOMParser().parseFromString(htmlToParse, "text/html")
    // deserialize DOM document into an array of nodes
    const nodes: Array<Node> = deserialize(document.body)

    // normalize nodes to Slate compatible format
    nodes.forEach(node => normalize(node))

    return nodes
}
