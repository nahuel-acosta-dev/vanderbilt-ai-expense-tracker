# Version 2 Implementation Guide

## Architecture Overview

Version 2 implements a sophisticated export system using a modal-based workflow with professional UX patterns. This is a completely different approach from Version 1.

### Design Principles

1. **User Control** - Give users maximum control over exports
2. **Progressive Disclosure** - Show options, then preview, then export
3. **Real-time Feedback** - Instant preview updates as filters change
4. **Professional Polish** - Enterprise-grade UI and interactions
5. **Client-Side Processing** - No server calls, full privacy

## Component Hierarchy

```
ExportModalV2 (Main orchestrator)
├── Format Selection UI
│   ├── CSV Button
│   ├── JSON Button
│   └── PDF Button
├── Filename Input
├── Filter Panel
│   ├── Date Range
│   │   ├── Start Date Input
│   │   └── End Date Input
│   ├── Category Checkboxes
│   │   ├── Food
│   │   ├── Transportation
│   │   ├── Entertainment
│   │   ├── Shopping
│   │   ├── Bills
│   │   └── Other
│   └── Reset Button
├── ExportPreview (Conditional)
│   ├── Summary Box
│   │   ├── Record Count
│   │   └── Total Amount
│   └── Data Table
│       ├── Headers (sticky)
│       ├── Data Rows
│       └── Pagination (if needed)
└── Footer Actions
    ├── Cancel Button
    ├── Back Button (in Preview)
    └── Download/Export Button
```

## State Management

```typescript
// Modal Level
const [step, setStep] = useState<"options" | "preview" | "exporting">();
const [isExporting, setIsExporting] = useState(false);

// Export Options
const [format, setFormat] = useState<ExportFormat>("csv");
const [filename, setFilename] = useState(string);

// Filters
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

// Computed
const previewData = useMemo(() => {
  return generateExportPreview(
    expenses,
    startDate,
    endDate,
    selectedCategories
  );
}, [expenses, startDate, endDate, selectedCategories]);
```

## Data Flow

```
User Opens Modal
    ↓
[Options Step]
  - Select format (CSV/JSON/PDF)
  - Enter filename
  - Set filters (date, categories)
  - Real-time preview calculation
    ↓
User Clicks Preview
    ↓
[Preview Step]
  - Shows filtered data table
  - Display summary stats
  - Option to go back and adjust
    ↓
User Clicks Download
    ↓
[Exporting Step]
  - Show loading spinner (500ms)
  - Execute export based on format
  - Trigger browser download
    ↓
File Downloads + Modal Closes
```

## Export Formats Implementation

### CSV Export

```typescript
const generateCSV = (expenses: Expense[]): string => {
  // Headers: Date, Amount, Category, Description
  // Escaping: Quotes replaced with ""
  // Format: Standard RFC 4180
};
```

### JSON Export

```typescript
const generateJSON = (expenses: Expense[]): string => {
  // Structure:
  // {
  //   exportDate: ISO string
  //   totalRecords: number
  //   totalAmount: number
  //   data: Expense[]
  // }
  // Formatting: Indented with 2 spaces
};
```

### PDF Export

```typescript
const generatePDF = (expenses: Expense[], filename: string): void => {
  // Uses jsPDF library
  // Creates professional report with:
  // - Title: "Expense Report"
  // - Export timestamp
  // - Summary stats (count, total)
  // - Formatted table with:
  //   - Blue header row
  //   - Alternating row colors
  //   - Proper column widths
  //   - Currency formatting
};
```

## Filtering Logic

### Date Range Filtering

```typescript
// Include if:
// - startDate not set OR expense.date >= startDate
// - endDate not set OR expense.date <= endDate
```

### Category Filtering

```typescript
// Include if:
// - selectedCategories empty OR expense.category in selectedCategories
```

### Combined Filtering

```typescript
filterExpensesForExport = (expenses, startDate, endDate, categories) => {
  return expenses.filter((exp) => {
    const dateOk =
      (!startDate || exp.date >= startDate) &&
      (!endDate || exp.date <= endDate);
    const categoryOk = !categories?.length || categories.includes(exp.category);
    return dateOk && categoryOk;
  });
};
```

## UI Patterns

### Modal Overlay

- Fixed positioning with z-index 50
- Backdrop (z-index 40) with semi-transparent black
- Smooth fade animations
- Click backdrop to close (optional)

### Format Selection

- Grid layout with 3 columns
- Icon + label buttons
- Border highlights selected format
- Background color change on selection

