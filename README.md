# 💳 Expense Tracker

A modern, professional expense tracking application built with **NextJS 14**, **TypeScript**, and **Tailwind CSS**. This application helps you manage your personal finances with an intuitive and feature-rich interface.

## 🌟 Features

### Core Features

- ✅ **Add Expenses** - Quick and easy expense entry with date, amount, category, and description
- ✅ **View Expenses** - Clean, organized list view of all expenses
- ✅ **Filter & Search** - Filter by date range, category, and search by description
- ✅ **Dashboard Analytics** - Summary cards showing total spending, monthly spending, average expenses, and count
- ✅ **Visual Charts** -
  - Pie chart showing spending distribution by category
  - Bar chart showing weekly spending trends
- ✅ **Edit Expenses** - Modify existing expenses
- ✅ **Delete Expenses** - Remove unwanted expenses with confirmation
- ✅ **Export to CSV** - Download your expenses as a CSV file for external analysis
- ✅ **Data Persistence** - All data is saved locally to your browser using localStorage

### Categories

The application supports the following expense categories:

- 🍔 Food
- 🚗 Transportation
- 🎬 Entertainment
- 🛍️ Shopping
- 💰 Bills
- 📝 Other

## 🛠️ Tech Stack

- **Framework**: NextJS 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom color scheme
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Charts**: Recharts for data visualization
- **Data Persistence**: Browser localStorage
- **Validation**: Custom form validation utilities

## 📋 Project Structure

```
expense-tracker-ai/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── globals.css         # Global styles
│   │   └── page.tsx            # Main dashboard page
│   ├── components/
│   │   ├── ExpenseForm.tsx     # Add/edit expense form
│   │   ├── FilterBar.tsx       # Filter and search controls
│   │   ├── ExpenseList.tsx     # Expense list display
│   │   ├── SummaryCards.tsx    # Summary statistics cards
│   │   ├── SpendingChart.tsx   # Charts and visualizations
│   │   ├── LoadingSpinner.tsx  # Loading state component
│   │   └── index.ts            # Component exports
│   ├── hooks/
│   │   └── useExpenses.ts      # Custom hook for expense state management
│   ├── lib/
│   │   └── utils.ts            # Utility functions (formatting, validation, calculations)
│   └── types/
│       └── index.ts            # TypeScript types and interfaces
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # NextJS configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:

   ```bash
   cd expense-tracker-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

#### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

#### Production Build

Build the application for production:

```bash
npm run build
npm run start
```

#### Linting

Check for code issues:

```bash
npm run lint
```

## 📖 Usage Guide

### Adding an Expense

1. Fill in the **Date** field (defaults to today)
2. Enter the **Amount** (must be greater than 0)
3. Select a **Category** from the dropdown
4. Add a **Description** (e.g., "Lunch at restaurant")
5. Click **"Add Expense"** button

**Validation**: The form validates that amounts are positive, descriptions aren't empty, and dates aren't in the future.

### Filtering Expenses

1. Use the **Search** field to find expenses by description
2. Select a **From Date** and **To Date** to filter by date range
3. Choose a **Category** to view only specific categories
4. Click **"Reset Filters"** to clear all filters

### Viewing Analytics

The dashboard displays:

- **Total Spending**: Sum of all expenses
- **This Month**: Total expenses for the current month
- **Average Expense**: Mean amount per expense
- **Total Expenses**: Count of all expenses
- **Spending by Category**: Pie chart showing category distribution
- **Weekly Trend**: Bar chart showing spending over the last 7 days

### Editing an Expense

1. Click on an expense in the list to expand it
2. Click the **"Edit"** button
3. The expense details will load in the form above
4. Modify the fields as needed
5. Click **"Add Expense"** to save changes
6. Click **"Cancel Edit"** to cancel the operation

### Deleting an Expense

1. Click on an expense in the list to expand it
2. Click the **"Delete"** button
3. Confirm the deletion when prompted
4. The expense will be removed immediately

### Exporting Data

1. Click the **"📥 Export to CSV"** button in the header
2. A file named `expenses-YYYY-MM-DD.csv` will be downloaded
3. Open the file in Excel, Google Sheets, or any spreadsheet application

**Note**: The export includes only filtered expenses, so filter first if you want to export a subset.

## 🎨 Design Features

### Modern Interface

- Clean, professional color scheme using blue as primary color
- Responsive design that works on desktop, tablet, and mobile
- Smooth animations and transitions
- Consistent spacing and typography

### User Experience

- Loading states during initialization
- Success messages when expenses are added
- Confirmation dialogs for destructive actions
- Visual feedback for interactive elements
- Expandable expense items for compact display

