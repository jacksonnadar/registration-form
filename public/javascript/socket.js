const socket = io();
const wrapper = document.querySelectorAll(".wrapper");
socket.on("add-present", data => {
  const div = document.createElement("div");
  div.classList.add("user");
  div.setAttribute("id", data.id);
  div.innerHTML = `<h class="name">Name: ${data.name}</h>`;
  if (data.users === "student") {
    wrapper[1].prepend(div);
  } else {
    wrapper[0].prepend(div);
  }

  console.log(data);
});

socket.on("add-absent", data => {
  console.log(data);

  const div = document.getElementById(data.id);
  div.remove();
  console.log(div);
});
