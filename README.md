# Student Scholarship Management System - Frontend

A modern, responsive web frontend for managing student scholarship applications.

# Team members

Ranjith Kumar V [PES2UG23AM082]
Poojary Sairaj Shankar[PES2UG23AM073]


## Features

### Student Portal
- **Dashboard**: View application statistics and recent applications
- **Apply for Scholarship**: Submit new scholarship applications
- **My Applications**: Track all submitted applications with status filters

### Admin Portal
- **Dashboard**: Overview of all applications and statistics
- **Manage Applications**: Review, approve, or reject applications
- **Statistics**: Comprehensive reports and analytics

## File Structure

```
├── index.html                  # Home page
├── student-login.html          # Student login page
├── student-dashboard.html      # Student dashboard
├── student-apply.html          # Apply for scholarships
├── student-applications.html   # View student applications
├── admin-login.html            # Admin login page
├── admin-dashboard.html        # Admin dashboard
├── admin-applications.html     # Manage all applications
├── admin-statistics.html       # Statistics and reports
├── styles.css                  # Main stylesheet
├── script.js                   # JavaScript functionality
└── README.md                   # This file
```

## How to Use

1. **Open the Application**
   - Simply open `index.html` in a web browser
   - No server setup required for basic functionality

2. **Student Access**
   - Click "Student Portal" or navigate to `student-login.html`
   - Use Student IDs: S001, S002, S003, etc. (or click "Continue as Guest")
   - View dashboard, apply for scholarships, and track applications

3. **Admin Access**
   - Click "Admin Portal" or navigate to `admin-login.html`
   - Use Admin IDs: A01, A02, A03, etc. (or click "Continue as Guest")
   - Manage applications, view statistics, and approve/reject applications

## Sample Data

The frontend includes mock data based on your database schema:

- **10 Students** (S001-S010)
- **8 Scholarships** (SC01-SC08)
- **5 Admins** (A01-A05)
- **12 Sample Applications**

## Features Implemented

 Responsive design for all screen sizes
 Modern UI with gradient backgrounds and smooth animations
 Student login and dashboard
 Application submission form
 Application status tracking
 Admin dashboard with statistics
 Application management (approve/reject)
 Filtering and search capabilities
 Status badges and visual indicators
 Mock data integration matching your SQL schema

## Integration with Backend

To connect this frontend to your backend API:

1. Replace mock data in `script.js` with actual API calls
2. Update the `mockData` object to fetch from your backend
3. Modify form submission handlers to POST to your API endpoints
4. Update status change functions to call your backend procedures

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Edge
- Safari

## Notes

- Currently uses mock data stored in JavaScript
- All data is stored in browser localStorage for session management
- No backend connection required for demonstration
- Ready for backend API integration


