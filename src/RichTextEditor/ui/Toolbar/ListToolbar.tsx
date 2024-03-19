import React from "react"
import { useSlate } from "slate-react"
import { toggleBlock, isBlockActive } from "../../lib/util"
import styles from "./ListToolbar.module.scss"
import { NumberListIcon, BulletListIcon } from "../../const/Icons"
import { SmoothSquircle } from "../../../_internal/SmoothSquircle"
import { clsx } from "clsx"

export const ListToolbar: React.FC = () => {
    const editor = useSlate()

    return (
        <div className={styles.listToolbar}>
            <SmoothSquircle
                onClick={() => toggleBlock(editor, "numbered-list")}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isBlockActive(editor, "numbered-list"),
                })}
                cornerRadius={8}
                backgroundColor={isBlockActive(editor, "numbered-list") ? "#000" : "transparent"}
                borderColor="white"
            >
                <NumberListIcon color={isBlockActive(editor, "numbered-list") ? "#FFF" : "#000"} />
            </SmoothSquircle>

            <SmoothSquircle
                onClick={() => toggleBlock(editor, "bulleted-list")}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isBlockActive(editor, "bulleted-list"),
                })}
                cornerRadius={8}
                backgroundColor={isBlockActive(editor, "bulleted-list") ? "#000" : "transparent"}
                borderColor="white"
            >
                <BulletListIcon color={isBlockActive(editor, "bulleted-list") ? "#FFF" : "#000"} />
            </SmoothSquircle>
        </div>
    )
}
