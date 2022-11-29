import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input'),
  messageEl: document.querySelector('textarea'),
};
getFormOutput();
refs.formEl.addEventListener('input', throttle(onSaveInputData, 500));
refs.formEl.addEventListener('submit', onSubmitForm);
/** functions */
function onSubmitForm(event) {
  if (formData.email && formData.message) {
    event.preventDefault();
    event.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
  } else {
    alert('Warning! Email or message must not be empty');
  }
}
function onSaveInputData(event) {
  const userMessage = event.target.value;
  const userEmail = event.target.name;
  formData[userEmail] = userMessage;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function getFormOutput() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedFormData) {
    refs.emailEl.value = savedFormData.email || '';
    refs.messageEl.value = savedFormData.message || '';
  }
}