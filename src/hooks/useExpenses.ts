import { useState, useEffect, useCallback } from "react";
import { Expense, Category } from "@/types";

const STORAGE_KEY = "expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load expenses from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setExpenses(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load expenses:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses, isLoading]);

  const addExpense = useCallback(
    (date: string, amount: number, category: Category, description: string) => {
      const newExpense: Expense = {
        id: Date.now().toString(),
        date,
        amount,
        category,
        description,
      };
      setExpenses((prev) => [newExpense, ...prev]);
      return newExpense;
    },
    []
  );

  const updateExpense = useCallback((id: string, updates: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  }, []);

  const clearAllExpenses = useCallback(() => {
    setExpenses([]);
  }, []);

  return {
    expenses,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    clearAllExpenses,
  };
};
