/**
 * Code.gs
 *
 * Main entry point for the Tuition Management System Web App
 * Handles routing based on user roles
 */

/**
 * Web App GET handler - serves the appropriate portal based on user role
 * @param {Object} e - Event object with request parameters
 * @return {HtmlOutput} HTML page to display
 */
function doGet(e) {
  try {
    // Get current authenticated user
    var user = AuthHelper.getCurrentUser();

    // If no user found or not authenticated, show access denied
    if (!user) {
      return HtmlService.createHtmlOutputFromFile('AccessDenied')
        .setTitle('Access Denied')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
    }

    // Get app name from configuration
    var appName = SheetsDAO.getConfig('app_name', 'Tuition Management System');

    // Determine which portal to show based on primary role
    var primaryRole = AuthHelper.getPrimaryRole(user);
    var template;

    switch (primaryRole) {
      case 'ADMIN':
        template = HtmlService.createTemplateFromFile('AdminDashboard');
        break;
      case 'TUTOR':
        template = HtmlService.createTemplateFromFile('TutorPortal');
        break;
      case 'TUTEE':
        template = HtmlService.createTemplateFromFile('TuteePortal');
        break;
      default:
        return HtmlService.createHtmlOutputFromFile('AccessDenied')
          .setTitle('Access Denied')
          .addMetaTag('viewport', 'width=device-width, initial-scale=1');
    }

    // Pass user data to the template
    template.user = user;
    template.appName = appName;

    // Evaluate and return the template
    return template.evaluate()
      .setTitle(appName)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } catch (e) {
    Utils.logError('doGet', e);

    // Return error page
    var errorTemplate = HtmlService.createTemplate(
      '<html><body>' +
      '<h1>Error</h1>' +
      '<p>An error occurred while loading the application.</p>' +
      '<p><strong>Error:</strong> <?= error ?></p>' +
      '<p>Please contact the administrator.</p>' +
      '</body></html>'
    );
    errorTemplate.error = e.toString();

    return errorTemplate.evaluate()
      .setTitle('Error')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
}

/**
 * Include function for HTML templating
 * Allows including shared HTML files (CSS, JS, etc.)
 * @param {string} filename - Name of the file to include
 * @return {string} Content of the file
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Server-side function to get user profile data
 * Called from client-side JavaScript
 * @return {Object} User profile data
 */
function getUserProfile() {
  try {
    var user = AuthHelper.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Return sanitized user data
    return {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      role: user.role,
      school: user.school
    };
  } catch (e) {
    Utils.logError('getUserProfile', e);
    throw e;
  }
}

/**
 * Server-side function to get application configuration
 * @return {Object} Configuration data
 */
function getAppConfig() {
  try {
    return {
      app_name: SheetsDAO.getConfig('app_name', 'Tuition Management System'),
      org_name: SheetsDAO.getConfig('org_name', 'Tutoring Organization'),
      primary_color: SheetsDAO.getConfig('primary_color', '#1976d2'),
      secondary_color: SheetsDAO.getConfig('secondary_color', '#424242'),
      label_tutor: SheetsDAO.getConfig('label_tutor', 'Tutor'),
      label_tutee: SheetsDAO.getConfig('label_tutee', 'Tutee'),
      label_session: SheetsDAO.getConfig('label_session', 'Session')
    };
  } catch (e) {
    Utils.logError('getAppConfig', e);
    throw e;
  }
}

/**
 * Run all system tests
 * Call this function from Apps Script editor to verify everything works
 */
function runAllTests() {
  Logger.log('========================================');
  Logger.log('RUNNING ALL SYSTEM TESTS');
  Logger.log('========================================\n');

  var allPassed = true;

  // Test Utils
  Logger.log('--- Testing Utils Module ---');
  allPassed = runAllUtilsTests() && allPassed;
  Logger.log('');

  // Test SheetsDAO
  Logger.log('--- Testing SheetsDAO Module ---');
  allPassed = runAllSheetsDAOTests() && allPassed;
  Logger.log('');

  // Test AuthHelper
  Logger.log('--- Testing AuthHelper Module ---');
  allPassed = runAllAuthHelperTests() && allPassed;
  Logger.log('');

  // Summary
  Logger.log('========================================');
  if (allPassed) {
    Logger.log('✓✓✓ ALL SYSTEM TESTS PASSED ✓✓✓');
    Logger.log('Your MVP is ready to deploy!');
  } else {
    Logger.log('✗✗✗ SOME TESTS FAILED ✗✗✗');
    Logger.log('Please fix the issues before deploying.');
  }
  Logger.log('========================================');

  return allPassed;
}
