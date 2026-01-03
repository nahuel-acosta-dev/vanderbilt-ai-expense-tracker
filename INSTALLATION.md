# 📋 INSTALLATION & RUNNING INSTRUCTIONS

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (comes with Node.js)

### Check Your Installation

```bash
node --version    # Should be v18.0 or higher
npm --version     # Should be 9.0 or higher
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd expense-tracker-ai
npm install
```

This will install all required packages including:
- NextJS 14
- React 18
- TypeScript
- Tailwind CSS
- Recharts
- And all dev dependencies

⏱️ **Takes:** ~2 minutes

### Step 2: Start Development Server
```bash
npm run dev
```

You'll see:
```
✓ Ready in 1496ms
- Local:        http://localhost:3000
```

### Step 3: Open in Browser
Visit **http://localhost:3000** in your web browser

✅ **You're done!** The app is now running.

---

## 📖 Available Commands

### Development & Running

```bash
# Start development server (with hot reload)
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build
# Creates optimized .next folder

# Run production build locally
npm start
# Runs the built version

# Check code style
npm run lint
```

### Useful Shortcuts

- **Hot Reload:** Changes auto-apply while dev server is running
- **Open DevTools:** Press F12 (Chrome/Edge) or Cmd+Option+I (Safari)
- **Clear Cache:** Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

---

## 🔧 Configuration

### Default Configuration

The project comes with sensible defaults:

| Setting | Value |
|---------|-------|
| **Port** | 3000 |
| **Host** | localhost |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Storage** | localStorage |

### Change Port (if 3000 is busy)

```bash
npm run dev -- -p 3001
```

This runs the app on http://localhost:3001

### Change Host (for network access)

```bash
npm run dev -- -H 0.0.0.0
```

Then access from other devices using your computer's IP

---

## 📁 What Gets Created/Modified

### On First Run (`npm install`)
```
node_modules/              # All dependencies
package-lock.json          # Dependency lock file
```

### On First Dev Run (`npm run dev`)
```
.next/                    # NextJS cache/build
next-env.d.ts             # TypeScript definitions
tsconfig.json             # Updated with NextJS config
```

These folders are safe to delete - they'll be regenerated.

### Data Storage
```
Browser localStorage      # Your expense data
Key: "expenses"
Stored as: JSON
```

---

## 🧪 First Time Setup Verification

After running `npm run dev`, verify everything works:

### ✅ Check 1: Server Running
```
You should see:
  ▲ Next.js 14.2.35
  ✓ Ready in 1496ms
  - Local:        http://localhost:3000
```

### ✅ Check 2: Browser Load
- Visit http://localhost:3000
- Page loads without errors
- See "Expense Tracker" header
- Form visible on page

### ✅ Check 3: Add Test Expense
1. Enter amount: `25.50`
2. Select category: `Food`
3. Enter description: `Test expense`
4. Click "Add Expense"
5. Verify expense appears in list

### ✅ Check 4: Data Persistence
1. Add an expense
2. Press F5 to refresh
3. Expense should still be there

---

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use

**Symptom:** 
```
Error: EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001

# Or kill the process using port 3000
# Linux/Mac:
lsof -i :3000
kill -9 <PID>

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### Issue: Dependencies Install Fails

**Symptom:**
```
npm ERR! code E401
npm ERR! 401 Unauthorized
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install

# If still fails, try with legacy peer deps
npm install --legacy-peer-deps
```

---

### Issue: Command Not Found

**Symptom:**
```
npm: command not found
```

**Solution:**
1. Node.js not installed - download from https://nodejs.org
2. Or Node.js not in PATH
3. Restart terminal after installing Node.js

---

### Issue: Dev Server Crashes

**Symptom:**
```
SyntaxError: Unexpected token
```

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev
```

---

### Issue: Browser Shows Blank Page

**Symptom:**
- Page loads but appears blank
- No errors in browser console

**Solution:**
1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. Clear browser cache
3. Check browser console (F12) for errors
4. Try different browser

---

### Issue: Expenses Not Saving

**Symptom:**
- Add expense but it disappears on refresh
- No errors shown

**Causes & Solutions:**
- **Private/Incognito Mode:** localStorage disabled
  - Use normal browsing mode
  
- **Storage Full:** Clear browser cache
  - Settings → Privacy → Clear browsing data
  
- **Disabled localStorage:** Check browser settings
  - Check if cookies/storage disabled
  - Enable them in settings

---

### Issue: Charts Not Displaying

**Symptom:**
- No charts visible
- Or "Cannot find Recharts"

**Solution:**
```bash
# Verify Recharts installed
npm list recharts

# If missing:
npm install recharts

# Clear cache and restart
rm -rf .next
npm run dev
```

---

## 📊 Verification Checklist

After setup, verify these work:

### ✅ Core Features
- [ ] Can see form on page
- [ ] Can add expense
- [ ] Expense appears in list
- [ ] Can edit expense
- [ ] Can delete expense
- [ ] Data persists on refresh

