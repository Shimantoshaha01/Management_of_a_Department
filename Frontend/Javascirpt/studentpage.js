// function showSection(sectionId) {
//   const sections = document.querySelectorAll('.section');
//   sections.forEach(section => section.classList.remove('active'));

//   const activeSection = document.getElementById(sectionId);
//   activeSection.classList.add('active');
// }

// document.addEventListener('DOMContentLoaded', function () {
//   //  const studentId = 1904001; // Replace with the actual student ID you want to fetch
//   const studentId = localStorage.getItem('userId');
//   if (!studentId) {
//     console.error('Student ID not found in local storage');
//     return;
//   }
//   // Fetch student data from the backend
//   fetch(`/api/student/${studentId}`)
//     .then(response => response.json())
//     .then(data => {
//       if (data) {
//         // Update the profile section with fetched data
//         document.getElementById('profile-name').textContent = data.Stu_name;
//         document.getElementById('profile-father-name').textContent = data.Stu_father_name;
//         document.getElementById('profile-mother-name').textContent = data.Stu_mother_name;
//         document.getElementById('profile-dob').textContent = data.Stu_DOB;
//         document.getElementById('profile-email').textContent = data.Stu_Email;
//         document.getElementById('profile-id').textContent = data.Stu_id;
//         document.getElementById('profile-district').textContent = data.Stu_district;
//         document.getElementById('profile-level').textContent = data.Stu_level;
//         document.getElementById('profile-term').textContent = data.Stu_term;
//         document.getElementById('profile-admission-year').textContent = data.Stu_admission_year;
//         document.getElementById('profile-gender').textContent = data.Stu_gender;

//         // Update the current semester section with fetched data
//         document.getElementById('level').textContent = data.Stu_level;
//         document.getElementById('term').textContent = data.Stu_term;


//         // Fetch student results for the initial term (e.g., Level 1, Term 1)
//         fetchStudentResults(studentId, 1, 1);

//         // Fetch current semester data
//         fetch(`/api/current-semester/${studentId}`)
//           .then(response => response.json())
//           .then(courses => {
//             if (courses) {
//               const courseTableBody = document.querySelector('.course-table tbody');
//               courseTableBody.innerHTML = ''; // Clear previous data

//               courses.forEach(course => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                                   <td>${course.Course_code}</td>
//                                   <td>${course.Course_title}</td>
//                                   <td>${course.Faculty_names}</td>
//                               `;
//                 courseTableBody.appendChild(row);
//               });
//             } else {
//               console.error('No courses found for the current semester');
//             }
//           })
//           .catch(error => {
//             console.error('Error fetching current semester data:', error);
//           });

//         // Fetch course registration data
//         fetch(`/api/course-registration/${studentId}`)
//           .then(response => response.json())
//           .then(coursess => {
//             if (coursess) {
//               const enrollmentTableBody = document.querySelector('.enrollment-table tbody');
//               enrollmentTableBody.innerHTML = ''; // Clear previous data

//               coursess.forEach(coursed => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                                   <td>${coursed.Course_code}</td>
//                                   <td>${coursed.Course_title}</td>
//                                   <td>${coursed.Credit}</td>
//                                   <td>Regular</td>
//                               `;
//                 enrollmentTableBody.appendChild(row);
//               });
//             } else {
//               console.error('No courses found for the course registration');
//             }
//           })
//           .catch(error => {
//             console.error('Error fetching course registration data:', error);
//           });
//       } else {
//         console.error('Student data not found');
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching student data:', error);
//     });
// });


// function fetchStudentResults(studentId, level, term) {
//   fetch(`/api/student-results/${studentId}/${level}/${term}`)
//     .then(response => response.json())
//     .then(results => {
//       if (results) {
//         const termResults = {
//           courses: [],
//           totalCredits: 0,
//           totalCg: 0
//         };

//         results.forEach(result => {
//           const percentage = (result.Marks / (result.Credit * 100)) * 100;
//           let grade, cg;

//           if (percentage >= 80) {
//             grade = 'A+';
//             cg = 4.0;
//           } else if (percentage >= 75) {
//             grade = 'A';
//             cg = 3.75;
//           } else if (percentage >= 70) {
//             grade = 'A-';
//             cg = 3.5;
//           } else if (percentage >= 65) {
//             grade = 'B+';
//             cg = 3.25;
//           } else if (percentage >= 60) {
//             grade = 'B';
//             cg = 3.0;
//           } else if (percentage >= 55) {
//             grade = 'B-';
//             cg = 2.75;
//           } else if (percentage >= 50) {
//             grade = 'C+';
//             cg = 2.5;
//           } else if (percentage >= 45) {
//             grade = 'C';
//             cg = 2.25;
//           } else if (percentage >= 40) {
//             grade = 'D';
//             cg = 2.0;
//           } else {
//             grade = 'F';
//             cg = 0.0;
//           }

