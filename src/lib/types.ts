
export type Category = 
  | "Food" 
  | "Transportation" 
  | "Housing" 
  | "Utilities" 
  | "Entertainment" 
  | "Shopping" 
  | "Healthcare" 
  | "Education" 
  | "Personal" 
  | "Other";

export const categories: Category[] = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Education",
  "Personal",
  "Other"
];

export type CategoryColorMap = {
  [key in Category]: string;
};

export const categoryColors: CategoryColorMap = {
  Food: "#4F46E5",
  Transportation: "#10B981",
  Housing: "#F59E0B",
  Utilities: "#6366F1", 
  Entertainment: "#EC4899",
  Shopping: "#8B5CF6",
  Healthcare: "#3B82F6",
  Education: "#14B8A6",
  Personal: "#F43F5E",
  Other: "#6B7280"
};

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string;
}

export interface Budget {
  id: string;
  category: Category;
  amount: number;
  period: "daily" | "weekly" | "monthly" | "yearly";
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}
