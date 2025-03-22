
import { Budget, Category, Expense } from './types';
import { getExpensesForDateRange } from './expenseUtils';

// Local storage key
const BUDGETS_STORAGE_KEY = 'coinwise_budgets';

// Save budgets to local storage
export const saveBudgets = (budgets: Budget[]): void => {
  localStorage.setItem(BUDGETS_STORAGE_KEY, JSON.stringify(budgets));
};

// Get budgets from local storage
export const getBudgets = (): Budget[] => {
  const budgets = localStorage.getItem(BUDGETS_STORAGE_KEY);
  return budgets ? JSON.parse(budgets) : [];
};

// Add a new budget
export const addBudget = (budget: Omit<Budget, 'id'>): Budget => {
  const newBudget: Budget = {
    ...budget,
    id: Math.random().toString(36).substring(2, 9),
  };
  
  const budgets = getBudgets();
  const updatedBudgets = [newBudget, ...budgets];
  saveBudgets(updatedBudgets);
  
  return newBudget;
};

// Delete a budget
export const deleteBudget = (id: string): void => {
  const budgets = getBudgets();
  const updatedBudgets = budgets.filter(budget => budget.id !== id);
  saveBudgets(updatedBudgets);
};

// Update a budget
export const updateBudget = (updatedBudget: Budget): void => {
  const budgets = getBudgets();
  const updatedBudgets = budgets.map(budget => 
    budget.id === updatedBudget.id ? updatedBudget : budget
  );
  saveBudgets(updatedBudgets);
};

// Calculate budget progress
export const calculateBudgetProgress = (
  budget: Budget,
  expenses: Expense[]
): number => {
  let startDate: Date;
  let endDate = new Date();
  
  // Determine the start date based on the budget period
  switch (budget.period) {
    case 'daily':
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'weekly':
      startDate = new Date();
      startDate.setDate(startDate.getDate() - startDate.getDay());
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'monthly':
      startDate = new Date();
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'yearly':
      startDate = new Date();
      startDate.setMonth(0, 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    default:
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
  }
  
  // Get expenses for the specified period and category
  const periodExpenses = getExpensesForDateRange(expenses, startDate, endDate)
    .filter(expense => expense.category === budget.category);
  
  // Calculate the total spent for this category in the period
  const totalSpent = periodExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate the percentage spent (capped at 100%)
  return Math.min((totalSpent / budget.amount) * 100, 100);
};

// Format period name for display
export const formatPeriodName = (period: Budget['period']): string => {
  return period.charAt(0).toUpperCase() + period.slice(1);
};