//           termResults.courses.push({
//             code: result.Course_code,
//             title: result.Course_title,
//             credit: result.Credit,
//             sessional: result.Credit < 3 ? 'Yes' : 'No',
//             grade,
//             cg
//           });

//           termResults.totalCredits += result.Credit;
//           termResults.totalCg += cg * result.Credit;
//         });
//         termResults.cgpa = termResults.totalCg / termResults.totalCredits;

//         // Display the results for the selected term
//         displayTermResults(termResults, `L${level}T${term}`);
//           // Update the CGPA chart
//           updateChart(termResults, `L${level}T${term}`);
//       } else {
//         console.error('No results found for the student');
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching student results:', error);
//     });
// }

// function displayTermResults(termResults, term) {
//   const resultTable = document.getElementById('result-table-body');
//   resultTable.innerHTML = '';

//   termResults.courses.forEach(course => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${course.code}</td>
//       <td>${course.title}</td>
//       <td>${course.credit}</td>
//       <td>${course.sessional}</td>
//       <td>${course.grade}</td>
//       <td>${course.cg}</td>
//     `;
//     resultTable.appendChild(row);
//   });
//   document.getElementById('term-name').textContent = `${term} Result`;
//   document.getElementById('term-result').classList.remove('hidden');
// }
// function showTermResults(term) {
//   const studentId = localStorage.getItem('userId');
//   const [level, termNumber] = term.match(/\d+/g).map(Number);
//   fetchStudentResults(studentId, level, termNumber);
// }

// // Chart.js setup
// let chart = null;

// function createChart(termResults) {
//   const terms = Object.keys(termResults);
//   const cgpas = terms.map(term => termResults[term].cgpa);

//   if (chart) {
//     chart.destroy();
//   }

