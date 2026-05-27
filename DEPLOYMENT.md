# Deployment Guide - Tuition Management System MVP

This guide will walk you through deploying your MVP (Minimum Viable Product) in approximately 30-45 minutes.

## Prerequisites

✅ Google account (Gmail or Google Workspace)
✅ Completed SHEETS_SETUP.md (Google Spreadsheet created with all sheets)
✅ Your email added to Users sheet with role=ADMIN

---

## Part 1: Create Apps Script Project (5 minutes)

### Step 1: Create New Apps Script Project

1. Go to https://script.google.com
2. Click **"+ New project"**
3. Rename the project (click "Untitled project" at top):
   - Name: **"Tuition Management System"**

### Step 2: Configure Project Settings

1. Click the **gear icon** (⚙️) on the left sidebar (Project Settings)
2. Scroll down to **"Google Cloud Platform (GCP) Project"**
3. You can leave the default or link to a specific GCP project
4. **Time zone:** Select "Singapore (SGT)"
5. Check **"Show 'appsscript.json' manifest file in editor"**

---

## Part 2: Add Code Files (10 minutes)

You'll copy the code from the `src/` directory into the Apps Script editor.

### Method A: Manual Copy-Paste (Recommended for first-time users)

For each file in the `src/` directory, create a corresponding file in Apps Script:

1. **appsscript.json** (manifest file)
   - In Apps Script editor, find "appsscript.json" in the file list (left sidebar)
   - Replace its contents with the content from `src/appsscript.json`

2. **Code.gs** (already exists as default file)
   - Rename "Code" to "Code.gs" if needed
   - Replace its contents with `src/Code.gs`

3. **Utils.gs**
   - Click **+** next to "Files"
   - Select **Script**
   - Name it "Utils"
   - Paste content from `src/Utils.gs`

4. **SheetsDAO.gs**
   - Click **+** → Script → Name: "SheetsDAO"
   - Paste content from `src/SheetsDAO.gs`
   - **IMPORTANT:** Update line 10 - replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID

5. **AuthHelper.gs**
   - Click **+** → Script → Name: "AuthHelper"
   - Paste content from `src/AuthHelper.gs`

6. **AdminDashboard.html**
   - Click **+** → **HTML**
   - Name: "AdminDashboard"
   - Paste content from `src/AdminDashboard.html`

7. **TutorPortal.html**
   - Click **+** → HTML → Name: "TutorPortal"
   - Paste content from `src/TutorPortal.html`

8. **TuteePortal.html**
   - Click **+** → HTML → Name: "TuteePortal"
   - Paste content from `src/TuteePortal.html`

9. **AccessDenied.html**
   - Click **+** → HTML → Name: "AccessDenied"
   - Paste content from `src/AccessDenied.html`

**File structure should look like:**
```
📁 Tuition Management System (project)
  📄 appsscript.json
  📜 Code.gs
  📜 Utils.gs
  📜 SheetsDAO.gs
  📜 AuthHelper.gs
  📄 AdminDashboard.html
  📄 TutorPortal.html
  📄 TuteePortal.html
  📄 AccessDenied.html
```

### Method B: Using clasp CLI (For advanced users)

If you have `clasp` installed:

```bash
cd ~/claude_practice/tuition_management_system/src
clasp login
clasp create --title "Tuition Management System" --type webapp
clasp push
```

---

## Part 3: Configure Spreadsheet ID (2 minutes)

**CRITICAL STEP - Don't skip this!**

1. Open `SheetsDAO.gs` in the Apps Script editor
2. Find line 10:
   ```javascript
   var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```
3. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID
4. **Save** the file (Ctrl+S or Cmd+S)

**How to get your Spreadsheet ID:**
- Open your Google Spreadsheet
- Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
- Copy the long string between `/d/` and `/edit`

---

## Part 4: Run Tests (5 minutes)

Before deploying, verify everything works using TDD test functions.

### Step 1: Run Utils Tests

1. In the Apps Script editor, select **"runAllUtilsTests"** from the function dropdown (top toolbar)
2. Click **▶ Run**
3. First time: You'll see "Authorization required"
   - Click **"Review permissions"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to Tuition Management System (unsafe)"**
   - Click **"Allow"**
4. Check the **Execution log** (View → Execution log or Ctrl+Enter)
5. You should see: **"✓✓✓ ALL UTILS TESTS PASSED ✓✓✓"**

### Step 2: Run SheetsDAO Tests

1. Select **"runAllSheetsDAOTests"** from the function dropdown
2. Click **▶ Run**
3. Check the Execution log
4. You should see: **"✓✓✓ ALL SHEETSDAO TESTS PASSED ✓✓✓"**

If tests fail:
- Verify SPREADSHEET_ID is correct in SheetsDAO.gs
- Verify all 11 sheets exist in your spreadsheet
- Verify sheet names are exact (case-sensitive)

### Step 3: Run AuthHelper Tests

1. Select **"runAllAuthHelperTests"** from the function dropdown
2. Click **▶ Run**
3. Check the Execution log
4. You should see your email and role displayed
5. Should see: **"✓✓✓ ALL AUTHHELPER TESTS PASSED ✓✓✓"**

If tests fail:
- Verify your email is in the Users sheet
- Verify role is set (ADMIN, TUTOR, or TUTEE)
- Verify is_active is TRUE

### Step 4: Run All Tests Together

1. Select **"runAllTests"** from the function dropdown
2. Click **▶ Run**
3. This runs all tests in sequence
4. Check for: **"✓✓✓ ALL SYSTEM TESTS PASSED ✓✓✓"**

