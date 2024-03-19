/* eslint-disable */
import React, { CSSProperties, PropsWithChildren, useEffect, useRef } from "react"
import { squircleObserver } from "corner-smoothing"

type TSmoothSquircleProps = {
    cornerRadius?: number
    borderWidth?: number
    backgroundColor?: string
    cornerSmoothing?: number
    borderColor?: string
    customStyle?: CSSProperties
    className?: string
    onClick?: () => void
}

export const SmoothSquircle: React.FC<PropsWithChildren<TSmoothSquircleProps>> = ({
    className,
    backgroundColor = "white",
    borderColor = "#ECECEC",
    borderWidth = 1.1,
    cornerRadius = 20,
    cornerSmoothing = 1,
    children,
    customStyle,
    onClick,
    ...rest
}) => {
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const renderSquircle = squircleObserver(ref?.current as any, {
            borderWidth,
            cornerRadius,
            cornerSmoothing,
        })

        if (ref.current) {
            renderSquircle()
        }
        return () => {
            renderSquircle.disconnect()
        }
    }, [ref.current, borderColor, backgroundColor])

    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                width: "100%",
                height: "auto",
                background: borderColor,
                padding: "0",
                ...customStyle,
            }}
            ref={ref}
            {...rest}
        >
            {children}
        </div>
    )
}
