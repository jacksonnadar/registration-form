const socket = io();
const buttons = document.querySelectorAll(".button");
const search = document.getElementById("search");
const search_results = document.querySelector(".search-results");
let studentnames = [];
let new_results = [];
let result_focus;

students.forEach(student => {
  studentnames.push(student.name);
});

search.addEventListener("input", e => {
  e.preventDefault();
  search_results.innerHTML = "";
  new_results = [];
  const input_value = e.target.value.trim();
  if (!input_value) return;

  studentnames.forEach(name => {
    var patt = new RegExp(`^(${input_value})`, "gi");
    var result = name.match(patt);

    if (result) new_results.push(name);
  });
  new_results.forEach(result => {
    const newelement = document.createElement("li");
    newelement.innerText = result;
    newelement.addEventListener("click", () => {
      const focus_to = document.getElementById(`btn-${result}`);
      focus_to.focus();
    });
    search_results.prepend(newelement);
  });
});

search.addEventListener("focus", e => {
  search_results.classList.add("search-results--active");
});
search.addEventListener("blur", e => {
  setTimeout(() => {
    search_results.classList.remove("search-results--active");
  }, 100);
});

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.arrived === "true") {
      updateArrival(button, false, "not-arrived", "arrived");
      button.dataset.arrived = "false";
      return;
    }
    if (button.dataset.arrived == "false") {
      updateArrival(button, true, "arrived", "not-arrived");
      button.dataset.arrived = "true";
    }
  });
});

function updateArrival(button, arrived, add, remove) {
  const id = button.parentNode.dataset.id;
  let path;
  if (button.dataset.user === "faculty") path = `/register/faculty/${id}`;
  if (button.dataset.user === "student") path = `/register/arrival/${id}`;

  fetch(path, {
    method: "PATCH",
    body: JSON.stringify({
      arrived: arrived
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      if (json.err) console.log(json);
      button.classList.remove(remove);
      button.classList.add(add);
      button.innerHTML = add.toUpperCase();
      name = button.parentNode.querySelector(".name").dataset.name;
      if (button.dataset.user === "faculty") {
        arrived
          ? socket.emit("present", { name, id, users: "faculty" })
          : socket.emit("absent", { name, id, users: "faculty" });
        return;
      }
      if (button.dataset.user === "student") {
        arrived
          ? socket.emit("present", { name, id, users: "student" })
          : socket.emit("absent", { name, id, users: "student" });
      }
    });
}
