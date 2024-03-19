/* eslint-disable */
import { useState, useCallback, useMemo, KeyboardEvent, HTMLAttributes, FC } from "react"
import { createEditor } from "slate"
import { Slate, Editable, withReact, ReactEditor } from "slate-react"
import { withHistory } from "slate-history"
import { deserializeFromHtml } from "./editor/deserializeFromHtml"
import { serializeToHtml } from "./editor/serializeToHtml"
import { Toolbar } from "./editor/Toolbar"
import { isBlockActive, toggleBlock, toggleMark, withInline } from "./editor/util"
import isHotkey from "is-hotkey"
import ClickAnyWhere from "./ClickAnyWhere"
import SmoothSquircle from "./SmoothSquircle"
import "./index.css"
import styles from "./KitTextEditor.module.scss"
import { classNames } from "./class"
import { SendIcon } from "./Icons"

type Props = {
    startText: string
    fieldId?: string
    label?: string
    labelProps?: HTMLAttributes<HTMLParagraphElement>
    wrapperProps?: HTMLAttributes<HTMLDivElement>
    placeholder?: string
    isEdit?: boolean
    inpSubStyle?: any
    inpWrapSubStyle?: any
    wrapSubStyle?: any
    bg?: string
    borderColor?: string
    withVariables?: boolean
    hideVariablesToolbar?: boolean
    focusEveryTime?: boolean
}

type THotkeys = {
    [key: string]: string
}

const HOTKEYS: THotkeys = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "shift+Enter": "list",
}

const KitTextEditor: FC<Props> = ({
    label,
    placeholder,
    fieldId = String(Date.now()),
    labelProps,
    startText,
    wrapperProps,
    isEdit,
    inpSubStyle,
    inpWrapSubStyle,
    wrapSubStyle,
    bg,
    borderColor,
}) => {
    const [inp, setInp] = useState(startText || "")
    const [editorFocus, setEditorFocus] = useState<boolean>(false)

    const isEmpty = (inp || "").replace(/<[^>]+>/g, "").length === 0

    const renderElement = useCallback((props: any) => <Element {...props} />, [])
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])

    const editor = useMemo(() => {
        return withInline(withReact(withHistory(createEditor())))
    }, [])

    function filterEmptyChildren(nodes: any) {
        return nodes.filter((node: any) => {
            if ("children" in node && Array.isArray(node.children)) {
                node.children = filterEmptyChildren(node.children)
                return node.children.length > 0
            }
            return true
        })
    }

    function keyDownHandler(event: KeyboardEvent<HTMLDivElement>) {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
                if (event.key !== "Enter") {
                    event.preventDefault()
                    const mark = HOTKEYS[hotkey]
                    toggleMark(editor, mark)
                } else {
                    if (isBlockActive(editor, "bulleted-list")) {
                        setTimeout(() => toggleBlock(editor, "bulleted-list"), 0)
                    } else if (isBlockActive(editor, "numbered-list")) {
                        setTimeout(() => toggleBlock(editor, "numbered-list"), 0)
                    }
                }
            }
        }
    }

    return (
        <ClickAnyWhere
            onClickAway={() => {
                setEditorFocus(false)
            }}
            stopSelector={`.editor-${fieldId}-class `}
        >
            <div
                className={`${styles.kitEditorContainer} editor-${fieldId}-class`}
                {...wrapperProps}
            >
                {!!label && (
                    <p
                        className={styles.label}
                        style={{ marginBottom: !!isEdit ? "10px" : 0 }}
                        {...labelProps}
                    >
                        {label}
                    </p>
                )}

                <div className={styles.textareaContainer} style={wrapSubStyle}>
                    <SmoothSquircle
                        borderColor={
                            !isEdit
                                ? "#FFFFFF"
                                : borderColor || (!editorFocus ? "#F5F5F5" : "#ECECEC")
                        }
                        backgroundColor={!isEdit ? "#FFFFFF" : bg || "#F5F5F5"}
                        cornerRadius={10}
                        customStyle={{
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div className={styles.textarea} style={inpWrapSubStyle}>
                            <Slate
                                editor={editor}
                                value={filterEmptyChildren(deserializeFromHtml(inp))}
                                onChange={value => {
                                    ReactEditor.focus(editor)
                                    setEditorFocus(true)
                                    const isAstChange = editor.operations.some(
                                        (op: any) => op.type !== "set_selection"
                                    )
                                    if (isAstChange) {
                                        setInp(serializeToHtml(value))
                                    }
                                }}
                            >
                                <div className={styles.editorContainer}>
                                    <Editable
                                        renderElement={renderElement}
                                        renderLeaf={renderLeaf}
                                        placeholder={placeholder || "Enter some rich text…"}
                                        className={styles.editor}
                                        style={inpSubStyle}
                                        onFocus={() => setEditorFocus(true)}
                                        onKeyDown={keyDownHandler}
                                    />
                                </div>
                                <div
                                    className={styles.toolbarContainer}
                                    style={{
                                        transform:
                                            isEdit && editorFocus ? "unset" : "translateY(150%)",
                                    }}
                                >
                                    <Toolbar />

                                    <div
                                        className={classNames(styles.sendButton, {
                                            [styles.sendButtonDisabled]: isEmpty,
                                        })}
                                    >
                                        <SendIcon />
                                    </div>
                                </div>
                            </Slate>
                        </div>
                    </SmoothSquircle>
                </div>
            </div>
        </ClickAnyWhere>
    )
}

const Element = (props: any) => {
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

const Leaf = (props: any) => {
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

export default KitTextEditor
