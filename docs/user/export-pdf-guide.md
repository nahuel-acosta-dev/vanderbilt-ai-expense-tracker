# Export PDF Guide

## What It Is

`Export PDF` lets you use PDF-based templates in the Cloud Export Hub workflow, including preview, email export flow, sharing, and scheduling.

Important:
- This version does not provide a direct PDF file download button.
- PDF is currently handled as a template format inside the V3 cloud export experience.

## Prerequisites

- You are logged into the app and can access the dashboard.
- You have at least one expense saved.
- Optional: email address ready if you want to use Email Export.

## Step-by-Step

1. Open the dashboard and click `Cloud Export (V3)` in the header.
<!-- SCREENSHOT: Cloud Export (V3) button in dashboard header -->

2. Go to the `Templates` tab.
<!-- SCREENSHOT: Templates tab selected in Cloud Export Hub -->

3. Select one PDF template:
- `Tax Report`
- `Monthly Summary`
<!-- SCREENSHOT: PDF template cards with format badge set to PDF -->

4. Review the preview panel (totals, category breakdown, sample records).
<!-- SCREENSHOT: Template preview panel with stats -->

5. Optional: open `Email Export`, enter recipient email, and send.
<!-- SCREENSHOT: Email Export tab with recipient field and Send button -->

6. Optional: open `History` tab and confirm your export entry appears.
<!-- SCREENSHOT: History tab showing a new export row -->

## Common Use Cases

- Monthly accounting review:
  - Choose `Monthly Summary` and send it by email.
- Tax preparation:
  - Choose `Tax Report` and keep a history entry for audit context.
- Scheduled reporting:
  - Create a recurring backup schedule using a PDF template.

## Troubleshooting

- `I cannot send email export`:
  - Select a template first in `Templates`.
  - Confirm the email field is not empty.

- `No exports in history`:
  - Complete an export action from `Email Export`.
  - Refresh and verify browser localStorage is enabled.

- `I expected a downloadable PDF file`:
  - Current implementation is template-based and simulation-first.
  - Direct PDF file generation is not implemented yet in this codebase.

## FAQ

### Does this create a real `.pdf` file on my computer?
No. Current V3 flow uses PDF templates but does not generate a direct PDF download.

### Which templates are PDF?
`Tax Report` and `Monthly Summary`.

### Is this data stored in the cloud?
Not by default. The current project uses simulated cloud integrations and local browser storage for history/schedules.

### Can I still export a real file?
Yes, CSV download is available from the dashboard via `Export to CSV`.

## For Developers

Technical details: `../dev/export-pdf-implementation.md`

## See Also

- `README.md`
- `EXPORT_FEATURE_V3.md`
- `V3_IMPLEMENTATION_GUIDE.md`
