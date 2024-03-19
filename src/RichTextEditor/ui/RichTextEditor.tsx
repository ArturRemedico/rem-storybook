/* eslint-disable */
import { useState, useMemo, KeyboardEvent, CSSProperties } from "react"
import { Descendant, createEditor } from "slate"
import { Slate, Editable, withReact, ReactEditor } from "slate-react"
import { withHistory } from "slate-history"
import isHotkey from "is-hotkey"
import styles from "./RichTextEditor.module.scss"
import { SendIcon } from "../const/Icons"
import { Toolbar } from "../editor/Toolbar"
import { deserializeFromHtml } from "../editor/deserializeFromHtml"
import { serializeToHtml } from "../editor/serializeToHtml"
import { withInline, toggleMark, isBlockActive, toggleBlock } from "../editor/util"
import { toast } from "sonner"
import { ClickAnywhere } from "../../_internal/ClickAnywhere"
import { clsx } from "clsx"
import { SmoothSquircleWrapper } from "./SmoothSquircleWrapper/SmoothSquircleWrapper"
import { HOTKEYS } from "../const/hotkeys"
import { Element } from "./RenderElements/Element"
import { Leaf } from "./RenderElements/Leaf"

type TProps = {
    startText: string
    label?: string
    placeholder?: string
    isCanEdit?: boolean
    inpSubStyle?: CSSProperties
    inpWrapSubStyle?: CSSProperties
    wrapSubStyle?: CSSProperties
    bg?: string
    borderColor?: string
}

export function RichTextEditor(props: TProps) {
    const {
        placeholder = "Enter some rich text…",
        startText,
        isCanEdit = false,
        inpSubStyle,
        inpWrapSubStyle,
        wrapSubStyle,
    } = props

    const [inp, setInp] = useState(startText)
    const [editorFocus, setEditorFocus] = useState<boolean>(false)

    const isEmpty = (inp || "").replace(/<[^>]+>/g, "").length === 0

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

    function saveHandler() {
        if (!isEmpty && editorFocus) {
            toast("Data saved", {
                style: {
                    backgroundColor: "#31D9A4",
                    color: "#fff",
                },
            })
        }

        setEditorFocus(false)
    }

    function changeHandler(value: Descendant[]) {
        ReactEditor.focus(editor)
        setEditorFocus(true)
        const isAstChange = editor.operations.some((op: any) => op.type !== "set_selection")
        if (isAstChange) {
            setInp(serializeToHtml(value))
        }
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
        <ClickAnywhere onClickAway={saveHandler} stopSelector={styles.kitEditorContainer}>
            <div className={styles.kitEditorContainer}>
                <div className={styles.textareaContainer} style={wrapSubStyle}>
                    <SmoothSquircleWrapper isCanEdit={isCanEdit} editorFocus={editorFocus}>
                        <div className={styles.textarea} style={inpWrapSubStyle}>
                            <Slate
                                editor={editor}
                                value={filterEmptyChildren(deserializeFromHtml(inp))}
                                onChange={changeHandler}
                            >
                                <div className={styles.editorContainer}>
                                    <Editable
                                        renderElement={Element}
                                        renderLeaf={Leaf}
                                        placeholder={editorFocus ? "" : placeholder}
                                        className={styles.editor}
                                        style={inpSubStyle}
                                        onFocus={() => setEditorFocus(true)}
                                        onKeyDown={keyDownHandler}
                                        onSelect={() => setEditorFocus(true)}
                                    />
                                </div>
                                <div
                                    className={clsx(styles.toolbarContainer, {
                                        [styles.isActive]: isCanEdit && editorFocus,
                                    })}
                                >
                                    <Toolbar />

                                    <div
                                        onClick={saveHandler}
                                        className={clsx(styles.sendButton, {
                                            [styles.sendButtonDisabled]: isEmpty,
                                        })}
                                    >
                                        <SendIcon />
                                    </div>
                                </div>
                            </Slate>
                        </div>
                    </SmoothSquircleWrapper>
                </div>
            </div>
        </ClickAnywhere>
    )
}
