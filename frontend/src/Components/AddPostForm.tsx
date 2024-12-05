import React, { useState, useRef } from "react";
import axios from "axios";

const AddPostForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  if (!isOpen) return null;

  
  const clearFields = () => {
    setName("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:5000/api/posts/add", {
        name,
        description,
      });
      console.log("Form submitted:", { name, description });
      clearFields();
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to add destination. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    clearFields();
    onClose();
  };

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click on the hidden file input
    }
  };
  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // Convert FileList to Array
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]); // Append new files
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-10 rounded-lg shadow-lg w-full max-w-sm mx-4 sm:mx-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col gap-6">
          <h2 className="text-[#C67F54] text-2xl font-bold mb-4 text-center">
            Add your Destination
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Destination"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              required
            />

            <div className="flex flex-col gap-2">
              <div className="text-[#9CA3AF] pl-2">
                Add Destination pictures
              </div>
              <div className="flex justify-start items-center">
                <div
                  className="Add Button text-3xl bg-[#1C3F43] py-1 px-3.5 hover:bg-[#C67F54] rounded-full cursor-pointer"
                  onClick={handleAddImageClick}
                >
                  +
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleAddImageChange}
                  style={{ display: "none" }}
                />
                {/* Display selected image names next to the + button */}
                <div className="flex flex-wrap gap-2 ml-4">
                  {selectedImages.map((image, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-700 bg-gray-200 px-1 py-.5 rounded-md"
                    >
                      {image.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#1C3F43] text-white p-2 rounded-md hover:bg-[#375F63]"
            >
              Add Destination
            </button>
            <div className="flex justify-end text-[#1C3F43] font-semibold">
              ~As "Contributor"
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPostForm;
