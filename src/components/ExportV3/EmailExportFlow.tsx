"use client";

import React, { useState } from "react";
import { Expense } from "@/types";
import { ExportTemplate, generateEmailContent } from "@/lib/exportV3";

interface EmailExportFlowProps {
  selectedTemplate: ExportTemplate | null;
  onEmailExport: (email: string) => Promise<void>;
  isProcessing: boolean;
  expenses: Expense[];
}

const EmailExportFlow: React.FC<EmailExportFlowProps> = ({
  selectedTemplate,
  onEmailExport,
  isProcessing,
  expenses,
}) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [emailContent, setEmailContent] = useState<any>(null);

  const handlePreview = () => {
    if (selectedTemplate && recipientEmail) {
      const content = generateEmailContent(
        expenses,
        selectedTemplate.id,
        recipientEmail
      );
      setEmailContent(content);
      setShowPreview(true);
    }
  };

  const handleSend = async () => {
    if (recipientEmail && selectedTemplate) {
      await onEmailExport(recipientEmail);
      setRecipientEmail("");
      setShowPreview(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">📧 Email Export</h3>
        <p className="text-gray-600">
          Send your expense report directly to email with professional
          formatting
        </p>
      </div>

      {!selectedTemplate ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-900">
            👈 Select a template first to enable email export
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Recipient Email Address
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Template Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{selectedTemplate.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {selectedTemplate.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedTemplate.description}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  📊 Will include {selectedTemplate.includeFields.length} data
                  fields
                </div>
              </div>
            </div>
          </div>

          {/* Preview Button */}
          <div className="flex gap-3">
            <button
              onClick={handlePreview}
              disabled={!recipientEmail || isProcessing}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition disabled:opacity-50"
            >
              👁️ Preview Email
            </button>
            <button
              onClick={handleSend}
              disabled={!recipientEmail || isProcessing}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center gap-2"
            >
              {isProcessing ? "⏳ Sending..." : "✉️ Send Email"}
            </button>
          </div>

          {/* Email Preview Modal */}
          {showPreview && emailContent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Preview Header */}
                <div className="bg-gray-50 border-b px-6 py-4 flex items-center justify-between sticky top-0">
                  <h3 className="text-lg font-bold">Email Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ✕
                  </button>
                </div>

                {/* Email Content */}
                <div className="p-6">
                  {/* Subject */}
                  <div className="mb-4 pb-4 border-b">
                    <div className="text-sm text-gray-600">Subject:</div>
                    <div className="font-semibold text-gray-900">
                      {emailContent.subject}
                    </div>
                  </div>

                  {/* Preview Text */}
                  <div className="mb-4 pb-4 border-b">
                    <div className="text-sm text-gray-600">Preview:</div>
                    <div className="text-gray-900">{emailContent.preview}</div>
                  </div>

                  {/* HTML Rendering */}
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <iframe
                      srcDoc={emailContent.htmlContent}
                      className="w-full border-0 bg-white"
                      style={{ height: "400px" }}
                      title="Email Preview"
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setShowPreview(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={isProcessing}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                    >
                      {isProcessing ? "⏳ Sending..." : "✉️ Send Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailExportFlow;
