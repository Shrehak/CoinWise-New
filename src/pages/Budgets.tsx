
import { useState, useEffect } from 'react';
import { Expense, Budget } from '@/lib/types';
import { getExpenses } from '@/lib/expenseUtils';
import { getBudgets } from '@/lib/budgetUtils';
import BudgetForm from '@/components/BudgetForm';
import BudgetList from '@/components/BudgetList';

const BudgetsPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  
  // Load expenses and budgets from local storage
  useEffect(() => {
    setExpenses(getExpenses());
    setBudgets(getBudgets());
  }, []);

  // Handlers for updates
  const handleBudgetAdded = () => {
    setBudgets(getBudgets());
  };

  const handleBudgetDeleted = () => {
    setBudgets(getBudgets());
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
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
          <BudgetForm onBudgetAdded={handleBudgetAdded} />
        </div>
        <div className="md:col-span-2">
          <BudgetList 
            budgets={budgets} 
            expenses={expenses}
            onBudgetDeleted={handleBudgetDeleted} 
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetsPage;
