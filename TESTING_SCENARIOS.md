# Example Data & Testing Scenarios

This file contains sample expenses and scenarios to help you quickly test and explore the application.

## Quick Test Data

You can manually add these expenses to test the application:

### Sample Expenses (Week View)

#### Food Category
1. **Monday, Jan 15** - $12.50 - "Morning coffee and pastry"
2. **Tuesday, Jan 16** - $18.75 - "Lunch at restaurant"
3. **Wednesday, Jan 17** - $35.00 - "Grocery shopping"
4. **Thursday, Jan 18** - $8.99 - "Quick breakfast"
5. **Friday, Jan 19** - $42.50 - "Dinner with friends"

#### Transportation Category
1. **Monday, Jan 15** - $50.00 - "Gas for car"
2. **Wednesday, Jan 17** - $15.00 - "Taxi to airport"
3. **Friday, Jan 19** - $45.00 - "Gas refill"

#### Entertainment Category
1. **Tuesday, Jan 16** - $15.00 - "Movie tickets"
2. **Friday, Jan 19** - $25.00 - "Concert"

#### Shopping Category
1. **Wednesday, Jan 17** - $85.00 - "Clothes and shoes"
2. **Thursday, Jan 18** - $32.50 - "Books and accessories"

#### Bills Category
1. **Saturday, Jan 20** - $120.00 - "Electricity bill"
2. **Saturday, Jan 20** - $85.00 - "Internet bill"

---

## Import Script (For Browser Console)

To quickly add test data, open Developer Tools (F12) and paste this in the Console tab:

### Option 1: Add All Sample Data

```javascript
// Sample expenses for testing
const sampleExpenses = [
  { id: Date.now().toString(), date: "2024-01-15", amount: 12.50, category: "Food", description: "Morning coffee and pastry" },
  { id: (Date.now()-1000).toString(), date: "2024-01-16", amount: 18.75, category: "Food", description: "Lunch at restaurant" },
  { id: (Date.now()-2000).toString(), date: "2024-01-17", amount: 35.00, category: "Food", description: "Grocery shopping" },
  { id: (Date.now()-3000).toString(), date: "2024-01-18", amount: 8.99, category: "Food", description: "Quick breakfast" },
  { id: (Date.now()-4000).toString(), date: "2024-01-19", amount: 42.50, category: "Food", description: "Dinner with friends" },
  { id: (Date.now()-5000).toString(), date: "2024-01-15", amount: 50.00, category: "Transportation", description: "Gas for car" },
  { id: (Date.now()-6000).toString(), date: "2024-01-17", amount: 15.00, category: "Transportation", description: "Taxi to airport" },
  { id: (Date.now()-7000).toString(), date: "2024-01-19", amount: 45.00, category: "Transportation", description: "Gas refill" },
  { id: (Date.now()-8000).toString(), date: "2024-01-16", amount: 15.00, category: "Entertainment", description: "Movie tickets" },
  { id: (Date.now()-9000).toString(), date: "2024-01-19", amount: 25.00, category: "Entertainment", description: "Concert" },
  { id: (Date.now()-10000).toString(), date: "2024-01-17", amount: 85.00, category: "Shopping", description: "Clothes and shoes" },
  { id: (Date.now()-11000).toString(), date: "2024-01-18", amount: 32.50, category: "Shopping", description: "Books and accessories" },
  { id: (Date.now()-12000).toString(), date: "2024-01-20", amount: 120.00, category: "Bills", description: "Electricity bill" },
  { id: (Date.now()-13000).toString(), date: "2024-01-20", amount: 85.00, category: "Bills", description: "Internet bill" },
];

// Save to localStorage
localStorage.setItem('expenses', JSON.stringify(sampleExpenses));

// Reload page to see data
location.reload();
```

### Option 2: Add Just One Expense

