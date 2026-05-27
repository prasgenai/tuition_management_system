#!/bin/bash

# Helper script to copy files to Apps Script
# Run this and follow the prompts

cd ~/claude_practice/tuition_management_system/src

echo "========================================="
echo "Apps Script File Copy Helper"
echo "========================================="
echo ""
echo "I'll show you each file. Copy and paste into Apps Script."
echo ""

files=(
  "Code.gs"
  "Utils.gs"
  "SheetsDAO.gs"
  "AuthHelper.gs"
  "TestDataPopulator.gs"
  "appsscript.json"
  "AdminDashboard.html"
  "TutorPortal.html"
  "TuteePortal.html"
  "AccessDenied.html"
)

for file in "${files[@]}"; do
  echo "========================================="
  echo "FILE: $file"
  echo "========================================="
  echo ""
  echo "Press ENTER to show the content..."
  read

  cat "$file"

  echo ""
  echo ""
  echo "✓ Content shown above"
  echo "  1. Copy EVERYTHING above (from top to bottom)"
  echo "  2. Go to Apps Script"
  echo "  3. Click on '$file' in the file list"
  echo "  4. Select All (Ctrl+A), Delete, Paste, Save"
  echo ""
  echo "Press ENTER when done to continue to next file..."
  read
  echo ""
done

echo "========================================="
echo "✓ All files shown!"
echo "========================================="
echo "Now run: populateAllTestData() in Apps Script"
