"use client";

import { useState, useMemo } from "react";
import { Expense, FilterOptions } from "@/types";
import {
  ExpenseForm,
  FilterBar,
  ExpenseList,
  SummaryCards,
  SpendingChart,
  LoadingSpinner,
  CloudExportHub,
} from "@/components";
import { calculateExpenseSummary, exportToCSV } from "@/lib/utils";
import { useExpenses } from "@/hooks/useExpenses";

export default function Home() {
  const { expenses, isLoading, addExpense, updateExpense, deleteExpense } =
    useExpenses();
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: "",
    endDate: "",
    category: "All",
    searchTerm: "",
  });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isCloudExportOpen, setIsCloudExportOpen] = useState(false);

  // Filter expenses based on criteria
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      // Date range filter
      if (filters.startDate && expense.date < filters.startDate) {
        return false;
      }
      if (filters.endDate && expense.date > filters.endDate) {
        return false;
      }

      // Category filter
      if (filters.category !== "All" && expense.category !== filters.category) {
        return false;
      }

      // Search filter
      if (
        filters.searchTerm &&
        !expense.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [expenses, filters]);

  const summary = useMemo(() => {
    return calculateExpenseSummary(expenses);
  }, [expenses]);

  const handleAddExpense = (
    date: string,
    amount: number,
    category: string,
    description: string
  ) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, {
        date,
        amount,
        category: category as any,
        description,
      });
      setEditingExpense(null);
    } else {
      addExpense(date, amount, category as any, description);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    // Scroll to form
    const form = document.querySelector("[data-form]");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                💳 Expense Tracker
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your finances with ease
              </p>
            </div>
            {expenses.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCloudExportOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2"
                >
                  <span>☁️</span>
                  Cloud Export (V3)
                </button>
                <button
                  onClick={() => exportToCSV(filteredExpenses)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2"
                >
                  <span>📥</span>
                  Export to CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <SummaryCards summary={summary} />

        {/* Charts */}
        {expenses.length > 0 && <SpendingChart expenses={expenses} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div data-form>
              <ExpenseForm onSubmit={handleAddExpense} isLoading={isLoading} />

              {editingExpense && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-2">
                    ✏️ Editing expense from {editingExpense.date}
                  </p>
                  <button
                    onClick={handleCancelEdit}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Cancel Edit
                  </button>
                </div>
              )}

              {expenses.length > 0 && (
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Delete all expenses? This action cannot be undone."
                      )
                    ) {
                      // Note: We'd need to add a clearAllExpenses method to fully implement this
                    }
                  }}
                  className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <FilterBar filters={filters} onFilterChange={setFilters} />
            <ExpenseList
              expenses={filteredExpenses}
              onDelete={deleteExpense}
              onEdit={handleEditExpense}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2026 Expense Tracker. All your data is stored locally on your
            device.
          </p>
        </div>
      </footer>

      {/* Cloud Export Hub V3 Modal */}
      {isCloudExportOpen && (
        <CloudExportHub
          expenses={filteredExpenses}
          onClose={() => setIsCloudExportOpen(false)}
        />
      )}
    </main>
  );
}
