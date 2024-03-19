import { FC } from "react"
import { toggleBlock, isBlockActive } from "../../lib/util"
import { useSlate } from "slate-react"
import styles from "./AlignToolbar.module.scss"
import { CenterIcon, RightIcon, JustifyIcon } from "../../const/Icons"
import { SmoothSquircle } from "../../../_internal/SmoothSquircle"
import { clsx } from "clsx"

export const AlignToolbar: FC = () => {
    const editor = useSlate()

    return (
        <div className={styles.alignToolbar}>
            <SmoothSquircle
                onClick={() => toggleBlock(editor, "center")}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isBlockActive(editor, "center", "align"),
                })}
                cornerRadius={8}
                backgroundColor={isBlockActive(editor, "center", "align") ? "#000" : "transparent"}
                borderColor="white"
            >
                <CenterIcon color={isBlockActive(editor, "center", "align") ? "#FFF" : "#000"} />
            </SmoothSquircle>

            <SmoothSquircle
                onClick={() => toggleBlock(editor, "right")}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isBlockActive(editor, "right", "align"),
                })}
                cornerRadius={8}
                backgroundColor={isBlockActive(editor, "right", "align") ? "#000" : "transparent"}
                borderColor="white"
            >
                <RightIcon color={isBlockActive(editor, "right", "align") ? "#FFF" : "#000"} />
            </SmoothSquircle>

            <SmoothSquircle
                onClick={() => toggleBlock(editor, "justify")}
                className={clsx(styles.tool, {
                    [styles.toolActive]: isBlockActive(editor, "justify", "align"),
                })}
                cornerRadius={8}
                backgroundColor={isBlockActive(editor, "justify", "align") ? "#000" : "transparent"}
                borderColor="white"
            >
                <JustifyIcon color={isBlockActive(editor, "justify", "align") ? "#FFF" : "#000"} />
            </SmoothSquircle>
        </div>
    )
}
