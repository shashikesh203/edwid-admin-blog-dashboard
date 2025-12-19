import React, { useEffect, useState } from "react";
import InputBox from "../GenericInput/InputBox";
import ImageInput from "../GenericInput/ImageInput";
import TextAreaBox from "../GenericInput/TextAreaBox";
import SelectOptions from "../GenericInput/SelectOptions";
import Category from "../../utils/enums/categoryEnum";
import BlogStatus from "../../utils/enums/statusEnum";
import type { BlogPost } from "../../pages/Blogs";


interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleBlogDetails?: (data: BlogPost) => void;
};

interface BlogFormData {
  title: string;
  description: string;
  category: string;
  author: string;
  publishedDate: string;
  status: string;
  imageUrl?: string;

}

interface ErrorMessages {
  title?: string;
  description?: string;
  category?: string;
  author?: string;
  publishedDate?: string;
  status?: string;
  image?: string;
}

export default function AddBlogModal({ handleBlogDetails, isOpen, onClose }: AddBlogModalProps) {
  const [form, setForm] = useState<BlogFormData>({
    title: "",
    description: "",
    category: "",
    author: "",
    publishedDate: "",
    status: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [errorsMessage, setErrorsMessage] = useState<ErrorMessages>({});

  const onFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };
      validate(updatedForm, name, value);
      return updatedForm;
    });
  };

  const validate = (formData: BlogFormData, fieldName: string, value: string) => {
    switch (fieldName) {
      case "title":
        if (!value.trim()) {
          setErrorsMessage((prev) => ({ ...prev, title: "Title is required" }));
        } else if (value.trim().length < 5) {
          setErrorsMessage((prev) => ({ ...prev, title: "Title must be at least 5 characters" }));
        } else if (value.trim().length > 20) {
          setErrorsMessage((prev) => ({ ...prev, title: "Title must be less than 20 characters" }));
        } else {
          setErrorsMessage((prev) => ({ ...prev, title: "" }));
        }
        break;
      case "description":
        if (value.trim().length > 50) {
          setErrorsMessage((prev) => ({ ...prev, description: "Description must be at most 50 characters" }));
        }
        else {
          setErrorsMessage((prev) => ({ ...prev, description: "" }));
        }
        break;
      case "author":
        if (!value.trim()) {
          setErrorsMessage((prev) => ({ ...prev, author: "Author is required" }));
        } else {
          setErrorsMessage((prev) => ({ ...prev, author: "" }));
        }
        break;
      case "publishedDate":
        if (!value.trim()) {
          setErrorsMessage((prev) => ({ ...prev, publishedDate: "Published date is required" }));
        } else {
          setErrorsMessage((prev) => ({ ...prev, publishedDate: "" }));
        }
        break;
      case "status":
        if (!value.trim()) {
          setErrorsMessage((prev) => ({ ...prev, status: "Status is required" }));
        } else {
          setErrorsMessage((prev) => ({ ...prev, status: "" }));
        }
        break;
      case "image":
        if (!image) {
          setErrorsMessage((prev) => ({ ...prev, image: "Image is required" }));
        } else {
          setErrorsMessage((prev) => ({ ...prev, image: "" }));
        }
        break;
      case "category":
        if (!value.trim()) {
          setErrorsMessage((prev) => ({ ...prev, category: "Category is required" }));
        } else {
          setErrorsMessage((prev) => ({ ...prev, category: "" }));
        }
        break;
    
  
      default:
        break;
    }

  };

  const validateForm = (formData: BlogFormData, image: File | null) => {
    const errors: ErrorMessages = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length < 5) {
      errors.title = "Title must be at least 5 characters";
    } else if (formData.title.length > 20) {
      errors.title = "Title must be less than 20 characters";
    }

    if (formData.description.length > 50) {
      errors.description = "Description must be at most 50 characters";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.author.trim()) {
      errors.author = "Author is required";
    }

    if (!formData.publishedDate) {
      errors.publishedDate = "Published date is required";
    }

    if (!formData.status) {
      errors.status = "Status is required";
    }

    if (!image) {
      errors.image = "Image is required";
    }

    return errors;
  };


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form, image);
    setErrorsMessage(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    const blogData = {
      ...form,
      id: Date.now(),
      imageUrl: image ? URL.createObjectURL(image) : undefined,
    };

    handleBlogDetails?.(blogData);
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
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrorsMessage({});
    setForm({
      title: "",
      description: "",
      category: "",
      author: "",
      publishedDate: "",
      status: "",
    });
    setImage(null);
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add New Blog</h3>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 hover:cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 grid grid-cols-1 gap-4">
          <div>
            <ImageInput
              label="Image"
              name="image"
              value={image}
              onChange={(file) => {
                setImage(file);

                if (!file) {
                  setErrorsMessage((prev) => ({
                    ...prev,
                    image: "Image is required",
                  }));
                  return;
                }

                if (file.size > 1024 * 1024) {
                  setImage(null);
                  setErrorsMessage((prev) => ({
                    ...prev,
                    image: "Image must be less than 1 MB",
                  }));
                  return;
                }

                setErrorsMessage((prev) => ({
                  ...prev,
                  image: "",
                }));
              }}
              required
            />

            {errorsMessage.image && (
              <p className="text-xs text-red-600">{errorsMessage.image}</p>
            )}
          </div>
          <InputBox
            label="Title"
            name="title"
            value={form.title}
            onChange={onFieldChange}
            placeholder="Enter title"
            required
          />
          {errorsMessage.title && <p className="text-xs text-red-600">{errorsMessage.title}</p>}

          <TextAreaBox
            label="Description"
            name="description"
            value={form.description}
            onChange={onFieldChange}
            placeholder="Write the description"
          />
          {errorsMessage.description && (
            <p className="text-xs text-red-600">{errorsMessage.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <SelectOptions
                label="Category"
                name="category"
                value={form.category}
                onChange={onFieldChange}
                placeholder="e.g. Travel"
                options={Object.values(Category).map((value) => ({
                  label: value,
                  value: value,
                }))}
              />
              {errorsMessage.category && (
                <p className="text-xs text-red-600">{errorsMessage.category}</p>
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
              {errorsMessage.author && (
                <p className="text-xs text-red-600">{errorsMessage.author}</p>
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
              {errorsMessage.publishedDate && (
                <p className="text-xs text-red-600">{errorsMessage.publishedDate}</p>
              )}
            </div>
            <div>
              <SelectOptions
                label="Status"
                name="status"
                value={form.status}
                onChange={onFieldChange}
                placeholder="Select status"
                options={Object.values(BlogStatus).map((value) => ({
                  label: value,
                  value: value,
                }))}
              />
              {errorsMessage.status && (
                <p className="text-xs text-red-600">{errorsMessage.status}</p>
              )}
            </div>
          </div>



          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-blue-900 text-white hover:bg-blue-800 hover:cursor-pointer"
            >
              Save Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
