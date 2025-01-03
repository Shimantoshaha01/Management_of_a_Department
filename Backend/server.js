

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Frontend'))); // Serves your frontend files

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mynameshimanto9',
    database: 'DBMSPROJECT'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Route to fetch student profile
app.get('/api/student/:id', (req, res) => {
    const studentId = req.params.id;
    const query = `
        SELECT 
            Stu_id, Stu_name, Stu_father_name, Stu_mother_name, Stu_DOB, 
            Stu_Email, Stu_district, Stu_level, Stu_term, Stu_admission_year, 
            Stu_gender, stu_dept_id
        FROM Student 
        WHERE Stu_id = ?`;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Failed to fetch student data:', err);
            res.status(500).send('Server error');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Student not found');
            }
        }
    });
});

// Route to fetch current semester courses and faculty information
app.get('/api/current-semester/:studentId', (req, res) => {
    const studentId = req.params.studentId;

    const query = `
        SELECT 
            Course.Course_code, 
            Course.Course_title, 
            GROUP_CONCAT(Faculty.Faculty_name SEPARATOR ', ') AS Faculty_names
        FROM 
            Enrollment 
        JOIN 
            Course ON Enrollment.Course_code = Course.Course_code
        JOIN 
            Takes ON Takes.Cou_code = Course.Course_code
        JOIN 
            Faculty ON Takes.Fac_id = Faculty.Faculty_id
        WHERE 
            Enrollment.Stu_id = ? AND 
            Course.Level = (SELECT Stu_level FROM Student WHERE Stu_id = ?) AND 
            Course.Term = (SELECT Stu_term FROM Student WHERE Stu_id = ?)
        GROUP BY 
            Course.Course_code, Course.Course_title
    `;

    db.query(query, [studentId, studentId, studentId], (err, results) => {
        if (err) {
            console.error('Failed to fetch current semester data:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});


// Show the results 

// Route to fetch all student results
app.get('/api/student-all-results/:studentId', (req, res) => {
    const studentId = req.params.studentId;

    const query = `
        SELECT 
            Course.Course_code, 
            Course.Course_title, 
            Course.Credit, 
            Course.Level, 
            Course.Term, 
            Enrollment.Marks
        FROM 
            Enrollment 
        JOIN 
            Course ON Enrollment.Course_code = Course.Course_code
        WHERE 
            Enrollment.Stu_id = ?
    `;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Failed to fetch student results:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});

// Route to fetch student results for a specific level and term
app.get('/api/student-results/:studentId/:level/:term', (req, res) => {
    const { studentId, level, term } = req.params;

    const query = `
        SELECT 
            Course.Course_code, 
            Course.Course_title, 
            Course.Credit, 
            Enrollment.Marks
        FROM 
            Enrollment 
        JOIN 
            Course ON Enrollment.Course_code = Course.Course_code
        WHERE 
            Enrollment.Stu_id = ? AND 
            Course.Level = ? AND 
            Course.Term = ?
    `;

    db.query(query, [studentId, level, term], (err, results) => {
        if (err) {
            console.error('Failed to fetch student results:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});


// API to fetch course registration data
app.get('/api/course-registration/:studentId', (req, res) => {
    const studentId = req.params.studentId;

    const query = `
        SELECT 
            Course.Course_code, 
            Course.Course_title, 
            Course.Credit
        FROM 
           Course 
        JOIN 
           Enrollment ON Enrollment.Course_code = Course.Course_code
        WHERE 
            Enrollment.Stu_id = ? AND 
            Course.Level = (SELECT Stu_level FROM Student WHERE Stu_id = ?) AND 
            Course.Term = (SELECT Stu_term FROM Student WHERE Stu_id = ?)
    `;

    db.query(query, [studentId, studentId, studentId], (err, results) => {
        if (err) {
            console.error('Failed to fetch course registration data:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});


//Route To Show books

app.get('/api/book-materials/:studentId', (req, res) => {
    const studentId = req.params.studentId;
  
    const fetchStudentQuery = 'SELECT Stu_level, Stu_term FROM Student WHERE Stu_id = ?';
    const fetchCoursesQuery = `
      SELECT E.Course_code 
      FROM Enrollment E
      JOIN Course C ON E.Course_code = C.Course_code
      WHERE E.Stu_id = ? AND C.Level = ? AND C.Term = ?`;
    const fetchBooksQuery = `
      SELECT M.Course_code, B.Title, B.Author 
      FROM Book_material B
      JOIN Manages M ON B.Book_id = M.BK_id
      WHERE M.Course_code IN (?)`;
  
      db.query(fetchStudentQuery, [studentId], (err, studentResult) => {
        if (err) {
          return res.status(500).json({ error: 'Database query failed' });
        }
    
        const { Stu_level, Stu_term } = studentResult[0];
    
        db.query(fetchCoursesQuery, [studentId, Stu_level, Stu_term], (err, coursesResult) => {
          if (err) {
            return res.status(500).json({ error: 'Database query failed' });
          }
    
          const courseCodes = coursesResult.map(course => course.Course_code);
    
          if (courseCodes.length === 0) {
            return res.json([]);
          }
    
          db.query(fetchBooksQuery, [courseCodes], (err, booksResult) => {
            if (err) {
              return res.status(500).json({ error: 'Database query failed' });
            }
    
            res.json(booksResult);
          });
        });
      });
    });

// Registering a course
app.post('/api/register', (req, res) => {
    const { paymentMethod, transactionId, amount, studentId } = req.body;

    const paymentQuery = 'INSERT INTO Payment (Payment_id, Amount, Payment_method) VALUES (?, ?, ?)';
    const registrationQuery = 'INSERT INTO Registration (registration_date, Status, Stu_id) VALUES (CURDATE(), ?, ?)';
    const payRegistrationQuery = 'INSERT INTO Pay_registration (Reg_id, Pay_id) VALUES (?, ?)';
    const fetchStudentQuery = 'SELECT Stu_level, Stu_term FROM Student WHERE Stu_id = ?';
    const fetchCoursesQuery = `
        SELECT E.Course_code 
        FROM Enrollment E
        JOIN Course C ON E.Course_code = C.Course_code
        WHERE E.Stu_id = ? AND C.Level = ? AND C.Term = ?`;
    const coursePartQuery = 'INSERT INTO Course_part (Course_code, Reg_id) VALUES (?, ?)';

    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Transaction error' });
        }

        db.query(paymentQuery, [transactionId, amount, paymentMethod], (err, paymentResult) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).send({ success: false, message: 'Payment insertion error' });
                });
            }

            db.query(registrationQuery, ['Completed', studentId], (err, registrationResult) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).send({ success: false, message: 'Registration insertion error' });
                    });
                }

                const registrationId = registrationResult.insertId;

                db.query(payRegistrationQuery, [registrationId, transactionId], (err, payRegistrationResult) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).send({ success: false, message: 'Pay_registration insertion error' });
                        });
                    }

                    db.query(fetchStudentQuery, [studentId], (err, studentResult) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).send({ success: false, message: 'Fetch student error' });
                            });
                        }

                        const { Stu_level, Stu_term } = studentResult[0];

                        db.query(fetchCoursesQuery, [studentId, Stu_level, Stu_term], (err, coursesResult) => {
                            if (err) {
                                return db.rollback(() => {
                                    res.status(500).send({ success: false, message: 'Fetch courses error' });
                                });
                            }

                            const coursePartPromises = coursesResult.map(course => {
                                return new Promise((resolve, reject) => {
                                    db.query(coursePartQuery, [course.Course_code, registrationId], (err, result) => {
                                        if (err) {
                                            return reject(err);
                                        }
                                        resolve(result);
                                    });
                                });
                            });

                            Promise.all(coursePartPromises)
                                .then(() => {
                                    db.commit((err) => {
                                        if (err) {
                                            return db.rollback(() => {
                                                res.status(500).send({ success: false, message: 'Commit error' });
                                            });
                                        }

                                        res.send({ success: true });
                                    });
                                })
                                .catch(err => {
                                    db.rollback(() => {
                                        res.status(500).send({ success: false, message: 'Course_part insertion error' });
                                    });
                                });
                        });
                    });
                });
            });
        });
    });
});




