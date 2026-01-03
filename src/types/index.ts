export type Category =
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Shopping"
  | "Bills"
  | "Other";

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: Category;
  description: string;
}

export interface FilterOptions {
  startDate: string;
  endDate: string;
  category: Category | "All";
  searchTerm: string;
}

export interface ExpenseSummary {
  totalSpending: number;
  monthlySpending: number;
  topCategories: { category: Category; amount: number }[];
  expenseCount: number;
  averageExpense: number;
}