### Filter Panel

- Gray background section
- Date inputs in 2-column grid
- Checkboxes for categories in 2-column grid
- Reset button visible only when filters active

### Preview Section

- Summary box with key metrics
- Scrollable table with sticky headers
- Alternating row colors for readability
- Empty state message

### Action Buttons

- Primary color for forward actions
- Secondary (white/gray) for back/cancel
- Green for final download
- Disabled state when no data

## Responsive Design

### Desktop (≥1024px)

- Modal width: max-w-2xl
- 3-column format selection
- 2-column filter grid
- Full table visible

### Tablet (768px - 1023px)

- Modal width: 95vw
- 3-column format selection
- 2-column filter grid
- Table scrollable

### Mobile (<768px)

- Modal width: 100vw (with padding)
- 1-column format selection (stack vertically)
- 1-column filter grid (single column)
- Table scrollable horizontally

## Performance Optimizations

1. **useMemo** for preview data calculation

   - Only recalculates when expenses or filters change
   - Prevents unnecessary table re-renders

2. **Lazy Loading**

   - Modal only rendered when isOpen = true
   - Prevents unnecessary DOM nodes

3. **Debounced Exports**

   - 500ms delay with spinner
   - Feels responsive without overwhelming browser

4. **Client-Side Processing**
   - No server round-trips
   - Instant feedback to user

## Error Handling

```typescript
// Empty results
if (previewData.records.length === 0) {
  // Show message: "No expenses match the selected filters"
  // Disable download button
}

// Export errors
try {
  executeExport(data, options);
} catch (error) {
  console.error("Export failed:", error);
  // Show error toast or notification
}
```

## Accessibility Features

- ✅ Semantic HTML elements
- ✅ Proper ARIA labels for form inputs
- ✅ Keyboard navigation support
- ✅ Color not sole differentiator
- ✅ Sufficient contrast ratios
- ✅ Focus states on all interactive elements
- ✅ Alt text for icons (emoji accessible)
- ✅ Proper heading hierarchy

## Browser API Usage

### Blob API

```typescript
new Blob([content], { type: "text/csv;charset=utf-8;" });
```

### URL API

```typescript
URL.createObjectURL(blob);
// Later: URL.revokeObjectURL(url)
```

### Anchor Element

```typescript
const link = document.createElement("a");
link.href = objectUrl;
link.download = filename;
link.click();
```

### jsPDF

```typescript
const doc = new jsPDF();
doc.autoTable({ ... });
doc.save(filename);
```

## Testing Strategy

### Unit Tests

- Filter function correctness
- CSV/JSON/PDF generation
- Filename validation

### Integration Tests

- Modal open/close
- Step transitions
- Filter updates affect preview
- Export execution

### E2E Tests

- Complete flow: open → filter → preview → export
- File downloads with correct name
- Data integrity in exported file
- Multi-format exports

### Manual Testing

- All browsers and devices
- Keyboard navigation
- Screen reader compatibility
- Edge cases (empty filters, large datasets)

## Deployment Considerations

1. **Dependency Installation**

   - `npm install jspdf jspdf-autotable`

2. **Build Process**

   - No special build configuration needed
   - All code bundled by Next.js

3. **Bundle Size Impact**

   - jsPDF: ~180KB
   - jsPDF-autotable: ~20KB
   - Total addition: ~200KB (compressed)

4. **Performance**
   - No impact on initial page load (lazy-loaded)
   - Only loaded when modal opens

## Maintenance Guidelines

1. **Adding New Export Formats**

   - Create new `generate[Format]()` function
   - Add option to `EXPORT_FORMATS` array
   - Update `executeExport()` switch statement
   - Update types if needed

2. **Modifying Filters**

   - Update `CATEGORIES` array
   - Modify filter panel UI
   - Update `filterExpensesForExport()` logic
   - Test preview updates

3. **Customizing UI**
   - Colors: Use Tailwind classes
   - Layout: Modify grid/flex in component
   - Icons: Change emoji or add SVGs

## Known Limitations

1. PDF styling limited to jsPDF capabilities
2. Very large datasets (>50k) may slow preview
3. Mobile PDF viewing may show formatting differently

## Future Extensibility

Structure designed for easy additions:

- New export formats (Excel, XLSX, etc.)
- Advanced filters (custom date ranges, search)
- Email delivery option
- Cloud storage integration
- Report templates
- Scheduled exports

---

**Document Version**: 1.0  
**Implementation Status**: Complete  
**Last Updated**: January 3, 2026
