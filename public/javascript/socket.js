const socket = io();
const faculty_counter = document.getElementById("faculty-counter");

const student_counter = document.getElementById("student-counter");
const wrapper = document.querySelectorAll(".wrapper");
socket.on("add-present", data => {
  const div = document.createElement("div");
  div.classList.add("user");
  div.setAttribute("id", data.id);
  div.innerHTML = `<h class="name">Name: ${data.name}</h>`;
  if (data.users === "student") {
    const current_count = parseInt(student_counter.dataset.count) + 1;
    student_counter.innerHTML = current_count;
    student_counter.dataset.count = current_count;
    wrapper[1].prepend(div);
  } else {
    const current_count = parseInt(faculty_counter.dataset.count) + 1;
    faculty_counter.innerHTML = current_count;
    faculty_counter.dataset.count = current_count;
    wrapper[0].prepend(div);
  }
});

socket.on("add-absent", data => {
  const div = document.getElementById(data.id);
  div.remove();
  if (data.users === "student") {
    const current_count = parseInt(student_counter.dataset.count) - 1;
    student_counter.innerHTML = current_count;
    student_counter.dataset.count = current_count;
  } else {
    const current_count = parseInt(faculty_counter.dataset.count) - 1;
    faculty_counter.innerHTML = current_count;
    faculty_counter.dataset.count = current_count;
  }
});
