import { withInline } from "../lib/util"
import { withHistory } from "slate-history"
import { ReactEditor, withReact } from "slate-react"
import { createEditor } from "slate"

export const editor: ReactEditor = withInline(withReact(withHistory(createEditor())))