```javascript
// Single test expense
const testExpense = {
  id: Date.now().toString(),
  date: new Date().toISOString().split('T')[0],
  amount: 25.50,
  category: "Food",
  description: "Test expense"
};

// Add to existing expenses
const existing = JSON.parse(localStorage.getItem('expenses') || '[]');
localStorage.setItem('expenses', JSON.stringify([testExpense, ...existing]));

// Reload
location.reload();
```

### Option 3: Clear All Data

```javascript
// Remove all expenses
localStorage.clear();
location.reload();
```

---

## Testing Scenarios

### Scenario 1: Basic Navigation (5 minutes)

**Goal:** Get familiar with the UI

1. Open the app
2. Explore the header and layout
3. Look at each component:
   - Form on left
   - List on right
   - Summary cards on top
   - Charts in middle
4. Read section headers
5. Notice the color scheme

**Success:** You understand the layout and can find all components

---

### Scenario 2: Add & Edit (10 minutes)

**Goal:** Master adding and editing expenses

1. Add expense: $25 | Food | "Lunch"
2. Add expense: $50 | Transportation | "Gas"
3. Add expense: $15 | Entertainment | "Movie"
4. Click first expense to expand
5. Click Edit
6. Change amount to $30
7. Click "Add Expense" to save
8. Verify amount updated

**Success:** All three expenses in list, first one shows $30

---

### Scenario 3: Filter & Search (10 minutes)

**Goal:** Learn filtering capabilities

1. Search for "lunch" - should find the Food expense
2. Clear search
3. Filter by category "Transportation" - only Gas shows
4. Reset filters
5. Filter by category "All" - see all expenses
6. Set date range to today only
7. Reset filters

**Success:** Filters work correctly and update list instantly

---

### Scenario 4: Analytics (5 minutes)

**Goal:** Understand the summary cards and charts

1. Look at summary cards (top):
   - Total: Should show $90 (25+50+15)
   - Count: Should show 3
   - Average: Should show $30

2. Look at pie chart:
   - Should show 3 slices (Food, Transportation, Entertainment)
   - Food: 27.8%
   - Transportation: 55.6%
   - Entertainment: 16.7%

3. Look at trend chart:
   - Should show today with $90 total

**Success:** Summary cards match calculations, charts display

---

### Scenario 5: Export (5 minutes)

**Goal:** Download expenses as CSV

1. Have 3+ expenses in list
2. Click "Export to CSV" button
3. File downloads as `expenses-YYYY-MM-DD.csv`
4. Open file in text editor or Excel
5. Verify:
   - Headers: Date, Amount, Category, Description
   - All 3 expenses present
   - Amounts correct
   - Categories match

**Success:** CSV file downloaded and opens correctly

---

### Scenario 6: Persistence (5 minutes)

**Goal:** Verify data saves and persists

1. Add 2 expenses
2. Note the total (should be $75 if using samples)
3. Refresh page (F5)
4. Wait for app to load
5. Verify expenses still there
6. Verify total unchanged

**Success:** Data persists across page refresh

---

### Scenario 7: Responsive Design (10 minutes)

**Goal:** Test on different screen sizes

1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select "iPhone 12":
   - Form should stack
   - List should be full width
   - Summary cards single column
   - Charts responsive

4. Select "iPad":
   - Two column layout
   - Form left, list right
   - Summary cards 2x2
   - Charts side by side

5. Select "Desktop (1920x1080)":
   - Three column layout
   - Sidebar visible
   - Full width charts
   - Summary cards in row

**Success:** App looks good on all sizes

---

### Scenario 8: Delete Operation (5 minutes)

**Goal:** Test deletion with confirmation

1. Have 3+ expenses
2. Click on middle expense
3. Click Delete
4. Confirmation dialog appears
5. Click Confirm
6. Expense removed from list
7. Summary updated
8. Charts updated

**Success:** Deletion works with confirmation

---

### Scenario 9: Multi-Filter (10 minutes)

**Goal:** Combine multiple filters

Setup:
- Food: $25, $30, $35 (3 expenses)
- Transportation: $50, $45 (2 expenses)
- Entertainment: $15 (1 expense)

