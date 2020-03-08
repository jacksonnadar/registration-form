const menu = document.getElementById("menu");
const nav = document.querySelector(".items");
const overlay = document.querySelector(".overlay");
const social = document.querySelector(".social");

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
