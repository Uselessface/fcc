


// ****** FUNCTIONS **********

export function addItem(event) {
    event.preventDefault();
    const value =  groceryItem.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag){
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
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);
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
    else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert('item changed','success');
        editLocalStorage(editId, value);
        setBackToDefault();
    }
    else{
        displayAlert('Input can not be empty', 'danger')
    }
}
export function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 2000)
}
export function setBackToDefault() {
    groceryItem.value = '';
    editFlag = false;
    editId = '';
    addItemButton.textContent = 'add'
}

export function clearAll() {
    list.innerHTML = '';
    container.classList.remove('show-container')
    displayAlert('all items are cleared', 'danger');
    /*localStorage.removeItem('list')*/
    setBackToDefault();
}

export function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    groceryItem.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    addItemButton.textContent = `edit`
}

export function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id
    list.removeChild(element);
    if (list.children.length === 0){
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    removeFromLocalStorage(id)
}
