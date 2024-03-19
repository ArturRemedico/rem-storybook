import type { Meta, StoryObj } from "@storybook/react"
import { RichTextEditor as Component } from "./RichTextEditor"
import "../../index.css"
import { Toaster, toast } from "sonner"

const meta = {
    title: "Editor/RichTextEditor",
    component: Component,
    decorators: [
        Story => {
            return (
                <div style={{ width: "900px" }}>
                    <Toaster />
                    <Story />
                </div>
            )
        },
    ],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const RichTextEditor: Story = {
    args: {
        initialValue: localStorage.getItem("slate-html") ?? "",
        placeholder: "placeholder",
        isCanEdit: true,
        onSave: async (value: string) => {
            await new Promise(res => {
                setTimeout(() => {
                    res("")
                }, 500)
            })

            localStorage.setItem("slate-html", value)
            toast("Data saved", {
                style: {
                    backgroundColor: "#31D9A4",
                    color: "#fff",
                },
            })
        },
    },
}
