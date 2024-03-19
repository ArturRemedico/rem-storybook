/* eslint-disable */
import { Editor, Element as SlateElement, Transforms } from "slate"
import { LIST_TYPES, TEXT_ALIGN_TYPES } from "../const/const"
import { ReactEditor } from "slate-react"

export const toggleBlock = (editor: ReactEditor, format: any) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: (n: any) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes((n as any)?.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    })
    let newProperties: Partial<SlateElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            // @ts-ignore
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            // @ts-ignore
            type: isActive ? "paragraph" : isList ? "list-item" : format,
        }
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

export const toggleMark = (editor: ReactEditor, format: any) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

export const withInline = (editor: ReactEditor) => {
    const { isVoid } = editor

    editor.isInline = (element: any) => {
        return element?.type?.includes("variable") ? true : isVoid(element)
    }

    return editor
}

export const isBlockActive = (editor: ReactEditor, format: any, blockType = "type") => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                (n as any)[blockType] === format,
        })
    )

    return !!match
}

export const isMarkActive = (editor: ReactEditor, format: any) => {
    const marks = Editor.marks(editor)
    return marks ? (marks as any)[format] === true : false
}
