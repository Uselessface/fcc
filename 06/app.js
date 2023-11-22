// ****** SELECT ITEMS **********
const form = document.querySelector('form');
const alert = document.querySelector('.alert');
const groceryItem = document.querySelector('#grocery');
const addItemButton = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearButton = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = '';


// ****** EVENT LISTENERS **********
window.addEventListener('DOMContentLoaded', renderApp())

form.addEventListener('submit', addItem);

clearButton.addEventListener('click', clearAll);



// ****** FUNCTIONS **********

function addItem(event) {
    event.preventDefault();
    const value = groceryItem.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createElement(id,value)
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('item changed', 'success');
        editLocalStorage(editId, value);
        setBackToDefault();
    } else {
        displayAlert('Input can not be empty', 'danger')
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 2000)
}

function setBackToDefault() {
    groceryItem.value = '';
    editFlag = false;
    editId = '';
    addItemButton.textContent = 'add'
}

function clearAll() {
    list.innerHTML = '';
    container.classList.remove('show-container');
    displayAlert('all items are cleared', 'danger');
    localStorage.removeItem('list');
    setBackToDefault();
}

function createElement(id,value) {
    // создаем элемент
    const element = document.createElement('article');
    //добавляем айдишник в дата-атрибут
    const attr = document.createAttribute('data-id');
    attr.value = id;
    //описываем элемент в разметке, добавляем классы и внутреннюю разметку
    element.classList.add('grocery-item');
    element.setAttributeNode(attr);
    element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
              <button class="edit-btn"><i class="fas fa-edit"></i></button>
              <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
`
    //цепляемся к кнопкам
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    //слушатели событий
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
    //добавляем элемент в конец списка
    list.appendChild(element)
    container.classList.add('show-container')
    //выводим сообщение об успехе
    displayAlert('item added', 'success');
    //добавляем в локал сторадж
    addToLocalStorage(id, value);
    //очищаем значение
    setBackToDefault()
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    groceryItem.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    addItemButton.textContent = `edit`
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    removeFromLocalStorage(id)
}


// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const item = {id, value};
    let items = getLocalStorage();
    items.push(item);
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items.map(item => {
        if (item.id === id) {
            item.value = value
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items.filter((el) => {
        if (el.id !== id) {
            return el
        }
    })
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];

}

// ****** RENDER APP **********
function renderApp() {
    let items = getLocalStorage();
    if (items.length > 0){
        items.forEach(item =>{
            createElement(item.id, item.value)
        })
        container.classList.add('show-container');
    }
}