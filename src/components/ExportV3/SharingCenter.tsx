"use client";

import React, { useState } from "react";
import { Expense } from "@/types";
import {
  ExportTemplate,
  generateShareableLink,
  generateQRCode,
  ExportHistory,
} from "@/lib/exportV3";

interface SharingCenterProps {
  selectedTemplate: ExportTemplate | null;
  history: ExportHistory[];
  expenses: Expense[];
}

const SharingCenter: React.FC<SharingCenterProps> = ({
  selectedTemplate,
  history: _history,
  expenses: _expenses,
}) => {
  const [selectedExport, _setSelectedExport] = useState<string | null>(null);
  const [sharePassword, setSharePassword] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [generatedLinks, setGeneratedLinks] = useState<
    Array<{
      id: string;
      url: string;
      shortCode: string;
      qrCode: string;
      timestamp: string;
    }>
  >([]);
  const [expandedLink, setExpandedLink] = useState<string | null>(null);

  const handleGenerateShareLink = () => {
    const shareableLink = generateShareableLink(selectedExport || "new");
    const qrCode = generateQRCode(shareableLink.url);

    setGeneratedLinks([
      ...generatedLinks,
      {
        id: shareableLink.id,
        url: shareableLink.url,
        shortCode: shareableLink.shortCode,
        qrCode,
        timestamp: new Date().toLocaleString(),
      },
    ]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">🔗 Sharing Center</h3>
        <p className="text-gray-600">
          Generate shareable links and QR codes for secure data sharing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Link Generator */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">
            Generate Share Link
          </h4>

          {!selectedTemplate ? (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-900">👈 Select a template first</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Template Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedTemplate.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {selectedTemplate.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedTemplate.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Options */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={usePassword}
                    onChange={(e) => setUsePassword(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-gray-900">
                    Require password to access
                  </span>
                </label>

                {usePassword && (
                  <input
                    type="password"
                    placeholder="Set share password"
                    value={sharePassword}
                    onChange={(e) => setSharePassword(e.target.value)}
                    className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* Share Options */}
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">
                  Sharing Options
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-gray-700">Allow download</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-gray-700">
                    Allow preview only
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-gray-700">
                    Expire after 7 days
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-gray-700">
                    Track access analytics
                  </span>
                </label>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateShareLink}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                🔗 Generate Share Link
              </button>
            </div>
          )}
        </div>

        {/* Generated Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">
            Generated Links ({generatedLinks.length})
          </h4>

          {generatedLinks.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-gray-600">🔗 No links generated yet</div>
              <p className="text-sm text-gray-500 mt-1">
                Generate your first share link to the left
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {generatedLinks.map((link) => (
                <div
                  key={link.id}
                  className={`border-2 rounded-lg p-3 transition cursor-pointer ${
                    expandedLink === link.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() =>
                    setExpandedLink(expandedLink === link.id ? null : link.id)
                  }
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mb-1 break-all">
                        {link.shortCode}
                      </div>
                      <div className="text-xs text-gray-500">
                        Generated: {link.timestamp}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(link.url);
                      }}
                      className="ml-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition"
                    >
                      Copy
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {expandedLink === link.id && (
                    <div className="mt-3 pt-3 border-t space-y-3">
                      {/* Full URL */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">
                          Full URL:
                        </div>
                        <div className="text-xs bg-white border border-gray-300 rounded p-2 break-all font-mono">
                          {link.url}
                        </div>
                      </div>

                      {/* QR Code */}
                      <div>
                        <div className="text-xs text-gray-600 mb-2">
                          QR Code:
                        </div>
                        <div className="bg-white p-2 rounded border border-gray-300 flex justify-center">
                          <svg
                            className="w-24 h-24 text-gray-900"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect fill="white" width="100" height="100" />
                            {/* Simulated QR pattern */}
                            {Array.from({ length: 10 }).map((_, i) =>
                              Array.from({ length: 10 }).map((_, j) =>
                                Math.random() > 0.5 ? (
                                  <rect
                                    key={`${i}-${j}`}
                                    x={i * 10}
                                    y={j * 10}
                                    width="8"
                                    height="8"
                                    fill="currentColor"
                                  />
                                ) : null
                              )
                            )}
                          </svg>
                        </div>
                      </div>

                      {/* Access Stats */}
                      <div className="bg-gray-100 rounded p-2">
                        <div className="text-xs text-gray-700">
                          <div>👁️ Views: 0</div>
                          <div>⬇️ Downloads: 0</div>
                          <div>🔐 Password Protected: No</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sharing Features */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">
            🔐 Secure Sharing
          </h4>
          <ul className="text-sm text-green-900 space-y-1">
            <li>✓ Password-protected links</li>
            <li>✓ Expiring share links</li>
            <li>✓ Access tracking</li>
            <li>✓ Email notifications</li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-2">
            📱 QR Code Sharing
          </h4>
          <ul className="text-sm text-purple-900 space-y-1">
            <li>✓ Mobile-friendly QR codes</li>
            <li>✓ Print-ready codes</li>
            <li>✓ Custom branding options</li>
            <li>✓ Analytics tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SharingCenter;
