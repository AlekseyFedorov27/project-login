const UI = {
  bodyLogin: document.querySelector('.login-body'),
  bodyRegister: document.querySelector('.register-body'),
  tabLogin: document.getElementById('nav-login-tab'),
  tabRegister: document.getElementById('nav-register-tab'),
  tabsNav: document.getElementById('nav-tab'),


  form: document.forms['loginForm'],
  inputEmail: document.getElementById('email'),
  inputPassword: document.getElementById('password'),

  formReg: document.forms['registerForm'],
  counrty: document.getElementById('country'),
  city: document.getElementById('city'),
  date_of_birth: document.getElementById('date_of_birth'),
  gender: document.querySelector('.custom-select'),
  
  
};

export default UI;
