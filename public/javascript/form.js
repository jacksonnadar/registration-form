const messages = document.querySelectorAll(".error");
const infos = document.querySelectorAll(".item__label");
const inputs = document.querySelectorAll(".item__input,.item__select");
const form = document.getElementById("form");

console.log(window.location.pathname);
let path;
// register = JSON.stringify(register);
if (window.location.pathname === "/") path = "/register";
if (window.location.pathname === "/register/faculty")
  path = "/register/faculty";
console.log(path);

form.addEventListener("submit", e => {
  e.preventDefault();
  if (!recaptcha) {
    return;
  }
  const name = form.name.value.toLowerCase().trim();
  console.log(form.email.value);

  if (!name) {
    form.name.value = "";
    form.name.focus();
    return;
  }
  let register = {
    name,
    email: form.email.value.trim(),
    age: form.age.value,
    qualification: form.qualification.value,
    gender: form.gender.value
  };

  console.log(register);
  fetch(path, {
    method: "POST",

    body: JSON.stringify(register),

    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      if (json.name) {
        const errmsg = form.name.parentNode.querySelector(".error");
        errmsg.dataset.message = json.name;
        form.name.focus();
        return;
      }
      window.location.href = "/register/thankyou";
    });
});

const duration = 10;
inputs.forEach((input, index) => {
  input.addEventListener("focus", activeMessage.bind(null, index));
  input.addEventListener("blur", deactiveMessage.bind(null, index));
});

function activeMessage(index) {
  const message = messages[index].dataset.message;

  let i = 0;
  const timeout = setInterval(() => {
    messages[index].innerHTML = messages[index].innerHTML + message[i];
    if (
      i == message.length - 1 ||
      message.length == messages[index].innerHTML.length
    ) {
      clearTimeout(timeout);
      return;
    }

    i++;
  }, duration);
}

function deactiveMessage(index) {
  let i = messages[index].innerHTML.length - 1;
  const timeout = setInterval(() => {
    messages[index].innerHTML = messages[index].innerHTML.slice(0, -1);
    if (i == 0) {
      clearTimeout(timeout);
      return;
    }
    i--;
  }, duration);
}
