# Quick Start Guide - Auto-Populated Test Data

Your spreadsheet ID has been configured: `1j7DISyMX6GksSjqBV3pYTb5xpX8Uq-8a4g-pyWuJLRg`

## Step 1: Create Apps Script Project (10 minutes)

1. Go to https://script.google.com
2. Click **"+ New project"**
3. Rename to: **"Tuition Management System"**

## Step 2: Add All Code Files

Copy each file from the `src/` directory into Apps Script:

### Core Files (.gs)
1. **Code.gs** - Main entry point
2. **Utils.gs** - Utilities with tests
3. **SheetsDAO.gs** - Data access (✅ Spreadsheet ID already configured!)
4. **AuthHelper.gs** - Authentication
5. **TestDataPopulator.gs** - ⭐ NEW: Auto test data population

### UI Files (.html)
6. **AdminDashboard.html**
7. **TutorPortal.html**
8. **TuteePortal.html**
9. **AccessDenied.html**

### Manifest
10. **appsscript.json** - Configuration

## Step 3: Populate Test Data (1 minute!)

Instead of manually adding data, just run this function:

1. In Apps Script editor, select **`populateAllTestData`** from function dropdown
2. Click **▶ Run**
3. Authorize when prompted
4. Check execution log - should see "✅ Test data population complete!"

**This automatically creates:**
- ✅ 2 admin accounts (including prasgenai@gmail.com)
- ✅ 10 tutors with different subjects and skill levels
- ✅ 15 tutees with various learning needs
- ✅ 15+ availability time slots
- ✅ Complete configuration with all settings
- ✅ Ready for matching algorithm testing

## Step 4: Run Tests (3 minutes)

1. Select **`runAllTests`** from function dropdown
2. Click **▶ Run**
3. Check execution log
4. Should see: **"✓✓✓ ALL SYSTEM TESTS PASSED ✓✓✓"**

## Step 5: Deploy Web App (5 minutes)

1. Click **Deploy** → **New deployment**
2. Type: **Web app**
3. Description: "MVP v1.0"
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Click **Deploy**
7. Copy the Web App URL

## Step 6: Test Live! (2 minutes)

1. Open Web App URL
2. Sign in with **prasgenai@gmail.com**
3. See your Admin Dashboard! 🎉

---

## Test Accounts Created

### Admin
- prasgenai@gmail.com (YOU)
- admin2@example.com

### Tutors (10 total)
- tutor1@example.com - Alice Tan (Math, Science)
- tutor2@example.com - Benjamin Lim (English, Literature)
- tutor3@example.com - Catherine Wong (Math, Physics)
- tutor4@example.com - David Chen (Chemistry, Biology)
- tutor5@example.com - Emily Ng (Chinese, Mother Tongue)
- ... and 5 more

### Tutees (15 total)
- tutee1@example.com - Kelly Sim (needs Math)
- tutee2@example.com - Leo Tan (needs Science)
- tutee3@example.com - Michelle Yeo (needs English)
- ... and 12 more

---

## Total Time: ~20 minutes

vs. ~50 minutes with manual data entry!

## Need to Reset Data?

Run `clearAllTestData()` function to clear and start fresh.

---

## Next: Phase 2 Features

Once MVP is working, we'll add:
- Matching algorithm
- Session scheduling with Google Meet
- VIA hours tracking
- Evidence submission
- Reporting dashboard
