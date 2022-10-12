'use strict'

function onInit() {
    renderTodos()
}

function renderTodos(todos = getTodosForDisplay()) {
    console.log('aaa', todos)
    const selectedFilter = document.querySelector('.filter-select').value
    const strHTMLs = todos.length
        ? todos.map(todo => `
            <li class="${(todo.isDone) ? 'done' : ''} todo-item" onclick="onToggleTodo('${todo.id}')">
                ${todo.txt}
                <div class="created-at">Created at: ${todo.timeStamp}</div>
                <div class="importance"> importance:${todo.importance}</div>

                <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
            </li>
        `)
        : [`No ${selectedFilter} Todos`]

    document.querySelector('ul').innerHTML = strHTMLs.join('')
    document.querySelector('span.total').innerText = getTotalCount()
    document.querySelector('span.active').innerText = getActiveCount()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    console.log('Removing:', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    console.log('Toggling:', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=txt]')
    const elImportance = document.querySelector('[name=importance]')
    const txt = elTxt.value
    const importance = elImportance.value

    if (txt && importance) {
        addTodo(txt, importance)
    } else { return }

    renderTodos()
    elTxt.value = ''
}

//filter by status
function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos()
}

//filter by text
function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt)
    setFilterByTxt(txt)
    renderTodos()
}

const onSortItems = sortBy => {
    if (!sortBy) {
        return
    }

    const todos = sortBy === 'timeStamp'
        ? getTodosForDisplay().sort((todo1, todo2) =>
            todo1[sortBy] < todo2[sortBy] ? 1 : -1
        )
        : getTodosForDisplay().sort((todo1, todo2) =>
            todo1[sortBy] > todo2[sortBy] ? 1 : -1
        )

    renderTodos(todos)
}
