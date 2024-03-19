import { FC, CSSProperties } from "react"
import { RichTextEditor } from "./RichTextEditor"

type TNotesProps = {
    title: string
    placeholder?: string
    name: string
    appId: string
    startText: string
    status: string
    emplId: string
    inpWrapSubStyle?: CSSProperties
    wrapSubStyle?: CSSProperties
}

const Notes: FC<TNotesProps> = ({
    title,
    placeholder = "",
    startText,
    inpWrapSubStyle,
    wrapSubStyle,
}) => {
    return (
        <div
            style={{
                width: "100%",
                padding: "5px 0",
            }}
        >
            <p
                style={{
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#717171",
                    marginBottom: "5px",
                }}
            >
                {title}
            </p>

            <RichTextEditor
                startText={startText}
                placeholder={placeholder}
                inpWrapSubStyle={inpWrapSubStyle}
                wrapSubStyle={wrapSubStyle}
                isCanEdit
            />
        </div>
    )
}

export default Notes
