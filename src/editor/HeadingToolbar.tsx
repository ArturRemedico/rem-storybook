import React from "react"
import { useSlate } from "slate-react"
import { toggleBlock, isBlockActive } from "./util"
import SmoothSquircle from "../SmoothSquircle"
import { classNames } from "../class"
import styles from "./HeadingToolbar.module.scss"

export const HeadingToolbar: React.FC = () => {
    const editor = useSlate()

    return (
        <div className={styles.headingToolbar}>
            <SmoothSquircle
                onClick={() => {
                    toggleBlock(editor, "h1")
                }}
                className={classNames(styles.tool, {
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
                className={classNames(styles.tool, {
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