import { FC } from "react"
import { AlignToolbar } from "./AlignToolbar"
import { FormatToolbar } from "./FormatToolbar"
import { ListToolbar } from "./ListToolbar"
import { HeadingToolbar } from "./HeadingToolbar"
import styles from "./Toolbar.module.scss"
import SmoothSquircle from "../SmoothSquircle"

export const Toolbar: FC = () => {
    return (
        <SmoothSquircle className={styles.toolbar} cornerRadius={11}>
            <FormatToolbar />
            <AlignToolbar />
            <ListToolbar />
            <HeadingToolbar />
        </SmoothSquircle>
    )
}
