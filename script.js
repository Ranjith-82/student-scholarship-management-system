// Mock data based on SQL schema
const mockData = {
    students: [
        { student_id: 'S001', name: 'Ranjith Kumar', dept_id: 'D01', email: 'ranjith@pes.edu' },
        { student_id: 'S002', name: 'Priya Mehta', dept_id: 'D02', email: 'priya.mehta@pes.edu' },
        { student_id: 'S003', name: 'Arjun Nair', dept_id: 'D01', email: 'arjun.nair@pes.edu' },
        { student_id: 'S004', name: 'Sneha Patel', dept_id: 'D03', email: 'sneha.patel@pes.edu' },
        { student_id: 'S005', name: 'Rahul Verma', dept_id: 'D02', email: 'rahul.verma@pes.edu' },
        { student_id: 'S006', name: 'Ananya Singh', dept_id: 'D04', email: 'ananya.singh@pes.edu' },
        { student_id: 'S007', name: 'Karthik Raj', dept_id: 'D01', email: 'karthik.raj@pes.edu' },
        { student_id: 'S008', name: 'Divya Krishnan', dept_id: 'D05', email: 'divya.k@pes.edu' },
        { student_id: 'S009', name: 'Aditya Sharma', dept_id: 'D03', email: 'aditya.sharma@pes.edu' },
        { student_id: 'S010', name: 'Meera Iyer', dept_id: 'D02', email: 'meera.iyer@pes.edu' }
    ],
    scholarships: [
        { scholarship_id: 'SC01', name: 'Merit Scholarship', type: 'Merit-Based', amount: 10000, eligibility: 'CGPA > 8.0' },
        { scholarship_id: 'SC02', name: 'Sports Scholarship', type: 'Sports-Based', amount: 15000, eligibility: 'State/National Level Sports' },
        { scholarship_id: 'SC03', name: 'Need-Based Scholarship', type: 'Financial Aid', amount: 20000, eligibility: 'Family Income < 3 Lakhs' },
        { scholarship_id: 'SC04', name: 'Research Scholarship', type: 'Research-Based', amount: 25000, eligibility: 'Published Research Paper' },
        { scholarship_id: 'SC05', name: 'Minority Scholarship', type: 'Minority-Based', amount: 12000, eligibility: 'Minority Community' },
        { scholarship_id: 'SC06', name: 'Girl Child Scholarship', type: 'Gender-Based', amount: 18000, eligibility: 'Female Students' },
        { scholarship_id: 'SC07', name: 'SC/ST Scholarship', type: 'Category-Based', amount: 22000, eligibility: 'SC/ST Category' },
        { scholarship_id: 'SC08', name: 'Excellence Award', type: 'Merit-Based', amount: 30000, eligibility: 'CGPA > 9.0' }
    ],
    applications: [
        { application_id: 'APP01', student_id: 'S001', scholarship_id: 'SC01', admin_id: 'A01', application_date: '2025-10-11', status: 'Pending' },
        { application_id: 'APP02', student_id: 'S002', scholarship_id: 'SC06', admin_id: 'A02', application_date: '2025-10-12', status: 'Approved' },
        { application_id: 'APP03', student_id: 'S003', scholarship_id: 'SC01', admin_id: 'A01', application_date: '2025-10-13', status: 'Pending' },
        { application_id: 'APP04', student_id: 'S004', scholarship_id: 'SC03', admin_id: 'A03', application_date: '2025-10-14', status: 'Approved' },
        { application_id: 'APP05', student_id: 'S005', scholarship_id: 'SC04', admin_id: 'A02', application_date: '2025-10-15', status: 'Rejected' },
        { application_id: 'APP06', student_id: 'S006', scholarship_id: 'SC06', admin_id: 'A04', application_date: '2025-10-16', status: 'Approved' },
        { application_id: 'APP07', student_id: 'S007', scholarship_id: 'SC02', admin_id: 'A01', application_date: '2025-10-17', status: 'Pending' },
        { application_id: 'APP08', student_id: 'S008', scholarship_id: 'SC03', admin_id: 'A05', application_date: '2025-10-18', status: 'Approved' },
        { application_id: 'APP09', student_id: 'S009', scholarship_id: 'SC01', admin_id: 'A03', application_date: '2025-10-19', status: 'Pending' },
        { application_id: 'APP10', student_id: 'S010', scholarship_id: 'SC08', admin_id: 'A02', application_date: '2025-10-20', status: 'Approved' },
        { application_id: 'APP11', student_id: 'S001', scholarship_id: 'SC02', admin_id: 'A04', application_date: '2025-10-21', status: 'Rejected' },
        { application_id: 'APP12', student_id: 'S002', scholarship_id: 'SC01', admin_id: 'A01', application_date: '2025-10-22', status: 'Approved' }
    ],
    admins: [
        { admin_id: 'A01', name: 'Admin1', role: 'Verifier', email: 'admin1@pes.edu' },
        { admin_id: 'A02', name: 'Rajesh Kumar', role: 'Approver', email: 'rajesh.kumar@pes.edu' },
        { admin_id: 'A03', name: 'Lakshmi Devi', role: 'Verifier', email: 'lakshmi.devi@pes.edu' },
        { admin_id: 'A04', name: 'Suresh Babu', role: 'Manager', email: 'suresh.babu@pes.edu' },
        { admin_id: 'A05', name: 'Kavita Rao', role: 'Verifier', email: 'kavita.rao@pes.edu' }
    ],
    departments: [
        { dept_id: 'D01', dept_name: 'AIML', hod_name: 'Dr. Ramesh' },
        { dept_id: 'D02', dept_name: 'Computer Science', hod_name: 'Dr. Priya Sharma' },
        { dept_id: 'D03', dept_name: 'Electronics', hod_name: 'Dr. Anil Kumar' },
        { dept_id: 'D04', dept_name: 'Mechanical', hod_name: 'Dr. Vijay Singh' },
        { dept_id: 'D05', dept_name: 'Civil', hod_name: 'Dr. Sunita Reddy' }
    ]
};

