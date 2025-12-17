import React, { useMemo, useState } from "react";
import InputBox from "./GenericInput/InputBox";
import ImageInput from "./GenericInput/ImageInput";
import SelectBox, { type SelectOption } from "./GenericInput/SelectBox";

type BlogStatus = "draft" | "published";

type AddBlogModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddBlogModal({ isOpen, onClose }: AddBlogModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    publishedDate: "",
    status: "" as "" | BlogStatus,
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { label: "Draft", value: "draft" },
      { label: "Published", value: "published" },
    ],
    []
  );

  const categoryOptions: SelectOption[] = useMemo(
    () => [
      { label: "Travel", value: "Travel" },
      { label: "Food Theory", value: "Food Theory" },
      { label: "Lifestyle", value: "Lifestyle" },
    ],
    []
  );

  const onFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.description.trim()) next.description = "Description is required";
    if (!form.category.trim()) next.category = "Category is required";
    if (!form.author.trim()) next.author = "Author is required";
    if (!form.publishedDate) next.publishedDate = "Published date is required";
    if (!form.status) next.status = "Status is required";
    if (!image) next.image = "Image is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // eslint-disable-next-line no-console
    console.log("New blog:", { ...form, image });

    onClose();
    setForm({
      title: "",
      description: "",
      category: "",
      author: "",
      publishedDate: "",
      status: "",
    });
    setImage(null);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add New Blog</h3>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 grid grid-cols-1 gap-4">
          <InputBox
            label="Title"
            name="title"
            value={form.title}
            onChange={onFieldChange}
            placeholder="Enter title"
            required
          />
          {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}

          <InputBox
            label="Description"
            as="textarea"
            name="description"
            value={form.description}
            onChange={onFieldChange}
            placeholder="Write the description"
            required
          />
          {errors.description && (
            <p className="text-xs text-red-600">{errors.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <SelectBox
                label="Category"
                name="category"
                value={form.category}
                onChange={(v) => setForm((f) => ({ ...f, category: v }))}
                placeholder="e.g. Travel"
                options={categoryOptions}
                allowCustom
                required
              />
              {errors.category && (
                <p className="text-xs text-red-600">{errors.category}</p>
              )}
            </div>
            <div>
              <InputBox
                label="Author"
                name="author"
                value={form.author}
                onChange={onFieldChange}
                placeholder="Author name"
                required
              />
              {errors.author && (
                <p className="text-xs text-red-600">{errors.author}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <InputBox
                label="Published Date"
                name="publishedDate"
                value={form.publishedDate}
                onChange={onFieldChange}
                type="date"
                required
              />
              {errors.publishedDate && (
                <p className="text-xs text-red-600">{errors.publishedDate}</p>
              )}
            </div>
            <div>
              <SelectBox
                label="Status"
                name="status"
                value={form.status}
                onChange={(v) => setForm((f) => ({ ...f, status: v as BlogStatus }))}
                placeholder="Select status"
                options={statusOptions}
                required
              />
              {errors.status && (
                <p className="text-xs text-red-600">{errors.status}</p>
              )}
            </div>
          </div>

          <div>
            <ImageInput
              label="Image"
              name="image"
              value={image}
              onChange={setImage}
              required
            />
            {errors.image && (
              <p className="text-xs text-red-600">{errors.image}</p>
            )}
          </div>

          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
            >
              Save Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
