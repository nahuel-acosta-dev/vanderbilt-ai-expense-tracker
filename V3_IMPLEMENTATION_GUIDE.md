# V3 Implementation Guide

## 🚀 Quick Start

### Features Added

- CloudExportHub: Multi-tabbed cloud export interface
- 7 feature components with specialized functionality
- Complete state management for templates, history, schedules
- Professional SaaS-style UI with gradients and modular design

### How to Use

#### 1. Access Cloud Export Hub

```typescript
// In your dashboard/page
import { CloudExportHub } from "@/components";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>☁️ Cloud Export (V3)</button>

      {isOpen && (
        <CloudExportHub
          expenses={filteredExpenses}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

#### 2. Select Export Template

- Click "Templates" tab
- Browse 5 pre-configured options
- View live preview with statistics
- See category breakdown

#### 3. Email Export

- Click "Email Export" tab
- Enter recipient email
- Preview HTML rendering
- Send directly

#### 4. Google Sheets

- Click "Google Sheets" tab
- Connect Google account (simulated)
- Create spreadsheet with template
- Access sheet list

#### 5. Cloud Storage

- Click "Cloud Storage" tab
- Connect 6 different providers
- View storage usage
- Manage sync status

#### 6. Backup Scheduling

- Click "Auto Backup" tab
- Create daily/weekly/monthly schedules
- Set time and frequency
- Choose cloud providers
- Enable/disable as needed

#### 7. Export History

- Click "History" tab
- View all previous exports
- See status and metadata
- Delete entries as needed

#### 8. Sharing

- Click "Sharing" tab
- Generate secure share links
- Create QR codes
- Set password/expiration
- Track access analytics

---

## 📂 Component Architecture

### Component Tree

```
CloudExportHub
├── TemplateSelector
├── EmailExportFlow
│   └── Email Preview Modal
├── GoogleSheetsIntegration
├── CloudStorageConnector
├── BackupScheduler
├── ExportHistoryPanel
└── SharingCenter
```

### Data Flow

```
CloudExportHub State
├── selectedTemplate → TemplateSelector, EmailExportFlow, etc.
├── history → ExportHistoryPanel (from localStorage)
├── schedules → BackupScheduler (from localStorage)
├── connectedProviders → CloudStorageConnector
└── notification → All components (user feedback)
```

---

## 🔧 Utilities Overview

### exportV3.ts Exports

#### Constants

```typescript
// 5 pre-built export templates
export const EXPORT_TEMPLATES: ExportTemplate[];

// 6 cloud providers
export const CLOUD_PROVIDERS: CloudProvider[];
```

#### Functions

**Email**

```typescript
generateEmailContent(expenses, templateId, recipientEmail)
  → { subject, preview, htmlContent }

simulateEmailExport(expenses, templateId, recipientEmail)
  → Promise<{ success, messageId, timestamp }>
```

**Google Sheets**

```typescript
simulateGoogleSheetsExport(expenses, templateId, spreadsheetName)
  → Promise<{ success, spreadsheetUrl, timestamp }>
```

**Cloud Sync**

```typescript
simulateCloudSync(expenses, providers, format)
  → Promise<Array<{ provider, success, timestamp }>>
```

**Sharing**

```typescript
generateShareableLink(exportId)
  → { id, url, shortCode, accessCount, createdAt, ... }

generateQRCode(url)
  → SVG data URL (simulated)
```

**Scheduling**

```typescript
calculateNextRun(schedule: Omit<BackupSchedule, 'id' | 'nextRun'>)
  → ISO string of next run time
```

**Templates**

```typescript
generateTemplatePreview(expenses, templateId)
  → {
      title,
      description,
      previewData: Expense[],
      summary: { totalExpenses, totalAmount, categories, categoryBreakdown }
    }
