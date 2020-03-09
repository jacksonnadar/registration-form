const socket = io();

const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    console.log(button.dataset.arrived);

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
      console.log(json);

      if (json.err) console.log(json);
      button.classList.remove(remove);
      button.classList.add(add);
      button.innerHTML = add.toUpperCase();
      name = button.parentNode.querySelector(".name").dataset.name;
      if (button.dataset.user === "faculty") {
        arrived
          ? socket.emit("present", { name, id, users: "faculty" })
          : socket.emit("absent", { name, id });
        return;
      }
      if (button.dataset.user === "student") {
        arrived
          ? socket.emit("present", { name, id, users: "student" })
          : socket.emit("absent", { name, id });
      }
    });
}
