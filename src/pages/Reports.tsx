
import { useState, useEffect } from 'react';
import { Expense, Budget, Category, categoryColors } from '@/lib/types';
import { getExpenses, getExpensesByCategory } from '@/lib/expenseUtils';
import { getBudgets } from '@/lib/budgetUtils';
import Chart from '@/components/Chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, BarChartHorizontal, CalendarDays, TrendingUp } from 'lucide-react';

const ReportsPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  
  // Load expenses and budgets from local storage
  useEffect(() => {
    setExpenses(getExpenses());
    setBudgets(getBudgets());
  }, []);

  const expensesByCategory = getExpensesByCategory(expenses);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
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
      
      <Tabs defaultValue="expenses">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="expenses">
            <BarChartHorizontal className="h-4 w-4 mr-2" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="trends">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="expenses" className="space-y-6 mt-6">
          <Chart data={expensesByCategory} title="Expense Distribution" />
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trend analysis will be available in the next update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Calendar view will be available in the next update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