---

## Part 5: Deploy Web App (5 minutes)

### Step 1: Create Deployment

1. Click **"Deploy"** button (top right)
2. Select **"New deployment"**
3. Click the **gear icon** next to "Select type"
4. Choose **"Web app"**

### Step 2: Configure Deployment

Fill in the deployment settings:

- **Description:** "MVP v1.0 - Initial deployment"
- **Execute as:** **Me (your-email@gmail.com)**
- **Who has access:** **Anyone** (or "Anyone with Google account" for more security)

### Step 3: Deploy

1. Click **"Deploy"**
2. First time: Click **"Authorize access"**
   - Review permissions
   - Click **"Allow"**
3. Copy the **Web app URL**
   - Format: `https://script.google.com/macros/s/DEPLOYMENT_ID/exec`
4. Click **"Done"**

**Save this URL!** This is your application's URL.

---

## Part 6: Test the Web App (5 minutes)

### Step 1: Open the Web App

1. Open the Web app URL in a new browser tab
2. You should be redirected to sign in with Google (if not already signed in)
3. Sign in with your Google account

### Step 2: Verify Your Portal Loads

Based on your role in the Users sheet:

- **ADMIN** → Should see "Admin Dashboard" with purple gradient header
- **TUTOR** → Should see "Tutor Portal" with pink gradient header
- **TUTEE** → Should see "Tutee Portal" with blue gradient header

### Step 3: Verify Your Info Displays

Check that the portal shows:
- ✅ Your name
- ✅ Your email
- ✅ Your role badge
- ✅ Your school

### Step 4: Test Other Roles

To test other roles:

1. Open an incognito/private browser window
2. Go to the Web app URL
3. Sign in with a different Google account
4. Make sure that account's email is in the Users sheet
5. Verify the correct portal loads for that role

### Step 5: Test Access Denied

1. Open an incognito window
2. Go to the Web app URL
3. Sign in with an account NOT in the Users sheet
4. You should see the "Access Denied" page

---

## Part 7: Share with Users (2 minutes)

Once everything is working:

### For Admin Users:
1. Add their emails to the Users sheet with role=ADMIN
2. Share the Web app URL with them
3. They can access the Admin Dashboard

### For Tutors/Tutees:
1. Add their emails to the Users sheet with appropriate role
2. Add corresponding entries to Tutor Profiles or Tutee Profiles sheets
3. Share the Web app URL
4. They'll see their role-specific portal

---

## Troubleshooting

### "Access Denied" for your own account
- ✅ Check your email is in the Users sheet
- ✅ Verify is_active = TRUE
- ✅ Verify consent_received = TRUE
- ✅ Check for typos in email address

### "Sheet not found" errors in logs
- ✅ Verify all 11 sheets exist in your spreadsheet
- ✅ Check sheet names are exact (case-sensitive)
- ✅ Verify SPREADSHEET_ID is correct in SheetsDAO.gs

### Tests fail with "Could not open spreadsheet"
- ✅ Verify SPREADSHEET_ID in SheetsDAO.gs is correct
- ✅ Make sure you have Editor access to the spreadsheet
- ✅ Check the spreadsheet isn't deleted

### Web app shows blank page
- ✅ Check Browser console for errors (F12 → Console tab)
- ✅ Verify all HTML files are correctly named
- ✅ Check Execution log in Apps Script for server errors

### Authorization errors
- ✅ Make sure you clicked "Allow" during authorization
- ✅ Try revoking and re-authorizing: https://myaccount.google.com/permissions
- ✅ Check that OAuth scopes in appsscript.json are correct

---

## MVP Features Working ✅

After deployment, you have a working MVP with:

✅ **Google account authentication** - Users sign in with Google
✅ **Role-based access control** - Admin, Tutor, Tutee roles
✅ **Three role-specific portals** - Different UI for each role
✅ **User data from Google Sheets** - Real-time data access
✅ **White-label configuration** - App name from Configuration sheet
✅ **Mobile-responsive UI** - Works on phones, tablets, desktops
✅ **Test-driven development** - All modules have passing tests

---

## What's Next? (Phase 2)

The MVP provides the foundation. Next development phases will add:

📋 **Phase 2 Features (Weeks 4-6):**
- Full matching algorithm with weighted scoring
- Availability management (tutors set time slots)
- Session scheduling with Google Meet links
- Evidence submission and verification
- VIA hours calculation and tracking
- Admin reporting dashboard

---

## Need Help?

- Check the Execution log: View → Logs (in Apps Script editor)
- Review test output: Run `runAllTests()` function
- Verify spreadsheet setup: Review SHEETS_SETUP.md checklist
- Check sample data: Make sure Users sheet has valid test accounts

---

## Quick Reference

**Deployment URL:** (your Web app URL here)
**Spreadsheet ID:** (your spreadsheet ID here)
**Apps Script Project:** https://script.google.com

**Key Files:**
- `Code.gs` - Main entry point (doGet function)
- `SheetsDAO.gs` - Database access (UPDATE SPREADSHEET_ID HERE!)
- `AuthHelper.gs` - Authentication and roles
- `Utils.gs` - Utility functions
- `*.html` - Portal interfaces

**To Update the App:**
1. Edit code in Apps Script editor
2. Save all files
3. Click Deploy → Manage deployments
4. Click Edit (pencil icon)
5. Change "Version" to "New version"
6. Add description of changes
7. Click "Deploy"
8. Refresh browser to see changes

**Congratulations! Your MVP is live! 🎉**