// Remove duplicate applications (same student_id + scholarship_id, keep the latest one)
function removeDuplicateApplications(applications) {
    const seen = new Map();
    const unique = [];
    
    // Process in reverse to keep the latest application
    for (let i = applications.length - 1; i >= 0; i--) {
        const app = applications[i];
        const key = `${app.student_id}_${app.scholarship_id}`;
        
        // Only keep if we haven't seen this combination, or if current is more recent
        if (!seen.has(key)) {
            seen.set(key, app);
            unique.unshift(app); // Add to beginning to maintain order
        } else {
            const existing = seen.get(key);
            // Keep the one with more recent date or newer application_id
            if (app.application_date > existing.application_date || 
                (app.application_date === existing.application_date && app.application_id > existing.application_id)) {
                // Replace in unique array
                const index = unique.findIndex(u => u.application_id === existing.application_id);
                if (index >= 0) {
                    unique[index] = app;
                }
                seen.set(key, app);
            }
        }
    }
    
    return unique;
}

// Load applications from localStorage if available
function loadApplicationsFromStorage() {
    const stored = localStorage.getItem('applications');
    if (stored) {
        try {
            const storedApps = JSON.parse(stored);
            // Merge stored applications with mock data (prioritize stored)
            storedApps.forEach(storedApp => {
                const index = mockData.applications.findIndex(app => app.application_id === storedApp.application_id);
                if (index >= 0) {
                    mockData.applications[index] = storedApp;
                } else {
                    mockData.applications.push(storedApp);
                }
            });
            
            // Remove duplicates after merging
            mockData.applications = removeDuplicateApplications(mockData.applications);
            // Save cleaned data back
            localStorage.setItem('applications', JSON.stringify(mockData.applications));
        } catch (e) {
            console.error('Error loading applications from storage:', e);
        }
    } else {
        // Remove duplicates from initial mock data
        mockData.applications = removeDuplicateApplications(mockData.applications);
    }
}

