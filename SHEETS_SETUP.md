# Google Sheets Database Setup Guide

This guide will help you set up the Google Spreadsheet that serves as the database for the Tuition Management System.

## Step 1: Create a New Google Spreadsheet

1. Go to https://sheets.google.com
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"Tuition Management System - Database"**
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```
   Save this ID - you'll need it for the Apps Script configuration.

## Step 2: Create Required Sheets (Tabs)

Create the following sheets by clicking the **"+"** button at the bottom. Rename each sheet exactly as shown:

### 2.1 Users Sheet

**Sheet Name:** `Users`

**Columns (Row 1 - Header):**
| user_id | email | name | phone | school | role | is_active | consent_received | created_at | updated_at | deactivated_at |
|---------|-------|------|-------|--------|------|-----------|------------------|------------|------------|----------------|

**Sample Data (Row 2 - for testing):**
| user_id | email | name | phone | school | role | is_active | consent_received | created_at | updated_at | deactivated_at |
|---------|-------|------|-------|--------|------|-----------|------------------|------------|------------|----------------|
| admin001 | YOUR_EMAIL@gmail.com | Admin User | +6591234567 | N/A | ADMIN | TRUE | TRUE | 2026-05-27 | 2026-05-27 | |

**Important:** Replace `YOUR_EMAIL@gmail.com` with the actual Google account email you'll use to access the Web App.

**Sample Tutor (Row 3):**
| user_id | email | name | phone | school | role | is_active | consent_received | created_at | updated_at | deactivated_at |
|---------|-------|------|-------|--------|------|-----------|------------------|------------|------------|----------------|
| tutor001 | tutor@example.com | Senior Student | +6591234568 | Example Secondary School | TUTOR | TRUE | TRUE | 2026-05-27 | 2026-05-27 | |

**Sample Tutee (Row 4):**
| user_id | email | name | phone | school | role | is_active | consent_received | created_at | updated_at | deactivated_at |
|---------|-------|------|-------|--------|------|-----------|------------------|------------|------------|----------------|
| tutee001 | tutee@example.com | Junior Student | +6591234569 | Example Secondary School | TUTEE | TRUE | TRUE | 2026-05-27 | 2026-05-27 | |

---

### 2.2 Tutor Profiles Sheet

**Sheet Name:** `Tutor Profiles`

**Columns:**
| profile_id | user_id | subjects_can_teach | class_levels | difficulty_levels | rating | total_sessions | available_for_matching |
|------------|---------|-------------------|--------------|-------------------|--------|----------------|------------------------|

**Sample Data:**
| profile_id | user_id | subjects_can_teach | class_levels | difficulty_levels | rating | total_sessions | available_for_matching |
|------------|---------|-------------------|--------------|-------------------|--------|----------------|------------------------|
| tp001 | tutor001 | Mathematics,Science | Secondary 3,Secondary 4 | Express,O-Level | 4.5 | 0 | TRUE |

---

### 2.3 Tutee Profiles Sheet

**Sheet Name:** `Tutee Profiles`

**Columns:**
| profile_id | user_id | subjects_needed | class_level | difficulty_level | academic_performance | lesson_type_pref | lesson_freq_pref |
|------------|---------|----------------|-------------|------------------|---------------------|------------------|------------------|

**Sample Data:**
| profile_id | user_id | subjects_needed | class_level | difficulty_level | academic_performance | lesson_type_pref | lesson_freq_pref |
|------------|---------|----------------|-------------|------------------|---------------------|------------------|------------------|
| te001 | tutee001 | Mathematics | Secondary 2 | Express | B | ONE_TO_ONE | REGULAR |

---

### 2.4 Matches Sheet

**Sheet Name:** `Matches`

**Columns:**
| match_id | tutor_user_id | tutee_user_id | subject | match_score | status | lesson_type | lesson_frequency | rejection_reason | approved_by | created_at | updated_at |
|----------|---------------|---------------|---------|-------------|--------|-------------|------------------|------------------|-------------|------------|------------|

*Leave empty for now - will be populated by the matching algorithm*

---

### 2.5 Availability Sheet

**Sheet Name:** `Availability`

**Columns:**
| slot_id | user_id | day_of_week | start_time | end_time | is_recurring | specific_date |
|---------|---------|-------------|------------|----------|--------------|---------------|

*Leave empty for now - will be populated by users*

---

### 2.6 Sessions Sheet

**Sheet Name:** `Sessions`

**Columns:**
| session_id | match_id | scheduled_date | start_time | end_time | duration_minutes | google_meet_link | calendar_event_id | status | evidence_file_url | evidence_submitted_at | verified_by | verified_at | created_at |
|------------|----------|----------------|------------|----------|------------------|------------------|-------------------|--------|-------------------|----------------------|-------------|-------------|------------|

*Leave empty for now*

---

### 2.7 Session Participants Sheet

**Sheet Name:** `Session Participants`

**Columns:**
| participant_id | session_id | user_id | role |
|----------------|------------|---------|------|

*Leave empty for now*

---

### 2.8 VIA Hours Sheet

**Sheet Name:** `VIA Hours`

**Columns:**
| via_id | tutor_user_id | session_id | hours | type | adjustment_reason | adjusted_by | created_at |
|--------|---------------|------------|-------|------|-------------------|-------------|------------|

*Leave empty for now*

---

### 2.9 Audit Log Sheet

**Sheet Name:** `Audit Log`

**Columns:**
| log_id | timestamp | user_email | action | entity_type | entity_id | details |
|--------|-----------|------------|--------|-------------|-----------|---------|

*Leave empty for now*

---

### 2.10 Notification Log Sheet

**Sheet Name:** `Notification Log`

**Columns:**
| notif_id | timestamp | recipient_email | type | subject | status | error_message |
|----------|-----------|-----------------|------|---------|--------|---------------|

*Leave empty for now*

---

### 2.11 Configuration Sheet

**Sheet Name:** `Configuration`

**Columns:**
| config_key | config_value | description | updated_at | updated_by |
|------------|--------------|-------------|------------|------------|

**Initial Configuration Data:**
| config_key | config_value | description | updated_at | updated_by |
|------------|--------------|-------------|------------|------------|
| app_name | Tuition Management System | Application display name | 2026-05-27 | admin |
| org_name | Example Tutoring Organization | Organization name | 2026-05-27 | admin |
| logo_url | | URL to organization logo (optional) | 2026-05-27 | admin |
| primary_color | #1976d2 | Primary theme color (hex) | 2026-05-27 | admin |
| secondary_color | #424242 | Secondary theme color (hex) | 2026-05-27 | admin |
| label_tutor | Tutor | Label for tutor role | 2026-05-27 | admin |
| label_tutee | Tutee | Label for tutee role | 2026-05-27 | admin |
| label_session | Session | Label for tutoring session | 2026-05-27 | admin |
| email_sender_name | Tuition Management System | Email sender name | 2026-05-27 | admin |
| email_footer | This is an automated message from Tuition Management System. | Email footer text | 2026-05-27 | admin |
| retention_days | 365 | Data retention period in days | 2026-05-27 | admin |
| reminder_hours_before | 24 | Session reminder hours before | 2026-05-27 | admin |
| subjects_list | Mathematics,Science,English,Mother Tongue,Geography,History,Literature | Active subjects | 2026-05-27 | admin |
| class_levels_list | Secondary 1,Secondary 2,Secondary 3,Secondary 4,Secondary 5 | MOE class levels | 2026-05-27 | admin |
| matching_weight_subject | 30 | Matching weight: Subject | 2026-05-27 | admin |
| matching_weight_class_level | 25 | Matching weight: Class Level | 2026-05-27 | admin |
| matching_weight_difficulty | 20 | Matching weight: Difficulty | 2026-05-27 | admin |
| matching_weight_frequency | 10 | Matching weight: Frequency | 2026-05-27 | admin |
| matching_weight_lesson_type | 5 | Matching weight: Lesson Type | 2026-05-27 | admin |
| matching_weight_schedule | 5 | Matching weight: Schedule | 2026-05-27 | admin |
| matching_weight_performance | 5 | Matching weight: Performance | 2026-05-27 | admin |

---

## Step 3: Set Up Sheet Permissions

1. Click **Share** button (top right)
2. Under "General access", select **"Restricted"**
3. Add your admin email with **"Editor"** permission
4. Only admin accounts should have direct access to the spreadsheet
5. Regular users (tutors, tutees) will access data through the Web App only

---

## Step 4: Protect the Audit Log Sheet

To prevent manual edits to the audit log:

1. Right-click the **"Audit Log"** sheet tab
2. Select **"Protect sheet"**
3. Under "Set permissions", choose **"Only you"** (or specific admin accounts)
4. Check **"Except certain cells"** and leave it blank
5. Click **"Set permissions"**

This makes the Audit Log append-only via Apps Script.

---

## Step 5: Note Your Spreadsheet ID

Before proceeding to Apps Script setup, make sure you have:

- ✅ Spreadsheet ID copied from the URL
- ✅ All 11 sheets created with correct names
- ✅ Sample data added to Users, Tutor Profiles, and Tutee Profiles
- ✅ Configuration sheet populated with initial values
- ✅ Your admin email added to the Users sheet with role = ADMIN

---

## Next Steps

Once the spreadsheet is set up, proceed to the Apps Script deployment guide (DEPLOYMENT.md).

## Quick Checklist

- [ ] Spreadsheet created and named
- [ ] Spreadsheet ID copied
- [ ] All 11 sheets created with exact names
- [ ] Users sheet has your admin email with role=ADMIN
- [ ] Sample tutor and tutee added for testing
- [ ] Configuration sheet populated
- [ ] Audit Log sheet protected
- [ ] Sheet permissions set to Restricted
