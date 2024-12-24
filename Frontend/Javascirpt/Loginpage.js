const logregBox=document.querySelector('.logreg-box');
const loginlink=document.querySelector('.login-link');
const rolelink=document.querySelector('.role-link');

rolelink.addEventListener('click',()=>{
    logregBox.classList.add('active');
});

loginlink.addEventListener('click',()=>{
    logregBox.classList.remove('active');
});