// Route to fetch faculty profile
app.get("/api/faculty/:id", (req, res) => {
    const facultyID = req.params.id;
    const query1 = `
    select Faculty_id,Faculty_name,F_father_name,F_mother_name,
    F_contact_number,Email,position from Faculty where Faculty_id = ?`;

    db.query(query1, [facultyID], (err, results) => {
        if (err) {
            console.error("Failed to fetch faculty data:", err);
            res.status(500).send("Server error");
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send("faculty not found");
            }
        }
    });
});

/// API to fetch students by advisor
app.get("/students2/:facultyId", (req, res) => {
    const facultyId = req.params.facultyId;
    const query = `
    SELECT Stu_id, Stu_name, Stu_level, Stu_term 
    FROM Student 
    WHERE Stu_faculty_id = ?`;

    db.query(query, [facultyId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).send("Server error");
        } else {
            res.json(results);
        }
    });
});

// API endpoint to fetch courses...show courses part
app.get("/api/courses2/:facId", (req, res) => {
    const facId = req.params.facId;
    const query = `
    SELECT 
    T.Batch,
    T.Cou_code,
    C.Course_title AS Course_name,
    C.Credit
    FROM 
    Takes T
    JOIN 
    Course C ON T.Cou_code = C.Course_code 
    WHERE 
    T.Fac_id = ?;
    `;
    db.query(query, [facId], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(results);
        }
    });
});
// API endpoint to fetch teacher courses ..... result part
app.get("/api/teacher-courses/:facId", (req, res) => {
    const facId = req.params.facId;
    const query = `
    SELECT DISTINCT
    T.Cou_code AS code,
    C.Course_title AS title,
    C.Credit
    FROM
    Takes T
    JOIN
    Course C ON T.Cou_code = C.Course_code
    WHERE
    T.Fac_id = ?;
    `;
    db.query(query, [facId], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(results);
        }
    });
});

