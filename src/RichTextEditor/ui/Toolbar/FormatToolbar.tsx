import React from "react"
import { useSlate } from "slate-react"
import { toggleMark, isMarkActive } from "../../lib/util"
import styles from "./FormatToolbar.module.scss"
import { BoldIcon, ItalicIcon, UnderLineIcon } from "../../const/Icons"
import { SmoothSquircle } from "../../../_internal/SmoothSquircle"
import { clsx } from "clsx"

export const FormatToolbar: React.FC = () => {
    const editor = useSlate()

    return (
        <div className={styles.formatToolbar}>
            <SmoothSquircle
                onClick={() => {
                    toggleMark(editor, "bold")
                }}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isMarkActive(editor, "bold"),
                })}
                cornerRadius={8}
                backgroundColor={isMarkActive(editor, "bold") ? "#000000" : "transparent"}
                borderColor="white"
            >
                <BoldIcon color={isMarkActive(editor, "bold") ? "#FFFFFF" : "#000000"} />
            </SmoothSquircle>

            <SmoothSquircle
                onClick={() => {
                    toggleMark(editor, "italic")
                }}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isMarkActive(editor, "italic"),
                })}
                cornerRadius={8}
                backgroundColor={isMarkActive(editor, "italic") ? "#000000" : "transparent"}
                borderColor="white"
            >
                <ItalicIcon color={isMarkActive(editor, "italic") ? "#FFFFFF" : "#000000"} />
            </SmoothSquircle>

            <SmoothSquircle
                onClick={() => {
                    toggleMark(editor, "underline")
                }}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isMarkActive(editor, "underline"),
                })}
                cornerRadius={8}
                backgroundColor={isMarkActive(editor, "underline") ? "#000" : "transparent"}
                borderColor="white"
            >
                <UnderLineIcon color={isMarkActive(editor, "underline") ? "#FFFFFF" : "#000000"} />
            </SmoothSquircle>
        </div>
    )
}