### ✅ Filtering
- [ ] Can search by description
- [ ] Can filter by date range
- [ ] Can filter by category
- [ ] Reset filters works

### ✅ Analytics
- [ ] Summary cards show correct totals
- [ ] Charts display properly
- [ ] Charts update with new data

### ✅ Export
- [ ] Can click export button
- [ ] CSV file downloads
- [ ] File opens in spreadsheet app

### ✅ Responsive
- [ ] App works on desktop (F12 → Toggle Device)
- [ ] App works on tablet view
- [ ] App works on mobile view

---

## 🌐 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Firefox | ✅ Full | Fully supported |
| Safari | ✅ Full | Works great |
| Edge | ✅ Full | Chromium-based |
| IE 11 | ❌ No | Not supported |

---

## 💾 File Size Info

### Installation Size
- **node_modules:** ~450MB (disk space required)
- **Installation time:** 1-3 minutes (depending on internet)

### Application Size (Production Build)
- **Built app:** ~200KB
- **Load time:** < 1 second on typical internet

### Data Storage
- **localStorage limit:** 5-10MB
- **Typical usage:** < 1MB for 1000s of expenses

---

## 🔒 Security Notes

### Local Storage
- All data stored **locally in browser**
- No data sent to any server
- Safe and private
- Lost if cache cleared

### Offline Mode
- Works completely offline
- No internet connection needed
- All features available offline

### Browser Privacy
- No tracking cookies
- No analytics
- No third-party services
- Completely private

---

## 📱 Mobile & Tablet Setup

### iOS Safari
1. Open http://localhost:3000 (from same network)
2. Full app functionality
3. Use device IP instead of localhost if needed

### Android Chrome
1. Same as iOS
2. Full touch support
3. All features work

### Testing Responsive Design
1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select different devices
4. Test all features

---

## 🚀 Production Deployment

### For Personal Use (Local Computer)
```bash
npm run build
npm start
```

The app runs on http://localhost:3000

### For Sharing (Home Network)
```bash
npm run dev -- -H 0.0.0.0
```

Access from other devices on your network using your computer's IP

### For Online Hosting

This app can be deployed to:
- **Vercel** (Recommended for NextJS)
- **Netlify**
- **GitHub Pages**
- **AWS**
- **Heroku**
- **Any Node.js hosting**

See [README.md](README.md) for deployment guides.

---

## 🧹 Cleaning Up

### To Remove Application Locally
```bash
# Remove all files
rm -rf expense-tracker-ai

# Or keep just source, remove node_modules
rm -rf node_modules
rm -rf .next
```

### To Remove from Browser
```javascript
// In browser console (F12)
localStorage.clear();
```

---

## 📚 Next Steps After Setup

### 1. Get Familiar (15 minutes)
- [ ] Read [QUICK_START.md](QUICK_START.md)
- [ ] Add a few test expenses
- [ ] Explore all features
- [ ] Check out the charts

### 2. Learn More (30 minutes)
- [ ] Read [README.md](README.md) fully
- [ ] Check [API_REFERENCE.md](API_REFERENCE.md)
- [ ] Understand the architecture

### 3. Start Using (Ongoing)
- [ ] Start tracking real expenses
- [ ] Export data regularly
- [ ] Review spending patterns
- [ ] Share with others if desired

### 4. Advanced (Optional)
- [ ] Review [TESTING.md](TESTING.md)
- [ ] Run test scenarios
- [ ] Customize if needed
- [ ] Contribute improvements

---

## 🆘 Getting Help

### Documentation Files
1. **[QUICK_START.md](QUICK_START.md)** - Quick setup (5 min)
2. **[README.md](README.md)** - Full features (30 min)
3. **[API_REFERENCE.md](API_REFERENCE.md)** - Technical (reference)
4. **[TESTING.md](TESTING.md)** - Testing guide (reference)
5. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Overview (5 min)

### Browser DevTools
- Press **F12** to open DevTools
- Check **Console** tab for errors
- Check **Network** tab for loading issues
- Check **Application** tab for localStorage data

### Common Solutions
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server (Ctrl+C, then `npm run dev`)
3. Hard refresh page (Ctrl+Shift+R)
4. Try different browser
5. Check all prerequisites installed

---

## ✅ Final Checklist

Before you start using the app:

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Dependencies installed (`npm install` completed)
- [ ] Dev server running (`npm run dev` shows "✓ Ready")
- [ ] App loads in browser (http://localhost:3000)
- [ ] Can add an expense
- [ ] Can see it in the list
- [ ] Data persists on refresh

**If all checkmarks are done - YOU'RE READY TO GO!** 🎉

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Run production build | `npm start` |
| Check code quality | `npm run lint` |
| Change port | `npm run dev -- -p 3001` |
| Enable network access | `npm run dev -- -H 0.0.0.0` |

---

## 🎉 You're All Set!

Your expense tracker is ready to use. 

**Next:** Open http://localhost:3000 and start tracking! 💰✨

For detailed features, see [README.md](README.md)
For quick guide, see [QUICK_START.md](QUICK_START.md)