// Initialize: Load from storage on page load
loadApplicationsFromStorage();

// Helper functions
function getScholarshipById(id) {
    return mockData.scholarships.find(s => s.scholarship_id === id);
}

function getStudentById(id) {
    return mockData.students.find(s => s.student_id === id);
}

function getAdminById(id) {
    return mockData.admins.find(a => a.admin_id === id);
}

function getStatusClass(status) {
    const classes = {
        'Pending': 'status-pending',
        'Approved': 'status-approved',
        'Rejected': 'status-rejected'
    };
    return classes[status] || '';
}

function showAlert(containerId, message, type = 'success') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const alertClass = type === 'success' ? 'alert-success' : type === 'error' ? 'alert-error' : 'alert-info';
    container.innerHTML = `<div class="alert ${alertClass}">${message}</div>`;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// Student Login
document.addEventListener('DOMContentLoaded', function() {
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const studentId = document.getElementById('studentId').value.toUpperCase();
            const student = getStudentById(studentId);
            
            if (student) {
                localStorage.setItem('studentId', studentId);
                window.location.href = 'student-dashboard.html';
            } else {
                alert('Invalid Student ID. Please try again.');
            }
        });
    }

    // Admin Login
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const adminId = document.getElementById('adminId').value.toUpperCase();
            const admin = getAdminById(adminId);
            
            if (admin) {
                localStorage.setItem('adminId', adminId);
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Invalid Admin ID. Please try again.');
            }
        });
    }

    // File upload preview
    const documentsInput = document.getElementById('documents');
    const fileList = document.getElementById('fileList');
    if (documentsInput && fileList) {
        documentsInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            if (files.length === 0) {
                fileList.innerHTML = '';
                return;
            }
            
            fileList.innerHTML = '<p style="font-weight: 500; margin-bottom: 0.5rem;">Selected files:</p><ul style="margin-left: 1.5rem;">';
            files.forEach((file, index) => {
                const fileSize = (file.size / 1024 / 1024).toFixed(2);
                fileList.innerHTML += `<li>${file.name} (${fileSize} MB)</li>`;
            });
            fileList.innerHTML += '</ul>';
        });
    }

    // Application Form
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const studentId = document.getElementById('studentId').value;
            const scholarshipId = document.getElementById('scholarshipId').value;
            const adminId = document.getElementById('adminId').value;
            const documentsInput = document.getElementById('documents');
            
            if (!scholarshipId || !adminId) {
                showAlert('alertContainer', 'Please fill all required fields', 'error');
                return;
            }
            
            // Check if files are uploaded
            if (!documentsInput || !documentsInput.files || documentsInput.files.length === 0) {
                showAlert('alertContainer', 'Please upload at least one document', 'error');
                return;
            }
            
            // Process uploaded files
            const files = Array.from(documentsInput.files);
            const documents = [];
            
            // Convert files to base64 for storage (in a real app, you'd upload to a server)
            const filePromises = files.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        documents.push({
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            data: e.target.result // base64 encoded
                        });
                        resolve();
                    };
                    reader.readAsDataURL(file);
                });
            });
            
            // Wait for all files to be processed
            Promise.all(filePromises).then(() => {
                // Check for duplicate application (same student + same scholarship)
                const existingApp = mockData.applications.find(app => 
                    app.student_id === studentId && 
                    app.scholarship_id === scholarshipId &&
                    (app.status === 'Pending' || app.status === 'Approved')
                );
                
                if (existingApp) {
                    showAlert('alertContainer', `You have already applied for this scholarship! Application ID: ${existingApp.application_id} (Status: ${existingApp.status})`, 'error');
                    return;
                }
                
                // Generate new application ID
                const lastAppId = mockData.applications.length > 0 
                    ? parseInt(mockData.applications[mockData.applications.length - 1].application_id.replace('APP', ''))
                    : 0;
                const newAppId = 'APP' + String(lastAppId + 1).padStart(2, '0');
                
                // Add new application with documents
                const newApplication = {
                    application_id: newAppId,
                    student_id: studentId,
                    scholarship_id: scholarshipId,
                    admin_id: adminId,
                    application_date: new Date().toISOString().split('T')[0],
                    status: 'Pending',
                    documents: documents
                };
                
                mockData.applications.push(newApplication);
                
                // Remove duplicates before saving
                mockData.applications = removeDuplicateApplications(mockData.applications);
                
                // Save to localStorage for persistence
                localStorage.setItem('applications', JSON.stringify(mockData.applications));
                
                showAlert('alertContainer', `Application submitted successfully with ${documents.length} document(s)! Application ID: ${newAppId}`, 'success');
                
                setTimeout(() => {
                    window.location.href = 'student-applications.html';
                }, 2000);
            });
        });
    }
});

