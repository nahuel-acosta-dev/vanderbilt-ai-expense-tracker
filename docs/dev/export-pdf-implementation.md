# Export PDF Implementation

## Overview

`Export PDF` in this repository is implemented as a template-driven flow inside the Cloud Export Hub (V3).  
Current scope is selecting PDF templates, previewing data, and using those templates in sharing/email/scheduling flows.

- In scope:
  - PDF template definitions
  - UI selection and preview
  - Export history and scheduling metadata using selected PDF templates
- Out of scope (current codebase):
  - Real PDF file binary generation/download
  - Real backend export API

Feature classification: `Frontend-only` (with simulated backend/cloud operations).

## Architecture / Flow

```text
User opens dashboard
  -> Clicks "Cloud Export (V3)"
    -> CloudExportHub modal opens
      -> User selects a PDF template (Tax Report / Monthly Summary)
        -> Template preview generated from in-memory expenses
          -> User can:
             - Send via simulated email flow
             - Use sharing tools (simulated links/QR)
             - Include template in backup schedules
          -> Export metadata persisted to localStorage history/schedules
```

## API / Contracts

No real server API is implemented for PDF export in this repo.

Client-side contracts used by the feature:

- `ExportTemplate.format`: `"csv" | "json" | "pdf"` in `src/lib/exportV3.ts`
- PDF templates currently defined:
  - `tax-report` (`format: "pdf"`)
  - `monthly-summary` (`format: "pdf"`)
- Simulated async actions:
  - `simulateEmailExport(...)`
  - `simulateCloudSync(...)`
  - `simulateGoogleSheetsExport(...)`

Assumption:
- Comments in `src/lib/exportV3.ts` indicate intended future backend endpoints, but they are not wired in this project yet.

## Data Model / Persistence

No database changes. Persistence is browser `localStorage`.

- Export history key: `exportHistory_v3` via `ExportHistoryManager`
- Backup schedules key: `backupSchedules_v3` via `BackupScheduleManager`

Relevant structures in `src/lib/exportV3.ts`:

- `ExportTemplate`
- `ExportHistory`
- `BackupSchedule`

## Implementation Details

Key files:

- `src/lib/exportV3.ts`
- `src/components/CloudExportHub.tsx`
- `src/components/ExportV3/TemplateSelector.tsx`
- `src/components/ExportV3/EmailExportFlow.tsx`
- `src/components/ExportV3/SharingCenter.tsx`
- `src/app/page.tsx`

Important decisions:

- PDF capability is represented by template metadata and UI behavior.
- Existing real download path remains CSV-only (`exportToCSV` in `src/lib/utils.ts`).
- V3 export actions are simulation-first and do not perform actual PDF rendering.

Feature flags / env vars:

- None found for PDF export.

## Testing

Automated tests for this flow were not found in the repository.

How to validate manually:

1. Run app (`npm run dev`) and open dashboard.
2. Ensure expenses exist.
3. Open `Cloud Export (V3)`.
4. Select `Tax Report` or `Monthly Summary` template (both PDF).
5. Verify preview updates and format badge shows `PDF`.
6. Execute email export flow and confirm history entry is created.
7. Create a backup schedule using a PDF template and verify it persists after reload.

Key cases to cover:

- No template selected -> email/share actions blocked with guidance.
- Zero expenses -> preview and stats remain stable.
- localStorage unavailable/cleared -> history and schedules reinitialize safely.

## Observability / Logs

- No dedicated logging, metrics, or tracing for PDF export were found.
- User feedback is provided through in-app notifications in `CloudExportHub`.

## Rollout / Backwards Compatibility

- Backwards compatible with CSV export path on dashboard.
- Main risk: users may expect actual PDF download while current implementation is template + simulated flows.
- Suggested rollout note: label PDF as "template-based cloud export" until real PDF generation is implemented.

## User Documentation

See user guide: `../user/export-pdf-guide.md`

## TODOs

- Implement real PDF generation (for example using `jsPDF` + table rendering) and attach/download file.
- Add backend endpoints for email/sync/share operations currently simulated.
- Add automated tests for template selection and export history creation.
- Clarify UX copy to distinguish "simulated cloud flow" from "downloadable PDF file".

## See Also

- `README.md`
- `EXPORT_FEATURE_V3.md`
- `V3_IMPLEMENTATION_GUIDE.md`
- `API_REFERENCE.md`
