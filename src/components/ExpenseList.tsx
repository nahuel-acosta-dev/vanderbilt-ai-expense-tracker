"use client";

import { Expense } from "@/types";
import { formatDate, formatCurrency, getCategoryColor } from "@/lib/utils";
import { useState } from "react";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onDelete,
  onEdit,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-500 text-lg">
          No expenses yet. Add your first expense to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Expenses ({expenses.length})
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {expenses.map((expense) => (
          <div key={expense.id} className="hover:bg-gray-50 transition-colors">
            <div
              className="px-6 py-4 flex items-center justify-between cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === expense.id ? null : expense.id)
              }
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      expense.category
                    )}`}
                  >
                    {expense.category}
                  </span>
                  <p className="text-gray-800 font-medium">
                    {expense.description}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(expense.date)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-primary-600">
                  {formatCurrency(expense.amount)}
                </p>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedId === expense.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>

            {expandedId === expense.id && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => onEdit(expense)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this expense?")
                    ) {
                      onDelete(expense.id);
                      setExpandedId(null);
                    }
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
