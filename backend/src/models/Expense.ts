import mongoose, { Document, Schema } from 'mongoose';

// Define the Expense interface
interface IExpense extends Document {
  name: string;
  amount: number;
  category: string;
  date: Date;
}

// Define the schema
const ExpenseSchema: Schema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Export the model
export default mongoose.model<IExpense>('Expense', ExpenseSchema);
