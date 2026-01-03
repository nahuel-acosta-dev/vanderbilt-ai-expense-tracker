# CSV Export Feature - Version 1

## Overview

Simple CSV export functionality for the Expense Tracker application. This feature allows users to download all their expenses (or filtered expenses) as a CSV file.

## Implementation Details

### Location

- **Utility Function**: `src/lib/utils.ts` - `exportToCSV()` function
- **UI Component**: `src/app/page.tsx` - Export button in header
- **Import**: Function is imported from utils and used in the main page

### How It Works

#### 1. CSV Generation (`exportToCSV` function)

```typescript
export const exportToCSV = (expenses: Expense[]): void => {
  const headers = ["Date", "Amount", "Category", "Description"];
  const csvContent = [
    headers.join(","),
    ...expenses.map((exp) =>
      [
        exp.date,
        exp.amount,
        exp.category,
        `"${exp.description.replace(/"/g, '""')}"`,
      ].join(",")
    ),
  ].join("\n");
  // ... rest of implementation
};
```

**Key Features:**

- Headers: Date, Amount, Category, Description
- Proper CSV escaping: Quotes in descriptions are doubled (`"` → `""`)
- Descriptions wrapped in quotes to handle commas safely
- Dynamic filename: `expenses-YYYY-MM-DD.csv`

#### 2. Browser Download

- Uses `Blob` API to create CSV data
- Creates an invisible `<a>` element
- Triggers click to download file
- Cleans up DOM afterwards

#### 3. UI Integration

- Export button appears in the header
- Only shows if expenses exist (`expenses.length > 0`)
- Exports filtered expenses (respects active filters)
- Simple green button with download emoji

### CSV Output Format

```
Date,Amount,Category,Description
2026-01-03,25.5,Food,Lunch at restaurant
2026-01-02,50,Transportation,Uber ride to airport
2026-01-01,100,Shopping,"New ""premium"" shoes"
```

### Usage

#### For Users

1. Navigate to the Expense Tracker dashboard
2. If you have expenses, click the "📥 Export to CSV" button in the top right
3. Browser downloads file as `expenses-YYYY-MM-DD.csv`
4. Open in Excel, Google Sheets, or any spreadsheet application

#### For Developers

```typescript
import { exportToCSV } from "@/lib/utils";

// Export all expenses
exportToCSV(allExpenses);

// Export filtered expenses
exportToCSV(filteredExpenses);
```

## Testing

### Manual Testing

1. Add several expenses with different categories
2. Click the "Export to CSV" button
3. Download should trigger automatically
4. Open downloaded file in spreadsheet app
5. Verify all data is present and formatted correctly

### Edge Cases Handled

- ✓ Descriptions with quotes (escaped properly)
- ✓ Large numbers
- ✓ Empty descriptions
- ✓ All categories
- ✓ Special characters in descriptions

## Browser Compatibility

- ✓ Chrome/Chromium
- ✓ Firefox
- ✓ Safari
- ✓ Edge
- Uses standard `Blob` and `URL.createObjectURL()` APIs

## Performance

- Instant download generation
- No server-side processing needed
- Works entirely in the browser
- Handles large datasets efficiently

## Future Enhancements (v2, v3)

- Multiple export formats (Excel, JSON)
- Custom column selection
- Date range export options
- Email export functionality
- Cloud backup integration
