/**
 * Export V3 - Cloud-Integrated Export System
 * Simulates modern SaaS export functionality with cloud integrations,
 * sharing capabilities, and automated backup scheduling
 */

import { Expense } from "@/types";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// Types for V3 Cloud System
export interface CloudProvider {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastSync?: string;
  storageUsed?: number;
  quotaLimit?: number;
}

export interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  format: "csv" | "json" | "pdf";
  includeFields: string[];
  groupingStrategy: "none" | "category" | "date" | "both";
  icon: string;
}

export interface ExportHistory {
  id: string;
  timestamp: string;
  template: string;
  format: string;
  recordCount: number;
  fileSize: number;
  sharedLink?: string;
  cloudProviders: string[];
  status: "completed" | "failed" | "syncing";
}

export interface BackupSchedule {
  id: string;
  name: string;
  frequency: "daily" | "weekly" | "monthly";
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  enabled: boolean;
  cloudProviders: string[];
  templateId: string;
  lastRun?: string;
  nextRun?: string;
}

export interface ShareableLink {
  id: string;
  url: string;
  shortCode: string;
  expiresAt?: string;
  accessCount: number;
  maxAccess?: number;
  requiresPassword: boolean;
  createdAt: string;
}

// Pre-defined export templates for different use cases
export const EXPORT_TEMPLATES: ExportTemplate[] = [
  {
    id: "tax-report",
    name: "Tax Report",
    description:
      "Comprehensive expense report for tax filing with category breakdown and summaries",
    format: "pdf",
    includeFields: ["date", "category", "description", "amount", "notes"],
    groupingStrategy: "category",
    icon: "📋",
  },
  {
    id: "monthly-summary",
    name: "Monthly Summary",
    description: "High-level overview of spending patterns with visualizations",
    format: "pdf",
    includeFields: ["date", "category", "amount"],
    groupingStrategy: "date",
    icon: "📊",
  },
  {
    id: "category-analysis",
    name: "Category Analysis",
    description: "Deep dive into spending by category with trends and insights",
    format: "json",
    includeFields: ["date", "category", "description", "amount", "notes"],
    groupingStrategy: "category",
    icon: "📈",
  },
  {
    id: "detailed-export",
    name: "Detailed Export",
    description: "Complete data export with all fields for data analysis",
    format: "csv",
    includeFields: [
      "id",
      "date",
      "category",
      "description",
      "amount",
      "notes",
      "createdAt",
    ],
    groupingStrategy: "none",
    icon: "📑",
  },
  {
    id: "budgeting-analysis",
    name: "Budgeting Analysis",
    description: "Export formatted for budget planning and forecasting",
    format: "csv",
    includeFields: ["date", "category", "amount"],
    groupingStrategy: "category",
    icon: "💰",
  },
];

// Pre-defined cloud providers
export const CLOUD_PROVIDERS: CloudProvider[] = [
  {
    id: "google-drive",
    name: "Google Drive",
    icon: "🔵",
    connected: false,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    icon: "🔷",
    connected: false,
  },
  {
    id: "onedrive",
    name: "OneDrive",
    icon: "☁️",
    connected: false,
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    icon: "📗",
    connected: false,
  },
  {
    id: "s3",
    name: "AWS S3",
    icon: "🟠",
    connected: false,
  },
  {
    id: "self-hosted",
    name: "Self-Hosted Storage",
    icon: "🖥️",
    connected: false,
  },
];

/**
 * Generate a unique shareable link for an export
 * In a real app, this would create a server-side route and return a URL
 */
