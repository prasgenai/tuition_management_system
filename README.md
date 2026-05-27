# Tuition Management System

A white-label, Google Workspace-native application for managing peer tutoring operations. Built entirely on Google Apps Script, Google Sheets, Google Forms, and other Google services, the system automates tutor-tutee matching, session scheduling, and VIA (Values in Action) hours tracking -- replacing manual spreadsheet-based processes with zero infrastructure cost.

> **White-Label Ready**: This application is designed to be branded and customized for different tutoring organizations. The application name, logo, color scheme, and organization-specific terminology can be configured without code changes via the Configuration sheet.

## Project Overview

| Attribute | Detail |
|---|---|
| **Domain** | Education / Peer Tutoring |
| **Country** | Singapore |
| **Users** | Secondary school students (ages 12-18) |
| **Model** | Peer tutoring (older students tutor younger ones) |
| **Lesson Delivery** | 100% online via Google Meet |
| **Scale** | 100 users at launch, 10% annual growth |
| **Cost** | $0 per month (entirely free Google services) |
| **Maintenance** | Self-running, no technical staff required |

## Key Features

- **Automated Matching** -- Weighted scoring algorithm suggests tutor-tutee matches based on subject, class level, MOE difficulty level, lesson type, and schedule overlap
- **Session Management** -- Schedule sessions with auto-generated Google Meet links via Google Calendar
- **VIA Hours Tracking** -- Automatically tracks and calculates community service hours for peer tutors
- **Admin Dashboard** -- Web-based portal for managing users, approving matches, verifying sessions, and viewing reports
- **Student Portals** -- Separate tutor and tutee portals showing schedules, matches, and VIA hours
- **Bulk Operations** -- Google Sheets native CSV import for student onboarding
- **Evidence Verification** -- Tutors submit session evidence via Google Form; admin verifies in Web App
- **Audit Trail** -- Immutable logging of all system actions in a protected Google Sheet
- **Email Notifications** -- Session reminders, match assignments, and VIA milestones via Gmail
- **PDPA Compliant** -- Designed for Singapore Personal Data Protection Act compliance with data retention automation

## User Roles

| Role | Description |
|---|---|
| **Admin** | Organization staff who manage users, approve matches, verify sessions, and generate reports |
| **Tutor** | Peer students who set availability, conduct sessions, submit evidence, and track VIA hours |
| **Tutee** | Students who set preferences, view assigned tutors, and join tutoring sessions |

## Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Backend | Google Apps Script | Server-side business logic, matching algorithm |
| Frontend | Apps Script HTML Service | Web App with role-based portals |
| Database | Google Sheets | All data storage (users, matches, sessions, config) |
| Authentication | Google Account | Native sign-in, no additional auth needed |
| File Storage | Google Drive | Session evidence screenshots (15 GB free) |
| Email | Gmail (via GmailApp) | Notifications and reminders |
| Meeting Links | Google Calendar + Meet | Auto-generated Meet links for sessions |
| Data Collection | Google Forms | Registration, availability, evidence submission |
| Cron Jobs | Apps Script Triggers | Session reminders, data retention automation |
| Reporting (Phase 3) | Google Looker Studio | Advanced dashboards connected to Sheets |
| Version Control | clasp CLI + Git | Local development and GitHub sync |

## Architecture

```
Google Forms (data input) --> Google Sheets (database)
                                    |
                              Apps Script (logic)
                             /      |       \
                       Gmail    Calendar    Drive
                   (notify)  (Meet links)  (files)
                                    |
                           Apps Script Web App
                          /        |         \
                   Admin Portal  Tutor Portal  Tutee Portal
```

## Documentation

- [Software Design Document](./SOFTWARE_DESIGN_DOCUMENT.md) -- Complete architecture, requirements, data design, matching algorithm, security, PDPA compliance, and phased development plan

## Apps Script Project Structure

