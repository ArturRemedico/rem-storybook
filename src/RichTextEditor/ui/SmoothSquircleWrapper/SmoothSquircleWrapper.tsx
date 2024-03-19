import { ReactNode } from "react"
import { SmoothSquircle } from "../../../_internal/SmoothSquircle"

export function SmoothSquircleWrapper({
    children,
    isCanEdit,
    editorFocus,
}: {
    children: ReactNode
    isCanEdit: boolean
    editorFocus: boolean
}) {
    const borderColor = (() => {
        if (editorFocus) return "#ececec"
        if (isCanEdit) return "#f5f5f5"
        return "#fff"
    })()

    const backgroundColor = isCanEdit ? "#f5f5f5" : "#fff"

    return (
        <SmoothSquircle
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            cornerRadius={10}
            customStyle={{
                transition: "all 0.3s ease",
            }}
        >
            {children}
        </SmoothSquircle>
    )
}
