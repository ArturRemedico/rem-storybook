import type { Meta, StoryObj } from "@storybook/react"
import { RichTextEditor as Component } from "./RichTextEditor"
import "../index.css"
import { Toaster } from "sonner"

const meta = {
    title: "Editor/RichTextEditor",
    component: Component,
    decorators: [
        Story => (
            <div>
                <Toaster />
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const RichTextEditor: Story = {
    args: {
        startText: "<p></p>",
        placeholder: "placeholder",
        label: "Notes",
        inpWrapSubStyle: { padding: "6px 11px", minHeight: "100px" },
        isCanEdit: true,
    },
}
