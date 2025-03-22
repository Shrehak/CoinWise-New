
import { useMemo } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  Calendar, 
  ArrowDown, 
  ArrowUp,
  CreditCard,
  Sparkles,
  Flame,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { Expense, Budget, Category } from '@/lib/types';
import { 
  getTotalExpenses, 
  getExpensesByCategory, 
  formatCurrency 
} from '@/lib/expenseUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Chart from './Chart';

interface DashboardProps {
  expenses: Expense[];
  budgets: Budget[];
}

const Dashboard = ({ expenses, budgets }: DashboardProps) => {
  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return getTotalExpenses(expenses);
  }, [expenses]);
  
  // Get expenses by category
  const expensesByCategory = useMemo(() => {
    return getExpensesByCategory(expenses);
  }, [expenses]);
  
  // Calculate total budgeted amount
  const totalBudgeted = useMemo(() => {
    return budgets.reduce((total, budget) => total + budget.amount, 0);
  }, [budgets]);
  
  // Get current month name
  const currentMonth = useMemo(() => {
    return new Date().toLocaleString('default', { month: 'long' });
  }, []);
  
  // Filter expenses for the current month
  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= firstDayOfMonth && expenseDate <= lastDayOfMonth;
    });
  }, [expenses]);
  
  // Calculate total expenses for the current month
  const currentMonthTotal = useMemo(() => {
    return getTotalExpenses(currentMonthExpenses);
  }, [currentMonthExpenses]);
  
  // Get expenses by category for the current month
  const currentMonthByCategory = useMemo(() => {
    return getExpensesByCategory(currentMonthExpenses);
  }, [currentMonthExpenses]);
  
  // Find the category with the highest expenses
  const highestCategory = useMemo(() => {
    if (Object.keys(currentMonthByCategory).length === 0) return null;
    
    return Object.entries(currentMonthByCategory)
      .reduce((highest, [category, amount]) => 
        amount > highest.amount ? { category: category as Category, amount } : highest, 
        { category: 'Other' as Category, amount: 0 }
      );
  }, [currentMonthByCategory]);

  // Calculate spending compared to budget
  const spendingRatio = useMemo(() => {
    if (totalBudgeted === 0) return 0;
    return (currentMonthTotal / totalBudgeted) * 100;
  }, [currentMonthTotal, totalBudgeted]);
  
  return (
    <div className="space-y-8 animate-in relative z-10">
      <div className="text-center mb-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse-subtle"></div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-500 bg-clip-text text-transparent animate-fade-in relative">
          Financial Dashboard
          <span className="absolute -top-1 -right-4">
            <Sparkles size={20} className="text-amber-400 animate-pulse" />
          </span>
        </h1>
        <p className="text-muted-foreground mt-2 animate-fade-in stagger-1 max-w-md mx-auto">
          Track your spending habits and stay on budget with our intelligent finance tools
        </p>
      </div>

      {/* Main dashboard layout - Improved grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column: Stats cards and budget utilization */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats cards grid - Enhanced with better spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Total Expenses Card - Enhanced */}
            <Card className="glass-card overflow-hidden relative border border-primary/20 shadow-lg hover-lift shine-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/5 z-0"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                    <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalExpenses)}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center shadow-inner">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      All expenses combined
                    </p>
                    <Zap size={14} className="text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Current Month Card - Enhanced */}
            <Card className="glass-card overflow-hidden relative border border-purple-500/20 shadow-lg hover-lift shine-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-primary/5 z-0"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{currentMonth}</p>
                    <h3 className="text-2xl font-bold mt-1">{formatCurrency(currentMonthTotal)}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-500/15 flex items-center justify-center shadow-inner">
                    <Calendar className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Current month spending
                    </p>
                    <TrendingUp size={14} className="text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Budget Coverage Card - Enhanced */}
            <Card className="glass-card overflow-hidden relative border border-blue-400/20 shadow-lg hover-lift shine-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-primary/5 z-0"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budgeted</p>
                    <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalBudgeted)}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-400/15 flex items-center justify-center shadow-inner">
                    <TrendingDown className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {budgets.length} {budgets.length === 1 ? 'budget' : 'budgets'} created
                    </p>
                    <Award size={14} className="text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Highest Category Card - Enhanced */}
            <Card className="glass-card overflow-hidden relative border border-orange-500/20 shadow-lg hover-lift shine-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-primary/5 z-0"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Top Category</p>
                    <h3 className="text-xl font-bold mt-1">
                      {highestCategory ? highestCategory.category : 'N/A'}
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-500/15 flex items-center justify-center shadow-inner">
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {highestCategory 
                        ? `${formatCurrency(highestCategory.amount)} this month` 
                        : 'No expenses this month'
                      }
                    </p>
                    <CreditCard size={14} className="text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Spending Progress - Enhanced - Full width */}
          <Card className="glass-card overflow-hidden relative border border-primary/20 shadow-lg gradient-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-400/5 z-0"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  Budget Utilization
                </h3>
                <span className={`text-sm font-medium ${spendingRatio > 100 ? 'text-destructive' : 'text-primary'}`}>
                  {spendingRatio.toFixed(0)}%
                </span>
              </div>
              <Progress 
                value={Math.min(spendingRatio, 100)} 
                className="h-3 bg-background/50"
                indicatorClassName={spendingRatio > 90 ? (spendingRatio > 100 ? "bg-destructive" : "bg-amber-500") : "bg-gradient-to-r from-primary to-purple-500"}
              />
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-muted-foreground italic">
                  {spendingRatio <= 25 && "Great job! You're well under budget"}
                  {spendingRatio > 25 && spendingRatio <= 75 && "You're on track with your budget"}
                  {spendingRatio > 75 && spendingRatio <= 100 && "You're approaching your budget limit"}
                  {spendingRatio > 100 && "You've exceeded your budget"}
                </p>
                <div className="flex items-center">
                  {spendingRatio <= 75 && <ArrowDown size={16} className="text-green-500 mr-1" />}
                  {spendingRatio > 75 && <ArrowUp size={16} className="text-amber-500 mr-1" />}
                  {spendingRatio > 100 && <ArrowUp size={16} className="text-destructive mr-1" />}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current month breakdown chart */}
          <Chart data={currentMonthByCategory} title={`${currentMonth} Breakdown`} />
        </div>

        {/* Right column (sidebar): All time chart and sponsors/premium features */}
        <div className="lg:col-span-2 space-y-6">
          {/* Premium features box - always visible in sidebar */}
          <Card className="sticky top-24 glass-card overflow-hidden border border-amber-500/20 bg-gradient-to-br from-amber-50/50 to-background shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                  Premium Features
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/70 rounded-lg p-4 shadow-sm border border-amber-100">
                  <p className="text-sm font-medium">AI-Powered Insights</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get personalized financial advice based on your spending habits.
                  </p>
                </div>
                <div className="bg-white/70 rounded-lg p-4 shadow-sm border border-amber-100">
                  <p className="text-sm font-medium">Advanced Analytics</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unlock detailed reports and forecasting tools for your finances.
                  </p>
                </div>
                <div className="bg-white/70 rounded-lg p-4 shadow-sm border border-amber-100">
                  <p className="text-sm font-medium">Multi-Currency Support</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Track expenses across different currencies automatically.
                  </p>
                </div>
                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-md font-medium shadow-md hover:shadow-lg transition-all">
                  Upgrade Now
                </button>
              </div>
            </CardContent>
          </Card>

          {/* All time chart - below the sticky premium features */}
          <Chart data={expensesByCategory} title="All Time Spending" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