### Responsive Breakpoints

- **Mobile** (< 768px): Single column layout
- **Tablet** (768px - 1024px): Two column layout
- **Desktop** (> 1024px): Three column layout with form sidebar

## 💾 Data Storage

All expenses are stored in your browser's **localStorage** under the key `expenses`. This means:

### Advantages

- ✅ No server needed - completely offline-capable
- ✅ Data is private and never sent to external servers
- ✅ Instant data access and updates
- ✅ Works without internet connection

### Limitations

- ⚠️ Data is limited to ~5-10MB (browser dependent)
- ⚠️ Data is only stored on this device/browser
- ⚠️ Clearing browser cache will delete all expenses
- ⚠️ Data is not synced across devices

### Backing Up Data

Export your expenses regularly to CSV for backups!

## 🧪 Testing Guide

### Test Scenario 1: Basic Expense Management

1. Add a new expense for today with amount $25.50 in Food category, description "Lunch"
2. Add another expense for $50 in Transportation, description "Gas"
3. Verify both appear in the list
4. Delete the first expense
5. Verify only Transportation expense remains

### Test Scenario 2: Filtering

1. Add expenses with different dates and categories
2. Filter by category "Food" - should only show food expenses
3. Filter by date range - should show only expenses within that range
4. Search for "Gas" - should only show matching descriptions
5. Reset filters - should show all expenses again

### Test Scenario 3: Editing

1. Add an expense with $25 amount
2. Click to expand it
3. Click Edit
4. Change amount to $35
5. Click Add Expense to save
6. Verify the amount updated to $35

### Test Scenario 4: Analytics

1. Add multiple expenses across different categories
2. Verify summary cards show correct totals
3. Check that pie chart displays all categories with expenses
4. Add expense from today and verify it appears in "This Month"
5. Add expense from a previous month and verify it doesn't count in "This Month"

### Test Scenario 5: Export

1. Add several expenses
2. Filter to show specific subset (e.g., only Food category)
3. Click Export to CSV
4. Open the downloaded file
5. Verify it contains only the filtered expenses

### Test Scenario 6: Responsive Design

1. Open app on desktop - verify 3-column layout
2. Resize to tablet size - verify responsive layout
3. Resize to mobile - verify single column layout
4. Verify all buttons and inputs are accessible

### Test Scenario 7: Validation

1. Try to add expense with empty amount - should show error
2. Try to add expense with empty description - should show error
3. Try to add expense with future date - should show error
4. Try to add expense with 0 amount - should show error
5. Add valid expense - should succeed

### Test Scenario 8: Data Persistence

1. Add several expenses
2. Refresh the page (F5 or Cmd+R)
3. Verify all expenses are still present
4. Close and reopen the browser
5. Verify expenses are still there
6. Clear browser cache/cookies
7. Verify expenses are gone (as expected)

## 🔧 Troubleshooting

### Dev Server Won't Start

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev
```

### Port 3000 Already in Use

```bash
# Use a different port
npm run dev -- -p 3001
```

### Expenses Not Saving

- Check browser console for errors (F12)
- Verify localStorage is not disabled
- Check if your browser is in private/incognito mode (localStorage disabled)
- Try a different browser

### Charts Not Displaying

- Ensure you have at least one expense
- Check browser console for Recharts errors
- Verify Recharts is properly installed: `npm list recharts`

## 📱 Browser Support

The application works best on modern browsers:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Internet Explorer (not supported)

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
npm run start
```

This will:

1. Optimize all assets
2. Minify JavaScript and CSS
3. Create a `.next` folder with production-ready files
4. Start the production server on port 3000

## 🔐 Privacy & Security

- ✅ All data stays on your device
- ✅ No external API calls
- ✅ No tracking or analytics
- ✅ No data collection
- ✅ Complete privacy guaranteed

## 🚀 Future Enhancements

Potential features for future versions:

- Multi-user support with authentication
- Cloud sync across devices
- Budget alerts and goals
- Recurring expenses
- Receipt scanning with OCR
- Advanced analytics and insights
- Dark mode theme
- Multiple currency support
- Bill payment reminders
- Expense sharing between users
- Mobile app (React Native)

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Found a bug or have a feature request? Feel free to create an issue or submit a pull request!

## 📞 Support

For questions or issues:

1. Check the troubleshooting section
2. Review the testing guide
3. Check browser console for error messages
4. Ensure all dependencies are installed correctly

---

**Enjoy tracking your expenses!** 💰✨

Built with ❤️ using NextJS and React
