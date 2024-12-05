// components/DestinationForm.tsx
import React, { useState } from "react";
import axios from "axios";

const DestinationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [src, setSrc] = useState<string[]>([]); // Modify this based on how you handle image uploads

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.BACKEND_URL}/api/destinations`, {
        name,
        description,
        src,
        contributor: "LoggedInUserId", // Replace with actual logged-in user ID
      });
      // Handle successful submission (e.g., show a message, reset form)
      setName("");
      setDescription("");
      setSrc([]);
    } catch (error) {
      console.error("Error posting destination:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-8"
    >
      <h2 className="text-xl font-semibold mb-4">Add a New Destination</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Destination Name"
        required
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
      />
      {/* Add your image upload/input here */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default DestinationForm;
