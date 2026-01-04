/**
 * CloudExportHub - The main SaaS-style cloud export interface
 * Modern multi-tabbed interface for all cloud export features
 */

"use client";

import React, { useState } from "react";
import { Expense } from "@/types";
import {
  EXPORT_TEMPLATES,
  CLOUD_PROVIDERS,
  ExportTemplate,
  ExportHistory,
  BackupSchedule,
  simulateEmailExport,
  ExportHistoryManager,
  BackupScheduleManager,
} from "@/lib/exportV3";
import TemplateSelector from "./ExportV3/TemplateSelector";
import EmailExportFlow from "./ExportV3/EmailExportFlow";
import GoogleSheetsIntegration from "./ExportV3/GoogleSheetsIntegration";
import CloudStorageConnector from "./ExportV3/CloudStorageConnector";
import BackupScheduler from "./ExportV3/BackupScheduler";
import ExportHistoryPanel from "./ExportV3/ExportHistoryPanel";
import SharingCenter from "./ExportV3/SharingCenter";

type Tab =
  | "templates"
  | "email"
  | "sheets"
  | "storage"
  | "scheduling"
  | "history"
  | "sharing";

interface CloudExportHubProps {
  expenses: Expense[];
  onClose: () => void;
}

const CloudExportHub: React.FC<CloudExportHubProps> = ({
  expenses,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("templates");
  const [selectedTemplate, setSelectedTemplate] =
    useState<ExportTemplate | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [history, setHistory] = useState<ExportHistory[]>([]);
  const [schedules, setSchedules] = useState<BackupSchedule[]>([]);
  const [connectedProviders, setConnectedProviders] = useState<Set<string>>(
    new Set()
  );

  // Load history and schedules on mount
  React.useEffect(() => {
    setHistory(ExportHistoryManager.getHistory());
    setSchedules(BackupScheduleManager.getSchedules());
  }, []);

  const showNotification = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleTemplateSelect = (template: ExportTemplate) => {
    setSelectedTemplate(template);
    showNotification("info", `Selected template: ${template.name}`);
  };

  const handleEmailExport = async (email: string) => {
    if (!selectedTemplate) return;
    setIsProcessing(true);
    try {
      await simulateEmailExport(expenses, selectedTemplate.id, email);

      const entry = ExportHistoryManager.addToHistory({
        timestamp: new Date().toISOString(),
        template: selectedTemplate.name,
        format: selectedTemplate.format,
        recordCount: expenses.length,
        fileSize: Math.floor(Math.random() * 500) + 50,
        cloudProviders: ["email"],
        status: "completed",
      });

      setHistory([...history, entry]);
      showNotification("success", `Export sent to ${email}! Check your inbox.`);
      setSelectedTemplate(null);
    } catch (error) {
      showNotification("error", "Failed to send export. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloudConnect = (providerId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const newConnected = new Set(connectedProviders);
      if (newConnected.has(providerId)) {
        newConnected.delete(providerId);
        showNotification("info", "Disconnected from provider");
      } else {
        newConnected.add(providerId);
        showNotification("success", "Successfully connected to provider!");
      }
      setConnectedProviders(newConnected);
      setIsProcessing(false);
    }, 1500);
  };

  const handleBackupCreate = (
    schedule: Omit<BackupSchedule, "id" | "nextRun">
  ) => {
    const newSchedule = BackupScheduleManager.createSchedule(schedule);
    setSchedules([...schedules, newSchedule]);
    showNotification(
      "success",
      `Backup scheduled: "${newSchedule.name}" will run ${newSchedule.frequency}`
    );
  };

  const handleBackupToggle = (scheduleId: string) => {
    const updated = BackupScheduleManager.toggleSchedule(scheduleId);
    setSchedules(schedules.map((s) => (s.id === scheduleId ? updated : s)));
    showNotification(
      "info",
      `Backup schedule ${updated.enabled ? "enabled" : "disabled"}`
    );
  };

  const handleDeleteHistory = (id: string) => {
    ExportHistoryManager.deleteHistoryEntry(id);
    setHistory(history.filter((h) => h.id !== id));
    showNotification("info", "Export removed from history");
  };

  const tabs: Array<{
    id: Tab;
    label: string;
    icon: string;
    badge?: number;
  }> = [
    { id: "templates", label: "Templates", icon: "📋" },
    { id: "email", label: "Email Export", icon: "📧" },
    { id: "sheets", label: "Google Sheets", icon: "📗" },
    { id: "storage", label: "Cloud Storage", icon: "☁️" },
    {
      id: "scheduling",
      label: "Auto Backup",
      icon: "⏰",
      badge: schedules.length,
    },
    { id: "history", label: "History", icon: "📜", badge: history.length },
    { id: "sharing", label: "Sharing", icon: "🔗" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">☁️</span>
            <div>
              <h2 className="text-xl font-bold">Cloud Export Hub</h2>
              <p className="text-blue-100 text-sm">
                Professional data sharing & integration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition"
          >
            ✕
          </button>
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`px-6 py-3 ${
              notification.type === "success"
                ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                : notification.type === "error"
                ? "bg-red-50 text-red-800 border-l-4 border-red-500"
                : "bg-blue-50 text-blue-800 border-l-4 border-blue-500"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 whitespace-nowrap font-medium transition flex items-center gap-2 ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.badge !== undefined && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "templates" && (
            <TemplateSelector
              templates={EXPORT_TEMPLATES}
              selectedTemplate={selectedTemplate}
              onSelect={handleTemplateSelect}
              expenses={expenses}
            />
          )}

          {activeTab === "email" && (
            <EmailExportFlow
              selectedTemplate={selectedTemplate}
              onEmailExport={handleEmailExport}
              isProcessing={isProcessing}
              expenses={expenses}
            />
          )}

          {activeTab === "sheets" && (
            <GoogleSheetsIntegration
              selectedTemplate={selectedTemplate}
              isProcessing={isProcessing}
              expenses={expenses}
            />
          )}

          {activeTab === "storage" && (
            <CloudStorageConnector
              providers={CLOUD_PROVIDERS}
              connectedProviders={connectedProviders}
              onConnect={handleCloudConnect}
              isProcessing={isProcessing}
            />
          )}

          {activeTab === "scheduling" && (
            <BackupScheduler
              schedules={schedules}
              templates={EXPORT_TEMPLATES}
              onCreateSchedule={handleBackupCreate}
              onToggleSchedule={handleBackupToggle}
              isProcessing={isProcessing}
            />
          )}

          {activeTab === "history" && (
            <ExportHistoryPanel
              history={history}
              onDelete={handleDeleteHistory}
            />
          )}

          {activeTab === "sharing" && (
            <SharingCenter
              selectedTemplate={selectedTemplate}
              history={history}
              expenses={expenses}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {expenses.length} expenses • {new Date().toLocaleDateString()}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloudExportHub;
