import React from "react";

type TextAreaBoxProps = {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    className?: string;
};

export default function TextAreaBox({
    label,
    name,
    value,
    onChange,
    placeholder,
    required,
    rows = 2,
    className = "",
}: TextAreaBoxProps) {
    const baseClasses =
        "w-full px-4 py-2 border border-gray-300 rounded-lg resize-none " +
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={baseClasses}
            />
        </div>
    );
}
