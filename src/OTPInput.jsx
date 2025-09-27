import React, { useRef, useEffect, useState } from "react";

export const OTPInput = ({
    length = 6,
    value = "",
    onChange,
    onComplete,
    autoFocus = true,
    mask = false,
    shape = "box", // "box" | "circle" | "underline"
    size = 50,
    gap = 8,
    colors = {
        border: "#ccc",
        focus: "#0070f3",
        text: "#111",
        background: "#fff",
        error: "#f00",
    },
    error = false,
}) => {
    const inputsRef = useRef([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    useEffect(() => {
        if (autoFocus && inputsRef.current[0]) inputsRef.current[0].focus();
    }, [autoFocus]);

    const handleChange = (index, e) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 1);
        const newValArr = value.split("").slice(0, length);
        newValArr[index] = val;
        const newVal = newValArr.join("");
        onChange && onChange(newVal);

        // Move focus
        if (val && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }

        // Trigger complete
        if (newVal.length === length && !newVal.includes(undefined)) {
            onComplete && onComplete(newVal);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (!inputsRef.current[index].value && index > 0) {
                inputsRef.current[index - 1].focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputsRef.current[index - 1].focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        onChange && onChange(pasteData);
        if (pasteData.length === length) onComplete && onComplete(pasteData);
    };

    const getStyle = (index) => ({
        width: size,
        height: size,
        lineHeight: `${size}px`,
        textAlign: "center",
        fontSize: size * 0.5,
        marginRight: index < length - 1 ? gap : 0,
        borderRadius: shape === "circle" ? "50%" : shape === "underline" ? 0 : "8px",
        border: shape === "underline"
            ? `0 0 2px solid ${error ? colors.error : focusedIndex === index ? colors.focus : colors.border}`
            : `2px solid ${error ? colors.error : focusedIndex === index ? colors.focus : colors.border}`,
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: colors.background,
        color: colors.text,
        boxShadow: focusedIndex === index ? `0 0 8px ${colors.focus}33` : "none",
        transform: focusedIndex === index ? "scale(1.05)" : "scale(1)",
        // Fix text color for masked inputs
        WebkitTextSecurity: mask ? "disc" : "none",
    });

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    type="text"
                    maxLength={1}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={value[i] || ""}
                    onChange={(e) => handleChange(i, e)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    style={getStyle(i)}
                    onFocus={(e) => {
                        setFocusedIndex(i);
                        e.target.select();
                    }}
                    onBlur={() => setFocusedIndex(-1)}
                />
            ))}
        </div>
    );
};

export default OTPInput;
