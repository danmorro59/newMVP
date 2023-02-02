const getTasks = async () => {
  const response = await fetch(`${API_URL}/list`)
  const data = await response.json()
  createTodoList(data)
}

const addTask = async (name) => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "task": `${name}`
        })
    }

    const response = await fetch(`${API_URL}/list`, options)
    const data = await response.json()
    if (data.validation) {
      createTodoList(data.data)
  }
}

const deleteTask = async (id) => {
  const options = {
    method: 'DELETE',
  }
  const response = await fetch(`${API_URL}/list/${id}`, options)
  const data = await response.json()
  if (data.validation) {
      getTasks()
  }
}

const updateTask = async (id, description) => {
  const options = {
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
    },
    body: JSON.stringify({
        "name": `${description}`
    })
  }

  await fetch(`${API_URL}/list/${id}`, options)
}

const createTodoList = async (data) => {
  const todoItemsContainer = document.getElementById('todo-items-container')
  todoItemsContainer.innerHTML = ''

  for (obj of data) {
    const todoItemContainer = document.createElement('div')
    todoItemContainer.setAttribute('id', `${obj.id}`)
    todoItemContainer.classList.add('todo-item-container')
    todoItemsContainer.appendChild(todoItemContainer)

    const todoTaskName = document.createElement('div')
    todoTaskName.classList.add('task-name')
    todoTaskName.setAttribute('contentEditable', 'true')
    todoTaskName.innerText = `${obj.task}`
    todoTaskName.addEventListener('input', (e) => {
      updateTask(e.currentTarget.parentElement.id, e.currentTarget.innerText)
    })
    todoItemContainer.appendChild(todoTaskName)

    const todoDeleteBtn = document.createElement('button')
    todoDeleteBtn.classList.add('delete-btn')
    todoDeleteBtn.innerHTML = `<i class="fa-solid fa-trash-can fa-2x"></i>`
    todoDeleteBtn.addEventListener('click', (e) => {
      deleteTask(e.currentTarget.parentElement.id)
    })
    todoItemContainer.appendChild(todoDeleteBtn)
  }
}

const API_URL = ''
const addBtn = document.getElementById('add-btn')

getTasks()

addBtn.addEventListener('click', () => {
  const todoInput = document.getElementById('todo-input')
  addTask(todoInput.value)
  todoInput.value = ''
})

