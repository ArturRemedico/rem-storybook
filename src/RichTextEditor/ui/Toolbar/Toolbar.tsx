import { SmoothSquircle } from "../../../_internal/SmoothSquircle"
import { AlignToolbar } from "./AlignToolbar"
import { FormatToolbar } from "./FormatToolbar"
import { HeadingToolbar } from "./HeadingToolbar"
import { ListToolbar } from "./ListToolbar"
import styles from "./Toolbar.module.scss"

export function Toolbar() {
    return (
        <SmoothSquircle className={styles.toolbar} cornerRadius={11}>
            <HeadingToolbar />
            <FormatToolbar />
            <AlignToolbar />
            <ListToolbar />
        </SmoothSquircle>
    )
}
