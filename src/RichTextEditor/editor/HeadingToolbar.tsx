import React from "react"
import { useSlate } from "slate-react"
import { toggleBlock, isBlockActive } from "./util"
import styles from "./HeadingToolbar.module.scss"
import { clsx } from "clsx"
import { SmoothSquircle } from "../../_internal/SmoothSquircle"

export const HeadingToolbar: React.FC = () => {
    const editor = useSlate()

    return (
        <div className={styles.headingToolbar}>
            <SmoothSquircle
                onClick={() => {
                    toggleBlock(editor, "h1")
                }}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isBlockActive(editor, "h1"),
                })}
                cornerRadius={8}
                backgroundColor={isBlockActive(editor, "h1") ? "#000" : "transparent"}
                borderColor="white"
            >
                <p>H1</p>
            </SmoothSquircle>

            <SmoothSquircle
                onClick={() => {
                    toggleBlock(editor, "h2")
                }}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isBlockActive(editor, "h2"),
                })}
                cornerRadius={8}
                backgroundColor={isBlockActive(editor, "h2") ? "#000" : "transparent"}
                borderColor="white"
            >
                <p>H2</p>
            </SmoothSquircle>
        </div>
    )
}
