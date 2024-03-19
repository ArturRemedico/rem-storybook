import { FC, CSSProperties } from "react"
import KitTextEditor from "./TextEditor/KitTextEditor"

type TNotesProps = {
    title: string
    fieldId?: string
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
    fieldId,
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

            <KitTextEditor
                startText={startText}
                placeholder={placeholder}
                fieldId={fieldId}
                inpWrapSubStyle={inpWrapSubStyle}
                wrapSubStyle={wrapSubStyle}
                isEdit
            />
        </div>
    )
}

export default Notes
