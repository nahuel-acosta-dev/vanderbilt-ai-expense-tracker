"use client";

import { Expense } from "@/types";
import { formatCurrency, formatDate, getCategoryColor } from "@/lib/utils";

interface ExportPreviewProps {
  expenses: Expense[];
  totalAmount: number;
  dateRange: {
    from: string;
    to: string;
  };
  selectedCategories: string[];
  maxHeight?: string;
}

export const ExportPreview: React.FC<ExportPreviewProps> = ({
  expenses,
  totalAmount,
  dateRange,
  selectedCategories,
  maxHeight = "400px",
}) => {
  return (
    <div className="space-y-4">
      {/* Summary Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Records to Export</p>
            <p className="text-2xl font-bold text-blue-600">
              {expenses.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600 space-y-1">
          <p>
            📅 Date Range: {dateRange.from} to {dateRange.to}
          </p>
          {selectedCategories.length > 0 && (
            <p>📂 Categories: {selectedCategories.join(", ")}</p>
          )}
        </div>
      </div>

      {/* Data Preview */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h4 className="font-semibold text-gray-700">Preview Data</h4>
        </div>
        <div style={{ maxHeight: maxHeight }} className="overflow-y-auto">
          {expenses.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No expenses match the selected filters
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-2 text-right text-gray-700 font-semibold">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr
                    key={expense.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 text-gray-900">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                          expense.category
                        )}`}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-700 truncate">
                      {expense.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