Tests:
1. Category: Food, Date: Jan 15-17
   - Should show 2 expenses (25, 30)

2. Category: All, Date: Jan 18-20, Search: "sh"
   - Should find "Gas refill" (Transportation)

3. Search: "dinner", Category: Food
   - Should find 1 expense

**Success:** Filters work together correctly

---

### Scenario 10: Error Handling (5 minutes)

**Goal:** Test validation and error messages

1. Try to add expense with:
   - Empty amount → Error message
   - Negative amount → Error message
   - Empty description → Error message
   - Future date → Error message

2. Fill form correctly → Success message

**Success:** Validation prevents invalid data

---

## Performance Testing

### Test: Many Expenses

Run this in console to add 100 expenses:

```javascript
const expenses = [];
for (let i = 0; i < 100; i++) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  expenses.push({
    id: (Date.now() + i).toString(),
    date: date.toISOString().split('T')[0],
    amount: Math.random() * 100 + 10,
    category: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'][Math.floor(Math.random() * 6)],
    description: `Expense ${i}`
  });
}
localStorage.setItem('expenses', JSON.stringify(expenses));
location.reload();
```

**Expected:** App still responsive with 100 expenses

---

## Browser Testing Checklist

Test on these browsers:

### Chrome ✅
- [ ] App loads
- [ ] All features work
- [ ] Charts display
- [ ] Export works

### Firefox 🦊
- [ ] App loads
- [ ] All features work
- [ ] Date input works
- [ ] Charts display

### Safari 🧭
- [ ] App loads
- [ ] All features work
- [ ] Responsive looks good
- [ ] localStorage works

### Edge 🔷
- [ ] App loads
- [ ] All features work
- [ ] Performance good
- [ ] Export works

---

## Device Testing Checklist

Test on these devices:

### Desktop (Windows/Mac)
- [ ] 1920x1080 - Full layout
- [ ] 1366x768 - Good spacing
- [ ] 1024x768 - Responsive

### Tablet
- [ ] iPad (768x1024)
- [ ] Android tablet
- [ ] Landscape and portrait

### Mobile
- [ ] iPhone (390x844)
- [ ] Android phone
- [ ] Landscape mode

---

## Data Validation Examples

### Valid Expenses ✅
```
Date: 2024-01-15, Amount: 25.50, Category: Food, Description: "Lunch"
Date: 2024-01-20, Amount: 0.01, Category: Other, Description: "A" (minimal valid)
Date: 2024-01-01, Amount: 999999.99, Category: Bills, Description: "Large expense" (max amount)
```

### Invalid Expenses ❌
```
Date: 2025-01-15 (future), Amount: 50, Category: Food, Description: "X"
Date: 2024-01-15, Amount: 0, Category: Food, Description: "X" (zero amount)
Date: 2024-01-15, Amount: -50, Category: Food, Description: "X" (negative)
Date: 2024-01-15, Amount: 50, Category: Food, Description: "" (empty desc)
Date: "", Amount: 50, Category: Food, Description: "X" (empty date)
```

---

## Tips for Testing

1. **Add variety:** Use different dates, amounts, and categories
2. **Test thoroughly:** Try all filters and combinations
3. **Check edge cases:** Empty states, large numbers, special characters
4. **Monitor console:** Check F12 DevTools for errors
5. **Test offline:** Close DevTools Network tab to simulate offline
6. **Clear data:** Use `localStorage.clear()` between tests
7. **Document issues:** Note any unexpected behavior
8. **Device testing:** Test on actual devices, not just emulation

---

## Reporting Issues

If you find bugs while testing, create a report:

```
Title: [Brief description]
Steps: 
1. [First step]
2. [Second step]
Expected: [What should happen]
Actual: [What actually happened]
Browser: [Chrome/Firefox/Safari/Edge]
```

---

## Next Steps

After testing:
1. ✅ Try real expense tracking
2. ✅ Export data monthly
3. ✅ Review spending patterns
4. ✅ Adjust budget if needed
5. ✅ Share with friends/family

---

Happy testing! 🧪✨
