import { FC, useState } from "react"
import { RichTextEditor } from "./RichTextEditor"
import { toast } from "sonner"

type TNotesProps = {
    title: string
    placeholder?: string
    name: string
    appId: string
    startText: string
    status: string
    emplId: string
}

const Notes: FC<TNotesProps> = ({ title, placeholder = "" }) => {
    const [startText, setStartText] = useState(() => {
        return localStorage.getItem("slate-html") ?? ""
    })

    async function saveHandler(v: string) {
        await new Promise(res => {
            setTimeout(() => {
                res("")
            }, 500)
        })

        setStartText(v)
        localStorage.setItem("slate-html", v)
        toast("Data saved", {
            style: {
                backgroundColor: "#31D9A4",
                color: "#fff",
            },
        })
    }

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
                initialData={startText}
                placeholder={placeholder}
                isCanEdit
                onSave={saveHandler}
            />
        </div>
    )
}

export default Notes
