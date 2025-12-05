DROP DATABASE IF EXISTS ScholarshipDB;
CREATE DATABASE ScholarshipDB;
USE ScholarshipDB;



CREATE TABLE Departments (
    dept_id VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100)
);

CREATE TABLE Students (
    student_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10),
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    address VARCHAR(200),
    dept_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);

CREATE TABLE Scholarships (
    scholarship_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    amount DECIMAL(10,2) NOT NULL,
    eligibility VARCHAR(200)
);

CREATE TABLE Admins (
    admin_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE
);

-- ============================================
-- SAFE ID GENERATION COUNTER TABLE
-- ============================================

CREATE TABLE App_Counter (
    counter_name VARCHAR(20) PRIMARY KEY,
    last_val INT NOT NULL
);

INSERT INTO App_Counter VALUES ('application', 0);

-- ============================================
-- APPLICATIONS TABLE
-- ============================================

CREATE TABLE Applications (
    application_id VARCHAR(20) PRIMARY KEY,
    student_id VARCHAR(10) NOT NULL,
    scholarship_id VARCHAR(10) NOT NULL,
    admin_id VARCHAR(10),
    application_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (scholarship_id) REFERENCES Scholarships(scholarship_id),
    FOREIGN KEY (admin_id) REFERENCES Admins(admin_id)
);

-- ==================================================
-- DOCUMENTS TABLE UPDATED WITH FILE PATH SUPPORT
-- ==================================================

CREATE TABLE Documents (
    doc_id VARCHAR(10) PRIMARY KEY,
    doc_type VARCHAR(50) NOT NULL,
    issue_date DATE,
    application_id VARCHAR(10),
    file_path VARCHAR(500),
    uploaded_by VARCHAR(10),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES Applications(application_id)
);

-- ========================================================
-- AUDIT TABLE (No modification needed)
-- ========================================================

