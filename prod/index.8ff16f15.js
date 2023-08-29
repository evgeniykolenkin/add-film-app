// строковые константы
const e="changed",t="hidden",i=document.getElementById("add__app-form"),l=document.getElementById("add__app-input");document.getElementById("btn__add-film");const n=document.getElementById("add__app-list");let a=[];const c=localStorage.getItem("films");c&&(a=JSON.parse(c)).forEach(e=>d(e)),o();// функции----------------------------------------------
// получение родителя таргета
const s=e=>e.target.closest(".add__app-film");// рендер каждого нового фильма
function d(e){// формируем css class для состояния checked
let t=e.checked?"add__app-film checked":"add__app-film",i=e.changed?"hidden changed":"hidden",l=`
  <li id="${e.id}" class="${t}">
    <div class="col__left">
      <button data-action="checked" class="btn btn__check-film">
        <img src="resources/unchecked.png" alt="no" />
      </button>
      <form class="edit__film-form">
        <input class="film__title" readonly value="${e.text}" />
        <p class="${i}">изменено</p>
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
  </li>`;// добавляем ее на страницу
n.insertAdjacentHTML("beforeend",l)}// проверка количества объектов в массиве
function o(){if(0===a.length){let e=`
    <li id="empty__item-list" class="empty__item-list">
      <img src="resources/empty.png" alt="" />
    </li>`;n.insertAdjacentHTML("afterbegin",e)}if(a.length>0){let e=document.getElementById("empty__item-list");e&&e.remove()}}// сохранение массива films в LocalStorage
function r(){localStorage.setItem("films",JSON.stringify(a))}// обработчики событий----------------------------------
// на элемент списка/фильм (li)
n.addEventListener("click",// добавление обработчиков событий по клику на кнопки с data-action
function i(l){let n=l.target.dataset.action;switch(!0){// удаление фильма
// если click по дате "delete", то выполняем функцию
case"delete"===n:!// удаление фильма
function(e){let t=s(e),l=parseInt(t.id);// удаление элемента из массива с помощью фильтрации
a=a.filter(e=>e.id!==l),// сохраняем данные в хранилище
r(),// удаление на уровне разметки
// удаляем родителя таргета
t.remove(),console.log(a),// удаление слушателей с ЭЛЕМЕНТА, в нашем случае с li(далее parentNode)
function(e){e.removeEventListener("click",i)}(t),o()}(l);break;// редактируем название
// если click по дате "edit", то выполняем функцию
case"edit"===n:!// редатирование фильма
function(e){let i=s(e),l=i.querySelector(".btn__edit-film"),n=i.querySelector(".btn__save-edit"),a=i.querySelector(".film__title");n.classList.remove(t),l.classList.add(t),a.removeAttribute("readonly"),a.focus()}(l);break;// сохраняем название
// если click по дате "save", то выполняем функцию
case"save"===n:!// сохранение изменений
function(i){// аналогичная функция верхней
i.preventDefault();let l=s(i),n=l.querySelector(".btn__edit-film"),c=l.querySelector(".btn__save-edit"),d=l.querySelector(".hidden"),o=l.querySelector(".film__title");c.classList.add(t),n.classList.remove(t),o.setAttribute("readonly",!0);//изменяем состояние фильма на changed на уровне данных
let m=parseInt(l.id),u=a.find(e=>e.id===m);if(!o.value.trim())return alert("Введите название фильма"),u.changed=!1,d.classList.remove(e),o.value=u.initialText;u.initialText!==o.value?(// добавляем класс на уровне разметки
d.classList.add(e),// меняем статус на уровне данных
u.changed=!0,u.text=o.value.trim()):(// убираем класс на уровне разметки
d.classList.remove(e),// меняем статус на уровне данных
u.changed=!1,u.text=u.initialText),// сохраняем данные в хранилище
r()}(l);break;// отмечаем фильм просмотренным
// если click по дате "checked", то выполняем функцию
case"checked"===n:!// изменение свойств элемента списка на просмотренный(checked)
function(e){// тоже самое тут
// только меняем класс у элемента
let t=s(e);console.log(t);// изменение свойств(checked) на уровне данных
let i=parseInt(t.id),l=a.find(e=>e.id===i);l.checked=!l.checked,// сохраняем данные в хранилище
r(),// тоглим класс на уровне разметки
t.classList.toggle("checked")}(l);break;default:return}}),// добавление фильма
i.addEventListener("submit",// добавление фильма
function(e){// отменяем отправку формы
e.preventDefault();// достаем текст из инпута
// удаляя при этом пробелы в конце и начале строки
let t=l.value.trim();// проверяем, чтобы текст был введен
if(!t){alert("Введите название фильма");return}// создаём объект с данными из нового фильма
let i={id:Date.now(),initialText:t,text:t,checked:!1,changed:!1};// добавляем этот объект(фильм) в массив
a.push(i),console.log(a),// сохраняем данные в хранилище
r(),d(i),// очищаем инпут и оставляем фокус на нем
l.value="",l.focus(),o()});