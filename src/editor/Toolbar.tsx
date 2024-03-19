import { FC } from "react"
import { AlignToolbar } from "./AlignToolbar"
import { FormatToolbar } from "./FormatToolbar"
import { ListToolbar } from "./ListToolbar"
import { HeadingToolbar } from "./HeadingToolbar"
import SmoothSquircle from "../SmoothSquircle"
import styles from "./Toolbar.module.scss"

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
