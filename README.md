# Doctor Tracker Frontend

A modern administrative frontend for **Doctor Tracker**, a secure web application for managing doctors and their corresponding patients.

The frontend is built as a separate **Next.js** application using **JavaScript** and **Tailwind CSS**. It communicates with the standalone Node.js/Express backend through REST APIs.

## Tech Stack

- Next.js
- React
- JavaScript
- App Router
- Tailwind CSS
- ESLint
- REST API
- JWT authentication with HTTP-only cookies

## Features

### Authentication

- Secure login
- JWT-based authentication
- HTTP-only cookie authentication
- Protected dashboard routes
- Authenticated users are redirected away from `/login`
- Logout

### Dashboard

The admin dashboard is designed to provide:

- Total doctors
- Total patients
- Patients per doctor
- Date-based patient statistics
- Visual data representation

### Doctor Management

- Create doctor
- View doctors
- Edit doctor
- Delete doctor
- Search doctors
- Filtering
- Pagination
- View a specific doctor's details
- View patients assigned to a doctor

### Doctor-Specific Patient Management

Patients are added from the specific doctor's page.

```text
Doctors
   ↓
View Doctor
   ↓
Doctor Details
   ↓
Patients
   ↓
+ Add Patient
```

The doctor is automatically associated with the patient through the doctor-specific API endpoint.

Patients can also be removed from a doctor's patient list without permanently deleting the patient record.

### Patient Management

The Patients page provides:

- Patient listing
- Search
- Condition filtering
- Doctor filtering
- Pagination
- Doctor information through populated relationships
- Patient editing/deletion where applicable

---

# Project Structure

```text
doctor-tracker-frontend/
├── app/
│   ├── login/
│   │   └── page.js
│   │
│   ├── (dashboard)/
│   │   ├── layout.js
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.js
│   │   │
│   │   ├── doctors/
│   │   │   ├── page.js
│   │   │   └── [id]/
│   │   │       └── page.js
│   │   │
│   │   └── patients/
│   │       └── page.js
│   │
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── doctors/
│   ├── patients/
│   ├── layout/
│   └── ui/
│
├── lib/
│   └── api.js
│
├── public/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# Prerequisites

Make sure the following are installed:

- Node.js 24+
- npm
- Doctor Tracker backend running locally or remotely

The backend must be available before testing authenticated API functionality.

---

# Installation

### 1. Clone the repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
cd doctor-tracker-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Create `.env.example` for the repository:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Do not commit `.env.local` if it contains environment-specific or sensitive configuration.

---

# Running the Application

### Development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
```

### Production server

```bash
npm start
```

---

# Application Routes

| Route | Purpose |
|---|---|
| `/login` | Admin login |
| `/dashboard` | Admin dashboard |
| `/doctors` | Doctor management |
| `/doctors/:id` | Specific doctor and assigned patients |
| `/patients` | Patient search, filtering and pagination |

---

# Authentication Flow

Authentication is handled by the backend.

```text
Login Page
    │
    │ POST /api/auth/login
    ▼
Backend
    │
    │ JWT
    ▼
HTTP-only Cookie
    │
    ▼
Browser
```

The frontend does not store the JWT in `localStorage`.

For authenticated API requests, the frontend sends cookies using:

```js
credentials: "include"
```

## Route Protection

Protected application routes are placed under:

```text
app/(dashboard)/
```

The dashboard layout checks the current authentication state through the backend.

### Not authenticated

```text
/dashboard
    ↓
GET /api/auth/me
    ↓
Unauthorized
    ↓
/login
```

### Already authenticated

```text
/login
    ↓
GET /api/auth/me
    ↓
Authenticated
    ↓
/dashboard
```

---

# API Client

API communication is centralized in:

```text
lib/api.js
```

Instead of writing independent `fetch()` calls throughout the application, pages use shared methods such as:

```js
api.login()
api.logout()
api.getMe()

api.getDoctors()
api.getDoctor()
api.createDoctor()
api.updateDoctor()
api.deleteDoctor()

api.getDoctorPatients()
api.addDoctorPatient()
api.deleteDoctorPatient()

api.getPatients()
api.getPatient()
api.updatePatient()
api.deletePatient()
```

This keeps API communication consistent and makes the frontend easier to maintain.

---

# Doctor Workflow

The Doctor page provides doctor management.

```text
/doctors
```

A doctor can be:

```text
Create
View
Edit
Delete
```

Each doctor also has a dedicated page:

```text
/doctors/:id
```

