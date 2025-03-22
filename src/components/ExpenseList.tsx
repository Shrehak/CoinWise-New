
import { useState } from 'react';
import { Expense, categoryColors } from '@/lib/types';
import { formatCurrency, deleteExpense } from '@/lib/expenseUtils';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { MoreHorizontal, Trash2, CreditCard, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseDeleted: () => void;
}

const ExpenseList = ({ expenses, onExpenseDeleted }: ExpenseListProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteExpense = (id: string) => {
    deleteExpense(id);
    onExpenseDeleted();
    
    toast({
      title: "Expense deleted",
      description: "The expense has been removed successfully.",
    });
  };

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter(expense => 
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort expenses by date (newest first)
  const sortedExpenses = [...filteredExpenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Format date for display (e.g., "Mar 15, 2023")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="animate-in w-full glass-card">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <CreditCard size={20} className="text-primary" />
            Expenses
          </CardTitle>
          <div className="relative w-full md:w-auto md:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedExpenses.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedExpenses.map((expense, index) => (
                  <TableRow key={expense.id} className={`animate-in ${index < 5 ? `stagger-${index + 1}` : ''}`}>
                    <TableCell className="font-medium">{formatDate(expense.date)}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>
                      <Badge 
                        style={{ 
                          backgroundColor: categoryColors[expense.category] + '20',
                          color: categoryColors[expense.category],
                          borderColor: categoryColors[expense.category] + '40'
                        }}
                        className="border"
                      >
                        {expense.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(expense.amount)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? "No expenses match your search" : "No expenses recorded yet"}
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