// Load Student Profile
function loadStudentProfile(studentId) {
    const student = getStudentById(studentId);
    if (!student) return;
    
    const department = mockData.departments.find(d => d.dept_id === student.dept_id);
    
    // Update profile elements
    const profileStudentId = document.getElementById('profileStudentId');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileDepartment = document.getElementById('profileDepartment');
    const profileHOD = document.getElementById('profileHOD');
    
    if (profileStudentId) profileStudentId.textContent = student.student_id;
    if (profileName) profileName.textContent = student.name;
    if (profileEmail) profileEmail.textContent = student.email;
    if (profileDepartment) profileDepartment.textContent = department ? department.dept_name : 'N/A';
    if (profileHOD) profileHOD.textContent = department ? department.hod_name : 'N/A';
}

// Load Student Dashboard
function loadStudentDashboard(studentId) {
    // Load student profile first
    loadStudentProfile(studentId);
    
    // Remove duplicates before processing
    const studentApps = removeDuplicateApplications(mockData.applications.filter(app => app.student_id === studentId));
    const approved = studentApps.filter(app => app.status === 'Approved');
    const pending = studentApps.filter(app => app.status === 'Pending');
    
    // Calculate total amount
    let totalAmount = 0;
    approved.forEach(app => {
        const scholarship = getScholarshipById(app.scholarship_id);
        if (scholarship) totalAmount += scholarship.amount;
    });
    
    // Update stats
    document.getElementById('totalApplications').textContent = studentApps.length;
    document.getElementById('approvedCount').textContent = approved.length;
    document.getElementById('pendingCount').textContent = pending.length;
    document.getElementById('totalAmount').textContent = totalAmount.toLocaleString();
    
    // Load recent applications
    const recentApps = studentApps.slice(0, 5).reverse();
    const tbody = document.getElementById('recentApplications');
    if (tbody) {
        if (recentApps.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">No applications found</td></tr>';
        } else {
            tbody.innerHTML = recentApps.map(app => {
                const scholarship = getScholarshipById(app.scholarship_id);
                return `
                    <tr>
                        <td>${app.application_id}</td>
                        <td>${scholarship ? scholarship.name : 'N/A'}</td>
                        <td>${app.application_date}</td>
                        <td><span class="status-badge ${getStatusClass(app.status)}">${app.status}</span></td>
                        <td>₹${scholarship ? scholarship.amount.toLocaleString() : '0'}</td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// Load Student Applications
function loadStudentApplications(studentId, filterStatus = 'all') {
    // Remove duplicates first
    let studentApps = removeDuplicateApplications(mockData.applications.filter(app => app.student_id === studentId));
    
    if (filterStatus !== 'all') {
        studentApps = studentApps.filter(app => app.status === filterStatus);
    }
    
    const tbody = document.getElementById('applicationsTable');
    if (tbody) {
        if (studentApps.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No applications found</td></tr>';
        } else {
            tbody.innerHTML = studentApps.reverse().map(app => {
                const scholarship = getScholarshipById(app.scholarship_id);
                return `
                    <tr>
                        <td>${app.application_id}</td>
                        <td>${scholarship ? scholarship.name : 'N/A'}</td>
                        <td>${app.application_date}</td>
                        <td><span class="status-badge ${getStatusClass(app.status)}">${app.status}</span></td>
                        <td>₹${scholarship ? scholarship.amount.toLocaleString() : '0'}</td>
                        <td>
                            <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="viewApplicationDetails('${app.application_id}')">View</button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// Load Admin Dashboard
function loadAdminDashboard(adminId) {
    // Remove duplicates before processing
    const adminApps = removeDuplicateApplications(mockData.applications.filter(app => app.admin_id === adminId));
    const pending = adminApps.filter(app => app.status === 'Pending');
    const approved = adminApps.filter(app => app.status === 'Approved');
    const rejected = adminApps.filter(app => app.status === 'Rejected');
    
    document.getElementById('pendingApps').textContent = pending.length;
    document.getElementById('approvedApps').textContent = approved.length;
    document.getElementById('rejectedApps').textContent = rejected.length;
    document.getElementById('totalApps').textContent = adminApps.length;
    
    // Load recent applications (remove duplicates)
    const recentApps = removeDuplicateApplications(mockData.applications).slice(0, 10).reverse();
    const tbody = document.getElementById('recentApplications');
    if (tbody) {
        tbody.innerHTML = recentApps.map(app => {
            const student = getStudentById(app.student_id);
            const scholarship = getScholarshipById(app.scholarship_id);
            return `
                <tr>
                    <td>${app.application_id}</td>
                    <td>${app.student_id}</td>
                    <td>${scholarship ? scholarship.name : 'N/A'}</td>
                    <td>${app.application_date}</td>
                    <td><span class="status-badge ${getStatusClass(app.status)}">${app.status}</span></td>
                    <td>
                        <button class="btn btn-success" style="padding: 0.3rem 0.8rem; font-size: 0.8rem; margin-right: 0.3rem;" onclick="updateApplicationStatus('${app.application_id}', 'Approved')">Approve</button>
                        <button class="btn btn-danger" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;" onclick="updateApplicationStatus('${app.application_id}', 'Rejected')">Reject</button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// Load All Applications (Admin)
function loadAllApplications() {
    const statusFilter = document.getElementById('filterStatus')?.value || 'all';
    const adminFilter = document.getElementById('filterAdmin')?.value || 'all';
    
    // Remove duplicates before displaying
    let apps = removeDuplicateApplications([...mockData.applications]);
    
    if (statusFilter !== 'all') {
        apps = apps.filter(app => app.status === statusFilter);
    }
    
    if (adminFilter !== 'all') {
        apps = apps.filter(app => app.admin_id === adminFilter);
    }
    
    const tbody = document.getElementById('applicationsTable');
    if (tbody) {
        if (apps.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 2rem;">No applications found</td></tr>';
        } else {
            tbody.innerHTML = apps.reverse().map(app => {
                const student = getStudentById(app.student_id);
                const scholarship = getScholarshipById(app.scholarship_id);
                const hasDocuments = app.documents && app.documents.length > 0;
                const docCount = hasDocuments ? app.documents.length : 0;
                return `
                    <tr>
                        <td>${app.application_id}</td>
                        <td>${app.student_id}</td>
                        <td>${student ? student.name : 'N/A'}</td>
                        <td>${scholarship ? scholarship.name : 'N/A'}</td>
                        <td>₹${scholarship ? scholarship.amount.toLocaleString() : '0'}</td>
                        <td>${app.application_date}</td>
                        <td><span class="status-badge ${getStatusClass(app.status)}">${app.status}</span></td>
                        <td>
                            ${hasDocuments ? `
                                <button class="btn btn-primary" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;" onclick="viewDocuments('${app.application_id}')">
                                    📄 View (${docCount})
                                </button>
                            ` : `
                                <span style="color: #999;">No documents</span>
                            `}
                        </td>
                        <td>
                            ${app.status === 'Pending' ? `
                                <button class="btn btn-success" style="padding: 0.3rem 0.8rem; font-size: 0.8rem; margin-right: 0.3rem;" onclick="updateApplicationStatus('${app.application_id}', 'Approved')">Approve</button>
                                <button class="btn btn-danger" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;" onclick="updateApplicationStatus('${app.application_id}', 'Rejected')">Reject</button>
                            ` : `
                                <span style="color: #999;">No action</span>
                            `}
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// Update Application Status
function updateApplicationStatus(applicationId, newStatus) {
    const app = mockData.applications.find(a => a.application_id === applicationId);
    if (app) {
        app.status = newStatus;
        // Remove duplicates before saving
        mockData.applications = removeDuplicateApplications(mockData.applications);
        // Save to localStorage
        localStorage.setItem('applications', JSON.stringify(mockData.applications));
        alert(`Application ${applicationId} has been ${newStatus.toLowerCase()}`);
        loadAllApplications();
        if (document.getElementById('recentApplications')) {
            loadAdminDashboard(localStorage.getItem('adminId') || 'A01');
        }
    }
}

// Load Statistics
function loadStatistics() {
    // Remove duplicates before calculating statistics
    const uniqueApps = removeDuplicateApplications(mockData.applications);
    const totalApps = uniqueApps.length;
    const pending = uniqueApps.filter(app => app.status === 'Pending').length;
    const approved = uniqueApps.filter(app => app.status === 'Approved').length;
    const rejected = uniqueApps.filter(app => app.status === 'Rejected').length;
    
    document.getElementById('totalApplications').textContent = totalApps;
    
    // Calculate total distributed amount
    let totalDistributed = 0;
    mockData.applications.filter(app => app.status === 'Approved').forEach(app => {
        const scholarship = getScholarshipById(app.scholarship_id);
        if (scholarship) totalDistributed += scholarship.amount;
    });
    document.getElementById('totalDistributed').textContent = totalDistributed.toLocaleString();
    
    // Status statistics
    const statusTbody = document.getElementById('statusStats');
    if (statusTbody) {
        statusTbody.innerHTML = `
            <tr>
                <td>Pending</td>
                <td>${pending}</td>
                <td>${totalApps > 0 ? ((pending / totalApps) * 100).toFixed(1) : 0}%</td>
            </tr>
            <tr>
                <td>Approved</td>
                <td>${approved}</td>
                <td>${totalApps > 0 ? ((approved / totalApps) * 100).toFixed(1) : 0}%</td>
            </tr>
            <tr>
                <td>Rejected</td>
                <td>${rejected}</td>
                <td>${totalApps > 0 ? ((rejected / totalApps) * 100).toFixed(1) : 0}%</td>
            </tr>
        `;
    }
    
    // Department statistics
    const deptStats = {};
    uniqueApps.forEach(app => {
        const student = getStudentById(app.student_id);
        if (student) {
            const dept = mockData.departments.find(d => d.dept_id === student.dept_id);
            if (dept) {
                if (!deptStats[dept.dept_name]) {
                    deptStats[dept.dept_name] = { total: 0, approved: 0, pending: 0 };
                }
                deptStats[dept.dept_name].total++;
                if (app.status === 'Approved') deptStats[dept.dept_name].approved++;
                if (app.status === 'Pending') deptStats[dept.dept_name].pending++;
            }
        }
    });
    
    const deptTbody = document.getElementById('deptStats');
    if (deptTbody) {
        if (Object.keys(deptStats).length === 0) {
            deptTbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 2rem;">No data available</td></tr>';
        } else {
            deptTbody.innerHTML = Object.entries(deptStats).map(([dept, stats]) => `
                <tr>
                    <td>${dept}</td>
                    <td>${stats.total}</td>
                    <td>${stats.approved}</td>
                    <td>${stats.pending}</td>
                </tr>
            `).join('');
        }
    }
    
    // Scholarship statistics
    const scholarshipStats = {};
    uniqueApps.forEach(app => {
        const scholarship = getScholarshipById(app.scholarship_id);
        if (scholarship) {
            if (!scholarshipStats[scholarship.scholarship_id]) {
                scholarshipStats[scholarship.scholarship_id] = {
                    name: scholarship.name,
                    type: scholarship.type,
                    count: 0,
                    amount: scholarship.amount
                };
            }
            scholarshipStats[scholarship.scholarship_id].count++;
        }
    });
    
    const scholarshipTbody = document.getElementById('scholarshipStats');
    if (scholarshipTbody) {
        const sorted = Object.values(scholarshipStats).sort((a, b) => b.count - a.count);
        scholarshipTbody.innerHTML = sorted.map(s => `
            <tr>
                <td>${s.name}</td>
                <td>${s.type}</td>
                <td>${s.count}</td>
                <td>₹${s.amount.toLocaleString()}</td>
            </tr>
        `).join('');
    }
}

// View Application Details
function viewApplicationDetails(applicationId) {
    const app = mockData.applications.find(a => a.application_id === applicationId);
    if (app) {
        const student = getStudentById(app.student_id);
        const scholarship = getScholarshipById(app.scholarship_id);
        const admin = getAdminById(app.admin_id);
        
        const details = `
Application ID: ${app.application_id}
Student: ${student ? student.name : 'N/A'} (${app.student_id})
Scholarship: ${scholarship ? scholarship.name : 'N/A'}
Amount: ₹${scholarship ? scholarship.amount.toLocaleString() : '0'}
Status: ${app.status}
Date: ${app.application_date}
Admin: ${admin ? admin.name : 'N/A'}
        `;
        
        alert(details);
    }
}

// View Documents
function viewDocuments(applicationId) {
    const app = mockData.applications.find(a => a.application_id === applicationId);
    if (!app || !app.documents || app.documents.length === 0) {
        alert('No documents found for this application');
        return;
    }
    
    const modal = document.getElementById('documentModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    // Build document list
    let html = `<div style="margin-bottom: 1rem;">
        <p><strong>Application ID:</strong> ${app.application_id}</p>
        <p><strong>Student ID:</strong> ${app.student_id}</p>
        <p><strong>Total Documents:</strong> ${app.documents.length}</p>
    </div>`;
    
    html += '<div style="display: grid; gap: 1rem;">';
    
    app.documents.forEach((doc, index) => {
        const fileSize = (doc.size / 1024 / 1024).toFixed(2);
        const isImage = doc.type && doc.type.startsWith('image/');
        const isPDF = doc.type === 'application/pdf' || doc.name.toLowerCase().endsWith('.pdf');
        
        html += `
            <div style="border: 2px solid var(--light-color); border-radius: 8px; padding: 1rem; background: var(--white);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <h4 style="margin: 0; color: var(--primary-color);">Document ${index + 1}: ${doc.name}</h4>
                    <span style="font-size: 0.85rem; color: #666;">${fileSize} MB</span>
                </div>
                <div style="margin-top: 1rem;">
                    ${isImage ? `
                        <img src="${doc.data}" alt="${doc.name}" style="max-width: 100%; max-height: 400px; border-radius: 5px; border: 1px solid var(--light-color);">
                    ` : isPDF ? `
                        <iframe src="${doc.data}" style="width: 100%; height: 500px; border: 1px solid var(--light-color); border-radius: 5px;"></iframe>
                    ` : `
                        <p style="color: #666; margin-bottom: 0.5rem;">Preview not available for this file type</p>
                    `}
                    <div style="margin-top: 1rem;">
                        <a href="${doc.data}" download="${doc.name}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem; text-decoration: none; display: inline-block;">
                            📥 Download ${doc.name}
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    modalBody.innerHTML = html;
    modal.style.display = 'block';
}

// Close Document Modal
function closeDocumentModal() {
    const modal = document.getElementById('documentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('documentModal');
    if (event.target === modal) {
        closeDocumentModal();
    }
}

