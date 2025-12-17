import React from "react";

export type Option = { label: string; value: string };

type InputBoxProps = {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    placeholder?: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    as?: "input" | "textarea" | "select";
    options?: Option[]; // for select
    required?: boolean;
    className?: string;
};

export default function InputBox({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    as = "input",
    options = [],
    required = false,
    className = "",
}: InputBoxProps) {
    const baseClasses =
        "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            {as === "textarea" ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${baseClasses} min-h-24 resize-y`}
                />
            ) : as === "select" ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={baseClasses}
                >
                    <option value="" disabled>
                        {placeholder || "Select an option"}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type}
                    className={baseClasses}
                //   required={required}
                />
            )}
        </div>
    );
}
