import React, { useState } from "react";
import axios from "axios";

const AddTransactionForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const clearFields = () => {
    setName("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ensure that the data is structured correctly
    const formData = {
      name,
      amount: parseFloat(amount), // Ensure amount is a number
      category,
      date,
    };

    try {
      // Make the API request to add the expense
      await axios.post("http://localhost:5000/api/expense", formData, {
        headers: {
          "Content-Type": "application/json", // Ensure correct content type
        },
      });

      console.log("Expense added:", formData);
      clearFields();
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to add transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-10 rounded-lg shadow-lg w-full max-w-sm mx-4 sm:mx-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <div className="flex flex-col gap-6">
          <h2 className="text-[#C67F54] text-2xl font-bold mb-4 text-center">
            Add an Expense
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-[#012527] border-b-2 border-gray-300 p-2 outline-none focus:border-[#C8EAEE]"
              required
            />
            <button
              type="submit"
              className="bg-[#1C3F43] text-white p-2 rounded-md hover:bg-[#375F63]"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Expense"}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionForm;
