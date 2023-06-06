// строковые константы
const CHECKED_CLASS_NAME = "checked";
const HIDDEN_CLASS_NAME = "hidden";
const CHECKED_ACTION = "checked";
const DELETE_ACTION = "delete";
const EDIT_ACTION = "edit";
const SAVE_ACTION = "save";

// константы из html
const formNode = document.getElementById("add__app-form");
const inputNode = document.getElementById("add__app-input");
const addBtnNode = document.getElementById("btn__add-film");
const listNode = document.getElementById("add__app-list");

let films = [];
checkEmptyLIst();

films.forEach(function (film) {
  renderFilm(film);
});

// функции----------------------------------------------

// рендер каждого нового фильма
function renderFilm(film) {
  // формируем css class для состояния checked
  const cssClass = film.checked ? "add__app-film checked" : "add__app-film";

  // формируем разметку для нового фильма
  const filmHTML = `
  <li id="${film.id}" class="${cssClass}">
    <div class="col__left">
      <button data-action="checked" class="btn btn__check-film">
        <img src="resources/unchecked.png" alt="" />
      </button>
      <form class="edit__film-form">
        <input class="film__title" readonly value="${film.text}" />
        <button data-action="save" class="btn btn__save-edit hidden">
          <img src="resources/favicon.ico" class="save__img" alt="" />
        </button>
      </form>
    </div>
    <div class="col__right">
      <button data-action="edit" class="btn btn__edit-film">
        <img src="resources/edit.png" class="edit__img" alt="" />
      </button>
      <button data-action="delete" class="btn btn__delete-film">
        <img src="resources/btn-cross.png" alt="" />
      </button>
    </div>
  </li>`;

  // добавляем ее на страницу
  listNode.insertAdjacentHTML("beforeend", filmHTML);
}

// добавление фильма
function addFilm(e) {
  // отменяем отправку формы
  e.preventDefault();

  // достаем текст из инпута
  const filmText = inputNode.value;

  const newFilm = {
    id: Date.now(),
    text: filmText,
    checked: false,
  };

  // добавляем фильм в массив
  films.push(newFilm);

  // проверяем, чтобы текст был введен
  if (!filmText) {
    alert("Введите название фильма");
    return;
  }

  renderFilm(newFilm);

  // очищаем инпут и оставляем фокус на нем
  inputNode.value = "";
  inputNode.focus();

  checkEmptyLIst();
}

// получение родителя таргета
const getParentNode = (e) => e.target.closest(".add__app-film");

// удаление слушателей с ЭЛЕМЕНТА, в нашем случае с li(далее parentNode)
function removeFilmListeners(el) {
  el.removeEventListener("click", addFilmListeners);
}

// удаление фильма
function deleteFilm(e) {
  const parentNode = getParentNode(e);

  // удаление на уровне данных
  // определяем id тега li(элемента массива films)
  const id = parseInt(parentNode.id);

  // удаление элемента из массива с помощью фильтрации
  films = films.filter((film) => film.id !== id);

  // удаление на уровне разметки
  // удаляем родителя таргета
  parentNode.remove();

  removeFilmListeners(parentNode);

  checkEmptyLIst();
}

// изменение свойств элемента списка на просмотренный(checked)
function checkedFilm(e) {
  // тоже самое тут
  // только меняем класс у элемента
  const parentNode = getParentNode(e);

  // изменение свойств(checked) на уровне данных
  const id = parseInt(parentNode.id);
  const film = films.find((film) => film.id === id);
  film.checked = !film.checked;

  // тоглим класс на уровне разметки
  parentNode.classList.toggle(CHECKED_CLASS_NAME);
}

// редатирование фильма
function editFilm(e) {
  const parentNode = getParentNode(e);

  // а тут мы обращаемся к элементу внутри родителя
  const editBtnNode = parentNode.querySelector(".btn__edit-film");
  const saveBtnNode = parentNode.querySelector(".btn__save-edit");
  const filmTitle = parentNode.querySelector(".film__title");

  saveBtnNode.classList.remove(HIDDEN_CLASS_NAME);
  editBtnNode.classList.add(HIDDEN_CLASS_NAME);
  filmTitle.removeAttribute("readonly");
  filmTitle.focus();
}

// сохранение изменений
function saveEdit(e) {
  // аналогичная функция верхней
  e.preventDefault();
  const parentNode = getParentNode(e);

  const editBtnNode = parentNode.querySelector(".btn__edit-film");
  const saveBtnNode = parentNode.querySelector(".btn__save-edit");
  const filmTitle = parentNode.querySelector(".film__title");
  saveBtnNode.classList.add(HIDDEN_CLASS_NAME);
  editBtnNode.classList.remove(HIDDEN_CLASS_NAME);
  filmTitle.setAttribute("readonly", true);
}

// добавление обработчиков событий по клику на кнопки с data-action
function addFilmListeners(e) {
  const targetEl = e.target.dataset.action;
  switch (true) {
    // удаление фильма
    // если click по дате "delete", то выполняем функцию
    case targetEl === DELETE_ACTION:
      deleteFilm(e);
      break;
    // редактируем название
    // если click по дате "edit", то выполняем функцию
    case targetEl === EDIT_ACTION:
      editFilm(e);
      break;
    // сохраняем название
    // если click по дате "save", то выполняем функцию
    case targetEl === SAVE_ACTION:
      saveEdit(e);
      break;
    // отмечаем фильм просмотренным
    // если click по дате "checked", то выполняем функцию
    case targetEl === CHECKED_ACTION:
      checkedFilm(e);
      break;
    default:
      return;
  }
}

// проверка количества объектов в массиве
function checkEmptyLIst() {
  if (films.length === 0) {
    const emptyListHTML = `
    <li id="empty__item-list" class="empty__item-list">
      <img src="resources/empty.png" alt="" />
    </li>`;
    listNode.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (films.length > 0) {
    const emptyListElement = document.getElementById("empty__item-list");
    emptyListElement ? emptyListElement.remove() : null;
  }
}

// LocalStorage
// почти-почти-почти уже догнал, понял ,как сохранить весь html строкой ахахах
// осталось додумать до конца, как сохранить только данные массива, я уже близок

// обработчики событий----------------------------------

// на элемент списка/фильм (li)
listNode.addEventListener("click", addFilmListeners);

// добавление фильма
formNode.addEventListener("submit", addFilm);
