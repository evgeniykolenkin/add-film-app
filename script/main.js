// строковые константы
const CHECKED_CLASS_NAME = "checked";

// константы из html
const formNode = document.getElementById("add__app-form");
const inputNode = document.getElementById("add__app-input");
const addBtnNode = document.getElementById("btn__add-film");
const listNode = document.getElementById("add__app-list");
const emptyElement = document.getElementById("empty__item-list");

// обработчики событий----------------------------------

// добавление фильма
formNode.addEventListener("submit", addFilm);

// удаление фильма
listNode.addEventListener("click", deleteFilm);

// отмечаем фильм просмотренным
listNode.addEventListener("click", checkedFilm);

// редактируем и сохраняем название
listNode.addEventListener("click", editFilm);
listNode.addEventListener("click", saveEdit);

// функции----------------------------------------------

function addFilm(e) {
  // отменяем отправку формы
  e.preventDefault();

  // достаем текст из инпута
  const filmText = inputNode.value;

  // формируем разметку для нового фильма
  const filmHTML = `
  <li class="add__app-film">
    <div class="col__left">
      <button data-action="checked" class="btn btn__check-film">
        <img src="resources/unchecked.png" alt="" />
      </button>
      <input class="film__title" readonly value="${filmText}" />
    </div>
    <div class="col__right">
      <button data-action="edit" class="btn btn__edit-film">
        <img src="resources/edit.png" class="edit__img" alt="" />
      </button>
      <button data-action="save" class="btn btn__save-edit hidden">
        <img
          src="resources/favicon.ico"
          class="save__img"
          alt=""
        />
      </button>
      <button data-action="delete" class="btn btn__delete-film">
        <img src="resources/btn-cross.png" alt="" />
      </button>
    </div>
  </li>`;

  // добавляем ее на страницу
  listNode.insertAdjacentHTML("beforeend", filmHTML);

  // очищаем инпут и оставляем фокус на нем
  inputNode.value = "";
  inputNode.focus();

  // убираем первый элемент списка с img пустого листа
  // когда есть хотя бы один добавленный фильм
  if (listNode.children.length > 1) {
    emptyElement.classList.add("hidden");
  }
}

function deleteFilm(e) {
  // проверяем если клик был не по кнопке удалить
  if (e.target.dataset.action !== "delete") return;

  // иначе
  // обращаемся к родителю таргета
  const parentNode = e.target.closest(".add__app-film");
  parentNode.remove();

  // проверка на количества элементов в списке фильмов
  if (listNode.children.length === 1) {
    emptyElement.classList.remove("hidden");
  }
}

function checkedFilm(e) {
  // тоже самое тут
  if (e.target.dataset.action !== "checked") return;

  const parentNode = e.target.closest(".add__app-film");
  parentNode.classList.toggle("checked");
}

function editFilm(e) {
  if (e.target.dataset.action === "edit") {
    const parentNode = e.target.closest(".add__app-film");

    // а тут мы обращаемся к элементу внутри родителя
    const editBtnNode = parentNode.querySelector(".btn__edit-film");
    const saveBtnNode = parentNode.querySelector(".btn__save-edit");
    const filmTitle = parentNode.querySelector(".film__title");

    saveBtnNode.classList.remove("hidden");
    editBtnNode.classList.add("hidden");
    filmTitle.removeAttribute("readonly");
  }
}

function saveEdit(e) {
  // аналогичная функция верхним
  if (e.target.dataset.action === "save") {
    const parentNode = e.target.closest(".add__app-film");
    const editBtnNode = parentNode.querySelector(".btn__edit-film");
    const saveBtnNode = parentNode.querySelector(".btn__save-edit");
    const filmTitle = parentNode.querySelector(".film__title");
    saveBtnNode.classList.add("hidden");
    editBtnNode.classList.remove("hidden");
    filmTitle.setAttribute("readonly", true);
  }
}
