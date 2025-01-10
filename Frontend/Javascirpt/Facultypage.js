

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));

  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add('active');
}

// Profile section Fetch data 

//   document.addEventListener('DOMContentLoaded', function () {

//     const facultyId = 4001; // Replace with actual faculty ID
//     fetch(`/api/faculty/${facultyId}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data) {
//                 document.getElementById('profile-name').textContent = data.Faculty_name;
//                 document.getElementById('profile-father-name').textContent = data.F_father_name;
//                 document.getElementById('profile-mother-name').textContent = data.F_mother_name;
//                 document.getElementById('profile-email').textContent = data.Email;
//                 document.getElementById('profile-contact').textContent = data.F_contact_number;
//                 document.getElementById('profile-position').textContent = data.position;
//                 document.getElementById('profile-hire-date').textContent = data.Joining_date;

//                 // Profile Picture Logic
//                 const profilePic = data.profile_pic || './pics/default.jpg';
//                 document.getElementById('profile-pic').src = profilePic;
//             } else {
//                 console.error('Faculty data not found');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching faculty data:', error);
//         });
//     });


//   // Result Management

//   // Mock data (Replace with actual database data via API or server-side rendering)
// const teacherCourses = [
//   { code: "CSE101", title: "Introduction to Programming" },
//   { code: "CSE102", title: "Data Structures" },
//   { code: "CSE201", title: "Algorithms" },
//   { code: "CSE202", title: "Database Systems" },
//   { code: "CSE222", title: "Database Systems(Sessional)" },
// ];

// // Function to load courses dynamically
// function loadTeacherCourses() {
//   const coursesGrid = document.getElementById("teacher-courses");
//   coursesGrid.innerHTML = ""; // Clear previous content

//   teacherCourses.forEach((course) => {
//     const courseCard = document.createElement("div");
//     courseCard.className = "course-card";

//     courseCard.innerHTML = `
//       <div class="course-title">${course.code} - ${course.title}</div>
//       <button class="action-btn" onclick="openModal('${course.code}', '${course.title}')">Input Numbers</button>
//     `;

//     coursesGrid.appendChild(courseCard);
//   });
// }

// // Function to open the modal and set course details
// function openModal(courseCode, courseTitle) {
//   document.getElementById("modal-course-title").textContent = `${courseCode} - ${courseTitle}`;
//   document.getElementById("input-marks-modal").style.display = "block";
// }// Function to close the modal
// function closeModal() {
//   document.getElementById("input-marks-modal").style.display = "none";
// }

// // Handle form submission
// const marksForm = document.getElementById("marks-form");
// marksForm.addEventListener("submit", (e) => {
//   e.preventDefault(); // Prevent default form submission

//   const formData = new FormData(marksForm);
//   const data = {
//     studentId: formData.get("student-id"),
//     attendance: formData.get("attendance"),
//     ct: formData.get("ct"),
//     termFinal: formData.get("term-final"),
//     section: formData.get("section"),
//   };

//   // Connect to database or API to save data (Mocked here)
//   console.log("Submitting marks for:", data);
//   alert("Marks submitted successfully!");

//   closeModal(); // Close the modal after submission
// });

// // Load courses on page load
// window.onload = loadTeacherCourses;



// // Current coures

// document.addEventListener("DOMContentLoaded", () => {
//   // Mock courses data (Replace with actual database fetch)
//   const courses = [
//     { code: "CSE101", title: "Introduction to Programming",Batch:"2021" ,Credit:"3.00" },
//     { code: "CSE102", title: "Data Structures" ,Batch:"2021" ,Credit:"3.00"},
//     { code: "CSE201", title: "Introduction to Algorithm" ,Batch:"2021", Credit:"3.00"},
//     { code: "CSE202", title: "Algorithm Sessional",Batch:"2021" ,Credit:"3.00" },
//     { code: "CSE221", title: "Introduction to DSP" ,Batch:"2021" ,Credit:"3.00"},
//     { code: "CSE222", title: "DSP Sessional",Batch:"2021" ,Credit:"3.00" },
//   ];

//   const courseList = document.getElementById("course-list");
//   const courseSelect = document.getElementById("course-select");

//   // Populate course list and dropdown
//   courses.forEach((course) => {
//     const courseItem = document.createElement("p");
//     courseItem.textContent = `${course.code} - ${course.title} - ${course.Batch} - ${course.Credit}`;
//     courseList.appendChild(courseItem);

