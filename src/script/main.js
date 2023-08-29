// строковые константы
const CHECKED_CLASS_NAME = "checked";
const CHANGED_CLASS_NAME = "changed";
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

//подгружаем базу данных
createFirestore("films").pull();

// const filmsFromStorage = localStorage.getItem("films");
// if (filmsFromStorage) {
//   films = JSON.parse(filmsFromStorage);
//   films.forEach((film) => renderFilm(film));
// }
// countFilmsElements();

// сохранение массива films в LocalStorage
// function saveFilmsToStorage() {
//   localStorage.setItem("films", JSON.stringify(films));
// }

// функции----------------------------------------------

//создание хранилища данных
//пока локалСторадж
function createFirestore(key) {
  return {
    key,
    //метод для получения данных из хранилища
    pull: function () {
      const data = localStorage.getItem(key);

      if (data) {
        films = JSON.parse(data);
        films.forEach((film) => renderFilm(film));
      }

      countFilmsElements();
    },
    //метод для создание ячейки данных в хранилище
    push: function (films) {
      localStorage.setItem(key, JSON.stringify(films));
    },
  };
}

// получение родителя таргета
const getParentNode = (e) => e.target.closest(".add__app-film");

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

// удаление слушателей с ЭЛЕМЕНТА, в нашем случае с li(далее parentNode)
function removeFilmListeners(el) {
  el.removeEventListener("click", addFilmListeners);
}

// рендер каждого нового фильма
function renderFilm(film) {
  // формируем css class для состояния checked
  const cssClassChecked = film.checked
    ? "add__app-film checked"
    : "add__app-film";
  const cssClassChanged = film.changed ? "hidden changed" : "hidden";
  // формируем разметку для нового фильма
  const filmHTML = `
  <li id="${film.id}" class="${cssClassChecked}">
    <div class="col__left">
      <button data-action="checked" class="btn btn__check-film">
        <img src="resources/unchecked.png" alt="no" />
      </button>
      <form class="edit__film-form">
        <input class="film__title" readonly value="${film.text}" />
        <p class="${cssClassChanged}">изменено</p>
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
  // удаляя при этом пробелы в конце и начале строки
  const filmText = inputNode.value.trim();

  // проверяем, чтобы текст был введен
  if (!filmText) {
    alert("Введите название фильма");
    return;
  }

  // создаём объект с данными из нового фильма
  const newFilm = {
    id: Date.now(),
    initialText: filmText,
    text: filmText,
    checked: false,
    changed: false,
  };

  // добавляем этот объект(фильм) в массив
  films.push(newFilm);
  console.log(films);

  // сохраняем данные в хранилище
  createFirestore("films").push(films);

  renderFilm(newFilm);

  // очищаем инпут и оставляем фокус на нем
  inputNode.value = "";
  inputNode.focus();

  countFilmsElements();
}

// удаление фильма
function deleteFilm(e) {
  const parentNode = getParentNode(e);

  // удаление на уровне данных
  // определяем id тега li(элемента массива films)
  const id = parseInt(parentNode.id);

  // удаление элемента из массива с помощью фильтрации
  films = films.filter((film) => film.id !== id);

  // сохраняем данные в хранилище
  createFirestore("films").push(films);

  // удаление на уровне разметки
  // удаляем родителя таргета
  parentNode.remove();
  console.log(films);

  removeFilmListeners(parentNode);

  countFilmsElements();
}

// изменение свойств элемента списка на просмотренный(checked)
function checkedFilm(e) {
  // тоже самое тут
  // только меняем класс у элемента
  const parentNode = getParentNode(e);
  console.log(parentNode);

  // изменение свойств(checked) на уровне данных
  const id = parseInt(parentNode.id);
  const film = films.find((film) => film.id === id);
  film.checked = !film.checked;

  // сохраняем данные в хранилище
  createFirestore("films").push(films);

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
  const textHiddenNode = parentNode.querySelector(".hidden");
  const filmTitle = parentNode.querySelector(".film__title");
  saveBtnNode.classList.add(HIDDEN_CLASS_NAME);
  editBtnNode.classList.remove(HIDDEN_CLASS_NAME);
  filmTitle.setAttribute("readonly", true);

  //изменяем состояние фильма на changed на уровне данных
  const id = parseInt(parentNode.id);
  const film = films.find((film) => film.id === id);

  if (!filmTitle.value.trim()) {
    alert("Введите название фильма");
    film.changed = false;
    textHiddenNode.classList.remove(CHANGED_CLASS_NAME);
    return (filmTitle.value = film.initialText);
  }
  // если изначальный текст не равен новому
  if (film.initialText !== filmTitle.value) {
    // добавляем класс на уровне разметки
    textHiddenNode.classList.add(CHANGED_CLASS_NAME);
    // меняем статус на уровне данных
    film.changed = true;
    film.text = filmTitle.value.trim();
  } else {
    // убираем класс на уровне разметки
    textHiddenNode.classList.remove(CHANGED_CLASS_NAME);
    // меняем статус на уровне данных
    film.changed = false;
    film.text = film.initialText;
  }

  // сохраняем данные в хранилище
  createFirestore("films").push(films);
}

// проверка количества объектов в массиве
function countFilmsElements() {
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

// обработчики событий----------------------------------

// на элемент списка/фильм (li)
listNode.addEventListener("click", addFilmListeners);

// добавление фильма
formNode.addEventListener("submit", addFilm);
