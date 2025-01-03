

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));

  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add('active');
}


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


