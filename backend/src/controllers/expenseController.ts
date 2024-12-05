import { Request, Response } from "express";
import Expense from "../models/Expense";

// Add Expense
export const addExpense = async (req: Request, res: Response) => {
  const { name, amount, category, date } = req.body;

  if (!name || !amount || !category || !date) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newExpense = new Expense({ name, amount, category, date });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
};

// Get All Expenses
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

// Update Expense
export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, amount, category, date } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { name, amount, category, date },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(400).json({ error: "Failed to update expense" });
  }
};

// Delete Expense
export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
