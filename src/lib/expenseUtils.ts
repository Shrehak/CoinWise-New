
import { Expense, Category, categories } from './types';

// Local storage key
const EXPENSES_STORAGE_KEY = 'coinwise_expenses';

// Generate a random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Save expenses to local storage
export const saveExpenses = (expenses: Expense[]): void => {
  localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
};

// Get expenses from local storage
export const getExpenses = (): Expense[] => {
  const expenses = localStorage.getItem(EXPENSES_STORAGE_KEY);
  return expenses ? JSON.parse(expenses) : [];
};

// Add a new expense
export const addExpense = (expense: Omit<Expense, 'id'>): Expense => {
  const newExpense: Expense = {
    ...expense,
    id: generateId(),
  };
  
  const expenses = getExpenses();
  const updatedExpenses = [newExpense, ...expenses];
  saveExpenses(updatedExpenses);
  
  return newExpense;
};

// Delete an expense
export const deleteExpense = (id: string): void => {
  const expenses = getExpenses();
  const updatedExpenses = expenses.filter(expense => expense.id !== id);
  saveExpenses(updatedExpenses);
};

// Update an expense
export const updateExpense = (updatedExpense: Expense): void => {
  const expenses = getExpenses();
  const updatedExpenses = expenses.map(expense => 
    expense.id === updatedExpense.id ? updatedExpense : expense
  );
  saveExpenses(updatedExpenses);
};

// Get total expenses
export const getTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Get expenses by category
export const getExpensesByCategory = (expenses: Expense[]): Record<Category, number> => {
  const expensesByCategory: Partial<Record<Category, number>> = {};
  
  categories.forEach(category => {
    expensesByCategory[category] = 0;
  });
  
  expenses.forEach(expense => {
    expensesByCategory[expense.category] = (expensesByCategory[expense.category] || 0) + expense.amount;
  });
  
  return expensesByCategory as Record<Category, number>;
};

// Get expenses for a specific date range
export const getExpensesForDateRange = (
  expenses: Expense[],
  startDate: Date,
  endDate: Date
): Expense[] => {
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= endDate;
  });
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Get the current date formatted as YYYY-MM-DD
export const getCurrentDateFormatted = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
