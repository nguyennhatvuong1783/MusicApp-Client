"use client";

import { useEffect, useRef, useState } from "react";

const AutoTextSize = ({ text }: { text: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [fontSize, setFontSize] = useState<string>("5.5rem");

    useEffect(() => {
        const adjustFontSize = () => {
            if (containerRef.current && textRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                console.log(
                    "🚀 ~ adjustFontSize ~ containerWidth:",
                    containerWidth,
                );
                const textWidth = textRef.current.scrollWidth;
                console.log("🚀 ~ adjustFontSize ~ textWidth:", textWidth);
                const scaleFactor = containerWidth / textWidth;
                const baseFontSize = parseFloat(
                    window.getComputedStyle(textRef.current).fontSize,
                );
                // const newFontSize = Math.min(
                //     baseFontSize * scaleFactor,
                //     baseFontSize,
                // );
                const newFontSize = baseFontSize * scaleFactor;
                setFontSize(`${newFontSize}px`);
            }
        };

        adjustFontSize();
        window.addEventListener("resize", adjustFontSize);
        return () => window.removeEventListener("resize", adjustFontSize);
    }, [text]);

    return (
        <div ref={containerRef} className="max-w-full">
            <span
                ref={textRef}
                style={{ fontSize }}
                className="inline-block cursor-default leading-none font-extrabold"
            >
                {text}
            </span>
        </div>
    );
};

export default AutoTextSize;
