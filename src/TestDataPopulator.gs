/**
 * TestDataPopulator.gs
 *
 * Populates all sheets with comprehensive test data
 * Run populateAllTestData() once to set up the entire database
 */

/**
 * Main function to populate all sheets with test data
 * Run this function once from Apps Script editor
 */
function populateAllTestData() {
  Logger.log('Starting test data population...');

  try {
    // Populate in order of dependencies
    populateUsers();
    populateTutorProfiles();
    populateTuteeProfiles();
    populateConfiguration();
    populateAvailability();
    // Other sheets will be populated through the app workflow

    Logger.log('✅ Test data population complete!');
    Logger.log('You can now deploy the Web App and test it.');

    return true;
  } catch (e) {
    Logger.log('❌ Error populating test data: ' + e.toString());
    Logger.log('Stack: ' + e.stack);
    return false;
  }
}

/**
 * Populate Users sheet with test accounts
 */
function populateUsers() {
  Logger.log('Populating Users sheet...');

  var users = [
    // Admins
    ['admin001', 'prasgenai@gmail.com', 'Admin User', '+6591234567', 'Admin Office', 'ADMIN', true, true, '2026-05-27', '2026-05-27', ''],
    ['admin002', 'admin2@example.com', 'Secondary Admin', '+6591234568', 'Admin Office', 'ADMIN', true, true, '2026-05-27', '2026-05-27', ''],

    // Tutors (Older students - Sec 3-5)
    ['tutor001', 'tutor1@example.com', 'Alice Tan', '+6591234569', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutor002', 'tutor2@example.com', 'Benjamin Lim', '+6591234570', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutor003', 'tutor3@example.com', 'Catherine Wong', '+6591234571', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutor004', 'tutor4@example.com', 'David Chen', '+6591234572', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutor005', 'tutor5@example.com', 'Emily Ng', '+6591234573', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutor006', 'tutor6@example.com', 'Francis Teo', '+6591234574', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutor007', 'tutor7@example.com', 'Grace Koh', '+6591234575', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutor008', 'tutor8@example.com', 'Henry Ong', '+6591234576', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutor009', 'tutor9@example.com', 'Iris Lee', '+6591234577', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutor010', 'tutor10@example.com', 'Jack Goh', '+6591234578', 'Example Secondary School', 'TUTOR', true, true, '2026-05-27', '2026-05-27', ''],

    // Tutees (Younger students - Sec 1-3)
    ['tutee001', 'tutee1@example.com', 'Kelly Sim', '+6591234579', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee002', 'tutee2@example.com', 'Leo Tan', '+6591234580', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee003', 'tutee3@example.com', 'Michelle Yeo', '+6591234581', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee004', 'tutee4@example.com', 'Nathan Lim', '+6591234582', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee005', 'tutee5@example.com', 'Olivia Chan', '+6591234583', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee006', 'tutee6@example.com', 'Peter Koh', '+6591234584', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee007', 'tutee7@example.com', 'Queenie Ng', '+6591234585', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee008', 'tutee8@example.com', 'Ryan Teo', '+6591234586', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee009', 'tutee9@example.com', 'Sophia Wee', '+6591234587', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee010', 'tutee10@example.com', 'Thomas Ang', '+6591234588', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee011', 'tutee11@example.com', 'Uma Raj', '+6591234589', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee012', 'tutee12@example.com', 'Victor Tan', '+6591234590', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee013', 'tutee13@example.com', 'Wendy Lim', '+6591234591', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee014', 'tutee14@example.com', 'Xavier Goh', '+6591234592', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', ''],
    ['tutee015', 'tutee15@example.com', 'Yvonne Lee', '+6591234593', 'Example Secondary School', 'TUTEE', true, true, '2026-05-27', '2026-05-27', '']
  ];

  var sheet = SheetsDAO.getSheet('Users');
  var startRow = sheet.getLastRow() + 1;

  if (startRow === 2) {
    // No data yet, write all users
    sheet.getRange(startRow, 1, users.length, users[0].length).setValues(users);
    Logger.log('  Added ' + users.length + ' users');
  } else {
    Logger.log('  Users sheet already has data, skipping...');
  }
}

/**
 * Populate Tutor Profiles sheet
 */
function populateTutorProfiles() {
  Logger.log('Populating Tutor Profiles sheet...');

  var profiles = [
    ['tp001', 'tutor001', 'Mathematics,Science', 'Secondary 3,Secondary 4', 'Express,O-Level', 4.5, 0, true],
    ['tp002', 'tutor002', 'English,Literature', 'Secondary 3,Secondary 4,Secondary 5', 'Express,O-Level', 4.8, 0, true],
    ['tp003', 'tutor003', 'Mathematics,Physics', 'Secondary 4,Secondary 5', 'Express,O-Level', 4.3, 0, true],
    ['tp004', 'tutor004', 'Chemistry,Biology', 'Secondary 3,Secondary 4', 'Express,O-Level', 4.6, 0, true],
    ['tp005', 'tutor005', 'Chinese,Mother Tongue', 'Secondary 2,Secondary 3,Secondary 4', 'Express,Normal Academic', 4.7, 0, true],
    ['tp006', 'tutor006', 'History,Geography', 'Secondary 3,Secondary 4', 'Express,O-Level', 4.4, 0, true],
    ['tp007', 'tutor007', 'Mathematics,Additional Mathematics', 'Secondary 4,Secondary 5', 'Express,O-Level', 4.9, 0, true],
    ['tp008', 'tutor008', 'Science,Physics,Chemistry', 'Secondary 3,Secondary 4', 'Express,O-Level', 4.5, 0, true],
    ['tp009', 'tutor009', 'English,Social Studies', 'Secondary 2,Secondary 3', 'Express,Normal Academic', 4.2, 0, true],
    ['tp010', 'tutor010', 'Mathematics,Science', 'Secondary 2,Secondary 3', 'Express,Normal Academic,Normal Technical', 4.6, 0, true]
  ];

  var sheet = SheetsDAO.getSheet('Tutor Profiles');
  var startRow = sheet.getLastRow() + 1;

  if (startRow === 2) {
    sheet.getRange(startRow, 1, profiles.length, profiles[0].length).setValues(profiles);
    Logger.log('  Added ' + profiles.length + ' tutor profiles');
  } else {
    Logger.log('  Tutor Profiles sheet already has data, skipping...');
  }
}

/**
 * Populate Tutee Profiles sheet
 */
function populateTuteeProfiles() {
  Logger.log('Populating Tutee Profiles sheet...');

  var profiles = [
    ['te001', 'tutee001', 'Mathematics', 'Secondary 2', 'Express', 'B', 'ONE_TO_ONE', 'REGULAR'],
    ['te002', 'tutee002', 'Science', 'Secondary 1', 'Express', 'C', 'GROUP', 'REGULAR'],
    ['te003', 'tutee003', 'English', 'Secondary 2', 'Express', 'B', 'ONE_TO_ONE', 'REGULAR'],
    ['te004', 'tutee004', 'Mathematics', 'Secondary 1', 'Normal Academic', 'C', 'GROUP', 'REGULAR'],
    ['te005', 'tutee005', 'Chinese', 'Secondary 2', 'Express', 'B', 'ONE_TO_ONE', 'ADHOC'],
    ['te006', 'tutee006', 'Physics', 'Secondary 3', 'Express', 'A', 'ONE_TO_ONE', 'REGULAR'],
    ['te007', 'tutee007', 'Chemistry', 'Secondary 3', 'Express', 'B', 'ONE_TO_ONE', 'REGULAR'],
    ['te008', 'tutee008', 'Mathematics', 'Secondary 3', 'Express', 'C', 'GROUP', 'ADHOC'],
    ['te009', 'tutee009', 'English', 'Secondary 1', 'Normal Academic', 'C', 'GROUP', 'REGULAR'],
    ['te010', 'tutee010', 'Science', 'Secondary 2', 'Express', 'B', 'ONE_TO_ONE', 'REGULAR'],
    ['te011', 'tutee011', 'History', 'Secondary 3', 'Express', 'A', 'ONE_TO_ONE', 'ADHOC'],
    ['te012', 'tutee012', 'Mathematics', 'Secondary 2', 'Normal Technical', 'C', 'GROUP', 'REGULAR'],
    ['te013', 'tutee013', 'Geography', 'Secondary 3', 'Express', 'B', 'ONE_TO_ONE', 'REGULAR'],
    ['te014', 'tutee014', 'Mathematics', 'Secondary 1', 'Express', 'A', 'ONE_TO_ONE', 'REGULAR'],
    ['te015', 'tutee015', 'English', 'Secondary 2', 'Normal Academic', 'B', 'GROUP', 'ADHOC']
  ];

  var sheet = SheetsDAO.getSheet('Tutee Profiles');
  var startRow = sheet.getLastRow() + 1;

  if (startRow === 2) {
    sheet.getRange(startRow, 1, profiles.length, profiles[0].length).setValues(profiles);
    Logger.log('  Added ' + profiles.length + ' tutee profiles');
  } else {
    Logger.log('  Tutee Profiles sheet already has data, skipping...');
  }
}

/**
 * Populate Configuration sheet
 */
function populateConfiguration() {
  Logger.log('Populating Configuration sheet...');

  var config = [
    ['app_name', 'Tuition Management System', 'Application display name', '2026-05-27', 'admin'],
    ['org_name', 'Example Tutoring Organization', 'Organization name', '2026-05-27', 'admin'],
    ['logo_url', '', 'URL to organization logo (optional)', '2026-05-27', 'admin'],
    ['primary_color', '#1976d2', 'Primary theme color (hex)', '2026-05-27', 'admin'],
    ['secondary_color', '#424242', 'Secondary theme color (hex)', '2026-05-27', 'admin'],
    ['label_tutor', 'Tutor', 'Label for tutor role', '2026-05-27', 'admin'],
    ['label_tutee', 'Tutee', 'Label for tutee role', '2026-05-27', 'admin'],
    ['label_session', 'Session', 'Label for tutoring session', '2026-05-27', 'admin'],
    ['email_sender_name', 'Tuition Management System', 'Email sender name', '2026-05-27', 'admin'],
    ['email_footer', 'This is an automated message from Tuition Management System.', 'Email footer text', '2026-05-27', 'admin'],
    ['retention_days', '365', 'Data retention period in days', '2026-05-27', 'admin'],
    ['reminder_hours_before', '24', 'Session reminder hours before', '2026-05-27', 'admin'],
    ['subjects_list', 'Mathematics,Science,English,Mother Tongue,Chinese,Physics,Chemistry,Biology,Geography,History,Literature,Social Studies,Additional Mathematics', 'Active subjects', '2026-05-27', 'admin'],
    ['class_levels_list', 'Secondary 1,Secondary 2,Secondary 3,Secondary 4,Secondary 5', 'MOE class levels', '2026-05-27', 'admin'],
    ['difficulty_levels_list', 'Express,Normal Academic,Normal Technical,O-Level,N-Level', 'MOE difficulty levels', '2026-05-27', 'admin'],
    ['matching_weight_subject', '30', 'Matching weight: Subject', '2026-05-27', 'admin'],
    ['matching_weight_class_level', '25', 'Matching weight: Class Level', '2026-05-27', 'admin'],
    ['matching_weight_difficulty', '20', 'Matching weight: Difficulty', '2026-05-27', 'admin'],
    ['matching_weight_frequency', '10', 'Matching weight: Frequency', '2026-05-27', 'admin'],
    ['matching_weight_lesson_type', '5', 'Matching weight: Lesson Type', '2026-05-27', 'admin'],
    ['matching_weight_schedule', '5', 'Matching weight: Schedule', '2026-05-27', 'admin'],
    ['matching_weight_performance', '5', 'Matching weight: Performance', '2026-05-27', 'admin']
  ];

  var sheet = SheetsDAO.getSheet('Configuration');
  var startRow = sheet.getLastRow() + 1;

  if (startRow === 2) {
    sheet.getRange(startRow, 1, config.length, config[0].length).setValues(config);
    Logger.log('  Added ' + config.length + ' configuration entries');
  } else {
    Logger.log('  Configuration sheet already has data, skipping...');
  }
}

/**
 * Populate Availability sheet with sample availability
 */
function populateAvailability() {
  Logger.log('Populating Availability sheet...');

  var availability = [
    // Tutor availability examples
    ['av001', 'tutor001', 'MON', '14:00', '16:00', true, ''],
    ['av002', 'tutor001', 'WED', '14:00', '16:00', true, ''],
    ['av003', 'tutor001', 'FRI', '15:00', '17:00', true, ''],
    ['av004', 'tutor002', 'TUE', '14:00', '17:00', true, ''],
    ['av005', 'tutor002', 'THU', '14:00', '17:00', true, ''],
    ['av006', 'tutor003', 'MON', '15:00', '18:00', true, ''],
    ['av007', 'tutor003', 'WED', '15:00', '18:00', true, ''],
    ['av008', 'tutor004', 'TUE', '14:00', '16:00', true, ''],
    ['av009', 'tutor004', 'FRI', '14:00', '16:00', true, ''],
    ['av010', 'tutor005', 'MON', '16:00', '18:00', true, ''],

    // Tutee availability examples
    ['av011', 'tutee001', 'MON', '14:00', '16:00', true, ''],
    ['av012', 'tutee001', 'WED', '14:00', '16:00', true, ''],
    ['av013', 'tutee002', 'TUE', '15:00', '17:00', true, ''],
    ['av014', 'tutee003', 'MON', '15:00', '17:00', true, ''],
    ['av015', 'tutee004', 'TUE', '14:00', '16:00', true, '']
  ];

  var sheet = SheetsDAO.getSheet('Availability');
  var startRow = sheet.getLastRow() + 1;

  if (startRow === 2) {
    sheet.getRange(startRow, 1, availability.length, availability[0].length).setValues(availability);
    Logger.log('  Added ' + availability.length + ' availability slots');
  } else {
    Logger.log('  Availability sheet already has data, skipping...');
  }
}

/**
 * Clear all test data (use with caution!)
 */
function clearAllTestData() {
  var confirmation = Browser.msgBox('Clear All Test Data?',
    'This will delete all data except headers. Are you sure?',
    Browser.Buttons.YES_NO);

  if (confirmation !== 'yes') {
    Logger.log('Clear cancelled by user');
    return;
  }

  var sheets = ['Users', 'Tutor Profiles', 'Tutee Profiles', 'Matches',
                'Availability', 'Sessions', 'Session Participants', 'VIA Hours',
                'Audit Log', 'Notification Log', 'Configuration'];

  sheets.forEach(function(sheetName) {
    var sheet = SheetsDAO.getSheet(sheetName);
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.deleteRows(2, lastRow - 1);
      Logger.log('Cleared ' + sheetName);
    }
  });

  Logger.log('All test data cleared');
}
