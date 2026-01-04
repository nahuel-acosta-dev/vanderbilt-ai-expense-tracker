"use client";

import React, { useState } from "react";
import { Expense } from "@/types";
import { ExportTemplate, simulateGoogleSheetsExport } from "@/lib/exportV3";

interface GoogleSheetsIntegrationProps {
  selectedTemplate: ExportTemplate | null;
  isProcessing: boolean;
  expenses: Expense[];
}

const GoogleSheetsIntegration: React.FC<GoogleSheetsIntegrationProps> = ({
  selectedTemplate,
  isProcessing: _isProcessing,
  expenses,
}) => {
  const [spreadsheetName, setSpreadsheetName] = useState(
    `Expense Report - ${new Date().toLocaleDateString()}`
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [createdSheets, setCreatedSheets] = useState<
    Array<{ name: string; url: string; timestamp: string }>
  >([]);

  const handleGoogleConnect = async () => {
    setIsConnecting(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const handleCreateSheet = async () => {
    if (!selectedTemplate) return;

    setIsConnecting(true);
    try {
      const result = await simulateGoogleSheetsExport(
        expenses,
        selectedTemplate.id,
        spreadsheetName
      );

      setCreatedSheets([
        ...createdSheets,
        {
          name: spreadsheetName,
          url: result.spreadsheetUrl,
          timestamp: new Date().toLocaleString(),
        },
      ]);

      setSpreadsheetName(`Expense Report - ${new Date().toLocaleDateString()}`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">📗 Google Sheets Integration</h3>
        <p className="text-gray-600">
          Create and manage expense reports directly in Google Sheets with live
          data sync
        </p>
      </div>

      {/* Connection Status */}
      <div className="mb-6">
        <div
          className={`p-4 rounded-lg border-l-4 ${
            connected
              ? "bg-green-50 border-green-500"
              : "bg-yellow-50 border-yellow-500"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">
                {connected
                  ? "✅ Connected to Google Account"
                  : "⏳ Not Connected"}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {connected
                  ? "You can now create and manage sheets"
                  : "Connect your Google account to enable sheet creation"}
              </div>
            </div>
            {!connected && (
              <button
                onClick={handleGoogleConnect}
                disabled={isConnecting}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 rounded-lg font-medium transition disabled:opacity-50"
              >
                {isConnecting ? "⏳ Connecting..." : "🔗 Connect Google"}
              </button>
            )}
          </div>
        </div>
      </div>

      {connected && (
        <>
          {/* Create Sheet Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              Create New Sheet
            </h4>

            <div className="space-y-4">
              {!selectedTemplate && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-blue-900">👈 Select a template first</p>
                </div>
              )}

              {selectedTemplate && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Spreadsheet Name
                    </label>
                    <input
                      type="text"
                      value={spreadsheetName}
                      onChange={(e) => setSpreadsheetName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Selected Template
                    </h5>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{selectedTemplate.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {selectedTemplate.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedTemplate.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-gray-600">Data Fields</div>
                      <div className="font-semibold text-gray-900">
                        {selectedTemplate.includeFields.length}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-gray-600">Records</div>
                      <div className="font-semibold text-gray-900">
                        {expenses.length}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCreateSheet}
                    disabled={isConnecting}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isConnecting ? "⏳ Creating..." : "➕ Create Sheet"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Recent Sheets */}
          {createdSheets.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                Recent Spreadsheets
              </h4>
              <div className="space-y-2">
                {createdSheets.map((sheet, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {sheet.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {sheet.timestamp}
                      </div>
                    </div>
                    <a
                      href={sheet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition"
                    >
                      Open →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">📋 How It Works</h4>
        <ul className="text-sm text-blue-900 space-y-1">
          <li>✓ Securely connects to your Google account</li>
          <li>✓ Creates formatted sheets with your expense data</li>
          <li>✓ Auto-configures formulas and charts</li>
          <li>✓ Share sheets with team members</li>
          <li>✓ Maintain data sync across devices</li>
        </ul>
      </div>
    </div>
  );
};

export default GoogleSheetsIntegration;
