"use client";

import { Expense, Category } from "@/types";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SpendingChartProps {
  expenses: Expense[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({ expenses }) => {
  // Prepare data for category chart
  const categoryData: Record<Category, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach((exp) => {
    categoryData[exp.category] += exp.amount;
  });

  const chartData = Object.entries(categoryData)
    .filter(([_, amount]) => amount > 0)
    .map(([category, amount]) => ({
      name: category,
      value: parseFloat(amount.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  // Prepare data for timeline chart (last 7 days)
  const timelineData: Record<string, number> = {};
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    timelineData[dateStr] = 0;
  }

  expenses.forEach((exp) => {
    if (timelineData.hasOwnProperty(exp.date)) {
      timelineData[exp.date] += exp.amount;
    }
  });

  const timelineChartData = Object.entries(timelineData).map(
    ([date, amount]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amount: parseFloat(amount.toFixed(2)),
    })
  );

  const COLORS = [
    "#0ea5e9",
    "#f97316",
    "#8b5cf6",
    "#ec4899",
    "#ef4444",
    "#6b7280",
  ];

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Category Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Spending by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `$${(value as number).toFixed(2)}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Weekly Spending Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timelineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value) => `$${(value as number).toFixed(2)}`}
            />
            <Bar dataKey="amount" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
