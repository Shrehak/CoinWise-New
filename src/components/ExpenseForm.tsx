
import { useState } from 'react';
import { categories, Category } from '@/lib/types';
import { addExpense, getCurrentDateFormatted } from '@/lib/expenseUtils';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle } from 'lucide-react';

interface ExpenseFormProps {
  onExpenseAdded: () => void;
}

const ExpenseForm = ({ onExpenseAdded }: ExpenseFormProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<Category>('Food');
  const [date, setDate] = useState<string>(getCurrentDateFormatted());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!amount || !description || !category || !date) {
      toast({
        title: "Missing fields",
        description: "Please fill out all fields to add an expense.",
        variant: "destructive",
      });
      return;
    }
    
    const numericAmount = parseFloat(amount);
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addExpense({
        amount: numericAmount,
        description,
        category,
        date,
      });
      
      // Reset form
      setAmount('');
      setDescription('');
      setCategory('Food');
      setDate(getCurrentDateFormatted());
      
      // Notify parent component
      onExpenseAdded();
      
      toast({
        title: "Expense added",
        description: "Your expense has been recorded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to add expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="animate-in w-full glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <PlusCircle size={20} className="text-primary" />
          Add Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="cursor-pointer">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Expense"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
