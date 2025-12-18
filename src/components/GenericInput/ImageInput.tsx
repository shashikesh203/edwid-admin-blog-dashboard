import React, { useEffect, useState } from "react";

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
    <div className={`flex flex-col items-center gap-3 ${className}`}>

      <div className="w-full h-32 md:h-52  border-1 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center ">
        {objectUrl ? (
          <img
            src={objectUrl}
            alt="Image Preview"
            className="w-full h-full"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* Upload Button */}
      <label className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          onChange={handleFile}
          className="hidden"
        />
        Upload Image {label && (
          <span className="text-sm font-medium text-gray-700">{required && <span className="text-red-500">*</span>}</span>
        )}
      </label>
    </div>
  );
}
