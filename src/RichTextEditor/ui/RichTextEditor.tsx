/* eslint-disable */
import { useState } from "react"
import { Descendant } from "slate"
import { Slate, Editable, ReactEditor } from "slate-react"
import styles from "./RichTextEditor.module.scss"
import { SendIcon } from "../const/Icons"
import { deserializeFromHtml } from "./Toolbar/deserializeFromHtml"
import { serializeToHtml } from "../lib/serializeToHtml"
import { ClickAnywhere } from "../../_internal/ClickAnywhere"
import { clsx } from "clsx"
import { SmoothSquircleWrapper } from "./SmoothSquircleWrapper/SmoothSquircleWrapper"
import { Element } from "./RenderElements/Element"
import { Leaf } from "./RenderElements/Leaf"
import { editor } from "../model/editor"
import { keyDownHandler } from "../lib/keyDownHandler"
import { filterEmptyChildren } from "../lib/filterEmptyChildren"
import { getIsEditorEmpty } from "../lib/getIsEmpty"
import { Toolbar } from "./Toolbar/Toolbar"

type TRichTextEditorProps = {
    initialValue: string
    label?: string
    placeholder?: string
    isCanEdit?: boolean
    bg?: string
    onSave: () => void
    borderColor?: string
}

export function RichTextEditor(props: TRichTextEditorProps) {
    const { placeholder = "Enter some text…", initialValue, isCanEdit = false, onSave } = props

    const [value, setValue] = useState(initialValue)
    const [editorFocus, setEditorFocus] = useState<boolean>(false)

    const isEmpty = getIsEditorEmpty(value)

    function saveHandler() {
        if (!isEmpty && editorFocus) {
            onSave()
        }
        setEditorFocus(false)
    }

    function changeHandler(value: Descendant[]) {
        ReactEditor.focus(editor)
        setEditorFocus(true)
        const isAstChange = editor.operations.some((op: any) => op.type !== "set_selection")
        if (isAstChange) {
            setValue(serializeToHtml(value))
        }
    }

    return (
        <ClickAnywhere onClickAway={saveHandler} stopSelector={styles.kitEditorContainer}>
            <div className={styles.kitEditorContainer}>
                <div className={styles.textareaContainer}>
                    <SmoothSquircleWrapper isCanEdit={isCanEdit} editorFocus={editorFocus}>
                        <div className={styles.textarea}>
                            <Slate
                                editor={editor}
                                value={filterEmptyChildren(deserializeFromHtml(value))}
                                onChange={changeHandler}
                            >
                                <div className={styles.editorContainer}>
                                    <Editable
                                        renderElement={Element}
                                        renderLeaf={Leaf}
                                        placeholder={placeholder}
                                        className={styles.editor}
                                        onFocus={() => {
                                            setEditorFocus(true)
                                        }}
                                        onKeyDown={keyDownHandler}
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
