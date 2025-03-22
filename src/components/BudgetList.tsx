
import { useState, useEffect } from 'react';
import { Budget, Expense, categoryColors } from '@/lib/types';
import { formatCurrency } from '@/lib/expenseUtils';
import { formatPeriodName, calculateBudgetProgress, deleteBudget } from '@/lib/budgetUtils';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Wallet, MoreHorizontal, Trash2 } from 'lucide-react';

interface BudgetListProps {
  budgets: Budget[];
  expenses: Expense[];
  onBudgetDeleted: () => void;
}

const BudgetList = ({ budgets, expenses, onBudgetDeleted }: BudgetListProps) => {
  const { toast } = useToast();
  const [progressValues, setProgressValues] = useState<Record<string, number>>({});

  // Calculate progress for all budgets
  useEffect(() => {
    const newProgressValues: Record<string, number> = {};
    
    budgets.forEach(budget => {
      newProgressValues[budget.id] = calculateBudgetProgress(budget, expenses);
    });
    
    setProgressValues(newProgressValues);
  }, [budgets, expenses]);

  const handleDeleteBudget = (id: string) => {
    deleteBudget(id);
    onBudgetDeleted();
    
    toast({
      title: "Budget deleted",
      description: "The budget has been removed successfully.",
    });
  };

  return (
    <Card className="animate-in w-full glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Wallet size={20} className="text-primary" />
          Budget Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {budgets.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {budgets.map((budget, index) => {
              const progress = progressValues[budget.id] || 0;
              const isOverBudget = progress >= 100;
              
              return (
                <div 
                  key={budget.id} 
                  className={`animate-in ${index < 5 ? `stagger-${index + 1}` : ''} border rounded-lg p-4 hover:shadow-sm transition-shadow`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          style={{ 
                            backgroundColor: categoryColors[budget.category] + '20',
                            color: categoryColors[budget.category],
                            borderColor: categoryColors[budget.category] + '40'
                          }}
                          className="border"
                        >
                          {budget.category}
                        </Badge>
                        <span className="text-muted-foreground text-sm">
                          {formatPeriodName(budget.period)}
                        </span>
                      </div>
                      <p className="font-medium">{formatCurrency(budget.amount)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleDeleteBudget(budget.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className={isOverBudget ? "text-destructive font-medium" : ""}>
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    <Progress 
                      value={progress} 
                      className="h-2"
                      indicatorClassName={isOverBudget ? "bg-destructive" : undefined}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">No budgets created yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetList;
