import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login, getCity, getCountries, register } from './services/auth.service';
import { notify } from './views/notifications';

const { form, inputEmail, inputPassword, bodyLogin, bodyRegister, tabLogin, tabRegister, tabsNav, counrty, city, formReg, date_of_birth, gender } = UI;

let inputs = [ inputEmail, inputPassword ]

//reset city
counrty.addEventListener('focus', ()=>{
  city.value = ''
})

// Tabs
tabsNav.addEventListener('click', e => {
  if(e.target.id === 'nav-login-tab'){
    bodyRegister.classList.add('hidden-form');
    bodyLogin.classList.remove('hidden-form');
    tabLogin.classList.add('color');
    tabRegister.classList.remove('color');
  }
  else if(e.target.id === 'nav-register-tab'){
    bodyLogin.classList.add('hidden-form');
    bodyRegister.classList.remove('hidden-form');
    tabLogin.classList.remove('color');
    tabRegister.classList.add('color');
  }
});

//autocomplite countrys
let countries = getCountries()
countries.then(countries=> {
  $(function() {
    $('#country').autocomplete({
            source: countries,
            select: function(event, ui) {

              let selCountry = event.toElement.text;
              let idCountry = countries.indexOf(selCountry)+1;
              // console.log(idCountry, selCountry)
              autocompleteCitys(idCountry);
              city.disabled = 0;
            }

    })
  });
})

//autocomplite citys
function autocompleteCitys(idCountry){
  let citys = getCity(idCountry);
  citys.then(citys => {
    // console.log(citys)
        $(function() { $('#city').autocomplete({ source: citys }) });
  })
}

//submit register form
formReg.addEventListener('submit', e => {
  e.preventDefault();
  onSubmitRegForm();
});


//generate user info
function onSubmitRegForm(){
 let inputsReg = formReg.querySelectorAll('.form-control');
 let userReg = {};
 inputsReg.forEach(item => {
    console.log(item.placeholder, item.value);
    let obj={};
    let key = item.placeholder
    obj[key] = item.value
    // userReg.push(obj)
    Object.assign(userReg, obj);
 })

 let [date_of_birth_year, date_of_birth_month, date_of_birth_day] = date_of_birth.value.split('-');

 userReg.date_of_birth_day = date_of_birth_day;
 userReg.date_of_birth_month = date_of_birth_month;
 userReg.date_of_birth_year = date_of_birth_year;
 userReg.gender_orientation = gender.value

 console.log(userReg);
 regUser(userReg);
}

async function regUser(user){
  try {
    await register(user);
    notify({ msg: 'register success', className: 'alert-success' });
  } catch (err) {
    notify({ mas: 'register faild', className: 'alert-danger' });
  }
}



// Events
form.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit();
});
inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

// Handlers
async function onSubmit() {
  const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    form.reset();
    notify({ msg: 'Login success', className: 'alert-success' });
  } catch (err) {
    notify({ mas: 'Login faild', className: 'alert-danger' });
  }
}
