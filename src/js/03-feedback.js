const throttle = require('lodash.throttle');

function saveToLocalStorage(refs) {
  const state = {
    email: refs.emailInputEl.value,
    message: refs.messageInputEl.value,
  };
  localStorage.setItem(refs.localStorageKey, JSON.stringify(state));
}

const throttledSaveToLocalStorage = throttle(refs => {
  saveToLocalStorage(refs);
}, 500);

function loadFromLocalStorage(refs) {
  const stateString = localStorage.getItem(refs.localStorageKey);
  if (!stateString) return;
  const { email, message } = JSON.parse(stateString);
  refs.emailInputEl.value = email;
  refs.messageInputEl.value = message;
}

function clearForm(refs) {
  refs.emailInputEl.value = '';
  refs.messageInputEl.value = '';
}

const form = document.querySelector('.feedback-form');

const formRefs = {
  emailInputEl: form.querySelector('[name="email"]'),
  messageInputEl: form.querySelector('[name="message"]'),
  localStorageKey: 'feedback-form-state',
};

form.addEventListener('submit', function handleFormSubmit(evt) {
  evt.preventDefault();

  const state = {
    email: formRefs.emailInputEl.value,
    message: formRefs.messageInputEl.value,
  };

  console.log(state);

  clearForm(formRefs);
  localStorage.removeItem(formRefs.localStorageKey);
});

loadFromLocalStorage(formRefs);

const handleEmailInput = () => {
  throttledSaveToLocalStorage(formRefs);
};

const handleMessageInput = () => {
  throttledSaveToLocalStorage(formRefs);
};

formRefs.emailInputEl.addEventListener('input', handleEmailInput);

formRefs.messageInputEl.addEventListener('input', handleMessageInput);
