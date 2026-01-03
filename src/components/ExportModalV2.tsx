"use client";

import { useState, useMemo } from "react";
import { Expense, Category } from "@/types";
import { ExportPreview } from "./ExportPreview";
import {
  generateExportPreview,
  executeExport,
  ExportFormat,
} from "@/lib/exportV2";

const CATEGORIES: Category[] = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

const EXPORT_FORMATS: { value: ExportFormat; label: string; icon: string }[] = [
  { value: "csv", label: "CSV (Excel)", icon: "📊" },
  { value: "json", label: "JSON (Data)", icon: "📋" },
  { value: "pdf", label: "PDF (Report)", icon: "📄" },
];

interface ExportModalV2Props {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
}

export const ExportModalV2: React.FC<ExportModalV2Props> = ({
  isOpen,
  onClose,
  expenses,
}) => {
  const [step, setStep] = useState<"options" | "preview" | "exporting">(
    "options"
  );
  const [format, setFormat] = useState<ExportFormat>("csv");
  const [filename, setFilename] = useState(
    `expenses-${new Date().toISOString().split("T")[0]}`
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  // Generate preview data
  const previewData = useMemo(() => {
    return generateExportPreview(
      expenses,
      startDate || undefined,
      endDate || undefined,
      selectedCategories.length > 0 ? selectedCategories : undefined
    );
  }, [expenses, startDate, endDate, selectedCategories]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
    setSelectedCategories([]);
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    executeExport(previewData.records, {
      format,
      filename:
        filename || `expenses-${new Date().toISOString().split("T")[0]}`,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
    });

    setIsExporting(false);
    setStep("options");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 flex justify-between items-center border-b border-primary-700">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span>📤</span> Advanced Export
            </h2>
            {!isExporting && (
              <button
                onClick={onClose}
                className="text-white hover:bg-primary-800 rounded-full p-1 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {step === "options" && (
              <div className="space-y-6">
                {/* Export Format */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Export Format
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {EXPORT_FORMATS.map((fmt) => (
                      <button
                        key={fmt.value}
                        onClick={() => setFormat(fmt.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          format === fmt.value
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-2xl block mb-1">{fmt.icon}</span>
                        <p className="text-sm font-medium text-gray-700">
                          {fmt.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filename */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Custom Filename
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={filename}
                      onChange={(e) => setFilename(e.target.value)}
                      placeholder="expenses-2026-01-03"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <span className="text-gray-500 py-2">.{format}</span>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700">Filter Data</h3>
                    {(startDate ||
                      endDate ||
                      selectedCategories.length > 0) && (
                      <button
                        onClick={handleResetFilters}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Reset Filters
                      </button>
                    )}
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Categories (leave empty for all)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="rounded text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "preview" && (
              <ExportPreview
                expenses={previewData.records}
                totalAmount={previewData.totalAmount}
                dateRange={previewData.dateRange}
                selectedCategories={previewData.selectedCategories}
                maxHeight="500px"
              />
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
            {step === "options" && (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep("preview")}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                  Preview Data
                </button>
              </>
            )}

            {step === "preview" && (
              <>
                <button
                  onClick={() => setStep("options")}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting || previewData.records.length === 0}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isExporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <span>📥</span>
                      Download
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