// Endpoint to save marks
app.post("/save-marks", (req, res) => {
    const { studentId, attendance, ct, termFinal, totalMarks, courseCode } = req.body;

    // Ensure that the values are correct (e.g., convert to integers if needed)
    const query = `
    UPDATE Enrollment
    SET Marks = ?
    WHERE Stu_id = ? AND Course_code = ?
    `;

    // Log data to verify what is being received
    console.log(`Received data: studentId=${studentId}, courseCode=${courseCode}, totalMarks=${totalMarks}`);

    db.query(query, [totalMarks, studentId, courseCode], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error saving marks");
        }

        if (result.affectedRows === 0) {
            console.log("No rows updated. Make sure the studentId and courseCode are correct.");
            return res.status(404).send("No records updated");
        }

        res.status(200).send("Marks saved successfully");
    });
});

// Endpoint to check or insert a book
app.post("/check-or-insert-book", async (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: "Title and Author are required." });
    }

    try {
        // Check if the book exists
        const [rows] = await db.promise().query("SELECT Book_id FROM Book_material WHERE Title = ? AND Author = ?", [title, author]);

        let bookId;
        if (rows.length > 0) {
            // Book exists
            bookId = rows[0].Book_id;
        } else {
            // Insert new book
            const [result] = await db.promise().query("INSERT INTO Book_material (Title, Author) VALUES (?, ?)", [title, author]);
            bookId = result.insertId;
        }

        res.json({ bookId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error." });
    }
});
// Endpoint to check or insert into Manages
app.post("/check-or-insert-manage", async (req, res) => {
    const { facultyId, bookId, courseCode } = req.body;

    if (!facultyId || !bookId || !courseCode) {
        return res.status(400).json({ error: "Faculty ID, Book ID, and Course Code are required." });
    }

    try {
        // Check if the record exists
        const [rows] = await db.promise().query("SELECT 1 FROM Manages WHERE Fac_id = ? AND BK_id = ? AND Course_code = ?", [facultyId, bookId, courseCode]);

        if (rows.length === 0) {
            // Insert new record
            await db.promise().query("INSERT INTO Manages (Fac_id, BK_id, Course_code) VALUES (?, ?, ?)", [facultyId, bookId, courseCode]);
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Record already exists." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error." });
    }
});


