# Find Your Job

**Find Your Job** is a dynamic and fully-featured job portal application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It is styled with **Tailwind CSS** and utilizes **ShadCN-UI** for modern UI components. This platform is designed for **job seekers** and **job recruiters**, providing a seamless experience for job searching, application management, and recruitment processes. It includes an **admin panel** for recruiters to manage job postings and applicants effectively.  

This version includes a **theme toggle feature** available on all pages for both job seekers and recruiters, allowing users to switch between **light** and **dark** modes.

## Deployment Link

[Find Your Job](https://findyourjobb.netlify.app)

---

## Features

### Job Seeker Features
- **User Authentication**:
  - Register as a job seeker.
  - Login with secure credentials.
  - Reset or change password after verifying the current password.
  - Delete account permanently with password confirmation.

- **Job Search & Management**:
  - Search for jobs by title, description, city, or company name.
  - Apply filters to refine job search based on preferences.
  - Bookmark or save jobs for later review.
  - View detailed job descriptions.
  - Apply for jobs and view applied jobs in the profile section.

- **Profile Management**:
  - Update profile details, profile photo, and resume.
  - Manage job applications and bookmarks.

- **Theme Toggle**:
  - Switch between light and dark themes on all pages.
  - Default theme follows the system preference.
  - Persisted theme choice using `localStorage`.

---

### Job Recruiter Features (Admin Panel)
- **User Authentication**:
  - Register as a job recruiter.
  - Login with secure credentials.
  - Reset or change password after verifying the current password.
  - Delete account permanently with password confirmation.

- **Company & Job Management**:
  - Register a company.
  - Edit or delete company details as needed.
  - Post jobs for registered companies with detailed descriptions.
  - Edit or delete job postings as needed.

- **Applicant Management**:
  - View all applicants for a specific job.
  - Access applicants' resumes and profile details.
  - Update application status from "Pending" (default) to "Accepted" or "Rejected."

- **Profile Management**:
  - Update recruiter profile information, profile photo, and company details or company logo. 
  - Manage registered companies and job postings.

- **Theme Toggle**:
  - Switch between light and dark themes on all admin pages.
  - Default theme follows the system preference.
  - Persisted theme choice using `localStorage`.

---

## Tech Stack

### Frontend
- **React.js**: Frontend library for building a dynamic and interactive UI.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ShadCN-UI**: Customizable and modern UI components for React and Tailwind.
- **React Router**: Handles navigation and routing.
- **Redux**: State management for user sessions and app-wide data.
- **Axios**: Handles API requests.
- **Sonner**: Toast notifications for user feedback.
- **Theme Toggle**: Custom light/dark theme switcher using Tailwind dark mode and React state.

### Backend
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Token)**: Secure authentication for users and recruiters.
- **Cloudinary**: Image and file (resume, logo, etc) storage for user profiles and job postings.
- **Multer**: Middleware for handling file uploads (e.g., profile photos, resumes).

### Deployment
- **Frontend**: Hosted on Netlify.
- **Backend**: Hosted on Render with MongoDB Atlas for database management.

---

## Connect me

- If you're interested in collaborating or have any questions, feel free to reach out to me at my <a href='mailto:praveen96650@gmail.com'>Email</a>.
- You can also connect with me on <a href='https://www.linkedin.com/in/praveen96650'>Linkedin</a>.
