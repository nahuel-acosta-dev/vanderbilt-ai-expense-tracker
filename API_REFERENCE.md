# API Reference & Architecture Guide

## 📚 Table of Contents

1. [Types & Interfaces](#types--interfaces)
2. [Utility Functions](#utility-functions)
3. [Custom Hooks](#custom-hooks)
4. [Components](#components)
5. [Component Props](#component-props)

---

## Types & Interfaces

### `Expense`

Represents a single expense entry.

```typescript
interface Expense {
  id: string; // Unique identifier (timestamp-based)
  date: string; // ISO date string (YYYY-MM-DD)
  amount: number; // Amount in USD
  category: Category; // Expense category
  description: string; // Text description
}
```

### `Category`

Union type for expense categories.

```typescript
type Category =
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Shopping"
  | "Bills"
  | "Other";
```

### `FilterOptions`

Configuration for expense filters.

```typescript
interface FilterOptions {
  startDate: string; // ISO date string or empty
  endDate: string; // ISO date string or empty
  category: Category | "All"; // Selected category
  searchTerm: string; // Search string or empty
}
```

### `ExpenseSummary`

Aggregated expense statistics.

```typescript
interface ExpenseSummary {
  totalSpending: number; // Sum of all expenses
  monthlySpending: number; // Sum for current month
  topCategories: Array<{
    category: Category;
    amount: number;
  }>; // Top 3 categories by amount
  expenseCount: number; // Total expense count
  averageExpense: number; // Mean expense amount
}
```

---

## Utility Functions

All functions are in `src/lib/utils.ts`

### `formatCurrency(amount: number): string`

Formats a number as USD currency.

**Example:**

```typescript
formatCurrency(25.5); // Returns: "$25.50"
formatCurrency(1000); // Returns: "$1,000.00"
```

### `formatDate(date: string): string`

Formats an ISO date string to readable format.

**Example:**

```typescript
formatDate("2024-01-15"); // Returns: "Jan 15, 2024"
```

### `formatDateForInput(date: Date): string`

Converts a Date object to HTML date input format.

**Example:**

```typescript
formatDateForInput(new Date()); // Returns: "2024-01-15"
```

### `getCategoryColor(category: Category): string`

Returns Tailwind CSS classes for category styling.

**Example:**

```typescript
getCategoryColor("Food"); // Returns: "bg-orange-100 text-orange-800"
```

### `getCategoryBgColor(category: Category): string`

Returns background color Tailwind class for a category.

**Example:**

```typescript
getCategoryBgColor("Food"); // Returns: "bg-orange-500"
```

### `calculateExpenseSummary(expenses: Expense[]): ExpenseSummary`

Calculates aggregate statistics from expense array.

**Example:**

```typescript
const expenses: Expense[] = [
  {
    id: "1",
    date: "2024-01-15",
    amount: 25,
    category: "Food",
    description: "Lunch",
  },
  {
    id: "2",
    date: "2024-01-16",
    amount: 50,
    category: "Transportation",
    description: "Gas",
  },
];

const summary = calculateExpenseSummary(expenses);
// Returns:
// {
//   totalSpending: 75,
//   monthlySpending: 75,
//   topCategories: [
//     { category: 'Transportation', amount: 50 },
//     { category: 'Food', amount: 25 }
//   ],
//   expenseCount: 2,
//   averageExpense: 37.5
// }
```

### `validateExpense(amount: number, description: string, date: string): ValidationResult`

Validates expense input.

**Returns:**

```typescript
{
  valid: boolean;
  errors: Record<string, string>; // Empty if valid
}
```

**Validation Rules:**

- Amount must be > 0
- Description cannot be empty
- Date must not be in future
- All fields required

**Example:**

```typescript
validateExpense(0, "Lunch", "2024-01-15");
// Returns: {
//   valid: false,
//   errors: { amount: 'Amount must be greater than 0' }
// }
```

### `exportToCSV(expenses: Expense[]): void`

Triggers CSV file download in browser.

**CSV Format:**

```
Date,Amount,Category,Description
2024-01-15,25.50,Food,"Lunch at restaurant"
2024-01-16,50.00,Transportation,"Gas"
```

**Example:**

```typescript
exportToCSV(filteredExpenses); // Downloads file
```

---

## Custom Hooks

### `useExpenses()`

Main hook for expense state management and localStorage persistence.

**Returns:**

```typescript
{
  expenses: Expense[];
  isLoading: boolean;
  addExpense: (date: string, amount: number, category: Category, description: string) => Expense;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  clearAllExpenses: () => void;
}
```

**Features:**

- ✅ Loads expenses from localStorage on mount
- ✅ Auto-saves to localStorage on changes
- ✅ Type-safe CRUD operations
- ✅ Handles initial loading state

**Example:**

```typescript
const { expenses, addExpense, deleteExpense } = useExpenses();

// Add expense
addExpense("2024-01-15", 25.5, "Food", "Lunch");

// Delete expense
deleteExpense("expense-id");

// View all expenses
console.log(expenses);
```

**Storage Key:** `expenses` (localStorage)

---

## Components

### Component Architecture

```
Page (page.tsx)
├── SummaryCards
├── SpendingChart
│   ├── PieChart (Recharts)
│   └── BarChart (Recharts)
├── ExpenseForm
└── FilterBar
    └── ExpenseList
```

---

## Component Props

### `ExpenseForm`

Controlled form component for adding/editing expenses.

```typescript
interface ExpenseFormProps {
  onSubmit: (
    date: string,
    amount: number,
    category: Category,
    description: string
  ) => void;
  isLoading?: boolean;
}
```

**Features:**

- Form validation with error display
- Success message feedback
- Disabled state during submission
- Auto-reset after successful submit

**Example:**

```tsx
<ExpenseForm
  onSubmit={(date, amount, category, desc) => {
    addExpense(date, amount, category, desc);
  }}
  isLoading={isProcessing}
/>
```

### `FilterBar`

Control panel for filtering and searching expenses.

```typescript
interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}
```

**Controlled Input:**

```tsx
const [filters, setFilters] = useState<FilterOptions>({
  startDate: "",
  endDate: "",
  category: "All",
  searchTerm: "",
});

<FilterBar filters={filters} onFilterChange={setFilters} />;
```

### `ExpenseList`

Displays filtered list of expenses with edit/delete actions.

```typescript
interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}
```

**Features:**

- Expandable expense items
- Edit and delete buttons
- Empty state message
- Hover effects

### `SummaryCards`

Displays 4 key metrics as cards.

```typescript
interface SummaryCardsProps {
  summary: ExpenseSummary;
}
```

**Metrics Displayed:**

- Total Spending
- Monthly Spending
- Average Expense
- Total Expenses Count

### `SpendingChart`

Renders two Recharts visualizations.

```typescript
interface SpendingChartProps {
  expenses: Expense[];
}
```

**Charts:**

1. **Pie Chart** - Category distribution
2. **Bar Chart** - Last 7 days trend

**Notes:**

- Only renders if expenses exist
- Auto-formats currency values
- Responsive sizing

### `LoadingSpinner`

Fullscreen loading indicator.

```typescript
// No props required
<LoadingSpinner />
```

---

## State Management Pattern

### Main Page Flow

```
useExpenses() hook
    ↓
┌──────────────────────────┐
│   expenses[]             │ ← Load from localStorage
└──────────────────────────┘
         ↓
    useMemo hooks
    ↓        ↓        ↓
   │      │      │
Filtered  Summary  Charts
Expenses  Data     Data
   │        │       │
   └────┬───┴───┬───┘
        ↓       ↓
   ExpenseList  SummaryCards
   FilterBar    SpendingChart
```

### Filter Pipeline

```
Raw Expenses
    ↓
Apply Start Date Filter
    ↓
Apply End Date Filter
    ↓
Apply Category Filter
    ↓
Apply Search Filter
    ↓
Filtered Results → Displayed in List & Charts
```

---

## localStorage Schema

**Key:** `expenses`
**Type:** JSON Array

```json
[
  {
    "id": "1705329600000",
    "date": "2024-01-15",
    "amount": 25.5,
    "category": "Food",
    "description": "Lunch"
  },
  {
    "id": "1705416000000",
    "date": "2024-01-16",
    "amount": 50.0,
    "category": "Transportation",
    "description": "Gas"
  }
]
```

---

## Data Flow Examples

### Adding an Expense

```typescript
// 1. User submits form
onSubmit("2024-01-15", 25.5, "Food", "Lunch");

// 2. ExpenseForm calls useExpenses.addExpense()
addExpense("2024-01-15", 25.5, "Food", "Lunch");

// 3. Hook creates new Expense object
const newExpense: Expense = {
  id: "1705329600000", // Generated from Date.now()
  date: "2024-01-15",
  amount: 25.5,
  category: "Food",
  description: "Lunch",
};

// 4. State updates via setState
setExpenses((prev) => [newExpense, ...prev]);

// 5. useEffect hook auto-saves to localStorage
localStorage.setItem("expenses", JSON.stringify(expenses));

// 6. Page re-renders with new data
// 7. Charts and summary update automatically via useMemo
```

### Filtering Expenses

```typescript
// 1. User interacts with FilterBar
onFilterChange({ startDate: '2024-01-01', endDate: '2024-01-31', ... })

// 2. State updates
setFilters(newFilters)

// 3. useMemo recalculates filtered list
const filteredExpenses = useMemo(() => {
  return expenses.filter(exp => {
    // Apply all filter conditions
    return true/false
  })
}, [expenses, filters])

// 4. Components receive new filtered data
// 5. List and charts re-render with new data
```

---

## Performance Considerations

### Optimizations Used

1. **useMemo** - Prevent unnecessary recalculations

   - Filtered expenses list
   - Summary calculations
   - Chart data preparation

2. **useCallback** - Stable function references

   - Event handlers in hooks

3. **Client-side only** - No network overhead
   - All operations instant
   - No server latency

### Performance Limits

- **Storage**: ~5-10MB (thousands of expenses)
- **Rendering**: 10,000+ expenses still smooth
- **Calculations**: Instant for typical usage

---

## Error Handling

### Form Validation

```typescript
if (!amount || amount <= 0) {
  errors.amount = "Amount must be greater than 0";
}

if (!description || description.trim().length === 0) {
  errors.description = "Description is required";
}

if (new Date(date) > new Date()) {
  errors.date = "Date cannot be in the future";
}
```

### localStorage Error Handling

```typescript
try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    setExpenses(JSON.parse(stored));
  }
} catch (error) {
  console.error("Failed to load expenses:", error);
}
```

---

## Browser Compatibility

| Feature      | Chrome | Firefox | Safari | Edge |
| ------------ | ------ | ------- | ------ | ---- |
| localStorage | ✅     | ✅      | ✅     | ✅   |
| Date input   | ✅     | ✅      | ✅     | ✅   |
| Recharts     | ✅     | ✅      | ✅     | ✅   |
| CSS Grid     | ✅     | ✅      | ✅     | ✅   |
| React 18     | ✅     | ✅      | ✅     | ✅   |

---

## Best Practices

### When Using Hooks

```typescript
// ✅ Correct
const { expenses, addExpense } = useExpenses();

// ❌ Don't - exposes implementation
const hook = useExpenses();
const expenses = hook.expenses;
```

### When Filtering

```typescript
// ✅ Correct - Use useMemo to prevent recalculation
const filtered = useMemo(() =>
  expenses.filter(...)
, [expenses, filters]);

// ❌ Don't - Recalculates every render
const filtered = expenses.filter(...);
```

### When Exporting

```typescript
// ✅ Correct - Export after filtering
exportToCSV(filteredExpenses);

// ❌ Don't - Export everything when user wanted subset
exportToCSV(expenses);
```

---

For more details, see the main [README.md](README.md) and [QUICK_START.md](QUICK_START.md).
