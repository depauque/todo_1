const item = document.getElementById("item");
const itemsList = document.querySelector(".container");
const addBtn = document.getElementById("add");
const removeBtn = document.getElementById("remove");

addBtn.addEventListener("click", addItem);
removeBtn.addEventListener("click", removeItem);

item.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItem();
  }
});

function addItem() {
  const value = item.value.trim();
  if (value) {
    itemsList.insertAdjacentHTML(
      "beforeend",
      `<p>${itemsList.querySelectorAll("p").length + 1}. ${value}</p>`
    );
    item.value = "";
    item.focus();
  }
}

function removeItem() {
  itemsList.lastElementChild?.remove();
}

window.onload = function () {
  item.focus();
};