export function generateShareableLink(exportId: string): ShareableLink {
  const shortCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const url = `https://expensetracker.app/share/${shortCode}`;

  return {
    id: exportId,
    url,
    shortCode,
    accessCount: 0,
    requiresPassword: false,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Generate QR code data URL for sharing
 * In a real app, we'd use a library like qrcode.react
 */
export function generateQRCode(url: string): string {
  // Simulated QR code - in real implementation:
  // import QRCode from 'qrcode';
  // const qrCode = await QRCode.toDataURL(url);

  // For now, return a placeholder that indicates QR code generation
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='white' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' font-size='10' fill='black'%3EQR: ${encodeURIComponent(
    url.substring(0, 20)
  )}</Ctext%3E%3C/svg%3E`;
}

/**
 * Generate mock email content for preview
 */
export function generateEmailContent(
  expenses: Expense[],
  templateId: string,
  recipientEmail: string
): { subject: string; preview: string; htmlContent: string } {
  const template = EXPORT_TEMPLATES.find((t) => t.id === templateId);
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const expenseCount = expenses.length;

  const subject = `${
    template?.name || "Expense Report"
  } - ${new Date().toLocaleDateString()}`;

  const preview = `Your ${
    template?.name || "expense report"
  } is ready! Total: $${totalAmount.toFixed(
    2
  )} across ${expenseCount} expenses.`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
          .summary { background: #f5f7fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .stat { display: inline-block; margin-right: 30px; }
          .stat-value { font-size: 24px; font-weight: bold; color: #667eea; }
          .stat-label { font-size: 12px; color: #666; text-transform: uppercase; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 20px; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 ${template?.name || "Expense Report"}</h1>
            <p>Your automated expense export is ready to review</p>
          </div>
          
          <div class="summary">
            <div class="stat">
              <div class="stat-value">$${totalAmount.toFixed(2)}</div>
              <div class="stat-label">Total Amount</div>
            </div>
            <div class="stat">
              <div class="stat-value">${expenseCount}</div>
              <div class="stat-label">Expenses</div>
            </div>
            <div class="stat">
              <div class="stat-value">${new Date().toLocaleDateString()}</div>
              <div class="stat-label">Generated</div>
            </div>
          </div>
          
          <p>Hi there! This is your ${
            template?.name || "expense report"
          } sent to ${recipientEmail}.</p>
          
          <a href="https://expensetracker.app/dashboard" class="button">View in Dashboard</a>
          
          <div class="footer">
            <p>This is an automated email from Expense Tracker. You can manage your export preferences in your account settings.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return { subject, preview, htmlContent };
}

/**
 * Simulate sending email (in real app, would hit backend API)
 */
export async function simulateEmailExport(
  _expenses: Expense[],
  _templateId: string,
  _recipientEmail: string
): Promise<{ success: boolean; messageId: string; timestamp: string }> {
  // In a real app:
  // await fetch('/api/export/email', {
  //   method: 'POST',
  //   body: JSON.stringify({ expenses, templateId, recipientEmail })
  // });

  return {
    success: true,
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Simulate Google Sheets integration
 */
export async function simulateGoogleSheetsExport(
  _expenses: Expense[],
  _templateId: string,
  _spreadsheetName: string
): Promise<{ success: boolean; spreadsheetUrl: string; timestamp: string }> {
  // In a real app:
  // const auth = await getGoogleAuth();
  // const sheets = google.sheets({ version: 'v4', auth });
  // Create spreadsheet, format data, populate cells, share with user

  return {
    success: true,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${Math.random()
      .toString(36)
      .substring(2, 15)}`,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Simulate cloud provider sync
 */
export async function simulateCloudSync(
  _expenses: Expense[],
  providers: string[],
  _format: "csv" | "json" | "pdf"
): Promise<{ provider: string; success: boolean; timestamp: string }[]> {
  // In a real app, would integrate with each provider's API

  return providers.map((provider) => ({
    provider,
    success: true,
    timestamp: new Date().toISOString(),
  }));
}

/**
 * Calculate next run time for backup schedule
 */
export function calculateNextRun(
  schedule: Omit<BackupSchedule, "id" | "nextRun">
): string {
  const now = new Date();
  const nextRun = new Date(now);
  const [hours, minutes] = schedule.time.split(":").map(Number);

  nextRun.setHours(hours, minutes, 0, 0);

  if (nextRun <= now) {
    // If time has passed today, schedule for next occurrence
    if (schedule.frequency === "daily") {
      nextRun.setDate(nextRun.getDate() + 1);
    } else if (
      schedule.frequency === "weekly" &&
      schedule.dayOfWeek !== undefined
    ) {
      let daysToAdd = (schedule.dayOfWeek - nextRun.getDay() + 7) % 7;
      if (daysToAdd === 0) daysToAdd = 7;
      nextRun.setDate(nextRun.getDate() + daysToAdd);
    } else if (
      schedule.frequency === "monthly" &&
      schedule.dayOfMonth !== undefined
    ) {
      nextRun.setMonth(nextRun.getMonth() + 1);
      nextRun.setDate(schedule.dayOfMonth);
    }
  }

  return nextRun.toISOString();
}

/**
 * Generate export preview data for templates
 */
export function generateTemplatePreview(
  expenses: Expense[],
  templateId: string
): {
  title: string;
  description: string;
  previewData: Expense[];
  summary: Record<string, any>;
} {
  const template = EXPORT_TEMPLATES.find((t) => t.id === templateId);

  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }

  const previewData = expenses.slice(0, 5);
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  return {
    title: template.name,
    description: template.description,
    previewData,
    summary: {
      totalExpenses: expenses.length,
      totalAmount,
      categories: Object.keys(byCategory).length,
      categoryBreakdown: byCategory,
    },
  };
}

/**
 * Export history management utilities
 */
export class ExportHistoryManager {
  private static readonly STORAGE_KEY = "exportHistory_v3";

  static addToHistory(entry: Omit<ExportHistory, "id">): ExportHistory {
    const history = this.getHistory();
    const newEntry: ExportHistory = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...entry,
    };
    history.push(newEntry);
    // Keep only last 50 exports
    if (history.length > 50) {
      history.shift();
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    return newEntry;
  }

  static getHistory(): ExportHistory[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getHistoryById(id: string): ExportHistory | undefined {
    return this.getHistory().find((h) => h.id === id);
  }

  static deleteHistoryEntry(id: string): void {
    const history = this.getHistory().filter((h) => h.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }

  static clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

/**
 * Backup schedule management utilities
 */
export class BackupScheduleManager {
  private static readonly STORAGE_KEY = "backupSchedules_v3";

  static createSchedule(
    schedule: Omit<BackupSchedule, "id" | "nextRun">
  ): BackupSchedule {
    const schedules = this.getSchedules();
    const nextRun = calculateNextRun(schedule);
    const newSchedule: BackupSchedule = {
      id: `sch_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...schedule,
      nextRun,
    };
    schedules.push(newSchedule);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(schedules));
    return newSchedule;
  }

  static getSchedules(): BackupSchedule[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static updateSchedule(
    id: string,
    updates: Partial<BackupSchedule>
  ): BackupSchedule {
    const schedules = this.getSchedules();
    const index = schedules.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Schedule ${id} not found`);

    const updated = { ...schedules[index], ...updates };
    if (
      updates.time ||
      updates.frequency ||
      updates.dayOfWeek ||
      updates.dayOfMonth
    ) {
      updated.nextRun = calculateNextRun(updated);
    }
    schedules[index] = updated;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(schedules));
    return updated;
  }

  static deleteSchedule(id: string): void {
    const schedules = this.getSchedules().filter((s) => s.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(schedules));
  }

  static toggleSchedule(id: string): BackupSchedule {
    const schedule = this.getSchedules().find((s) => s.id === id);
    if (!schedule) throw new Error(`Schedule ${id} not found`);
    return this.updateSchedule(id, { enabled: !schedule.enabled });
  }
}
