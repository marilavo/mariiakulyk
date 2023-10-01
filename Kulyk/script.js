const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function updateLocalStorage() {
  const todos = [];
  const todoItems = list.getElementsByClassName(classNames.TODO_ITEM);

  for (const todoItem of todoItems) {
    const checkbox = todoItem.querySelector(`.${classNames.TODO_CHECKBOX}`);
    const text = todoItem.querySelector(`.${classNames.TODO_TEXT}`);

    todos.push({
      text: text.textContent,
      completed: checkbox.checked,
    });
  }

  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  const todoText = prompt("Enter a new case:");
  if (todoText) {
    const todoItem = document.createElement('li');
    todoItem.className = classNames.TODO_ITEM;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = classNames.TODO_CHECKBOX;
    checkbox.addEventListener('change', () => {
      updateUncheckedCount();
      updateLocalStorage(); 
    });

    const text = document.createElement('span');
    text.className = classNames.TODO_TEXT;
    text.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.className = classNames.TODO_DELETE;
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTodo);

    todoItem.appendChild(checkbox);
    todoItem.appendChild(text);
    todoItem.appendChild(deleteButton);

    list.appendChild(todoItem);

    updateItemCount();
    updateUncheckedCount();
    updateLocalStorage(); 
  }
}

function updateItemCount() {
  itemCountSpan.textContent = list.children.length;
}

function updateUncheckedCount() {
  const uncheckedItems = Array.from(list.getElementsByClassName(classNames.TODO_CHECKBOX)).filter(checkbox => !checkbox.checked).length;
  uncheckedCountSpan.textContent = uncheckedItems;
}

function deleteTodo() {
  const todoItem = this.parentElement;
  list.removeChild(todoItem);
  updateItemCount();
  updateUncheckedCount();
  updateLocalStorage(); 
}


document.addEventListener('DOMContentLoaded', () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    const todos = JSON.parse(savedTodos);
    todos.forEach(todo => {
      const todoItem = document.createElement('li');
      todoItem.className = classNames.TODO_ITEM;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = classNames.TODO_CHECKBOX;
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => {
        updateUncheckedCount();
        updateLocalStorage(); 
      });

      const text = document.createElement('span');
      text.className = classNames.TODO_TEXT;
      text.textContent = todo.text;

      const deleteButton = document.createElement('button');
      deleteButton.className = classNames.TODO_DELETE;
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', deleteTodo);

      todoItem.appendChild(checkbox);
      todoItem.appendChild(text);
      todoItem.appendChild(deleteButton);

      list.appendChild(todoItem);
    });

    updateItemCount();
    updateUncheckedCount();
  }
});
