/**
 * Utils.gs
 *
 * Utility functions for the Tuition Management System
 * Following TDD principles with inline test functions
 */

var Utils = (function() {

  /**
   * Generates a UUID v4 (simple implementation)
   * @return {string} UUID string
   */
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Formats a date to YYYY-MM-DD format
   * @param {Date} date - Date object to format
   * @return {string} Formatted date string
   */
  function formatDate(date) {
    if (!(date instanceof Date)) {
      throw new Error('Invalid date object');
    }
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  /**
   * Formats a date to YYYY-MM-DD HH:MM:SS format
   * @param {Date} date - Date object to format
   * @return {string} Formatted datetime string
   */
  function formatDateTime(date) {
    if (!(date instanceof Date)) {
      throw new Error('Invalid date object');
    }
    var dateStr = formatDate(date);
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');
    return dateStr + ' ' + hours + ':' + minutes + ':' + seconds;
  }

  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @return {boolean} True if valid email format
   */
  function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates phone number (Singapore format)
   * @param {string} phone - Phone number to validate
   * @return {boolean} True if valid format
   */
  function isValidPhone(phone) {
    if (typeof phone !== 'string') return false;
    // Singapore: +65 followed by 8 digits, or just 8 digits
    var phoneRegex = /^(\+65)?[689]\d{7}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Validates that a value is not empty
   * @param {any} value - Value to check
   * @return {boolean} True if not empty
   */
  function isNotEmpty(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
  }

  /**
   * Safely gets a value from an object with a default
   * @param {Object} obj - Object to get value from
   * @param {string} key - Key to retrieve
   * @param {any} defaultValue - Default value if key not found
   * @return {any} Value or default
   */
  function getOrDefault(obj, key, defaultValue) {
    if (!obj || typeof obj !== 'object') return defaultValue;
    return obj.hasOwnProperty(key) ? obj[key] : defaultValue;
  }

  /**
   * Converts comma-separated string to array
   * @param {string} str - Comma-separated string
   * @return {Array} Array of trimmed strings
   */
  function csvToArray(str) {
    if (typeof str !== 'string' || str.trim() === '') return [];
    return str.split(',').map(function(item) { return item.trim(); });
  }

  /**
   * Logs an error with context
   * @param {string} functionName - Name of function where error occurred
   * @param {Error} error - Error object
   */
  function logError(functionName, error) {
    Logger.log('ERROR in ' + functionName + ': ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
  }

  // Public API
  return {
    generateUUID: generateUUID,
    formatDate: formatDate,
    formatDateTime: formatDateTime,
    isValidEmail: isValidEmail,
    isValidPhone: isValidPhone,
    isNotEmpty: isNotEmpty,
    getOrDefault: getOrDefault,
    csvToArray: csvToArray,
    logError: logError
  };
})();

/**
 * TEST FUNCTIONS
 * Following TDD principles - these test the Utils module
 */

function test_Utils_generateUUID() {
  var uuid = Utils.generateUUID();
  Logger.log('Generated UUID: ' + uuid);

  // Test 1: UUID should be a string
  if (typeof uuid !== 'string') {
    throw new Error('TEST FAILED: UUID should be a string');
  }

  // Test 2: UUID should match pattern
  var uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(uuid)) {
    throw new Error('TEST FAILED: UUID does not match expected pattern');
  }

  // Test 3: Multiple calls should generate different UUIDs
  var uuid2 = Utils.generateUUID();
  if (uuid === uuid2) {
    throw new Error('TEST FAILED: Generated UUIDs should be unique');
  }

  Logger.log('✓ All UUID tests passed');
  return true;
}

function test_Utils_formatDate() {
  var testDate = new Date('2026-05-27T14:30:00');
  var formatted = Utils.formatDate(testDate);
  Logger.log('Formatted date: ' + formatted);

  // Test 1: Should return correct format
  if (formatted !== '2026-05-27') {
    throw new Error('TEST FAILED: Expected 2026-05-27, got ' + formatted);
  }

  // Test 2: Should throw error for invalid input
  try {
    Utils.formatDate('not a date');
    throw new Error('TEST FAILED: Should throw error for invalid date');
  } catch (e) {
    if (e.message.indexOf('Invalid date') === -1) {
      throw e;
    }
  }

  Logger.log('✓ All formatDate tests passed');
  return true;
}

function test_Utils_isValidEmail() {
  // Test valid emails
  var validEmails = [
    'test@example.com',
    'user.name@domain.co.uk',
    'admin+tag@company.org'
  ];

  validEmails.forEach(function(email) {
    if (!Utils.isValidEmail(email)) {
      throw new Error('TEST FAILED: ' + email + ' should be valid');
    }
  });

  // Test invalid emails
  var invalidEmails = [
    'notanemail',
    '@example.com',
    'user@',
    'user @example.com',
    '',
    null,
    123
  ];

  invalidEmails.forEach(function(email) {
    if (Utils.isValidEmail(email)) {
      throw new Error('TEST FAILED: ' + email + ' should be invalid');
    }
  });

  Logger.log('✓ All email validation tests passed');
  return true;
}

function test_Utils_isValidPhone() {
  // Test valid phones
  var validPhones = [
    '+6591234567',
    '91234567',
    '+65 9123 4567',
    '81234567',
    '61234567'
  ];

  validPhones.forEach(function(phone) {
    if (!Utils.isValidPhone(phone)) {
      throw new Error('TEST FAILED: ' + phone + ' should be valid');
    }
  });

  // Test invalid phones
  var invalidPhones = [
    '123',
    '+6512345678', // wrong prefix
    'abcdefgh',
    '',
    null
  ];

  invalidPhones.forEach(function(phone) {
    if (Utils.isValidPhone(phone)) {
      throw new Error('TEST FAILED: ' + phone + ' should be invalid');
    }
  });

  Logger.log('✓ All phone validation tests passed');
  return true;
}

function test_Utils_csvToArray() {
  // Test 1: Normal comma-separated string
  var result1 = Utils.csvToArray('Math,Science,English');
  if (result1.length !== 3 || result1[0] !== 'Math') {
    throw new Error('TEST FAILED: csvToArray basic test');
  }

  // Test 2: String with spaces
  var result2 = Utils.csvToArray('Math , Science , English');
  if (result2[0] !== 'Math' || result2[1] !== 'Science') {
    throw new Error('TEST FAILED: csvToArray should trim spaces');
  }

  // Test 3: Empty string
  var result3 = Utils.csvToArray('');
  if (result3.length !== 0) {
    throw new Error('TEST FAILED: csvToArray should return empty array for empty string');
  }

  Logger.log('✓ All csvToArray tests passed');
  return true;
}

/**
 * Run all tests
 */
function runAllUtilsTests() {
  Logger.log('=== Running Utils Tests ===');

  try {
    test_Utils_generateUUID();
    test_Utils_formatDate();
    test_Utils_isValidEmail();
    test_Utils_isValidPhone();
    test_Utils_csvToArray();

    Logger.log('\n✓✓✓ ALL UTILS TESTS PASSED ✓✓✓\n');
    return true;
  } catch (e) {
    Logger.log('\n✗✗✗ TESTS FAILED ✗✗✗');
    Logger.log('Error: ' + e.message);
    Logger.log('Stack: ' + e.stack);
    return false;
  }
}