//   const ctx = document.getElementById('cgpa-graph').getContext('2d');
//   chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: terms,
//       datasets: [{
//         label: 'CGPA',
//         data: cgpas,
//         borderColor: '#f28c28',
//         fill: false,
//         tension: 0.1
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         title: {
//           display: true,
//           text: 'CGPA Trend Across Terms'
//         },
//       },
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: 'Terms'
//           }
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'CGPA'
//           },
//           min: 0,
//           max: 4.0
//         }
//       }
//     }
//   });
// }
// function updateChart(termResults, term) {
//   if (!chart) {
//     createChart();
//   }

//   chart.data.labels.push(term);
//   chart.data.datasets[0].data.push(termResults.cgpa);
//   chart.update();
// }

// function toggleBooks(show) {
//   const bookList = document.getElementById('book-list');
//   const showButton = document.getElementById('show-button');

//   if (show) {
//     bookList.classList.remove('hidden');
//     showButton.classList.add('hidden');
//   } else {
//     bookList.classList.add('hidden');
//     showButton.classList.remove('hidden');
//   }
// }


// // Payment 

// document.querySelectorAll('.payment-btn').forEach(button => {
//   button.addEventListener('click', function () {
//     document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('selected'));
//     button.classList.add('selected');
//     document.getElementById('payment-method').value = button.getAttribute('data-method');
//   });
// });

// document.querySelector('.submit-btn').addEventListener('click', function (e) {
//   e.preventDefault();

//   const paymentMethod = document.querySelector('.payment-btn.selected').getAttribute('data-method');
//   const transactionId = document.getElementById('transaction-id').value;
//   const amount = document.getElementById('amount').value;
//   const studentId = localStorage.getItem('userId'); // Assuming student ID is stored in local storage

//   const data = {
//     paymentMethod,
//     transactionId,
//     amount,
//     studentId
//   };

//   fetch('/api/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         alert('Registration successful');
//       } else {
//         alert('Registration failed: ' + data.message);
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// });


// Result part and CGPA chart setup remain unchanged

// Result part and CGPA chart setup remain unchanged

// Result part 
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));

  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
  const paymentButtons = document.querySelectorAll('.payment-btn');

  paymentButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove 'selected' class from all buttons
      paymentButtons.forEach(btn => btn.classList.remove('selected'));
      // Add 'selected' class to the clicked button
      button.classList.add('selected');
      // Set the payment method value
      document.getElementById('payment-method').value = button.getAttribute('data-method');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const studentId = localStorage.getItem('userId');
  if (!studentId) {
    console.error('Student ID not found in local storage');
    return;
  }

  // Fetch student data from the backend
  fetch(`/api/student/${studentId}`)
    .then(response => response.json())
    .then(data => {
      if (data) {
        // Update the profile section with fetched data
        document.getElementById('profile-name').textContent = data.Stu_name;
        document.getElementById('profile-father-name').textContent = data.Stu_father_name;
        document.getElementById('profile-mother-name').textContent = data.Stu_mother_name;
        document.getElementById('profile-dob').textContent = data.Stu_DOB;
        document.getElementById('profile-email').textContent = data.Stu_Email;
        document.getElementById('profile-id').textContent = data.Stu_id;
        document.getElementById('profile-district').textContent = data.Stu_district;
        document.getElementById('profile-level').textContent = data.Stu_level;
        document.getElementById('profile-term').textContent = data.Stu_term;
        document.getElementById('profile-admission-year').textContent = data.Stu_admission_year;
        document.getElementById('profile-gender').textContent = data.Stu_gender;

        // Update the current semester section with fetched data
        document.getElementById('level').textContent = data.Stu_level;
        document.getElementById('term').textContent = data.Stu_term;

        // Fetch all student results to populate the graph
        fetchAllStudentResults(studentId);

        // Fetch current semester data
        fetch(`/api/current-semester/${studentId}`)
          .then(response => response.json())
          .then(courses => {
            if (courses) {
              const courseTableBody = document.querySelector('.course-table tbody');
              courseTableBody.innerHTML = ''; // Clear previous data

              courses.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td>${course.Course_code}</td>
                  <td>${course.Course_title}</td>
                  <td>${course.Faculty_names}</td>
                `;
                courseTableBody.appendChild(row);
              });
            } else {
              console.error('No courses found for the current semester');
            }
          })
          .catch(error => {
            console.error('Error fetching current semester data:', error);
          });



// Fetch and display book materials
document.getElementById('show-button').addEventListener('click', function() {
  fetch(`/api/book-materials/${studentId}`)
    .then(response => response.json())
    .then(data => {
      const bookList = document.getElementById('book-list');
      const leftBooks = document.querySelector('.left-books ul');
      const rightBooks = document.querySelector('.right-books ul');

      leftBooks.innerHTML = '';
      rightBooks.innerHTML = '';

      data.forEach((book, index) => {
        const bookItem = document.createElement('li');
        bookItem.textContent = `Course Code: ${book.Course_code} - ${book.Title} by ${book.Author}`;

        if (index % 2 === 0) {
          leftBooks.appendChild(bookItem);
        } else {
          rightBooks.appendChild(bookItem);
        }
      });

      toggleBooks(true);
    })
    .catch(error => {
      console.error('Error fetching book materials:', error);
    });
});



        // Fetch course registration data
        fetch(`/api/course-registration/${studentId}`)
          .then(response => response.json())
          .then(coursess => {
            if (coursess) {
              const enrollmentTableBody = document.querySelector('.enrollment-table tbody');
              enrollmentTableBody.innerHTML = ''; // Clear previous data

              coursess.forEach(coursed => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td>${coursed.Course_code}</td>
                  <td>${coursed.Course_title}</td>
                  <td>${coursed.Credit}</td>
                  <td>Regular</td>
                `;
                enrollmentTableBody.appendChild(row);
              });
            } else {
              console.error('No courses found for the course registration');
            }
          })
          .catch(error => {
            console.error('Error fetching course registration data:', error);
          });
      } else {
        console.error('Student data not found');
      }
    })
    .catch(error => {
      console.error('Error fetching student data:', error);
    });
});

