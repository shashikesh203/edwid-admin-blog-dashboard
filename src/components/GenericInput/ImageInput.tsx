import React, { useEffect, useMemo, useState } from "react";

type ImageInputProps = {
  label?: string;
  name: string;
  value: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  accept?: string;
  className?: string;
};

export default function ImageInput({
  label,
  name,
  value,
  onChange,
  required = false,
  accept = "image/*",
  className = "",
}: ImageInputProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setObjectUrl(null);
  }, [value]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-start gap-4">
        <label className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer">
          <input
            id={name}
            name={name}
            type="file"
            accept={accept}
            onChange={handleFile}
            className="hidden"
          />
          <span className="text-sm text-gray-700">Choose Image</span>
        </label>
        {objectUrl ? (
          <img
            src={objectUrl}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-md border border-gray-200"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-md text-xs">
            No image
          </div>
        )}
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