//     const option = document.createElement("option");
//     option.value = course.code;
//     option.textContent = `${course.code} - ${course.title} - ${course.Batch} - ${course.Credit}`;
//     courseSelect.appendChild(option);
//   });

//   // Handle materials upload
//   document.getElementById("upload-materials-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     console.log("Uploading materials for:", formData.get("course"));
//     console.log("Files:", formData.getAll("materials"));

//     // TODO: Send files to server using Fetch API or Axios
//     alert("Materials uploaded successfully!");
//   });

//   // Handle notification submission
//   document.getElementById("notification-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const message = document.getElementById("notification-message").value;

//     // TODO: Send notification via backend API (Node.js) to send emails
//     alert("Notification sent to students!");
//   });
// });


//   // Advising List 

//   // Example data (replace with data from your database connection)
//   const advisingData = [
//     {
//       id: 'CSE2023001',
//       name: 'John Doe',
//       Batch:"2021",
//       level: 3,
//       term: 1,
//       lastCgpa: 3.75,
//       avgCgpa: 3.65,
//       pic: './pics/face.jpg',
//     },
//     {
//       id: 'CSE2023002',
//       name: 'Jane Smith',
//       Batch:"2020",
//       level: 4,
//       term: 2,
//       lastCgpa: 3.85,
//       avgCgpa: 3.80,
//       pic: './pics/face.jpg',
//     },
//     {
//       id: 'CSE2023001',
//       name: 'John Doe',
//       Batch:"2021",
//       level: 3,
//       term: 1,
//       lastCgpa: 3.75,
//       avgCgpa: 3.65,
//       pic: './pics/face.jpg',
//     },
//     {
//       id: 'CSE2023002',
//       name: 'Jane Smith',
//       Batch:"2020",
//       level: 4,
//       term: 2,
//       lastCgpa: 3.85,
//       avgCgpa: 3.80,
//       pic: './pics/face.jpg',
//     },
//     {
//       id: 'CSE2023001',
//       name: 'John Doe',
//       Batch:"2021",
//       level: 3,
//       term: 1,
//       lastCgpa: 3.75,
//       avgCgpa: 3.65,
//       pic: './pics/face.jpg',
//     },
//     {
//       id: 'CSE2023002',
//       name: 'Jane Smith',
//       Batch:"2020",
//       level: 4,
//       term: 2,
//       lastCgpa: 3.85,
//       avgCgpa: 3.80,
//       pic: './pics/face.jpg',
//     },


//   ];
//   const advisingGrid = document.querySelector('.advising-grid');

//   advisingData.forEach((student) => {
//     const card = document.createElement('div');
//     card.className = 'advising-card';

//     card.innerHTML = `
//       <img src="${student.pic}" alt="${student.name}" class="student-pic" />
//       <h3>${student.name}</h3>
//       <p><strong>ID:</strong> ${student.id}</p>
//        <p><strong>Batch:</strong> ${student.Batch}</p>
//       <p><strong>Level:</strong> ${student.level}</p>
//       <p><strong>Term:</strong> ${student.term}</p>
//       <p><strong>Last CGPA:</strong> ${student.lastCgpa}</p>
//       <p><strong>Average CGPA:</strong> ${student.avgCgpa}</p>
//       <button class="approve-btn">Click Here to Approve</button>
//     `;

//     advisingGrid.appendChild(card);
//   });


