const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const id = button.parentNode.dataset.id;

    fetch(`/register/arrival/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        arrived: true
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.err) console.log(json);
        button.classList.remove("not-arrived");
        button.classList.add("arrived");
        button.innerHTML = "Arrived";
      });
  });
});