The specific doctor page contains:

```text
Doctor Information
       +
Patient List
       +
Add Patient
       +
Remove Patient
```

When a patient is added from a doctor's page, the doctor is determined from the URL:

```text
POST /api/doctors/:doctorId/patients
```

The user does not need to select the doctor again.

---

# Patient Workflow

The main patient page is focused on browsing and finding patients efficiently.

```text
/patients
```

Available functionality includes:

```text
Search
Condition Filter
Doctor Filter
Pagination
```

Patient creation for the main assignment workflow happens from:

```text
/doctors/:id
```

This keeps patient creation contextual to the doctor-patient relationship.

---

# Search, Filtering and Pagination

The frontend sends search and filter parameters to the backend rather than loading the entire dataset and filtering it in the browser.

Example:

```text
/api/patients?page=1&limit=10&search=arif&condition=hypertension
```

The backend performs the actual database query and returns the required page of results.

This reduces unnecessary data transfer and client-side processing.

---

# UI/UX

The application is designed around the assignment's frontend requirements:

- Modern administrative interface
- Clean layout
- Clear visual hierarchy
- Consistent spacing
- Responsive design
- Smooth navigation
- Loading states
- Error states
- Empty states
- Reusable components
- Clear navigation between Dashboard, Doctors and Patients

---

# Loading States

The frontend uses loading UI instead of leaving pages blank while API requests are running.

Examples include:

- Authentication loading
- Page loading
- Table loading
- Form submission loading
- Empty states

Reusable loading/skeleton components are placed under:

```text
components/ui/
```

---

# Component Architecture

Reusable UI is separated from page-specific logic.

Example:

```text
components/
├── layout/
│   ├── AppShell.js
│   ├── Sidebar.js
│   └── Header.js
│
├── doctors/
│   ├── DoctorForm.js
│   └── DoctorTable.js
│
├── patients/
│   └── PatientForm.js
│
└── ui/
    ├── Button.js
    ├── Input.js
    ├── Modal.js
    ├── Pagination.js
    └── PageSkeleton.js
```

The exact component list can evolve as the UI is finalized.

---

# Technical Decisions

## 1. Next.js App Router

The application uses the Next.js App Router because it provides a clear route-based structure for:

- Login
- Dashboard
- Doctors
- Doctor details
- Patients

The route group:

```text
app/(dashboard)/
```

allows the authenticated application pages to share a common dashboard layout without changing their public URLs.

For example:

```text
app/(dashboard)/doctors/page.js
```

still produces:

```text
/doctors
```

---

## 2. HTTP-only JWT Authentication

The frontend does not store authentication tokens in `localStorage`.

Instead, the backend issues a JWT through an HTTP-only cookie.

Authenticated requests use:

```js
credentials: "include"
```

This keeps the authentication token inaccessible to normal client-side JavaScript and lets the backend remain responsible for authentication validation.

---

# Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

# NPM Scripts

Typical scripts:

```bash
npm run dev
npm run build
npm start
npm run lint
```

---

# Screenshots

Add final screenshots before submission.

## Desktop

```text
screenshots/
├── dashboard-desktop.png
├── doctors-desktop.png
├── doctor-details-desktop.png
└── patients-desktop.png
```

## Mobile

```text
screenshots/
├── dashboard-mobile.png
├── doctors-mobile.png
├── doctor-details-mobile.png
└── patients-mobile.png
```

Screenshots should demonstrate both desktop and mobile responsive layouts.

---

# Backend

This frontend communicates with the separate Doctor Tracker backend.

Replace this placeholder with the actual backend repository URL:

```text
<YOUR_BACKEND_REPOSITORY_URL>
```

The backend provides:

- Authentication
- Doctor APIs
- Patient APIs
- Doctor-specific patient APIs
- Dashboard statistics

---

# Deployment

The frontend can be deployed as a Next.js application.

Before deployment, configure:

```env
NEXT_PUBLIC_API_URL=<YOUR_PRODUCTION_BACKEND_URL>/api
```

The backend must also allow the deployed frontend origin through its CORS configuration.

---

# Assignment Alignment

The frontend is designed to support the assignment requirements for:

- Secure login
- Protected routes
- Doctor management
- Doctor-specific patient management
- Patient search
- Filtering
- Pagination
- Dashboard statistics
- Responsive UI
- Reusable components
- REST API communication
- Performance-conscious data fetching
- Clean navigation between Dashboard, Doctors and Patients

---

# License

This project was developed as a technical assignment.
