let todos = [];
const TODO_KEY = 'TODO_KEY';


const todosContainer = document.getElementById('days');
const nextTodo = document.querySelector('.todo__day')


function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = '';
  for (const index in todos) {
    const element = document.createElement('div');
    element.classList.add('todo');
    element.innerHTML = `<div class="todo__day">Дело ${Number(index) + 1}</div>
              <div class="todo__comment" ondblclick="editTodo(${index})">${todos[index]}</div>
              <button class="todo__delete" onclick="deleteTodo(${index})">
                <img src="./images/delete.svg" alt="Удалить дело ${index + 1}" />
              </button>`;
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
}


/* work with todos */
function addTodo(event) {
  event.preventDefault();
  
  const data = event.target['comment'].value
  if (!data) {
    return;
  }
  
  todos.push(data)
  event.target['comment'].value = '';
  
  rerender();
  saveData();
}

function editTodo(index) {
  const element = todosContainer.children[index];
  const commentElement = element.querySelector('.todo__comment');
  const oldComment = commentElement.innerHTML.trim();
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.value = oldComment;
  commentElement.innerHTML = '';
  commentElement.appendChild(inputElement);
  const buttonElement = document.createElement('button');
  buttonElement.innerHTML = 'Сохранить';
  buttonElement.onclick = function() {
    const newComment = inputElement.value.trim();
    if (newComment !== '') {
      todos[index] = newComment;
      commentElement.innerHTML = newComment;
    } else {
      commentElement.innerHTML = oldComment;
    }
  };
  commentElement.appendChild(buttonElement);
  inputElement.focus();
  inputElement.setSelectionRange(0, inputElement.value.length);
}


function deleteTodo(index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}


/* init */
(() => {
  loadData();
  rerender();
})();