document.addEventListener("DOMContentLoaded", async () => {
  const facultyId = localStorage.getItem('userId');
  if (!facultyId) {
    console.error('Faculty ID not found in local storage');
    return;
  }

  const coursesGrid = document.getElementById("teacher-courses");
  const courseList = document.getElementById("course-list");
  const courseSelect = document.getElementById("course-select");

  // Fetch and display faculty data
  fetch(`/api/faculty/${facultyId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.getElementById("faculty-name").textContent = data.Faculty_name;
        document.getElementById("faculty-father-name").textContent = data.F_father_name;
        document.getElementById("faculty-mother-name").textContent = data.F_mother_name;
        document.getElementById("contact-number").textContent = data.F_contact_number;
        document.getElementById("email").textContent = data.Email;
        document.getElementById("faculty-id").textContent = data.Faculty_id;
        document.getElementById("position").textContent = data.position;
      } else {
        console.error("Faculty data not found");
      }
    })
    .catch((error) => console.error("Error fetching faculty data:", error));

  // Fetch and display teacher courses
  async function loadTeacherCourses() {
    try {
      const response = await fetch(`/api/teacher-courses/${facultyId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const teacherCourses = await response.json();
      coursesGrid.innerHTML = ""; // Clear previous content

      teacherCourses.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.className = "course-card";
        courseCard.innerHTML = `
          <div class="course-title">${course.code} - ${course.title}</div>
          <button class="action-btn" onclick="openModal('${course.code}', '${course.title}')">Input Numbers</button>
        `;
        coursesGrid.appendChild(courseCard);
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Failed to load courses. Please try again later.");
    }
  }
  await loadTeacherCourses();

  // Fetch and display course list and dropdown
  try {
    const response = await fetch(`/api/courses2/${facultyId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const courses2 = await response.json();

    courses2.forEach((course) => {
      const courseItem = document.createElement("p");
      courseItem.textContent = `${course.Cou_code} - ${course.Course_name} - ${course.Batch} - ${course.Credit}`;
      courseList.appendChild(courseItem);

      const option = document.createElement("option");
      option.value = course.Cou_code;
      option.textContent = `${course.Cou_code} - ${course.Course_name} - ${course.Batch} - ${course.Credit}`;
      courseSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    alert("Failed to load courses. Please try again later.");
  }

  // Handle materials upload
  document.getElementById("upload-materials-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Uploading materials for:", formData.get("course"));
    console.log("Files:", formData.getAll("materials"));
    alert("Materials uploaded successfully!");
    // TODO: Send files to server
  });

  // Book upload
  const bookForm = document.getElementById("book-materials-form");

  bookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const courseCode = parseInt(document.getElementById("course-id").value.trim());

    if (!title || !author || !courseCode) {
      alert("All fields are required!");
      return;
    }

    try {
      // Check if the book already exists or insert it
      const bookResponse = await fetch("/check-or-insert-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author }),
      });
      const { bookId } = await bookResponse.json();

      if (!bookId) {
        alert("Failed to retrieve or insert book data.");
        return;
      }

      // Check or insert into the Manages table
      const manageResponse = await fetch("/check-or-insert-manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId, bookId, courseCode }),
      });

      const manageResult = await manageResponse.json();

      if (manageResult.success) {
        alert("Record successfully managed!");
      } else {
        alert("Record already exists or failed to insert.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });

  // Show the student advising
  const advisingGrid = document.querySelector(".advising-grid");

  fetch(`/students2/${facultyId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((students2) => {
      console.log("Fetched students:", students2);
      students2.forEach((student) => {
        const card = document.createElement("div");
        card.className = "advising-card";

        card.innerHTML = `
          <h3>${student.Stu_name}</h3>
          <p><strong>ID:</strong> ${student.Stu_id}</p>
          <p><strong>Level:</strong> ${student.Stu_level}</p>
          <p><strong>Term:</strong> ${student.Stu_term}</p>
          <button class="approve-btn">Click Here to Approve</button>
        `;

        advisingGrid.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching students:", error));

  let currentCourseCode = null;
  // Function to open the modal and set course details
  window.openModal = function(courseCode, courseTitle) {
    document.getElementById("modal-course-title").textContent = `${courseCode} - ${courseTitle}`;

    // Set the course code dynamically in the hidden input field
    const courseCodeInput = document.getElementById("course-code");
    courseCodeInput.value = courseCode; // Assign the courseCode to the input field
    currentCourseCode = courseCode;

    document.getElementById("input-marks-modal").style.display = "block";
  }

  // Function to close the modal
  window.closeModal = function() {
    document.getElementById("input-marks-modal").style.display = "none";
  }

  // Add mark in Enrollment table
  const marksForm = document.getElementById("marks-form");

  marksForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(marksForm);
    const studentId = parseInt(formData.get("student-id")); // Ensure studentId is an integer
    const attendance = parseInt(formData.get("attendance"));
    const ct = parseInt(formData.get("ct"));
    const termFinal = parseInt(formData.get("term-final"));
    const section = formData.get("section");
    // Assuming courseCode is stored elsewhere dynamically
    const courseCode = currentCourseCode; // Set this during modal opening

    // Calculate the total marks
    const totalMarks = attendance + ct + termFinal;

    // Data object to send to the server
    const data = {
      studentId,
      attendance,
      ct,
      termFinal,
      section,
      totalMarks,
      courseCode, // Include courseCode here
    };

    // Send data to the backend
    fetch("/save-marks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Marks submitted successfully!");
        } else {
          alert("Error submitting marks.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred.");
      });

    closeModal(); // Close the modal after submission
  });

  // Load courses on page load
  window.onload = loadTeacherCourses;
});



function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));

  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add("active");
}


