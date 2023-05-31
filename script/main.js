// строковые константы
const CHECKED_CLASS_NAME = "checked";
const LIST_EL_CLASS_NAME = "add__app-film";
const BTN_CHECK_CLASS_NAME = "btn__check-film";
const BTN_DELETE_CLASS_NAME = "btn__delete-film";

// константы из html
const inputNode = document.getElementById("add__app-input");
const addBtnNode = document.getElementById("btn__add-film");
const listNode = document.getElementById("add__app-list");
const btnCheck = document.querySelector(".btn__check-film");

// наша главная функция создания элемента списка
function createDeleteFilms() {
  // значения в инпуте будут равны названию фильма
  const titleFilm = inputNode.value;

  // создаем элемент li
  const li = document.createElement("li");
  li.className = LIST_EL_CLASS_NAME;
  li.innerHTML = "";

  // добавляем в список ul элемент li
  listNode.appendChild(li);
  saveData();

  // создаем кнопки
  const btnCheck = document.createElement("button");
  btnCheck.className = BTN_CHECK_CLASS_NAME;
  btnCheck.innerHTML = `
  <img src="resources/unchecked.png" alt="circle" />
  <h2>${titleFilm}</h2>`;

  const btnDelete = document.createElement("button");
  btnDelete.className = BTN_DELETE_CLASS_NAME;
  btnDelete.innerHTML = `
  <img src="resources/btn-cross.png" alt="cross" />`;

  // добавили в элемент li кнопки
  li.appendChild(btnCheck);
  li.appendChild(btnDelete);

  // вешаем обработчики событий на них
  // переключаем класс checked
  btnCheck.addEventListener("click", () => {
    li.classList.toggle(CHECKED_CLASS_NAME);
    saveData();
  });

  // удаляем один из элементов li
  btnDelete.addEventListener("click", () => {
    listNode.removeChild(li);
    saveData();
  });
}

// добавляем значение в инпуте inputNode через клик по кнопке addBtnNode
// привязываем тоже самое на keyup
addBtnNode.addEventListener("click", () => {
  if (!inputNode.value) {
    alert("Введите название фильма");
    return;
  }
  createDeleteFilms(inputNode.value);
  inputNode.value = "";
  saveData();
});

inputNode.addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    addBtnNode.click();
  }
});

// сохранение в localStorage
// не понимаю, почему я не могу изменять данные из localStorage

// function saveData() {
//   localStorage.setItem("data", listNode.innerHTML);
// }

// function getData() {
//   listNode.innerHTML = localStorage.getItem("data");
// }

// getData();
