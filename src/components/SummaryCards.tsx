"use client";

import { ExpenseSummary } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface SummaryCardsProps {
  summary: ExpenseSummary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const cards = [
    {
      title: "Total Spending",
      value: formatCurrency(summary.totalSpending),
      icon: "💰",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "This Month",
      value: formatCurrency(summary.monthlySpending),
      icon: "📅",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Average Expense",
      value: formatCurrency(summary.averageExpense),
      icon: "📊",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Total Expenses",
      value: summary.expenseCount.toString(),
      icon: "📝",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.bgColor} rounded-lg shadow-md p-6 border border-gray-200`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">
                {card.title}
              </p>
              <p className={`text-2xl font-bold ${card.textColor}`}>
                {card.value}
              </p>
            </div>
            <span className="text-3xl">{card.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
