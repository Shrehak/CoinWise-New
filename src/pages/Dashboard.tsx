
import { useState, useEffect } from 'react';
import { Expense, Budget } from '@/lib/types';
import { getExpenses } from '@/lib/expenseUtils';
import { getBudgets } from '@/lib/budgetUtils';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Load expenses and budgets from local storage
  useEffect(() => {
    setExpenses(getExpenses());
    setBudgets(getBudgets());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
      
      <Dashboard expenses={expenses} budgets={budgets} />
    </div>
  );
};

export default DashboardPage;
