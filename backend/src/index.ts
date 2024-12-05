import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import expenseRoutes from './routes/expenseRoutes';

// Initialize environment variables
dotenv.config();

const app = express();

// MongoDB URI
const uri = process.env.MONGO_URI || "your-default-mongo-uri";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// console.log(process.env.MONGO_URI); // Check if the URI is correct
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Health Check Route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Routes
app.use('/api/auth', authRoutes); // Authentication Routes
app.use('/api/users', userRoutes); // User Routes
app.use('/api/expenses', expenseRoutes); // Expense Routes

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
