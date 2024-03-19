import React from "react"
import { useSlate } from "slate-react"
import { toggleBlock, isBlockActive } from "./util"
import styles from "./ListToolbar.module.scss"
import { classNames } from "../../class"
import { NumberListIcon, BulletListIcon } from "../Icons"
import SmoothSquircle from "../SmoothSquircle"

export const ListToolbar: React.FC = () => {
    const editor = useSlate()

    return (
        <div className={styles.listToolbar}>
            <SmoothSquircle
                onClick={() => toggleBlock(editor, "numbered-list")}
                className={classNames(styles.tool, {
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
                className={classNames(styles.tool, {
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
