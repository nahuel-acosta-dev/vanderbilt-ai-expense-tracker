"use client";

import React, { useState } from "react";
import { ExportTemplate, BackupSchedule } from "@/lib/exportV3";

interface BackupSchedulerProps {
  schedules: BackupSchedule[];
  templates: ExportTemplate[];
  onCreateSchedule: (schedule: Omit<BackupSchedule, "id" | "nextRun">) => void;
  onToggleSchedule: (scheduleId: string) => void;
  isProcessing: boolean;
}

const BackupScheduler: React.FC<BackupSchedulerProps> = ({
  schedules,
  templates,
  onCreateSchedule,
  onToggleSchedule,
  isProcessing,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    frequency: "daily" as const,
    time: "09:00",
    dayOfWeek: 1,
    dayOfMonth: 1,
    cloudProviders: [] as string[],
    templateId: templates[0]?.id || "",
    enabled: true,
  });

  const handleCreateSchedule = () => {
    onCreateSchedule({
      name: formData.name,
      frequency: formData.frequency,
      dayOfWeek: formData.dayOfWeek,
      dayOfMonth: formData.dayOfMonth,
      time: formData.time,
      cloudProviders: formData.cloudProviders,
      templateId: formData.templateId,
      enabled: formData.enabled,
    });

    setFormData({
      name: "",
      frequency: "daily",
      time: "09:00",
      dayOfWeek: 1,
      dayOfMonth: 1,
      cloudProviders: [],
      templateId: templates[0]?.id || "",
      enabled: true,
    });
    setShowForm(false);
  };

  const frequencyLabels = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">
          ⏰ Automatic Backup Scheduling
        </h3>
        <p className="text-gray-600">
          Set up recurring exports to automatically backup your expenses to
          cloud storage
        </p>
      </div>

      {/* Create Schedule Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2"
        >
          ➕ Create New Schedule
        </button>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Create Backup Schedule
          </h4>

          <div className="space-y-4">
            {/* Schedule Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Schedule Name
              </label>
              <input
                type="text"
                placeholder="e.g., Daily Backup"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Template Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Export Template
              </label>
              <select
                value={formData.templateId}
                onChange={(e) =>
                  setFormData({ ...formData, templateId: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.icon} {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Frequency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      frequency: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Day Selection (for weekly/monthly) */}
            {(formData.frequency as string) === "weekly" && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Day of Week
                </label>
                <select
                  value={formData.dayOfWeek}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dayOfWeek: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {dayNames.map((day, idx) => (
                    <option key={idx} value={idx}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {(formData.frequency as string) === "monthly" && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Day of Month
                </label>
                <select
                  value={formData.dayOfMonth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dayOfMonth: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      Day {day}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCreateSchedule}
                disabled={
                  !formData.name || !formData.templateId || isProcessing
                }
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50"
              >
                {isProcessing ? "⏳ Creating..." : "✅ Create Schedule"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Schedules */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">
          Active Schedules ({schedules.filter((s) => s.enabled).length})
        </h4>

        {schedules.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-gray-600">📭 No backup schedules yet</div>
            <p className="text-sm text-gray-500 mt-1">
              Create one to start automatic backups
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {schedules.map((schedule) => {
              const template = templates.find(
                (t) => t.id === schedule.templateId
              );
              const nextRunDate = new Date(schedule.nextRun || "");

              return (
                <div
                  key={schedule.id}
                  className={`p-4 rounded-lg border-2 transition ${
                    schedule.enabled
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-semibold text-gray-900">
                          {schedule.name}
                        </h5>
                        {schedule.enabled && (
                          <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded font-medium">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <div>
                          📋 Template:{" "}
                          <span className="font-medium">
                            {template?.icon} {template?.name}
                          </span>
                        </div>
                        <div>
                          ⏰ Schedule:{" "}
                          <span className="font-medium">
                            {frequencyLabels[schedule.frequency]} at{" "}
                            {schedule.time}
                          </span>
                          {schedule.frequency === "weekly" && (
                            <span className="ml-1">
                              ({dayNames[schedule.dayOfWeek || 0]})
                            </span>
                          )}
                          {schedule.frequency === "monthly" && (
                            <span className="ml-1">
                              (Day {schedule.dayOfMonth})
                            </span>
                          )}
                        </div>
                        {schedule.nextRun && (
                          <div>
                            ⬆️ Next run:{" "}
                            <span className="font-medium">
                              {nextRunDate.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleSchedule(schedule.id)}
                      disabled={isProcessing}
                      className={`px-3 py-2 rounded font-medium transition text-sm ${
                        schedule.enabled
                          ? "bg-red-100 hover:bg-red-200 text-red-700"
                          : "bg-green-100 hover:bg-green-200 text-green-700"
                      } disabled:opacity-50`}
                    >
                      {schedule.enabled ? "Disable" : "Enable"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackupScheduler;
