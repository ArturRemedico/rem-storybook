/* eslint-disable */
import React, { useEffect } from "react"

const ClickAnyWhere: React.FC<{
    children: React.ReactNode
    onClickAway: () => void
    stopSelector: string
}> = ({ onClickAway, children, stopSelector }) => {
    useEffect(() => {
        const handl = (e: any) => {
            if (e.target && !e.target?.closest(stopSelector)) {
                onClickAway()
            }
        }

        window.addEventListener("click", handl, true)

        return () => window.removeEventListener("click", handl, true)
    }, [onClickAway])

    return <>{children}</>
}

export default ClickAnyWhere
