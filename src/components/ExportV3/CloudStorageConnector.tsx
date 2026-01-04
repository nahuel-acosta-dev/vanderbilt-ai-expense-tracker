"use client";

import React, { useState } from "react";
import { CloudProvider } from "@/lib/exportV3";

interface CloudStorageConnectorProps {
  providers: CloudProvider[];
  connectedProviders: Set<string>;
  onConnect: (providerId: string) => void;
  isProcessing: boolean;
}

const CloudStorageConnector: React.FC<CloudStorageConnectorProps> = ({
  providers,
  connectedProviders,
  onConnect,
  isProcessing,
}) => {
  const [hoveredProvider, setHoveredProvider] = useState<string | null>(null);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">☁️ Cloud Storage Connectors</h3>
        <p className="text-gray-600">
          Connect and sync your exports with popular cloud storage services
        </p>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {providers.map((provider) => {
          const isConnected = connectedProviders.has(provider.id);
          const isHovered = hoveredProvider === provider.id;

          return (
            <div
              key={provider.id}
              onMouseEnter={() => setHoveredProvider(provider.id)}
              onMouseLeave={() => setHoveredProvider(null)}
              className={`p-6 rounded-lg border-2 transition cursor-pointer ${
                isConnected
                  ? "border-green-500 bg-green-50"
                  : isHovered
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{provider.icon}</span>
                {isConnected && <span className="text-lg">✅</span>}
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">
                {provider.name}
              </h3>

              {isConnected ? (
                <div className="space-y-2">
                  <div className="text-sm text-green-700">✓ Connected</div>
                  {provider.lastSync && (
                    <div className="text-xs text-gray-600">
                      Last sync: {new Date(provider.lastSync).toLocaleString()}
                    </div>
                  )}
                  {provider.storageUsed !== undefined && (
                    <div className="text-xs text-gray-600 mt-2">
                      <div className="mb-1">
                        Storage: {provider.storageUsed}MB /{" "}
                        {provider.quotaLimit}MB
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${
                              ((provider.storageUsed || 0) /
                                (provider.quotaLimit || 100)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => onConnect(provider.id)}
                    disabled={isProcessing}
                    className="w-full mt-3 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded font-medium text-sm transition disabled:opacity-50"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onConnect(provider.id)}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm transition disabled:opacity-50"
                >
                  {isProcessing ? "⏳ Connecting..." : "Connect"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-3">
            🔄 Automatic Sync
          </h4>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>✓ Real-time backup syncing</li>
            <li>✓ Version history</li>
            <li>✓ Automatic conflict resolution</li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-3">🔒 Security</h4>
          <ul className="text-sm text-purple-900 space-y-1">
            <li>✓ End-to-end encryption</li>
            <li>✓ OAuth 2.0 authentication</li>
            <li>✓ Audit logs</li>
          </ul>
        </div>
      </div>

      {/* Connected Providers Summary */}
      {connectedProviders.size > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">
            📊 Connected Integrations
          </h4>
          <p className="text-sm text-green-900">
            Your exports are being synced to{" "}
            <span className="font-bold">
              {Array.from(connectedProviders)
                .map((id) => providers.find((p) => p.id === id)?.name)
                .filter(Boolean)
                .join(", ")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CloudStorageConnector;
