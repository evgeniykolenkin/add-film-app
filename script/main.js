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
const hiddenElement = document.getElementById("empty__item-list");

// функции----------------------------------------------

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

// добавление фильма
function addFilm(e) {
  // отменяем отправку формы
  e.preventDefault();

  // достаем текст из инпута
  const filmText = inputNode.value;

  // проверяем, чтобы текст был введен
  if (!filmText) {
    alert("Введите название фильма");
    return;
  }

  // формируем разметку для нового фильма
  const filmHTML = `
  <li class="add__app-film">
    <div class="col__left">
      <button data-action="checked" class="btn btn__check-film">
        <img src="resources/unchecked.png" alt="" />
      </button>
      <form class="edit__film-form">
        <input class="film__title" readonly value="${filmText}" />
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

  // очищаем инпут и оставляем фокус на нем
  inputNode.value = "";
  inputNode.focus();

  // убираем первый элемент списка с img пустого листа,
  // когда есть хотя бы один добавленный фильм
  if (listNode.children.length > 1) {
    hiddenElement.classList.add("hidden");
  }
}

// получение родителя таргета
const getParentNode = (e) => e.target.closest(".add__app-film");

// удаление слушателей с ЭЛЕМЕНТА, в нашем случае с li(далее parentNode)
function removeFilmListeners(el) {
  el.removeEventListener("click", addFilmListeners);
}

// удаление фильма
function deleteFilm(e) {
  // удаляем родителя таргета
  const parentNode = getParentNode(e);
  parentNode.remove();
  removeFilmListeners(parentNode);

  // проверка количества элементов в списке фильмов
  if (listNode.children.length === 1) {
    hiddenElement.classList.remove(HIDDEN_CLASS_NAME);
  }
}

// изменение свойств элемента списка на просмотренный(checked)
function checkedFilm(e) {
  // тоже самое тут
  // только меняем класс у элемента
  const parentNode = getParentNode(e);
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

// обработчики событий----------------------------------

// на элемент списка/фильм (li)
listNode.addEventListener("click", addFilmListeners);

// добавление фильма
formNode.addEventListener("submit", addFilm);
