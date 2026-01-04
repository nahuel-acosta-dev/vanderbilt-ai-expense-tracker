"use client";

import React from "react";
import { Expense } from "@/types";
import { ExportTemplate, generateTemplatePreview } from "@/lib/exportV3";

interface TemplateSelectorProps {
  templates: ExportTemplate[];
  selectedTemplate: ExportTemplate | null;
  onSelect: (template: ExportTemplate) => void;
  expenses: Expense[];
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onSelect,
  expenses,
}) => {
  const preview = selectedTemplate
    ? generateTemplatePreview(expenses, selectedTemplate.id)
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Templates Grid */}
      <div>
        <h3 className="text-lg font-bold mb-4">Export Templates</h3>
        <p className="text-gray-600 text-sm mb-4">
          Choose a pre-configured template optimized for different use cases
        </p>

        <div className="grid gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className={`p-4 rounded-lg border-2 transition text-left ${
                selectedTemplate?.id === template.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{template.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {template.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {template.format.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {template.groupingStrategy === "none"
                        ? "Raw Data"
                        : template.groupingStrategy.charAt(0).toUpperCase() +
                          template.groupingStrategy.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div>
          <h3 className="text-lg font-bold mb-4">Preview</h3>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-bold text-lg text-gray-900">
                {preview.title}
              </h4>
              <p className="text-sm text-gray-600">{preview.description}</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded">
              <div>
                <div className="text-sm text-gray-600">Total Amount</div>
                <div className="text-xl font-bold text-blue-600">
                  ${preview.summary.totalAmount.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Expenses</div>
                <div className="text-xl font-bold text-blue-600">
                  {preview.summary.totalExpenses}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Categories</div>
                <div className="text-xl font-bold text-blue-600">
                  {preview.summary.categories}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Records</div>
                <div className="text-xl font-bold text-blue-600">
                  {preview.previewData.length}
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-2">
                Category Breakdown
              </h4>
              <div className="space-y-1">
                {Object.entries(preview.summary.categoryBreakdown)
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .map(([category, amount]) => {
                    const amountNum = amount as number;
                    return (
                      <div
                        key={category}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-gray-600">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded h-2">
                            <div
                              className="bg-blue-500 h-full rounded"
                              style={{
                                width: `${
                                  (amountNum / preview.summary.totalAmount) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="font-semibold text-gray-900 w-16 text-right">
                            ${amountNum.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Sample Data */}
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-2">
                Sample Records
              </h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {preview.previewData.slice(0, 3).map((expense) => (
                  <div
                    key={expense.id}
                    className="text-xs text-gray-600 p-1 bg-gray-50 rounded"
                  >
                    {new Date(expense.date).toLocaleDateString()} •{" "}
                    {expense.category} • ${expense.amount.toFixed(2)} •{" "}
                    {expense.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
