import { Expense, Category, ExpenseSummary } from "@/types";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getCategoryColor = (category: Category): string => {
  const colors: Record<Category, string> = {
    Food: "bg-orange-100 text-orange-800",
    Transportation: "bg-blue-100 text-blue-800",
    Entertainment: "bg-purple-100 text-purple-800",
    Shopping: "bg-pink-100 text-pink-800",
    Bills: "bg-red-100 text-red-800",
    Other: "bg-gray-100 text-gray-800",
  };
  return colors[category];
};

export const getCategoryBgColor = (category: Category): string => {
  const colors: Record<Category, string> = {
    Food: "bg-orange-500",
    Transportation: "bg-blue-500",
    Entertainment: "bg-purple-500",
    Shopping: "bg-pink-500",
    Bills: "bg-red-500",
    Other: "bg-gray-500",
  };
  return colors[category];
};

export const calculateExpenseSummary = (
  expenses: Expense[]
): ExpenseSummary => {
  const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    return (
      expDate.getMonth() === currentMonth &&
      expDate.getFullYear() === currentYear
    );
  });

  const monthlySpending = monthlyExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const categoryTotals: Record<Category, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach((exp) => {
    categoryTotals[exp.category] += exp.amount;
  });

  const topCategories = Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category: category as Category, amount }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const averageExpense =
    expenses.length > 0 ? totalSpending / expenses.length : 0;

  return {
    totalSpending,
    monthlySpending,
    topCategories,
    expenseCount: expenses.length,
    averageExpense,
  };
};

export const validateExpense = (
  amount: number,
  description: string,
  date: string
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!amount || amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (!description || description.trim().length === 0) {
    errors.description = "Description is required";
  }

  if (!date) {
    errors.date = "Date is required";
  }

  if (new Date(date) > new Date()) {
    errors.date = "Date cannot be in the future";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const exportToCSV = (expenses: Expense[]): void => {
  const headers = ["Date", "Amount", "Category", "Description"];
  const csvContent = [
    headers.join(","),
    ...expenses.map((exp) =>
      [
        exp.date,
        exp.amount,
        exp.category,
        `"${exp.description.replace(/"/g, '""')}"`,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `expenses-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
