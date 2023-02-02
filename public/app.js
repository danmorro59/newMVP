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
    todoDeleteBtn.innerText = 'Delete'
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

// const body = document.querySelector('body')
// const subBTN = document.querySelector('#submitBtn')
// const container = document.querySelector('.container')

// danTodo.addEventListener('click', getTodos)
//   async function getTodos(){
//       await fetch(`${API_URL}/list`, {
//         method: "GET",
//         headers: {"Content-Type": "application/json"}
//       }).then((response)=>response.json())
//         .then((data)=>{
//           displayTodos(data)
//         })
//       } 

//   subBTN.addEventListener('click',async(e)=>{
//     e.preventDefault()
//     const input = document.getElementById('inputVal').value
//       try {
//         const todo = input
//         const response = await fetch(`${API_URL}/list`, {
//           method: "POST",
//           headers: {"Content-Type": "application/json"},
//           body: JSON.stringify({todo})
//         }).then((response)=>response.json())
//       } catch (error) {
//         console.log(error)
//       }
//   })
  
//   function displayTodos(data){
//     for(let i = 0;i<data.length;i++){
//       const theInputs = document.createElement('p')
//       let currentTodo = data[i].todo
//       let currentId = data[i].id
//       theInputs.id = currentId
//       // console.log(current)
//       theInputs.textContent = currentTodo
//       const btn = document.createElement('button')
//       btn.textContent = 'delete'
//       btn.className = 'deleteBTN'
//       btn.id = currentId
//       container.append(theInputs)
//       theInputs.append(btn)
//       let deleteButt = document.getElementById(`${currentId}`)
//       deleteButt.addEventListener('click',async()=>{
//         let id = currentId
//         deleteButt.remove()
//         theInputs.remove()
//         try {
//           fetch(`http://localhost:4000/${id}`, {
//             method: 'DELETE',
//             headers: {
//               'Content-Type': 'application/json'
//               }
//             })
//         } catch (error) {
//           console.log(error)
//         }
//       })
//     }
//   }