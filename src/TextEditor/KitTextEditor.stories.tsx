import type { Meta, StoryObj } from "@storybook/react"
import KitTextEditor from "./KitTextEditor"

const meta = {
    title: "Editor/TextEditor",
    component: KitTextEditor,
} satisfies Meta<typeof KitTextEditor>

export default meta
type Story = StoryObj<typeof meta>

export const TextEditor: Story = {
    args: {
        startText: "<p></p>",
        placeholder: "placeholder",
        label: "Notes",
        fieldId: "123333",
        inpWrapSubStyle: { padding: "6px 11px", minHeight: "100px" },
        isEdit: true,
    },
}
