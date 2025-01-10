// const logregBox = document.querySelector('.logreg-box');
// const loginLink = document.querySelector('.login-link');
// const roleLink = document.querySelector('.role-link');
// const roleButtons = document.querySelectorAll('.role-btn');

// roleLink.addEventListener('click', () => {
//   logregBox.classList.add('active');
// });

// loginLink.addEventListener('click', () => {
//   logregBox.classList.remove('active');
// });

// roleButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     logregBox.classList.remove('active');
//   });
// });

const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const roleLink = document.querySelector('.role-link');
const roleButtons = document.querySelectorAll('.role-btn');
const loginForm = document.getElementById('login-form');
const roleInput = document.getElementById('role');

roleLink.addEventListener('click', () => {
  logregBox.classList.add('active');
});

loginLink.addEventListener('click', () => {
  logregBox.classList.remove('active');
});

roleButtons.forEach(button => {
  button.addEventListener('click', () => {
    logregBox.classList.remove('active');
    roleInput.value = button.getAttribute('data-role');
  });
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userId = document.getElementById('user-id').value;
  const password = document.getElementById('password').value;
  const role = roleInput.value;

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, password, role }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Login successful');
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);
      if (role === 'student') {
        window.location.href = '/studentpage.html';
      } else if (role === 'faculty') {
        window.location.href = '/Facultypage.html';
      }
      else if (role === 'admin') {
        window.location.href = '/Adminpage.html';
      }
    } else {
      alert('Login failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});