CREATE TABLE Application_Audit (
    audit_id INT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(10),
    student_id VARCHAR(10),
    action VARCHAR(200),
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE INDEX idx_app_status ON Applications(status);
CREATE INDEX idx_app_student ON Applications(student_id);
CREATE INDEX idx_app_admin ON Applications(admin_id);




DELIMITER //

-- SAFE APPLICATION SUBMISSION PROCEDURE
CREATE PROCEDURE SubmitApplication(
    IN p_student_id VARCHAR(10),
    IN p_scholarship_id VARCHAR(10),
    IN p_admin_id VARCHAR(10)
)
BEGIN
    DECLARE new_seq INT;
    DECLARE new_app_id VARCHAR(20);

    START TRANSACTION;
    
    -- Lock & increment counter
    UPDATE App_Counter
    SET last_val = last_val + 1
    WHERE counter_name = 'application';
    
    SELECT last_val INTO new_seq
    FROM App_Counter
    WHERE counter_name = 'application'
    FOR UPDATE;
    
    SET new_app_id = CONCAT('APP', LPAD(new_seq, 4, '0'));
    
    INSERT INTO Applications (application_id, student_id, scholarship_id, admin_id, application_date, status)
    VALUES (new_app_id, p_student_id, p_scholarship_id, p_admin_id, CURDATE(), 'Pending');
    
    COMMIT;

    SELECT CONCAT('Application submitted successfully. ID: ', new_app_id) AS Message;
END //
DELIMITER ;

-- UPDATE APPLICATION STATUS PROCEDURE
DELIMITER //
CREATE PROCEDURE UpdateApplicationStatus(
    IN p_application_id VARCHAR(10),
    IN p_new_status VARCHAR(20)
)
BEGIN
    UPDATE Applications
    SET status = p_new_status
    WHERE application_id = p_application_id;
    
    SELECT CONCAT('Application ', p_application_id, ' updated to ', p_new_status) AS Message;
END //
DELIMITER ;

-- GET STUDENT APPLICATIONS
DELIMITER //
CREATE PROCEDURE GetStudentApplications(
    IN p_student_id VARCHAR(10)
)
BEGIN
    SELECT 
        a.application_id,
        s.name AS scholarship_name,
        a.application_date,
        a.status,
        s.amount
    FROM Applications a
    JOIN Scholarships s ON a.scholarship_id = s.scholarship_id
    WHERE a.student_id = p_student_id
    ORDER BY a.application_date DESC;
END //
DELIMITER ;

-- GET PENDING COUNT BY ADMIN
DELIMITER //
CREATE PROCEDURE GetPendingApplicationsByAdmin(
    IN p_admin_id VARCHAR(10)
)
BEGIN
    SELECT COUNT(*) AS pending_count
    FROM Applications
    WHERE admin_id = p_admin_id AND status = 'Pending';
END //
DELIMITER ;




DELIMITER //
CREATE FUNCTION GetTotalScholarshipAmount(p_student_id VARCHAR(10))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE total DECIMAL(10,2);
    SELECT IFNULL(SUM(s.amount),0)
    INTO total
    FROM Applications a
    JOIN Scholarships s ON a.scholarship_id = s.scholarship_id
    WHERE a.student_id = p_student_id AND a.status = 'Approved';
    RETURN total;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION CountApplicationsByStatus(p_status VARCHAR(20))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE app_count INT;
    SELECT COUNT(*) INTO app_count
    FROM Applications
    WHERE status = p_status;
    RETURN app_count;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION IsEligibleForScholarship(p_student_id VARCHAR(10), p_scholarship_id VARCHAR(10))
RETURNS VARCHAR(3)
DETERMINISTIC
BEGIN
    DECLARE existing_app INT;
    
    SELECT COUNT(*)
    INTO existing_app
    FROM Applications
    WHERE student_id = p_student_id
      AND scholarship_id = p_scholarship_id
      AND status = 'Approved';
    
    IF existing_app > 0 THEN RETURN 'No';
    ELSE RETURN 'Yes';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION GetStudentDepartment(p_student_id VARCHAR(10))
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
    DECLARE dept_name VARCHAR(100);
    
    SELECT d.dept_name INTO dept_name
    FROM Students s
    JOIN Departments d ON s.dept_id = d.dept_id
    WHERE s.student_id = p_student_id;
    
    RETURN dept_name;
END //
DELIMITER ;



-- AFTER INSERT AUDIT
DELIMITER //
CREATE TRIGGER after_application_insert
AFTER INSERT ON Applications
FOR EACH ROW
BEGIN
    INSERT INTO Application_Audit(application_id, student_id, action)
    VALUES (NEW.application_id, NEW.student_id, 'Application Created');
END //
DELIMITER ;


-- AFTER UPDATE AUDIT
DELIMITER //
CREATE TRIGGER after_application_update
AFTER UPDATE ON Applications
FOR EACH ROW
BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO Application_Audit(application_id, student_id, action)
        VALUES (NEW.application_id, NEW.student_id,
        CONCAT('Status changed from ', OLD.status, ' to ', NEW.status));
    END IF;
END //
DELIMITER ;


-- PREVENT DELETION OF APPROVED APPLICATIONS
DELIMITER //
CREATE TRIGGER before_application_delete
BEFORE DELETE ON Applications
FOR EACH ROW
BEGIN
    IF OLD.status = 'Approved' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete approved applications';
    END IF;
END //
DELIMITER ;


-- LOWERCASE EMAIL ON INSERT
DELIMITER //
CREATE TRIGGER before_student_insert
BEFORE INSERT ON Students
FOR EACH ROW
BEGIN
    SET NEW.email = LOWER(NEW.email);
END //
DELIMITER ;


-- LOWERCASE EMAIL ON UPDATE (NEW ADDITION)
DELIMITER //
CREATE TRIGGER before_student_update
BEFORE UPDATE ON Students
FOR EACH ROW
BEGIN
    SET NEW.email = LOWER(NEW.email);
END //
DELIMITER ;


-- VALIDATE SCHOLARSHIP AMOUNT
DELIMITER //
CREATE TRIGGER before_scholarship_insert
BEFORE INSERT ON Scholarships
FOR EACH ROW
BEGIN
    IF NEW.amount <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Amount must be greater than 0';
    END IF;
END //
DELIMITER ;

DELIMITER ;


-- ================================================================
-- SAMPLE DATA INSERTION (UNCHANGED)
-- ================================================================

INSERT INTO Departments VALUES 
('D01','AIML','Dr. Ramesh'),
('D02','Computer Science','Dr. Priya Sharma'),
('D03','Electronics','Dr. Anil Kumar'),
('D04','Mechanical','Dr. Vijay Singh'),
('D05','Civil','Dr. Sunita Reddy');

INSERT INTO Students VALUES
('S001','Ranjith Kumar','2004-05-12','Male','ranjith@pes.edu','9876543210','Bangalore','D01'),
('S002','Priya Mehta','2003-08-22','Female','priya.mehta@pes.edu','9876543211','Mumbai','D02'),
('S003','Arjun Nair','2004-01-15','Male','arjun.nair@pes.edu','9876543212','Kerala','D01'),
('S004','Sneha Patel','2003-11-30','Female','sneha.patel@pes.edu','9876543213','Gujarat','D03'),
('S005','Rahul Verma','2004-03-18','Male','rahul.verma@pes.edu','9876543214','Delhi','D02'),
('S006','Ananya Singh','2003-07-25','Female','ananya.singh@pes.edu','Pune','9876543215','D04'),
('S007','Karthik Raj','2004-09-10','Male','karthik.raj@pes.edu','9876543216','Chennai','D01'),
('S008','Divya Krishnan','2003-12-05','Female','divya.k@pes.edu','9876543217','Bangalore','D05'),
('S009','Aditya Sharma','2004-06-20','Male','aditya.sharma@pes.edu','9876543218','Jaipur','D03'),
('S010','Meera Iyer','2003-04-14','Female','meera.iyer@pes.edu','9876543219','Hyderabad','D02');

INSERT INTO Scholarships VALUES 
('SC01','Merit Scholarship','Merit-Based',10000,'CGPA > 8.0'),
('SC02','Sports Scholarship','Sports-Based',15000,'State/National Sports'),
('SC03','Need-Based Scholarship','Financial Aid',20000,'Income < 3 Lakh'),
('SC04','Research Scholarship','Research-Based',25000,'Published Paper'),
('SC05','Minority Scholarship','Minority-Based',12000,'Minority Community'),
('SC06','Girl Child Scholarship','Gender-Based',18000,'Female Only'),
('SC07','SC/ST Scholarship','Category-Based',22000,'SC/ST Category'),
('SC08','Excellence Award','Merit-Based',30000,'CGPA > 9.0');

INSERT INTO Admins VALUES
('A01','Admin1','Verifier','admin1@pes.edu'),
('A02','Rajesh Kumar','Approver','rajesh.kumar@pes.edu'),
('A03','Lakshmi Devi','Verifier','lakshmi.devi@pes.edu'),
('A04','Suresh Babu','Manager','suresh.babu@pes.edu'),
('A05','Kavita Rao','Verifier','kavita.rao@pes.edu');

INSERT INTO Applications VALUES
('APP0001','S001','SC01','A01','2025-10-11','Pending'),
('APP0002','S002','SC06','A02','2025-10-12','Approved'),
('APP0003','S003','SC01','A01','2025-10-13','Pending'),
('APP0004','S004','SC03','A03','2025-10-14','Approved'),
('APP0005','S005','SC04','A02','2025-10-15','Rejected'),
('APP0006','S006','SC06','A04','2025-10-16','Approved'),
('APP0007','S007','SC02','A01','2025-10-17','Pending'),
('APP0008','S008','SC03','A05','2025-10-18','Approved'),
('APP0009','S009','SC01','A03','2025-10-19','Pending'),
('APP0010','S010','SC08','A02','2025-10-20','Approved'),
('APP0011','S001','SC02','A04','2025-10-21','Rejected'),
('APP0012','S002','SC01','A01','2025-10-22','Approved');

INSERT INTO Documents VALUES
('DOC01','Marksheet','2025-10-10','APP0001','/path/doc1','S001'),
('DOC02','Income Certificate','2025-10-11','APP0002','/path/doc2','S002'),
('DOC03','Aadhar Card','2025-10-12','APP0003','/path/doc3','S003'),
('DOC04','Bank Statement','2025-10-13','APP0004','/path/doc4','S004'),
('DOC05','Research Paper','2025-10-14','APP0005','/path/doc5','S005');

-- TEST
SELECT * FROM Application_Audit;
