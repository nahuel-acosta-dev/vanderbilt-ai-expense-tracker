"use client";

import React from "react";
import { ExportHistory } from "@/lib/exportV3";

interface ExportHistoryPanelProps {
  history: ExportHistory[];
  onDelete: (id: string) => void;
}

const ExportHistoryPanel: React.FC<ExportHistoryPanelProps> = ({
  history,
  onDelete,
}) => {
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getStatusIcon = (status: ExportHistory["status"]) => {
    switch (status) {
      case "completed":
        return "✅";
      case "failed":
        return "❌";
      case "syncing":
        return "⏳";
    }
  };

  const getStatusColor = (status: ExportHistory["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "failed":
        return "bg-red-100 text-red-800 border-red-300";
      case "syncing":
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">📜 Export History</h3>
        <p className="text-gray-600">
          View and manage all your previous exports
        </p>
      </div>

      {sortedHistory.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <div className="text-4xl mb-3">📭</div>
          <div className="text-gray-600 font-medium">No exports yet</div>
          <p className="text-sm text-gray-500 mt-1">
            Create an export to see it appear in your history
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedHistory.map((entry) => {
            const timestamp = new Date(entry.timestamp);
            const isRecent = Date.now() - timestamp.getTime() < 3600000; // Within 1 hour

            return (
              <div
                key={entry.id}
                className={`p-4 rounded-lg border-2 transition hover:shadow-md ${
                  isRecent
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header Row */}
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          entry.status
                        )}`}
                      >
                        {getStatusIcon(entry.status)} {entry.status}
                      </span>
                      <h4 className="font-semibold text-gray-900">
                        {entry.template}
                      </h4>
                      {isRecent && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                          Recent
                        </span>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div className="text-sm">
                        <div className="text-gray-600">Format</div>
                        <div className="font-semibold text-gray-900">
                          {entry.format.toUpperCase()}
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600">Records</div>
                        <div className="font-semibold text-gray-900">
                          {entry.recordCount}
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600">File Size</div>
                        <div className="font-semibold text-gray-900">
                          {entry.fileSize}KB
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600">Time</div>
                        <div className="font-semibold text-gray-900">
                          {timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Cloud Providers */}
                    {entry.cloudProviders.length > 0 && (
                      <div className="text-sm mb-2">
                        <div className="text-gray-600 mb-1">Synced to:</div>
                        <div className="flex flex-wrap gap-2">
                          {entry.cloudProviders.map((provider, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              ☁️ {provider}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className="text-xs text-gray-500">
                      {timestamp.toLocaleString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 ml-4">
                    {entry.sharedLink && (
                      <a
                        href={entry.sharedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                      >
                        🔗 View
                      </a>
                    )}
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm rounded transition font-medium"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary Stats */}
      {sortedHistory.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600">Total Exports</div>
            <div className="text-2xl font-bold text-blue-600">
              {sortedHistory.length}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600">Successful</div>
            <div className="text-2xl font-bold text-green-600">
              {sortedHistory.filter((h) => h.status === "completed").length}
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600">Total Records</div>
            <div className="text-2xl font-bold text-purple-600">
              {sortedHistory.reduce((sum, h) => sum + h.recordCount, 0)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportHistoryPanel;
