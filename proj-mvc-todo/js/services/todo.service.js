'use strict'

const STORAGE_KEY = 'todoDB'
var gFilterBy = {
    txt: '',
    status: '' //active
}
var gTodos

_createTodos()

function getTodosForDisplay() {
    var todos = gTodos

    if (gFilterBy.status) {
        todos = todos.filter(todo =>
            (todo.isDone && gFilterBy.status === 'done') ||
            (!todo.isDone && gFilterBy.status === 'active')
        )
    }
    todos = todos.filter(todo => todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase()))
    return todos
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)

    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt, importance) {
    // const todo = {
    //     id: _makeId(),
    //     txt,
    //     isDone: false
    // }
    // THE SAME
    const todo = _createTodo(txt,importance)

    gTodos.push(todo)
    _saveTodosToStorage()
    document.querySelector('.created-at').innerText = todo.timeStamp

}

function setFilter(status) {
    gFilterBy.status = status
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    return gTodos.filter(todo => !todo.isDone).length
}


function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)

    if (!todos || !todos.length) {
        todos = [
            {
                id: 't101',
                txt: 'Learn HTML',
                isDone: true
            },
            {
                id: 't102',
                txt: 'Master JS',
                isDone: false
            },
            {
                id: 't103',
                txt: 'Study CSS',
                isDone: false
            },
        ]
    }

    gTodos = todos
    _saveTodosToStorage()
}


function _createTodo(txt, importance) {

    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        timeStamp: new Date().toLocaleString('sv'),
        importance
    }
    console.log(todo);

    return todo
}


function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}

const setImportanceTodo = (importanceValue, todo) => {
    todo.importance = importanceValue
    console.log(importanceValue);
}

// setImportanceTodo