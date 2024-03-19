import isHotkey from "is-hotkey"
import { isBlockActive, toggleBlock, toggleMark } from "./util"
import { KeyboardEvent } from "react"
import { HOTKEYS } from "../const/hotkeys"
import { editor } from "../model/editor"

export function keyDownHandler(event: KeyboardEvent<HTMLDivElement>) {
    for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
            if (event.key !== "Enter") {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
            } else {
                if (isBlockActive(editor, "bulleted-list")) {
                    setTimeout(() => toggleBlock(editor, "bulleted-list"), 0)
                } else if (isBlockActive(editor, "numbered-list")) {
                    setTimeout(() => toggleBlock(editor, "numbered-list"), 0)
                }
            }
        }
    }
}
