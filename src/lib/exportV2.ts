import { Expense } from "@/types";
import jsPDF from "jspdf";
import "jspdf-autotable";

export type ExportFormat = "csv" | "json" | "pdf";

export interface ExportOptions {
  format: ExportFormat;
  filename: string;
  startDate?: string;
  endDate?: string;
  categories?: string[];
}

export interface ExportPreviewData {
  totalRecords: number;
  totalAmount: number;
  dateRange: {
    from: string;
    to: string;
  };
  selectedCategories: string[];
  records: Expense[];
}

/**
 * Filter expenses based on export criteria
 */
export const filterExpensesForExport = (
  expenses: Expense[],
  startDate?: string,
  endDate?: string,
  categories?: string[]
): Expense[] => {
  return expenses.filter((expense) => {
    // Date filtering
    if (startDate && expense.date < startDate) {
      return false;
    }
    if (endDate && expense.date > endDate) {
      return false;
    }

    // Category filtering
    if (
      categories &&
      categories.length > 0 &&
      !categories.includes(expense.category)
    ) {
      return false;
    }

    return true;
  });
};

/**
 * Generate CSV content
 */
export const generateCSV = (expenses: Expense[]): string => {
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

  return csvContent;
};

/**
 * Generate JSON content
 */
export const generateJSON = (expenses: Expense[]): string => {
  return JSON.stringify(
    {
      exportDate: new Date().toISOString(),
      totalRecords: expenses.length,
      totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
      data: expenses,
    },
    null,
    2
  );
};

/**
 * Generate PDF content
 */
export const generatePDF = (expenses: Expense[], filename: string): void => {
  // Create PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Add title
  doc.setFontSize(18);
  doc.text("Expense Report", pageWidth / 2, 15, { align: "center" });

  // Add export date
  doc.setFontSize(10);
  doc.text(`Exported: ${new Date().toLocaleString()}`, pageWidth / 2, 22, {
    align: "center",
  });

  // Add summary
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  doc.setFontSize(11);
  doc.text(
    [
      `Total Expenses: ${expenses.length}`,
      `Total Amount: $${totalAmount.toFixed(2)}`,
    ],
    15,
    32
  );

  // Add table
  const tableData = expenses.map((exp) => [
    exp.date,
    `$${exp.amount.toFixed(2)}`,
    exp.category,
    exp.description,
  ]);

  (doc as any).autoTable({
    head: [["Date", "Amount", "Category", "Description"]],
    body: tableData,
    startY: 50,
    margin: { top: 50 },
    headerStyles: {
      fillColor: [13, 110, 253],
      textColor: 255,
      fontStyle: "bold",
      halign: "left",
    },
    bodyStyles: {
      textColor: 50,
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { halign: "right", cellWidth: 25 },
      2: { cellWidth: 35 },
      3: { cellWidth: "auto" },
    },
  });

  // Save PDF
  doc.save(filename);
};

/**
 * Execute export based on options
 */
export const executeExport = (
  expenses: Expense[],
  options: ExportOptions
): void => {
  const filenameWithExtension = !options.filename.includes(".")
    ? `${options.filename}.${options.format}`
    : options.filename;

  if (options.format === "csv") {
    const csvContent = generateCSV(expenses);
    downloadFile(csvContent, filenameWithExtension, "text/csv");
  } else if (options.format === "json") {
    const jsonContent = generateJSON(expenses);
    downloadFile(jsonContent, filenameWithExtension, "application/json");
  } else if (options.format === "pdf") {
    generatePDF(expenses, filenameWithExtension);
  }
};

/**
 * Download file to user's device
 */
export const downloadFile = (
  content: string,
  filename: string,
  mimeType: string
): void => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Generate preview data for export
 */
export const generateExportPreview = (
  expenses: Expense[],
  startDate?: string,
  endDate?: string,
  categories?: string[]
): ExportPreviewData => {
  const filtered = filterExpensesForExport(
    expenses,
    startDate,
    endDate,
    categories
  );
  const totalAmount = filtered.reduce((sum, exp) => sum + exp.amount, 0);

  return {
    totalRecords: filtered.length,
    totalAmount,
    dateRange: {
      from: startDate || "All time",
      to: endDate || "All time",
    },
    selectedCategories: categories || [],
    records: filtered,
  };
};