```

#### Classes

**ExportHistoryManager**

```typescript
class ExportHistoryManager {
  static addToHistory(entry); // → ExportHistory
  static getHistory(); // → ExportHistory[]
  static getHistoryById(id); // → ExportHistory | undefined
  static deleteHistoryEntry(id); // → void
  static clearHistory(); // → void
}
```

**BackupScheduleManager**

```typescript
class BackupScheduleManager {
  static createSchedule(schedule); // → BackupSchedule
  static getSchedules(); // → BackupSchedule[]
  static updateSchedule(id, updates); // → BackupSchedule
  static deleteSchedule(id); // → void
  static toggleSchedule(id); // → BackupSchedule
}
```

---

## 💾 Data Structures

### ExportTemplate

```typescript
interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  format: "csv" | "json" | "pdf";
  includeFields: string[];
  groupingStrategy: "none" | "category" | "date" | "both";
  icon: string;
}
```

### CloudProvider

```typescript
interface CloudProvider {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastSync?: string;
  storageUsed?: number;
  quotaLimit?: number;
}
```

### ExportHistory

```typescript
interface ExportHistory {
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
```

### BackupSchedule

```typescript
interface BackupSchedule {
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
```

### ShareableLink

```typescript
interface ShareableLink {
  id: string;
  url: string;
  shortCode: string;
  expiresAt?: string;
  accessCount: number;
  maxAccess?: number;
  requiresPassword: boolean;
  createdAt: string;
}
```

---

## 🎯 Development Workflow

### Adding New Feature Component

1. **Create Component File**

```tsx
// src/components/ExportV3/NewFeature.tsx
"use client";

import React from "react";

interface NewFeatureProps {
  expenses: Expense[];
  onAction: () => void;
}

const NewFeature: React.FC<NewFeatureProps> = ({ expenses, onAction }) => {
  return <div>{/* Your feature UI */}</div>;
};

export default NewFeature;
```

2. **Export from index.ts**

```typescript
// src/components/ExportV3/index.ts
export { default as NewFeature } from "./NewFeature";
```

3. **Import in CloudExportHub**

```typescript
import NewFeature from "./ExportV3/NewFeature";
```

4. **Add Tab Configuration**

```typescript
const tabs = [
  // ... existing tabs
  { id: "new-feature", label: "New Feature", icon: "✨" },
];
```

5. **Add Content Rendering**

```tsx
{
  activeTab === "new-feature" && (
    <NewFeature expenses={expenses} onAction={handleNewFeatureAction} />
  );
}
```

---

## 🧪 Testing Checklist

### Email Export

- [ ] Template selection works
- [ ] Email preview loads in iframe
- [ ] HTML renders correctly
- [ ] Subject and preview text generate
- [ ] Send button creates history entry
- [ ] Notification displays

### Google Sheets

- [ ] OAuth connection flow simulates
- [ ] Spreadsheet name input works
- [ ] Sheet creation simulates
- [ ] Sheet list displays created sheets
- [ ] Links open correctly

### Cloud Storage

- [ ] Provider cards display
- [ ] Connection toggle works
- [ ] Connected state persists
- [ ] Storage metrics display
- [ ] Multiple providers can connect
- [ ] Disconnect works

### Backup Scheduling

- [ ] Daily, weekly, monthly options
- [ ] Time picker works
- [ ] Day selectors for weekly/monthly
- [ ] Schedule list displays
- [ ] Enable/disable toggle
- [ ] Next run calculation correct
- [ ] Schedules persist in localStorage

### Export History

- [ ] History entries display
- [ ] Correct status icons
- [ ] Timestamps show
- [ ] Delete functionality works
- [ ] Summary stats calculate correctly
- [ ] Recent exports highlight
- [ ] Filter/sort works

### Sharing

- [ ] Template selection required
- [ ] Share link generates
- [ ] Short code creates
- [ ] Copy to clipboard works
- [ ] QR code displays
- [ ] Password toggle works
- [ ] Access stats show

---

## 🔌 Integration Points

### Backend APIs Needed (for production)

1. **Email Service**

```typescript
POST /api/export/email
Body: { expenses, templateId, recipientEmail }
Response: { success, messageId, timestamp }
```

2. **Google Sheets API**

```typescript
POST /api/export/sheets
Body: { expenses, templateId, spreadsheetName }
Response: { success, spreadsheetUrl, timestamp }
```

3. **Cloud Provider Auth**

```typescript
POST /api/auth/connect/:provider
Response: { authUrl } // Redirect to OAuth
```

4. **Cloud Sync**

```typescript
POST /api/export/sync
Body: { exportData, providers }
Response: { results: Array<{ provider, success }> }
```

5. **Share Link Generation**

```typescript
POST /api/share/generate
Body: { exportId, options: { password?, expiresIn? } }
Response: { url, shortCode, qrCode }
```

---

## 🎨 Customization Guide

### Change Color Scheme

```tsx
// In component, update Tailwind classes:
// bg-blue-600 → bg-purple-600
// text-blue-900 → text-purple-900
// focus:ring-blue-500 → focus:ring-purple-500
```

### Modify Templates

```typescript
// In exportV3.ts, update EXPORT_TEMPLATES array
EXPORT_TEMPLATES.push({
  id: "custom-template",
  name: "Custom Template",
  description: "...",
  format: "csv",
  includeFields: ["date", "category", "amount"],
  groupingStrategy: "category",
  icon: "📊",
});
```

### Add Cloud Provider

```typescript
// In exportV3.ts, update CLOUD_PROVIDERS array
CLOUD_PROVIDERS.push({
  id: "new-provider",
  name: "New Provider",
  icon: "🆕",
  connected: false,
});
```

---

## 📊 Performance Optimization

### Current Optimizations

- Tab-based lazy rendering (only active tab renders)
- useMemo for expensive calculations
- LocalStorage caching for schedules/history
- Debounced notifications

### Future Optimizations

- Virtual scrolling for large history lists
- Component code splitting
- Lazy load cloud provider libraries
- Request caching

---

## 🚨 Error Handling

### Current Patterns

```typescript
// In components
try {
  await operation();
  showNotification("success", "Operation completed");
} catch (error) {
  showNotification("error", "Failed to complete operation");
} finally {
  setIsProcessing(false);
}
```

### Notification System

```typescript
// Auto-clear after 4 seconds
const showNotification = (type, message) => {
  setNotification({ type, message });
  setTimeout(() => setNotification(null), 4000);
};
```

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px (single column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3+ columns)

### Responsive Classes Used

```tsx
// Grid layouts
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Padding
px-4 sm:px-6 lg:px-8

// Max width
max-w-2xl max-w-4xl max-w-7xl
```

---

## 🔍 Debugging

### Enable Console Logging

```typescript
// In component handlers
console.log("Selected template:", selectedTemplate);
console.log("History:", ExportHistoryManager.getHistory());
console.log("Schedules:", BackupScheduleManager.getSchedules());
```

### Check localStorage

```javascript
// In browser console
localStorage.getItem("exportHistory_v3");
localStorage.getItem("backupSchedules_v3");
```

### Component State

Use React DevTools to inspect:

- activeTab
- selectedTemplate
- notification
- connectedProviders

---

## 📚 Resources

- React Hooks: https://react.dev/reference/react
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- NextJS: https://nextjs.org/docs

---

**V3 is production-ready for simulation. Backend integration transforms it into enterprise system.**
