function toggleBooks(show) {
  const bookList = document.getElementById('book-list');
  const showButton = document.getElementById('show-button');
  
  if (show) {
    bookList.classList.remove('hidden');
    showButton.classList.add('hidden');
  } else {
    bookList.classList.add('hidden');
    showButton.classList.remove('hidden');
  }
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));
  
  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add('active');
}

function toggleSubMenu(submenuId) {
  const submenu = document.getElementById(submenuId);
  submenu.classList.toggle('hidden');
}


// Result part 


// const termData = {
//   L1T1: [
//     { code: "CSE101", title: "Programming Fundamentals", credit: 3, sessional: "No", grade: "A", cg: "3.7" },
//     { code: "CSE102", title: "Discrete Mathematics", credit: 3, sessional: "No", grade: "B", cg: "3.2" },
//     { code: "CSE101", title: "Programming Fundamentals", credit: 3, sessional: "No", grade: "A", cg: "3.7" },
//     { code: "CSE102", title: "Discrete Mathematics", credit: 3, sessional: "No", grade: "B", cg: "3.2" },
//     { code: "CSE101", title: "Programming Fundamentals", credit: 3, sessional: "No", grade: "A", cg: "3.7" },
//     { code: "CSE102", title: "Discrete Mathematics", credit: 3, sessional: "No", grade: "B", cg: "3.2" },
//     { code: "CSE101", title: "Programming Fundamentals", credit: 3, sessional: "No", grade: "A", cg: "3.7" },
//     { code: "CSE102", title: "Discrete Mathematics", credit: 3, sessional: "No", grade: "B", cg: "3.2" },
//     { code: "CSE101", title: "Programming Fundamentals", credit: 3, sessional: "No", grade: "A", cg: "3.7" },
//     { code: "CSE102", title: "Discrete Mathematics", credit: 3, sessional: "No", grade: "B", cg: "3.2" }
//   ],
//   L1T2: [
//     { code: "CSE201", title: "Data Structures", credit: 3, sessional: "No", grade: "A+", cg: "4.0" },
//     { code: "CSE202", title: "Digital Logic Design", credit: 3, sessional: "Yes", grade: "A", cg: "3.8" },
//     { code: "CSE101", title: "Programming Fundamentals", credit: 3, sessional: "No", grade: "A", cg: "3.7" },
//     { code: "CSE102", title: "Discrete Mathematics", credit: 3, sessional: "No", grade: "B", cg: "3.2" },
//     { code: "CSE101", title: "Programming Fundamentals", credit: 3, sessional: "No", grade: "A", cg: "3.7" },
//     { code: "CSE102", title: "Discrete Mathematics", credit: 3, sessional: "No", grade: "B", cg: "3.2" },
//     { code: "CSE101", title: "Programming Fundamentals", credit: 3, sessional: "No", grade: "A", cg: "3.7" },
//     { code: "CSE102", title: "Discrete Mathematics", credit: 3, sessional: "No", grade: "B", cg: "3.2" }
//   ],
//   // Add data for other terms here...
// };

// function showTermResults(term) {
//   const results = termData[term];
//   const termNameMap = {
//     L1T1: "Level 1, Term 1",
//     L1T2: "Level 1, Term 2",
//     L2T1: "Level 2, Term 1",
//     L2T2: "Level 2, Term 2",
//     L3T1: "Level 3, Term 1",
//     L3T2: "Level 3, Term 2",
//     L4T1: "Level 4, Term 1",
//     L4T2: "Level 4, Term 2"
//   };

//   document.getElementById("term-name").innerText = termNameMap[term];
//   const tableBody = document.getElementById("result-table-body");
//   tableBody.innerHTML = "";

//   results.forEach(row => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${row.code}</td>
//       <td>${row.title}</td>
//       <td>${row.credit}</td>
//       <td>${row.sessional}</td>
//       <td>${row.grade}</td>
//       <td>${row.cg}</td>
//     `;
//     tableBody.appendChild(tr);
//   });

//   document.getElementById("term-result").classList.remove("hidden");
// }

const cgpaData = {
  L1T1: {
    courses: [
      { code: 'CSE101', title: 'Introduction to Computer Science', credit: 3, sessional: 'Yes', grade: 'A', cg: 3.8 },
      { code: 'CSE102', title: 'Mathematics I', credit: 4, sessional: 'Yes', grade: 'B+', cg: 3.6 },
    ],
    cgpa: 3.7
  },
  L1T2: {
    courses: [
      { code: 'CSE201', title: 'Data Structures', credit: 3, sessional: 'No', grade: 'A-', cg: 3.7 },
      { code: 'CSE202', title: 'Mathematics II', credit: 4, sessional: 'Yes', grade: 'B', cg: 3.5 },
    ],
    cgpa: 3.6
  },
  L2T1: {
    courses: [
      { code: 'CSE301', title: 'Discrete Mathematics', credit: 3, sessional: 'Yes', grade: 'B+', cg: 3.6 },
      { code: 'CSE302', title: 'Computer Architecture', credit: 4, sessional: 'Yes', grade: 'A', cg: 3.8 },
    ],
    cgpa: 3.7
  },
  L2T2: {
    courses: [
      { code: 'CSE401', title: 'Algorithms', credit: 3, sessional: 'Yes', grade: 'A', cg: 3.9 },
      { code: 'CSE402', title: 'Operating Systems', credit: 4, sessional: 'No', grade: 'B+', cg: 3.6 },
    ],
    cgpa: 3.75
  },
  L3T1: {
    courses: [
      { code: 'CSE501', title: 'Database Systems', credit: 3, sessional: 'Yes', grade: 'B', cg: 3.4 },
      { code: 'CSE502', title: 'Software Engineering', credit: 4, sessional: 'Yes', grade: 'A', cg: 3.8 },
    ],
    cgpa: 3.6
  },
  L3T2: {
    courses: [
      { code: 'CSE601', title: 'Computer Networks', credit: 3, sessional: 'No', grade: 'A-', cg: 3.7 },
      { code: 'CSE602', title: 'Artificial Intelligence', credit: 4, sessional: 'Yes', grade: 'B+', cg: 3.6 },
    ],
    cgpa: 3.65
  },
  L4T1: {
    courses: [
      { code: 'CSE701', title: 'Web Technologies', credit: 3, sessional: 'Yes', grade: 'A', cg: 3.9 },
      { code: 'CSE702', title: 'Computer Graphics', credit: 4, sessional: 'No', grade: 'A', cg: 4.0 },
    ],
    cgpa: 3.95
  },
  L4T2: {
    courses: [
      { code: 'CSE801', title: 'Machine Learning', credit: 3, sessional: 'Yes', grade: 'A-', cg: 3.8 },
      { code: 'CSE802', title: 'Cloud Computing', credit: 4, sessional: 'Yes', grade: 'A', cg: 4.0 },
    ],
    cgpa: 3.9
  },
};

// Chart.js setup
let chart = null;

function createChart(cgpaData) {
  const terms = Object.keys(cgpaData);
  const cgpas = terms.map(term => cgpaData[term].cgpa);
  
  if (chart) {
    chart.destroy();
  }

  const ctx = document.getElementById('cgpa-graph').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: terms,
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

// Display selected term result
function showTermResults(term) {
  const termData = cgpaData[term];
  const resultTable = document.getElementById('result-table-body');
  resultTable.innerHTML = '';

  termData.courses.forEach(course => {
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

// Initial chart creation
createChart(cgpaData);
