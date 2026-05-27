/**
 * SheetsDAO.gs
 *
 * Data Access Layer for Google Sheets
 * Provides CRUD operations with caching and error handling
 * Following TDD principles
 */

var SheetsDAO = (function() {
  // Configuration - REPLACE THIS WITH YOUR SPREADSHEET ID
  var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

  // Cache for frequently accessed data
  var cache = CacheService.getScriptCache();
  var CACHE_DURATION = 300; // 5 minutes

  /**
   * Gets the spreadsheet object
   * @return {Spreadsheet} Google Spreadsheet object
   */
  function getSpreadsheet() {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      Utils.logError('SheetsDAO.getSpreadsheet', e);
      throw new Error('Failed to open spreadsheet. Please check SPREADSHEET_ID in SheetsDAO.gs');
    }
  }

  /**
   * Gets a sheet by name
   * @param {string} sheetName - Name of the sheet
   * @return {Sheet} Google Sheet object
   */
  function getSheet(sheetName) {
    try {
      var sheet = getSpreadsheet().getSheetByName(sheetName);
      if (!sheet) {
        throw new Error('Sheet "' + sheetName + '" not found');
      }
      return sheet;
    } catch (e) {
      Utils.logError('SheetsDAO.getSheet', e);
      throw e;
    }
  }

  /**
   * Gets all rows from a sheet as array of objects
   * @param {string} sheetName - Name of the sheet
   * @param {boolean} useCache - Whether to use cache (default: false for now)
   * @return {Array<Object>} Array of row objects
   */
  function getAllRows(sheetName, useCache) {
    try {
      var cacheKey = 'rows_' + sheetName;

      // Check cache if enabled
      if (useCache) {
        var cached = cache.get(cacheKey);
        if (cached) {
          return JSON.parse(cached);
        }
      }

      var sheet = getSheet(sheetName);
      var data = sheet.getDataRange().getValues();

      if (data.length === 0) {
        return [];
      }

      var headers = data[0];
      var rows = [];

      // Convert each row to an object
      for (var i = 1; i < data.length; i++) {
        var row = {};
        for (var j = 0; j < headers.length; j++) {
          row[headers[j]] = data[i][j];
        }
        rows.push(row);
      }

      // Cache if enabled
      if (useCache) {
        cache.put(cacheKey, JSON.stringify(rows), CACHE_DURATION);
      }

      return rows;
    } catch (e) {
      Utils.logError('SheetsDAO.getAllRows', e);
      throw e;
    }
  }

  /**
   * Finds rows matching a column value
   * @param {string} sheetName - Name of the sheet
   * @param {string} column - Column name to search
   * @param {any} value - Value to match
   * @return {Array<Object>} Array of matching row objects
   */
  function findByColumn(sheetName, column, value) {
    try {
      var rows = getAllRows(sheetName);
      return rows.filter(function(row) {
        return row[column] === value;
      });
    } catch (e) {
      Utils.logError('SheetsDAO.findByColumn', e);
      throw e;
    }
  }

  /**
   * Finds a single row by column value
   * @param {string} sheetName - Name of the sheet
   * @param {string} column - Column name to search
   * @param {any} value - Value to match
   * @return {Object|null} Row object or null if not found
   */
  function findOneByColumn(sheetName, column, value) {
    try {
      var results = findByColumn(sheetName, column, value);
      return results.length > 0 ? results[0] : null;
    } catch (e) {
      Utils.logError('SheetsDAO.findOneByColumn', e);
      throw e;
    }
  }

  /**
   * Appends a new row to a sheet
   * @param {string} sheetName - Name of the sheet
   * @param {Object} rowData - Object with column:value pairs
   * @return {boolean} True if successful
   */
  function appendRow(sheetName, rowData) {
    try {
      var sheet = getSheet(sheetName);
      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

      // Build row array in correct column order
      var rowArray = [];
      for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        rowArray.push(rowData.hasOwnProperty(header) ? rowData[header] : '');
      }

      sheet.appendRow(rowArray);

      // Clear cache for this sheet
      cache.remove('rows_' + sheetName);

      return true;
    } catch (e) {
      Utils.logError('SheetsDAO.appendRow', e);
      throw e;
    }
  }

  /**
   * Updates a row matching a column value
   * @param {string} sheetName - Name of the sheet
   * @param {string} matchColumn - Column to match for finding the row
   * @param {any} matchValue - Value to match
   * @param {Object} updates - Object with column:value pairs to update
   * @return {boolean} True if row found and updated
   */
  function updateRow(sheetName, matchColumn, matchValue, updates) {
    try {
      var sheet = getSheet(sheetName);
      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var matchColIndex = headers.indexOf(matchColumn);

      if (matchColIndex === -1) {
        throw new Error('Column "' + matchColumn + '" not found in sheet "' + sheetName + '"');
      }

      // Find the row
      for (var i = 1; i < data.length; i++) {
        if (data[i][matchColIndex] === matchValue) {
          // Update the columns
          for (var key in updates) {
            var colIndex = headers.indexOf(key);
            if (colIndex >= 0) {
              sheet.getRange(i + 1, colIndex + 1).setValue(updates[key]);
            }
          }

          // Clear cache
          cache.remove('rows_' + sheetName);

          return true;
        }
      }

      return false; // Row not found
    } catch (e) {
      Utils.logError('SheetsDAO.updateRow', e);
      throw e;
    }
  }

  /**
   * Gets a configuration value
   * @param {string} configKey - Configuration key
   * @param {any} defaultValue - Default value if not found
   * @return {any} Configuration value
   */
  function getConfig(configKey, defaultValue) {
    try {
      var config = findOneByColumn('Configuration', 'config_key', configKey);
      if (!config) {
        return defaultValue;
      }
      return config.config_value || defaultValue;
    } catch (e) {
      Utils.logError('SheetsDAO.getConfig', e);
      return defaultValue;
    }
  }

  /**
   * Sets the spreadsheet ID (for configuration)
   * @param {string} id - Spreadsheet ID
   */
  function setSpreadsheetId(id) {
    SPREADSHEET_ID = id;
  }

  // Public API
  return {
    getSpreadsheet: getSpreadsheet,
    getSheet: getSheet,
    getAllRows: getAllRows,
    findByColumn: findByColumn,
    findOneByColumn: findOneByColumn,
    appendRow: appendRow,
    updateRow: updateRow,
    getConfig: getConfig,
    setSpreadsheetId: setSpreadsheetId
  };
})();

