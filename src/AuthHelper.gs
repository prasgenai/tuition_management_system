/**
 * AuthHelper.gs
 *
 * Authentication and Authorization module
 * Role-Based Access Control (RBAC)
 * Following TDD principles
 */

var AuthHelper = (function() {

  /**
   * Gets the current user's email from Google session
   * @return {string|null} User email or null if not authenticated
   */
  function getCurrentUserEmail() {
    try {
      var user = Session.getActiveUser();
      var email = user.getEmail();
      return email || null;
    } catch (e) {
      Utils.logError('AuthHelper.getCurrentUserEmail', e);
      return null;
    }
  }

  /**
   * Gets the current user's full details from the Users sheet
   * @return {Object|null} User object or null if not found
   */
  function getCurrentUser() {
    try {
      var email = getCurrentUserEmail();
      if (!email) {
        Logger.log('No authenticated user email found');
        return null;
      }

      var user = SheetsDAO.findOneByColumn('Users', 'email', email);

      if (!user) {
        Logger.log('User not found in database: ' + email);
        return null;
      }

      if (!user.is_active) {
        Logger.log('User is inactive: ' + email);
        return null;
      }

      return user;
    } catch (e) {
      Utils.logError('AuthHelper.getCurrentUser', e);
      return null;
    }
  }

  /**
   * Checks if current user has a specific role
   * @param {string} requiredRole - Role to check (ADMIN, TUTOR, TUTEE)
   * @return {boolean} True if user has the role
   */
  function hasRole(requiredRole) {
    try {
      var user = getCurrentUser();
      if (!user) return false;

      var userRoles = user.role.split('+').map(function(r) { return r.trim(); });
      return userRoles.indexOf(requiredRole) >= 0;
    } catch (e) {
      Utils.logError('AuthHelper.hasRole', e);
      return false;
    }
  }

  /**
   * Checks if current user is an admin
   * @return {boolean} True if admin
   */
  function isAdmin() {
    return hasRole('ADMIN');
  }

  /**
   * Checks if current user is a tutor
   * @return {boolean} True if tutor
   */
  function isTutor() {
    return hasRole('TUTOR');
  }

  /**
   * Checks if current user is a tutee
   * @return {boolean} True if tutee
   */
  function isTutee() {
    return hasRole('TUTEE');
  }

  /**
   * Gets user's primary role (first role in their role list)
   * @param {Object} user - User object
   * @return {string} Primary role
   */
  function getPrimaryRole(user) {
    if (!user || !user.role) return 'NONE';
    var roles = user.role.split('+').map(function(r) { return r.trim(); });
    return roles[0];
  }

  /**
   * Validates that current user can access a resource
   * @param {Array<string>} allowedRoles - Array of roles that can access
   * @return {boolean} True if authorized
   */
  function authorize(allowedRoles) {
    try {
      var user = getCurrentUser();
      if (!user) return false;

      for (var i = 0; i < allowedRoles.length; i++) {
        if (hasRole(allowedRoles[i])) {
          return true;
        }
      }

      return false;
    } catch (e) {
      Utils.logError('AuthHelper.authorize', e);
      return false;
    }
  }

  // Public API
  return {
    getCurrentUserEmail: getCurrentUserEmail,
    getCurrentUser: getCurrentUser,
    hasRole: hasRole,
    isAdmin: isAdmin,
    isTutor: isTutor,
    isTutee: isTutee,
    getPrimaryRole: getPrimaryRole,
    authorize: authorize
  };
})();

/**
 * TEST FUNCTIONS for AuthHelper
 *
 * NOTE: These tests require:
 * 1. A properly configured spreadsheet
 * 2. Your email added to the Users sheet with a role
 */

function test_AuthHelper_getCurrentUserEmail() {
  var email = AuthHelper.getCurrentUserEmail();
  Logger.log('Current user email: ' + email);

  if (!email) {
    Logger.log('⚠ Warning: No email found. You might not be authenticated.');
    return false;
  }

  if (!Utils.isValidEmail(email)) {
    throw new Error('TEST FAILED: Invalid email format');
  }

  Logger.log('✓ getCurrentUserEmail test passed');
  return true;
}

function test_AuthHelper_getCurrentUser() {
  var user = AuthHelper.getCurrentUser();

  if (!user) {
    Logger.log('⚠ Warning: User not found in database.');
    Logger.log('  Make sure your email is added to the Users sheet.');
    return false;
  }

  Logger.log('✓ getCurrentUser test passed');
  Logger.log('  User: ' + user.name);
  Logger.log('  Email: ' + user.email);
  Logger.log('  Role: ' + user.role);
  return true;
}

function test_AuthHelper_roles() {
  var user = AuthHelper.getCurrentUser();

  if (!user) {
    Logger.log('⚠ Skipping role tests - no user found');
    return false;
  }

  var primaryRole = AuthHelper.getPrimaryRole(user);
  Logger.log('Primary role: ' + primaryRole);

  Logger.log('Is Admin: ' + AuthHelper.isAdmin());
  Logger.log('Is Tutor: ' + AuthHelper.isTutor());
  Logger.log('Is Tutee: ' + AuthHelper.isTutee());

  Logger.log('✓ Role tests passed');
  return true;
}

function runAllAuthHelperTests() {
  Logger.log('=== Running AuthHelper Tests ===');
  Logger.log('');

  var allPassed = true;

  allPassed = test_AuthHelper_getCurrentUserEmail() && allPassed;
  allPassed = test_AuthHelper_getCurrentUser() && allPassed;
  allPassed = test_AuthHelper_roles() && allPassed;

  Logger.log('');
  if (allPassed) {
    Logger.log('✓✓✓ ALL AUTHHELPER TESTS PASSED ✓✓✓');
  } else {
    Logger.log('✗✗✗ SOME AUTHHELPER TESTS FAILED ✗✗✗');
  }

  return allPassed;
}