//// Route to fetch admin profile
// Route to fetch admin profile
app.get('/api/admin/:id', (req, res) => {
    const adminId = req.params.id;
    const query = 'SELECT * FROM Admin WHERE A_id = ?';

    db.query(query, [adminId], (err, results) => {
        if (err) {
            console.error('Failed to fetch admin data:', err);
            res.status(500).send('Server error');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Admin not found');
            }
        }
    });
});

// Route to fetch admin profile
app.get('/api/admin/:id', (req, res) => {
    const adminId = req.params.id;
    const query = 'SELECT A_id FROM Admin WHERE A_id = ?';

    db.query(query, [adminId], (err, results) => {
        if (err) {
            console.error('Failed to fetch admin data:', err);
            res.status(500).send('Server error');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Admin not found');
            }
        }
    });
});

// Route to handle adding a student
app.post("/api/add-student", (req, res) => {
    const {
        studentname,
        fathername,
        mothername,
        District,
        dateofbirth,
        admissonyear,
        studentid,
        Level,
        Term,
        studentemail,
        Gender,
        studentpassword, // New field for password
        studepartmentid, // New field for department ID
        stuadminid, // New field for admin ID
    } = req.body;

    const query = `
        INSERT INTO Student (
            Stu_id, Stu_name, Stu_father_name, Stu_mother_name, Stu_DOB, Stu_Email,
            Stu_district, Stu_level, Stu_term, Stu_admission_year, Stu_gender, 
            Stu_password, stu_dept_id, Stu_admin_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            studentid,
            studentname,
            fathername,
            mothername,
            dateofbirth,
            studentemail,
            District,
            Level,
            Term,
            admissonyear,
            Gender,
            studentpassword, // Insert password
            studepartmentid, // Insert department ID
            stuadminid, // Insert admin ID
        ],
        (err, results) => {
            if (err) {
                console.error("Failed to insert student:", err);
                res.status(500).send("Error adding student");
            } else {
                res.send("Student added successfully");
            }
        }
    );
});

// Route to handle adding a faculty member
app.post("/api/add-faculty", (req, res) => {
    const {
        facultyname,
        facultyfathername,
        facultymothername,
        joiningdate,
        facultyemail,
        facultycontactno,
        facultyposition,
        facultypassword, // Plain password (no hashing)
        facadminid, // Admin ID
        facdepartmentid, // Department ID
    } = req.body;

    const query = `
        INSERT INTO Faculty (
            Faculty_name, F_father_name, F_mother_name, Joining_date,
            Email, F_contact_number, position, F_password, adm_id, dep_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            facultyname,
            facultyfathername,
            facultymothername,
            joiningdate,
            facultyemail,
            facultycontactno,
            facultyposition,
            facultypassword, // Store plain text password
            facadminid, // Insert admin ID
            facdepartmentid, // Insert department ID
        ],
        (err, results) => {
            if (err) {
                console.error("Failed to insert faculty:", err);
                res.status(500).send("Error adding faculty");
            } else {
                res.send("Faculty added successfully");
            }
        }
    );
});



// Route to fetch faculty for class assignment
app.get("/api/faculty1", (req, res) => {
    const query = "SELECT Faculty_id AS id, Faculty_name AS name FROM Faculty";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching faculty:", err);
            res.status(500).send("Error fetching faculty");
        } else {
            res.json(results);
        }
    });
});