/**
 * TEST FUNCTIONS for SheetsDAO
 *
 * NOTE: These tests require a properly configured spreadsheet
 * Run ONLY after setting up the spreadsheet as per SHEETS_SETUP.md
 */

function test_SheetsDAO_getSpreadsheet() {
  try {
    var ss = SheetsDAO.getSpreadsheet();
    if (!ss) {
      throw new Error('TEST FAILED: Could not get spreadsheet');
    }
    Logger.log('✓ getSpreadsheet test passed - Spreadsheet name: ' + ss.getName());
    return true;
  } catch (e) {
    Logger.log('✗ getSpreadsheet test failed: ' + e.message);
    Logger.log('HINT: Make sure to set SPREADSHEET_ID in SheetsDAO.gs');
    return false;
  }
}

function test_SheetsDAO_getSheet() {
  try {
    var sheet = SheetsDAO.getSheet('Users');
    if (!sheet) {
      throw new Error('TEST FAILED: Could not get Users sheet');
    }
    Logger.log('✓ getSheet test passed - Found Users sheet');
    return true;
  } catch (e) {
    Logger.log('✗ getSheet test failed: ' + e.message);
    return false;
  }
}

function test_SheetsDAO_getAllRows() {
  try {
    var rows = SheetsDAO.getAllRows('Users');
    if (!Array.isArray(rows)) {
      throw new Error('TEST FAILED: getAllRows should return an array');
    }
    Logger.log('✓ getAllRows test passed - Found ' + rows.length + ' users');
    if (rows.length > 0) {
      Logger.log('  Sample row: ' + JSON.stringify(rows[0]));
    }
    return true;
  } catch (e) {
    Logger.log('✗ getAllRows test failed: ' + e.message);
    return false;
  }
}

function test_SheetsDAO_findByColumn() {
  try {
    var admins = SheetsDAO.findByColumn('Users', 'role', 'ADMIN');
    if (!Array.isArray(admins)) {
      throw new Error('TEST FAILED: findByColumn should return an array');
    }
    Logger.log('✓ findByColumn test passed - Found ' + admins.length + ' admins');
    return true;
  } catch (e) {
    Logger.log('✗ findByColumn test failed: ' + e.message);
    return false;
  }
}

function test_SheetsDAO_getConfig() {
  try {
    var appName = SheetsDAO.getConfig('app_name', 'Default App');
    if (!appName) {
      throw new Error('TEST FAILED: getConfig should return a value');
    }
    Logger.log('✓ getConfig test passed - App name: ' + appName);
    return true;
  } catch (e) {
    Logger.log('✗ getConfig test failed: ' + e.message);
    return false;
  }
}

/**
 * Run all SheetsDAO tests
 * IMPORTANT: Run this ONLY after setting up the spreadsheet
 */
function runAllSheetsDAOTests() {
  Logger.log('=== Running SheetsDAO Tests ===');
  Logger.log('IMPORTANT: Make sure SPREADSHEET_ID is set in SheetsDAO.gs');
  Logger.log('');

  var allPassed = true;

  allPassed = test_SheetsDAO_getSpreadsheet() && allPassed;
  allPassed = test_SheetsDAO_getSheet() && allPassed;
  allPassed = test_SheetsDAO_getAllRows() && allPassed;
  allPassed = test_SheetsDAO_findByColumn() && allPassed;
  allPassed = test_SheetsDAO_getConfig() && allPassed;

  Logger.log('');
  if (allPassed) {
    Logger.log('✓✓✓ ALL SHEETSDAO TESTS PASSED ✓✓✓');
  } else {
    Logger.log('✗✗✗ SOME SHEETSDAO TESTS FAILED ✗✗✗');
  }

  return allPassed;
}