function fetchAllStudentResults(studentId) {
  fetch(`/api/student-all-results/${studentId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(results => {
      if (results) {
        const allResults = {};
        results.forEach(result => {
          const term = `L${result.Level}T${result.Term}`;
          if (!allResults[term]) {
            allResults[term] = {
              courses: [],
              totalCredits: 0,
              totalCg: 0
            };
          }

          const percentage = (result.Marks / (result.Credit * 100)) * 100;
          let grade, cg;

          if (percentage >= 80) {
            grade = 'A+';
            cg = 4.0;
          } else if (percentage >= 75) {
            grade = 'A';
            cg = 3.75;
          } else if (percentage >= 70) {
            grade = 'A-';
            cg = 3.5;
          } else if (percentage >= 65) {
            grade = 'B+';
            cg = 3.25;
          } else if (percentage >= 60) {
            grade = 'B';
            cg = 3.0;
          } else if (percentage >= 55) {
            grade = 'B-';
            cg = 2.75;
          } else if (percentage >= 50) {
            grade = 'C+';
            cg = 2.5;
          } else if (percentage >= 45) {
            grade = 'C';
            cg = 2.25;
          } else if (percentage >= 40) {
            grade = 'D';
            cg = 2.0;
          } else {
            grade = 'F';
            cg = 0.0;
          }

          allResults[term].courses.push({
            code: result.Course_code,
            title: result.Course_title,
            credit: result.Credit,
            sessional: result.Credit < 3 ? 'Yes' : 'No',
            grade,
            cg
          });

          allResults[term].totalCredits += result.Credit;
          allResults[term].totalCg += cg * result.Credit;
        });

        Object.keys(allResults).forEach(term => {
          allResults[term].cgpa = allResults[term].totalCg / allResults[term].totalCredits;
        });

        // Sort terms to ensure they are in the correct order
        const sortedTerms = Object.keys(allResults).sort((a, b) => {
          const [aLevel, aTerm] = a.match(/\d+/g).map(Number);
          const [bLevel, bTerm] = b.match(/\d+/g).map(Number);
          return aLevel - bLevel || aTerm - bTerm;
        });

        // Create the CGPA chart with all results
        createChart(allResults, sortedTerms);
      } else {
        console.error('No results found for the student');
      }
    })
    .catch(error => {
      console.error('Error fetching student results:', error);
    });
}

function fetchStudentResults(studentId, level, term) {
  fetch(`/api/student-results/${studentId}/${level}/${term}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(results => {
      if (results) {
        const termResults = {
          courses: [],
          totalCredits: 0,
          totalCg: 0
        };

        results.forEach(result => {
          const percentage = (result.Marks / (result.Credit * 100)) * 100;
          let grade, cg;

          if (percentage >= 80) {
            grade = 'A+';
            cg = 4.0;
          } else if (percentage >= 75) {
            grade = 'A';
            cg = 3.75;
          } else if (percentage >= 70) {
            grade = 'A-';
            cg = 3.5;
          } else if (percentage >= 65) {
            grade = 'B+';
            cg = 3.25;
          } else if (percentage >= 60) {
            grade = 'B';
            cg = 3.0;
          } else if (percentage >= 55) {
            grade = 'B-';
            cg = 2.75;
          } else if (percentage >= 50) {
            grade = 'C+';
            cg = 2.5;
          } else if (percentage >= 45) {
            grade = 'C';
            cg = 2.25;
          } else if (percentage >= 40) {
            grade = 'D';
            cg = 2.0;
          } else {
            grade = 'F';
            cg = 0.0;
          }

          termResults.courses.push({
            code: result.Course_code,
            title: result.Course_title,
            credit: result.Credit,
            sessional: result.Credit < 3 ? 'Yes' : 'No',
            grade,
            cg
          });

          termResults.totalCredits += result.Credit;
          termResults.totalCg += cg * result.Credit;
        });

        termResults.cgpa = termResults.totalCg / termResults.totalCredits;

        // Display the results for the selected term
        displayTermResults(termResults, `L${level}T${term}`);
      } else {
        console.error('No results found for the student');
      }
    })
    .catch(error => {
      console.error('Error fetching student results:', error);
    });
}

function displayTermResults(termResults, term) {
  const resultTable = document.getElementById('result-table-body');
  resultTable.innerHTML = '';

  termResults.courses.forEach(course => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course.code}</td>
      <td>${course.title}</td>
      <td>${course.credit}</td>
      <td>${course.sessional}</td>
      <td>${course.grade}</td>
      <td>${course.cg}</td>
    `;
    resultTable.appendChild(row);
  });

  document.getElementById('term-name').textContent = `${term} Result`;
  document.getElementById('term-result').classList.remove('hidden');
}

function showTermResults(term) {
  const studentId = localStorage.getItem('userId');
  const [level, termNumber] = term.match(/\d+/g).map(Number);
  fetchStudentResults(studentId, level, termNumber);
}

// Chart.js setup
let chart = null;

function createChart(allResults, sortedTerms) {
  const cgpas = sortedTerms.map(term => allResults[term].cgpa);

  const ctx = document.getElementById('cgpa-graph').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sortedTerms,
      datasets: [{
        label: 'CGPA',
        data: cgpas,
        borderColor: '#f28c28',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'CGPA Trend Across Terms'
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Terms'
          }
        },
        y: {
          title: {
            display: true,
            text: 'CGPA'
          },
          min: 0,
          max: 4.0
        }
      }
    }
  });
}

function toggleBooks(show) {
  const bookList = document.getElementById('book-list');
  if (show) {
    bookList.classList.remove('hidden');
  } else {
    bookList.classList.add('hidden');
  }
}

// Payment
document.querySelectorAll('.payment-btn').forEach(button => {
  button.addEventListener('click', function () {
    document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    document.getElementById('payment-method').value = button.getAttribute('data-method');
  });
});

document.querySelector('.submit-btn').addEventListener('click', function (e) {
  e.preventDefault();

  const paymentMethod = document.querySelector('.payment-btn.selected').getAttribute('data-method');
  const transactionId = document.getElementById('transaction-id').value;
  const amount = document.getElementById('amount').value;
  const studentId = localStorage.getItem('userId'); // Assuming student ID is stored in local storage

  const data = {
    paymentMethod,
    transactionId,
    amount,
    studentId
  };

  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Registration successful');
      } else {
        alert('Registration failed: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});