```
tuition_management_system/
  README.md                      -- This file
  SOFTWARE_DESIGN_DOCUMENT.md    -- Complete design documentation
  src/                           -- Apps Script source (managed via clasp)
    appsscript.json              -- Project manifest
    Code.gs                      -- Entry points (doGet, doPost)
    AuthHelper.gs                -- Role-based access control
    UserManager.gs               -- User CRUD operations
    MatchingEngine.gs            -- Weighted matching algorithm
    ScheduleManager.gs           -- Availability and scheduling
    SessionManager.gs            -- Session lifecycle management
    VIAHoursManager.gs           -- VIA hours tracking
    NotificationManager.gs       -- Email notifications
    ReportManager.gs             -- Dashboard metrics
    AuditManager.gs              -- Immutable audit logging
    ConfigManager.gs             -- Configuration management
    SheetsDAO.gs                 -- Google Sheets data access layer
    DriveDAO.gs                  -- Google Drive file management
    CalendarIntegration.gs       -- Google Calendar + Meet
    GmailIntegration.gs          -- Email sending utilities
    Utils.gs                     -- Shared utilities
    AdminDashboard.html          -- Admin portal UI
    TutorPortal.html             -- Tutor portal UI
    TuteePortal.html             -- Tutee portal UI
    SharedStyles.html            -- Shared CSS
    SharedScripts.html           -- Shared client-side JavaScript
    AccessDenied.html            -- Unauthorized access page
```

## Development Phases

1. **Phase 1: MVP** (Weeks 1-3) -- Spreadsheet setup, registration form, basic matching, session scheduling with Meet links
2. **Phase 2: Core Features** (Weeks 4-6) -- Full matching algorithm, availability, evidence/verification, VIA hours, reporting, audit trail
3. **Phase 3: Hardening** (Weeks 7-9) -- Notifications, data retention, UI polish, PDPA compliance, documentation
4. **Phase 4: Launch** (Weeks 10-11) -- Deployment, admin training, user onboarding, stabilization
5. **Phase 5: Continuous Improvement** (Ongoing) -- Enhanced matching, Looker Studio dashboards, feature refinements

**Total time to launch: 11 weeks**

## Getting Started

### Prerequisites

- A Google account (free Gmail account or Google Workspace)
- [clasp](https://github.com/google/clasp) CLI installed (optional, for local development with Git)

### Quick Setup

1. Create a new Google Spreadsheet -- this will be the database
2. Create sheets (tabs) as defined in the Software Design Document (Users, Tutor Profiles, Tutee Profiles, Matches, etc.)
3. Open Apps Script editor: Extensions > Apps Script
4. Create the .gs and .html files as defined in the project structure
5. Deploy as Web App: Deploy > New Deployment > Web App
6. Share the Web App URL with users

### Local Development with clasp (Optional)

```bash
# Install clasp globally
npm install -g @google/clasp

# Login to Google account
clasp login

# Clone an existing Apps Script project
clasp clone <script-id>

# Push local changes to Apps Script
clasp push

# Pull remote changes
clasp pull
```

## Cost

| Component | Monthly Cost |
|---|---|
| Google Apps Script | $0 |
| Google Sheets | $0 |
| Google Forms | $0 |
| Google Drive (15 GB) | $0 |
| Gmail (100 emails/day) | $0 |
| Google Calendar + Meet | $0 |
| **Total** | **$0** |

## White-Labeling

This application is designed as a white-label solution that can be branded for different organizations. The following elements are configurable without code changes:

| Element | Configuration Method |
|---|---|
| Application name | Configuration sheet (`app_name` key) |
| Organization name | Configuration sheet (`org_name` key) |
| Logo URL | Configuration sheet (`logo_url` key, hosted on Google Drive) |
| Primary color scheme | Configuration sheet (`primary_color`, `secondary_color` keys) |
| Email templates | Configuration sheet (subject line prefixes, footer text) |
| Terminology | Configuration sheet (e.g., "tutor" vs "mentor", "tutee" vs "learner") |

To deploy for a new organization:
1. Make a copy of the master Google Spreadsheet
2. Update branding values in the Configuration sheet
3. Deploy a new Apps Script Web App from the copied spreadsheet
4. Share the Web App URL with the new organization's users

## License

> License to be determined.
