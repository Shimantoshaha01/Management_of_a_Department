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



document.addEventListener('DOMContentLoaded', function() {
  const adminId = localStorage.getItem('userId'); // Assuming admin ID is stored in local storage
  if (!adminId) {
    console.error('Admin ID not found in local storage');
    return;
  }

  console.log('Fetching admin data for ID:', adminId);

  // Fetch admin data from the backend
  fetch(`/api/admin/${adminId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched admin data:', data);
      if (data) {
        // Update the profile section with fetched data
        document.getElementById('adminid').textContent = data.A_id;
      } else {
        console.error('Admin data not found');
      }
    })
    .catch(error => {
      console.error('Error fetching admin data:', error);
    });

  // Add event listener for adding a member
  document.getElementById('add-member-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const userType = document.getElementById('user-type').value;
    if (userType === 'student') {
      const studentData = {
        studentname: document.getElementById('student-name').value,
        fathername: document.getElementById('father-name').value,
        mothername: document.getElementById('mother-name').value,
        District: document.getElementById('district').value,
        dateofbirth: document.getElementById('date-of-birth').value,
        admissonyear: document.getElementById('admission-year').value,
        studentid: document.getElementById('student-id').value,
        Level: document.getElementById('level').value,
        Term: document.getElementById('term').value,
        studentemail: document.getElementById('student-email').value,
        Gender: document.getElementById('gender').value,
        studentpassword: document.getElementById('student-password').value,
        studepartmentid: document.getElementById('department-id').value,
        stuadminid: adminId
      };

      fetch('/api/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      })
      .then(response => response.text())
      .then(data => {
        alert(data);
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
    } else if (userType === 'faculty') {
      const facultyData = {
        facultyname: document.getElementById('faculty-name').value,
        facultyfathername: document.getElementById('faculty-father-name').value,
        facultymothername: document.getElementById('faculty-mother-name').value,
        joiningdate: document.getElementById('joining-date').value,
        facultyemail: document.getElementById('faculty-email').value,
        facultycontactno: document.getElementById('faculty-contact-no').value,
        facultyposition: document.getElementById('faculty-position').value,
        facultypassword: document.getElementById('faculty-password').value,
        facadminid: adminId,
        facdepartmentid: document.getElementById('faculty-department-id').value
      };

      fetch('/api/add-faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facultyData),
      })
      .then(response => response.text())
      .then(data => {
        alert(data);
      })
      .catch(error => {
        console.error('Error adding faculty:', error);
      });
    }
  });

 // Fetch faculty for class assignment
 // Fetch faculty for class assignment
  // Fetch faculty for class assignment
  fetch('/api/faculty1')
    .then(response => response.json())
    .then(data => {
      const teacherPanel = document.getElementById('teacher-panel');
      data.forEach(faculty => {
        const div = document.createElement('div');
        div.className = 'panel-item';
        div.innerHTML = `<input type="checkbox" class="teacher-checkbox" value="${faculty.id}"> ${faculty.name} - ID: ${faculty.id}`;
        teacherPanel.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error fetching faculty:', error);
    });


   // Fetch courses for class assignment
   fetch('/api/courses')
   .then(response => response.json())
   .then(data => {
     console.log('Fetched courses:', data); // Add this line to log the fetched courses
     const coursePanel = document.getElementById('course-panel');
     data.forEach(course => {
       const div = document.createElement('div');
       div.className = 'panel-item';
       div.innerHTML = `<input type="radio" name="course" class="course-radio" value="${course.Course_code}"> ${course.Course_title} - Code: ${course.Course_code} - Level:${course.Level} - Term: ${course.Term}`;
       coursePanel.appendChild(div);
     });
   })
   .catch(error => {
     console.error('Error fetching courses:', error);
   });



  // Add event listener for assigning classes
document.querySelector('#assign-classes-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const facultyIds = Array.from(document.querySelectorAll('.teacher-checkbox:checked')).map(checkbox => checkbox.value);
    const courseId = document.querySelector('input[name="course"]:checked')?.value;
    const batchYear = document.getElementById('search-year').value.trim();
    const level = document.getElementById('assign-level').value.trim();
    const term = document.getElementById('assign-term').value.trim();

    if (!facultyIds.length || !courseId || !batchYear || !level || !term) {
      alert('Please select at least one faculty, one course, and enter a batch year, level, and term.');
      return;
    }

    fetch('/api/assign-classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ facultyIds, courseId, batchYear, level, term }),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error('Error assigning classes:', error);
    });
  });


  // Fetch faculty for advisor assignment
  fetch('/api/Faculty')
    .then(response => response.json())
    .then(data => {
      const facultyPanel = document.getElementById('faculty-panel');
      data.forEach(faculty => {
        const div = document.createElement('div');
        div.className = 'panel-item';
        div.innerHTML = `<input type="radio" name="faculty" class="faculty-checkbox" value="${faculty.id}"> ${faculty.name} - ID: ${faculty.id}`;
        facultyPanel.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error fetching faculty:', error);
    });

  // Fetch students for advisor assignment
  fetch('/api/Students')
    .then(response => response.json())
    .then(data => {
      const studentPanel = document.getElementById('student-panel');
      data.forEach(student => {
        const div = document.createElement('div');
        div.className = 'panel-item';
        div.innerHTML = `<input type="checkbox" class="student-checkbox" value="${student.id}"> ${student.name} - ID: ${student.id}`;
        studentPanel.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error fetching students:', error);
    });

  // Add event listener for assigning advisor
  document.getElementById('assign-advisor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const facultyId = document.querySelector('input[name="faculty"]:checked').value;
    const studentIds = Array.from(document.querySelectorAll('.student-checkbox:checked')).map(checkbox => checkbox.value);

    fetch('/api/assign-advisor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ facultyId, studentIds }),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error('Error assigning advisor:', error);
    });
  });

  // Add event listener for searching students by admission year
  document.getElementById('search-student-year').addEventListener('keyup', function() {
    const searchValue = this.value;
    fetch(`/api/search-students?year=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        const studentPanel = document.getElementById('student-panel');
        studentPanel.innerHTML = '';
        data.forEach(student => {
          const div = document.createElement('div');
          div.className = 'panel-item';
          div.innerHTML = `<input type="checkbox" class="student-checkbox" value="${student.id}"> ${student.name} - ID: ${student.id}`;
          studentPanel.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Error searching students:', error);
      });
  });

});

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
    studentFields.style.display = 'block';
    facultyFields.style.display = 'none';
  } else if (userType === 'faculty') {
    studentFields.style.display = 'none';
    facultyFields.style.display = 'block';
  } else {
    studentFields.style.display = 'none';
    facultyFields.style.display = 'none';
  }
}

function filterFaculties() {
  const searchValue = document.getElementById('search-faculty-id').value.toLowerCase();
  const facultyItems = document.querySelectorAll('#faculty-panel .panel-item');
  facultyItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchValue) ? '' : 'none';
  });
}
