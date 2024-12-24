function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

function toggleUserTypeFields() {
  const userType = document.getElementById('user-type').value;
  const studentFields = document.getElementById('student-fields');
  const facultyFields = document.getElementById('faculty-fields');

  if (userType === 'student') {
    studentFields.style.display = 'grid';
    facultyFields.style.display = 'none';
  } else if (userType === 'faculty') {
    studentFields.style.display = 'none';
    facultyFields.style.display = 'grid';
  } else {
    studentFields.style.display = 'none';
    facultyFields.style.display = 'none';
  }
}

function search() {
  // Implement search functionality here
  alert('Search functionality not implemented yet.');
}

function filterTeachers() {
  const searchInput = document.getElementById('search-teacher').value.toLowerCase();
  const teacherItems = document.querySelectorAll('#teacher-panel .panel-item');
  teacherItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchInput) ? '' : 'none';
  });
}

function filterCourses() {
  const searchInput = document.getElementById('search-course').value.toLowerCase();
  const courseItems = document.querySelectorAll('#course-panel .panel-item');
  courseItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchInput) ? '' : 'none';
  });
}

function filterStudents() {
  const searchInput = document.getElementById('search-student-year').value.toLowerCase();
  const studentItems = document.querySelectorAll('#student-panel .panel-item');
  studentItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchInput) ? '' : 'none';
  });
}

function filterFaculties() {
  const searchInput = document.getElementById('search-faculty').value.toLowerCase();
  const facultyItems = document.querySelectorAll('#faculty-panel .panel-item');
  facultyItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchInput) ? '' : 'none';
  });
}

function selectTeacher() {
  const selectedTeachers = Array.from(document.querySelectorAll('.teacher-checkbox:checked')).map(checkbox => checkbox.value);
  document.getElementById('faculty-name').value = selectedTeachers.join(', ');
}

function selectCourse() {
  const selectedCourses = Array.from(document.querySelectorAll('.course-checkbox:checked')).map(checkbox => checkbox.value);
  document.getElementById('course-code').value = selectedCourses.join(', ');
}

function selectFaculty() {
  const selectedFaculties = Array.from(document.querySelectorAll('.faculty-checkbox:checked')).map(checkbox => checkbox.value);
  document.getElementById('advisor-name').value = selectedFaculties.join(', ');
}

function selectStudent() {
  const selectedStudents = Array.from(document.querySelectorAll('.student-checkbox:checked')).map(checkbox => checkbox.value);
  document.getElementById('student-batch').value = selectedStudents.join(', ');
}

document.querySelectorAll('.teacher-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', selectTeacher);
});

document.querySelectorAll('.course-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', selectCourse);
});

document.querySelectorAll('.faculty-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', selectFaculty);
});

document.querySelectorAll('.student-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', selectStudent);
});