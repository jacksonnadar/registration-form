const menu = document.getElementById("menu");
const nav = document.querySelector(".items");
const overlay = document.querySelector(".overlay");
const social = document.querySelector(".social");
const messages = document.querySelectorAll(".error");
const infos = document.querySelectorAll(".item__label");
const inputs = document.querySelectorAll(".item__input,.item__select");
const form = document.getElementById("form");
console.log(form);

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = form.name.value.trim();

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
    intrest: form.intrest.value,
    gender: form.gender.value
  };
  // register = JSON.stringify(register);
  console.log(register);
  fetch("/register", {
    method: "POST",

    body: JSON.stringify(register),

    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      console.log(json.name);
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

infos.forEach((info, index) => {
  info.addEventListener("click", messagePrinting.bind(null, index));
});
function messagePrinting(index) {
  return;
}

menu.addEventListener("click", () => {
  if (nav.classList.contains("items--active")) {
    nav.classList.remove("items--active");
    overlay.classList.remove("overlay--active");
    social.classList.remove("social--active");
  } else {
    nav.classList.add("items--active");
    overlay.classList.add("overlay--active");
    social.classList.add("social--active");
  }
});

overlay.addEventListener("click", () => {
  nav.classList.remove("items--active");
  overlay.classList.remove("overlay--active");
  social.classList.remove("social--active");
});
