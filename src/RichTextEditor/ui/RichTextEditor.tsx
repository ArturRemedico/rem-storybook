/* eslint-disable */
import { useEffect, useRef, useState } from "react"
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
import { Toolbar } from "./Toolbar/Toolbar"

type TRichTextEditorProps = {
    initialData: string
    label?: string
    placeholder?: string
    isCanEdit?: boolean
    bg?: string
    onSave: (value: string) => Promise<void>
    borderColor?: string
}

export function RichTextEditor(props: TRichTextEditorProps) {
    const { placeholder = "Enter some text…", initialData, isCanEdit = false, onSave } = props

    const [value, setValue] = useState(() => filterEmptyChildren(deserializeFromHtml(initialData)))
    const [isEditorFocused, setIsEditorFocused] = useState<boolean>(false)

    const lastSavedDataRef = useRef(initialData)

    function saveHandler() {
        if (isEditorFocused) {
            const serializedData = serializeToHtml(value)

            if (lastSavedDataRef.current !== serializedData) {
                onSave(serializedData)
            }
        }
        setIsEditorFocused(false)
    }

    function changeHandler(value: Descendant[]) {
        ReactEditor.focus(editor)
        setIsEditorFocused(true)
        const isAstChange = editor.operations.some((op: any) => op.type !== "set_selection")
        if (isAstChange) {
            setValue(value)
        }
    }

    useEffect(() => {
        lastSavedDataRef.current = initialData
    }, [initialData])

    return (
        <ClickAnywhere onClickAway={saveHandler} stopSelector={styles.kitEditorContainer}>
            <div className={styles.kitEditorContainer}>
                <div className={styles.textareaContainer}>
                    <SmoothSquircleWrapper isCanEdit={isCanEdit} editorFocus={isEditorFocused}>
                        <div
                            className={clsx(styles.textarea, {
                                [styles.isActive]: isCanEdit && isEditorFocused,
                            })}
                        >
                            <Slate editor={editor} value={value} onChange={changeHandler}>
                                <div className={styles.editorContainer}>
                                    <Editable
                                        renderElement={Element}
                                        renderLeaf={Leaf}
                                        placeholder={placeholder}
                                        className={styles.editor}
                                        onFocus={() => {
                                            setIsEditorFocused(true)
                                        }}
                                        onKeyDown={keyDownHandler}
                                    />
                                </div>
                                <div
                                    className={clsx(styles.toolbarContainer, {
                                        [styles.isActive]: isCanEdit && isEditorFocused,
                                    })}
                                >
                                    <Toolbar />

                                    <div onClick={saveHandler} className={styles.sendButton}>
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
