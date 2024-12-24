
  
  function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
  }
  
  
  // Result Management
  
  // Mock data (Replace with actual database data via API or server-side rendering)
const teacherCourses = [
  { code: "CSE101", title: "Introduction to Programming" },
  { code: "CSE102", title: "Data Structures" },
  { code: "CSE201", title: "Algorithms" },
  { code: "CSE202", title: "Database Systems" },
  { code: "CSE222", title: "Database Systems(Sessional)" },
];

// Function to load courses dynamically
function loadTeacherCourses() {
  const coursesGrid = document.getElementById("teacher-courses");
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
}

// Function to open the modal and set course details
function openModal(courseCode, courseTitle) {
  document.getElementById("modal-course-title").textContent = `${courseCode} - ${courseTitle}`;
  document.getElementById("input-marks-modal").style.display = "block";
}// Function to close the modal
function closeModal() {
  document.getElementById("input-marks-modal").style.display = "none";
}

// Handle form submission
const marksForm = document.getElementById("marks-form");
marksForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(marksForm);
  const data = {
    studentId: formData.get("student-id"),
    attendance: formData.get("attendance"),
    ct: formData.get("ct"),
    termFinal: formData.get("term-final"),
    section: formData.get("section"),
  };

  // Connect to database or API to save data (Mocked here)
  console.log("Submitting marks for:", data);
  alert("Marks submitted successfully!");

  closeModal(); // Close the modal after submission
});

// Load courses on page load
window.onload = loadTeacherCourses;



// Current coures

document.addEventListener("DOMContentLoaded", () => {
  // Mock courses data (Replace with actual database fetch)
  const courses = [
    { code: "CSE101", title: "Introduction to Programming",Batch:"2021" ,Credit:"3.00" },
    { code: "CSE102", title: "Data Structures" ,Batch:"2021" ,Credit:"3.00"},
    { code: "CSE201", title: "Introduction to Algorithm" ,Batch:"2021", Credit:"3.00"},
    { code: "CSE202", title: "Algorithm Sessional",Batch:"2021" ,Credit:"3.00" },
    { code: "CSE221", title: "Introduction to DSP" ,Batch:"2021" ,Credit:"3.00"},
    { code: "CSE222", title: "DSP Sessional",Batch:"2021" ,Credit:"3.00" },
  ];

  const courseList = document.getElementById("course-list");
  const courseSelect = document.getElementById("course-select");

  // Populate course list and dropdown
  courses.forEach((course) => {
    const courseItem = document.createElement("p");
    courseItem.textContent = `${course.code} - ${course.title} - ${course.Batch} - ${course.Credit}`;
    courseList.appendChild(courseItem);

    const option = document.createElement("option");
    option.value = course.code;
    option.textContent = `${course.code} - ${course.title} - ${course.Batch} - ${course.Credit}`;
    courseSelect.appendChild(option);
  });

  // Handle materials upload
  document.getElementById("upload-materials-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Uploading materials for:", formData.get("course"));
    console.log("Files:", formData.getAll("materials"));

    // TODO: Send files to server using Fetch API or Axios
    alert("Materials uploaded successfully!");
  });

  // Handle notification submission
  document.getElementById("notification-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const message = document.getElementById("notification-message").value;

    // TODO: Send notification via backend API (Node.js) to send emails
    alert("Notification sent to students!");
  });
});


  // Advising List 

  // Example data (replace with data from your database connection)
  const advisingData = [
    {
      id: 'CSE2023001',
      name: 'John Doe',
      Batch:"2021",
      level: 3,
      term: 1,
      lastCgpa: 3.75,
      avgCgpa: 3.65,
      pic: './pics/face.jpg',
    },
    {
      id: 'CSE2023002',
      name: 'Jane Smith',
      Batch:"2020",
      level: 4,
      term: 2,
      lastCgpa: 3.85,
      avgCgpa: 3.80,
      pic: './pics/face.jpg',
    },
    {
      id: 'CSE2023001',
      name: 'John Doe',
      Batch:"2021",
      level: 3,
      term: 1,
      lastCgpa: 3.75,
      avgCgpa: 3.65,
      pic: './pics/face.jpg',
    },
    {
      id: 'CSE2023002',
      name: 'Jane Smith',
      Batch:"2020",
      level: 4,
      term: 2,
      lastCgpa: 3.85,
      avgCgpa: 3.80,
      pic: './pics/face.jpg',
    },
    {
      id: 'CSE2023001',
      name: 'John Doe',
      Batch:"2021",
      level: 3,
      term: 1,
      lastCgpa: 3.75,
      avgCgpa: 3.65,
      pic: './pics/face.jpg',
    },
    {
      id: 'CSE2023002',
      name: 'Jane Smith',
      Batch:"2020",
      level: 4,
      term: 2,
      lastCgpa: 3.85,
      avgCgpa: 3.80,
      pic: './pics/face.jpg',
    },
    
    
  ];
  const advisingGrid = document.querySelector('.advising-grid');

  advisingData.forEach((student) => {
    const card = document.createElement('div');
    card.className = 'advising-card';

    card.innerHTML = `
      <img src="${student.pic}" alt="${student.name}" class="student-pic" />
      <h3>${student.name}</h3>
      <p><strong>ID:</strong> ${student.id}</p>
       <p><strong>Batch:</strong> ${student.Batch}</p>
      <p><strong>Level:</strong> ${student.level}</p>
      <p><strong>Term:</strong> ${student.term}</p>
      <p><strong>Last CGPA:</strong> ${student.lastCgpa}</p>
      <p><strong>Average CGPA:</strong> ${student.avgCgpa}</p>
      <button class="approve-btn">Click Here to Approve</button>
    `;

    advisingGrid.appendChild(card);
  });