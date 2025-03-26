const item = document.getElementById("item");
const itemsList = document.querySelector(".container");
const addBtn = document.getElementById("add");
const removeBtn = document.getElementById("remove");

window.onload = function () {
  item.focus();
  loadItems();
};

addBtn.addEventListener("click", addItem);
removeBtn.addEventListener("click", removeItem);

//event listeners

item.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItem();
  }
});

itemsList.addEventListener("change", (event) => {
  if (event.target.classList.contains("toggle-checkbox")) {
    const paragraph = event.target.parentElement;
    paragraph.classList.toggle("completed-item");
    saveItems();
  }
});

//functions

function addItem() {
  const value = item.value.trim();
  if (value) {
    const itemCount = itemsList.querySelectorAll("p").length + 1;
    itemsList.insertAdjacentHTML(
      "beforeend",
      `<p>
      <input type="checkbox" class="toggle-checkbox">
      ${itemCount}. ${value}</p>`
    );
    saveItems();
    item.value = "";
    item.focus();
  }
}

function removeItem() {
  itemsList.lastElementChild?.remove();
  saveItems();
}

function saveItems() {
  const items = Array.from(itemsList.querySelectorAll("p")).map((p) => ({
    text: p.textContent,
    completed: p.classList.contains("completed-item"),
  }));
  localStorage.setItem("todoItems", JSON.stringify(items));
}

function loadItems() {
  let arrItems = JSON.parse(localStorage.getItem("todoItems")) || [];
  arrItems.forEach((item) => {
    const newItem = `
    <p class="${item.completed ? "completed-item" : ""}">
    <input type = "checkbox" class="toggle-checkbox" ${
      item.completed ? "checked" : ""
    }>
  ${item.text}
    </p>
    `;
    itemsList.insertAdjacentHTML("beforeend", newItem);
  });
}