// Route to fetch courses for class assignment
app.get("/api/courses", (req, res) => {
    const query = "SELECT Course_code, Course_title,Level, Term FROM Course";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching courses:", err);
            res.status(500).send("Error fetching courses");
        } else {
            res.json(results);
        }
    });
});


// Route to assign classes to faculty and enroll students
app.post("/api/assign-classes", (req, res) => {
    const { facultyIds, courseId, batchYear, level, term } = req.body;

    // Ensure that the facultyIds, courseId, batchYear, level, and term are provided
    if (!facultyIds || facultyIds.length === 0 || !courseId || !batchYear || !level || !term) {
        return res.status(400).json({ error: "Invalid input: Faculty IDs, course ID, batch year, level, and term are required." });
    }

    // Start a transaction to ensure data consistency
    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: "Error starting transaction." });
        }

        // Prepare the SQL query to insert into the Takes table
        const takesQuery = "INSERT INTO Takes (Fac_id, Cou_code, Batch) VALUES (?, ?, ?)";

        // Insert each selected faculty with the selected course and batch year inside the transaction
        const takesPromises = facultyIds.map((facultyId) => {
            return new Promise((resolve, reject) => {
                db.query(takesQuery, [facultyId, courseId, batchYear], (err, result) => {
                    if (err) {
                        return reject(err); // Reject the promise if an error occurs
                    }
                    resolve(result); // Resolve the promise when the insert is successful
                });
            });
        });

        // Prepare the SQL query to insert into the Enrollment table
        const enrollmentQuery = "INSERT INTO Enrollment (Stu_id, Course_code) SELECT Stu_id, ? FROM Student WHERE YEAR(Stu_admission_year) = ?";

        // Insert the selected course into the Enrollment table for all students admitted in the given year
        const enrollmentPromise = new Promise((resolve, reject) => {
            db.query(enrollmentQuery, [courseId, batchYear], (err, result) => {
                if (err) {
                    return reject(err); // Reject the promise if an error occurs
                }
                resolve(result); // Resolve the promise when the insert is successful
            });
        });

        // Prepare the SQL query to update the Level and Term in the Student table
        const updateStudentQuery = "UPDATE Student SET Stu_level = ?, Stu_term = ? WHERE YEAR(Stu_admission_year) = ?";

        // Update the Level and Term for all students admitted in the given year
        const updateStudentPromise = new Promise((resolve, reject) => {
            db.query(updateStudentQuery, [level, term, batchYear], (err, result) => {
                if (err) {
                    return reject(err); // Reject the promise if an error occurs
                }
                resolve(result); // Resolve the promise when the update is successful
            });
        });

        // Wait for all the insert and update queries to finish
        Promise.all([...takesPromises, enrollmentPromise, updateStudentPromise])
            .then(() => {
                // Commit the transaction if all inserts and updates were successful
                db.commit((err) => {
                    if (err) {
                        // Rollback if commit fails
                        return db.rollback(() => {
                            console.error("Error committing transaction:", err);
                            res.status(500).json({ error: "Error assigning classes and enrolling students." });
                        });
                    }
                    // Send success response
                    res.json({
                        message: "Classes assigned successfully to all selected faculty and students enrolled.",
                    });
                });
            })
            .catch((err) => {
                // Rollback transaction on any error
                db.rollback(() => {
                    console.error("Error during insert or update:", err);
                    res.status(500).json({ error: "Error assigning classes and enrolling students." });
                });
            });
    });
});


// Route to fetch faculty for advisor assignment
app.get("/api/Faculty", (req, res) => {
    const query = "SELECT Faculty_id AS id, Faculty_name AS name FROM Faculty";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching faculty:", err);
            res.status(500).send("Error fetching faculty");
        } else {
            res.json(results);
        }
    });
});

// Route to fetch students for advisor assignment
app.get("/api/Students", (req, res) => {
    const query = "SELECT Stu_id AS id, Stu_name AS name FROM Student";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching students:", err);
            res.status(500).send("Error fetching students");
        } else {
            res.json(results);
        }
    });
});


