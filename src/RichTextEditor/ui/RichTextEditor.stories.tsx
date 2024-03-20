import type { Meta, StoryObj } from "@storybook/react"
import { RichTextEditor as Component } from "./RichTextEditor"
import "../../index.css"
import { Toaster, toast } from "sonner"
import { useState } from "react"

const meta = {
    title: "Editor/RichTextEditor",
    component: Component,
    decorators: [
        Story => {
            const [startText, setStartText] = useState(() => {
                return localStorage.getItem("slate-html") ?? "<p ></p>"
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
                <div style={{ width: "900px" }}>
                    <Toaster />
                    <Story
                        args={{
                            initialData: startText,
                            onSave: saveHandler,
                            placeholder: "placeholder",
                            isCanEdit: true,
                        }}
                    />
                </div>
            )
        },
    ],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof Component>

export const RichTextEditor: Story = {}
