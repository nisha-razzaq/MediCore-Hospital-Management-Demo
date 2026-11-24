# MediCore – Hospital Management System

A frontend-only hospital operations prototype built with HTML, CSS and vanilla JavaScript. Records are stored in the browser with `localStorage`; authentication is simulated and no real patient information should be entered.

## Run locally

Open `index.html` in a browser, or serve this directory with any static web server.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Administrator | `admin@medicore.com` | `admin123` |
| Doctor | `doctor@medicore.com` | `doctor123` |
| Patient | `patient@medicore.com` | `patient123` |
| Staff | `staff@medicore.com` | `staff123` |

Select the matching role on the sign-in form. Use **Log out** to end the demo session. **Reset demo data** by clearing this site's local storage and refreshing.

## Prototype notes

- Role-specific navigation limits the modules each demo role can access.
- The administrator workspace includes all 17 project entities.
- Create, edit, delete, search and status filtering are demonstrated with linked sample records.
- Admissions update room availability, and completed payments update bill balances.
- `app.js` keeps entity definitions and sample data centralized for later API/database integration.

This prototype does not provide production authentication, authorization, server storage, or clinical safeguards.
