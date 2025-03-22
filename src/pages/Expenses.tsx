
import { useState, useEffect } from 'react';
import { Expense } from '@/lib/types';
import { getExpenses } from '@/lib/expenseUtils';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  // Load expenses from local storage
  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  // Handlers for updates
  const handleExpenseAdded = () => {
    setExpenses(getExpenses());
  };

  const handleExpenseDeleted = () => {
    setExpenses(getExpenses());
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        </div>
        <div className="md:col-span-2">
          <ExpenseList 
            expenses={expenses} 
            onExpenseDeleted={handleExpenseDeleted} 
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