// Route to search faculty by ID
app.get("/api/search-faculty", (req, res) => {
    const { id } = req.query;
    const query = "SELECT Faculty_id AS id, Faculty_name AS name FROM Faculty WHERE Faculty_id LIKE ?";
    db.query(query, [`%${id}%`], (err, results) => {
        if (err) {
            console.error("Error searching faculty:", err);
            res.status(500).send("Error searching faculty");
        } else {
            res.json(results);
        }
    });
});

// Route to search students by admission year
app.get("/api/search-students", (req, res) => {
    const { year } = req.query;
    const query = "SELECT Stu_id AS id, Stu_name AS name FROM Student WHERE YEAR(Stu_admission_year) = ?";
    db.query(query, [year], (err, results) => {
        if (err) {
            console.error("Error searching students:", err);
            res.status(500).send("Error searching students");
        } else {
            console.log(results);
            res.json(results);
        }
    });
});

// Route to assign advisor to students
app.post("/api/assign-advisor", (req, res) => {
    const { facultyId, studentIds } = req.body;

    // Ensure that the facultyId and studentIds are provided
    if (!facultyId || !studentIds || studentIds.length === 0) {
        return res.status(400).send("Invalid input: Faculty ID and student IDs are required.");
    }

    // Start a transaction to ensure data consistency
    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).send("Error starting transaction.");
        }

        // Prepare the SQL query to update the faculty for each student
        const query = "UPDATE Student SET Stu_faculty_id = ? WHERE Stu_id = ?";

        // Update each selected student with the selected faculty inside the transaction
        const promises = studentIds.map((studentId) => {
            return new Promise((resolve, reject) => {
                db.query(query, [facultyId, studentId], (err, result) => {
                    if (err) {
                        return reject(err); // Reject the promise if an error occurs
                    }
                    resolve(result); // Resolve the promise when the update is successful
                });
            });
        });

        // Wait for all the update queries to finish
        Promise.all(promises)
            .then(() => {
                // Commit the transaction if all updates were successful
                db.commit((err) => {
                    if (err) {
                        // Rollback if commit fails
                        return db.rollback(() => {
                            console.error("Error committing transaction:", err);
                            res.status(500).send("Error assigning advisor to students.");
                        });
                    }
                    // Send success response
                    res.json({
                        message: "Advisor assigned successfully to all selected students",
                    });
                });
            })
            .catch((err) => {
                // Rollback transaction on any error
                db.rollback(() => {
                    console.error("Error during update:", err);
                    res.status(500).send("Error assigning advisor to students.");
                });
            });
    });
});








// Login route
app.post('/api/login', (req, res) => {
    // const { userId, password, role } = req.body;
    // const table = role === 'student' ? 'Student' : 'Faculty';
    // const idField = role === 'student' ? 'Stu_id' : 'Faculty_id';
    // const passwordField = role === 'student' ? 'Stu_password' : 'F_password';
    const { userId, password, role } = req.body;
    let table, idField, passwordField;
    if (role === 'student') {
        table = 'Student';
        idField = 'Stu_id';
        passwordField = 'Stu_password';
    } else if (role === 'faculty') {
        table = 'Faculty';
        idField = 'Faculty_id';
        passwordField = 'F_password';
    } else if (role === 'admin') {
        table = 'Admin';
        idField = 'A_id';
        passwordField = 'A_password';
    } else {
        return res.status(400).send({ success: false, message: 'Invalid role' });
    }

    const query = `SELECT * FROM ${table} WHERE ${idField} = ? AND ${passwordField} = ?`;

    db.query(query, [userId, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).send({ success: false, message: 'Server error' });
        } else if (results.length > 0) {
            res.send({ success: true, role });
        } else {
            res.send({ success: false, message: 'Invalid ID or password' });
        }
    });
});

// Serve the login page at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'Loginpage.html'));
});

// Use a different port if 3000 is already in use
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
