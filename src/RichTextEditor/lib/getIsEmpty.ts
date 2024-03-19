export function getIsEditorEmpty(value: string) {
    return value.replace(/<[^>]+>/g, "").length === 0
}
