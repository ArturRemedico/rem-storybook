import React, { useEffect, useRef } from "react"

export const ClickAnywhere: React.FC<{
    children: React.ReactNode
    onClickAway: () => void
    stopSelector: string
}> = ({ onClickAway, children, stopSelector }) => {
    const editorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            if (editorRef.current && editorRef.current.contains(target)) {
                return
            }

            if (target.closest(stopSelector)) {
                return
            }

            if (!(e.buttons & 1)) {
                const activeElement = document.activeElement
                if (activeElement && editorRef.current?.contains(activeElement)) {
                    return
                }
                onClickAway()
            }
        }

        window.addEventListener("click", handleClick, true)

        return () => {
            window.removeEventListener("click", handleClick, true)
        }
    }, [onClickAway])

    return <div ref={editorRef}>{children}</div>
}
