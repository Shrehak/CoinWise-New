
import { useState } from 'react';
import { categories, Category } from '@/lib/types';
import { addBudget } from '@/lib/budgetUtils';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Wallet } from 'lucide-react';

interface BudgetFormProps {
  onBudgetAdded: () => void;
}

const BudgetForm = ({ onBudgetAdded }: BudgetFormProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<Category>('Food');
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!amount || !category || !period) {
      toast({
        title: "Missing fields",
        description: "Please fill out all fields to create a budget.",
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
      addBudget({
        amount: numericAmount,
        category,
        period,
      });
      
      // Reset form
      setAmount('');
      setCategory('Food');
      setPeriod('monthly');
      
      // Notify parent component
      onBudgetAdded();
      
      toast({
        title: "Budget created",
        description: `Your ${period} budget for ${category} has been created.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create budget. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to add budget:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="animate-in w-full glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Wallet size={20} className="text-primary" />
          Create Budget
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetAmount">Budget Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="budgetAmount"
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
              <Label htmlFor="budgetCategory">Category</Label>
              <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
                <SelectTrigger id="budgetCategory">
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
            <Label>Budget Period</Label>
            <RadioGroup 
              value={period} 
              onValueChange={(value: "daily" | "weekly" | "monthly" | "yearly") => setPeriod(value)}
              className="grid grid-cols-2 md:grid-cols-4 gap-2"
            >
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily" className="cursor-pointer">Daily</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly" className="cursor-pointer">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="cursor-pointer">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="cursor-pointer">Yearly</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Budget"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;
