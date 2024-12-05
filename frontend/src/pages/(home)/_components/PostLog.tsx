import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import AddPostForm from "./AddPostForm";
import axios from "axios"; // For making HTTP requests

const PostLog = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [expenses, setExpenses] = useState<any[]>([]); // Set type to any for now, or you can define a custom type

  // Fetch expenses from the backend using axios
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/expenses"); // Use axios for fetching data
        setExpenses(response.data); // Set expenses to the fetched data
        console.log("Fetched expenses:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []); // Empty dependency array to run only once after the component mounts

  const handleAddPostClick = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  // Handle Delete Expense
  const handleDeleteExpense = async (id: string) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      // After deleting, fetch updated expenses
      const response = await axios.get("/api/expenses");
      setExpenses(response.data); // Update state with the new data after deletion
    } catch (error) {
      console.error("Failed to delete expense", error);
    }
  };

  // Handle Edit Expense
  const handleEditExpense = (id: string) => {
    console.log(`Edit expense with id: ${id}`);
    // Implement your edit logic here, such as opening the form with pre-filled data
  };

  return (
    <>
      <div className="flex flex-col bg-[#020404] pt-20 md:pt-28 pb-10 md:pb-26 px-4 sm:px-8 md:px-10 lg:px-20 gap-4 md:gap-8">
        <div className="ContributorSegment flex flex-col md:mt-4 sm:flex-row gap-4 sm:gap-8 justify-end">
          <div className="flex justify-end items-center gap-2">
            <div>~Sara</div>
            <button
              onClick={() => {}}
              className="ContributorNameInitial text-2xl font-semibold text-[#012527] bg-[#1C3F43] hover:bg-[#C67F54] hover:text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <>-</>
            </button>
          </div>

          <div className="flex justify-end items-center gap-2">
            <div>Add Expense</div>
            <button
              onClick={handleAddPostClick}
              className="text-3xl bg-[#1C3F43] hover:bg-[#C67F54] text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              +
            </button>
          </div>

          <div className="flex justify-end items-center gap-2">
            <div>Sort</div>
            <button
              onClick={() => {}}
              className="text-3xl bg-[#1C3F43] hover:bg-[#C67F54] text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              .
            </button>
          </div>

          <div className="flex justify-end items-center gap-2">
            <div>Filter</div>
            <button
              onClick={() => {}}
              className="text-3xl bg-[#1C3F43] hover:bg-[#C67F54] text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              .
            </button>
          </div>
        </div>

        {/* Expense Table */}
        <div className="mt-8 bg-[#537579] py-6 px-2 md:px-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center text-[#1C3F43]">
            Expense Log
          </h2>

          {/* Add a wrapper for the table to enable horizontal scrolling on small screens */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-left ">
              <thead>
                <tr className="bg-[#C8EAEE] text-[#012527]">
                  <th className="border border-gray-300 p-2">Delete</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Amount</th>
                  <th className="border border-gray-300 p-2">Category</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-4">
                      No expenses found.
                    </td>
                  </tr>
                ) : (
                  expenses.map((expense) => (
                    <tr key={expense._id} className="hover:bg-[#012E30]">
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          onClick={() => handleDeleteExpense(expense._id)}
                          className="text-[#012527]"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {expense.name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        ${expense.amount}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {expense.category}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          onClick={() => handleEditExpense(expense._id)}
                          className="text-[#012527]"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddPostForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </>
  );
};

export default PostLog;
