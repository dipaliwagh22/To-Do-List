
document.addEventListener("DOMContentLoaded", loadTasks);
function loadTasks() {
    const todoList = document.getElementById("todo-list");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        const taskItem = createTaskElement(task, index);
        todoList.appendChild(taskItem);
    });
}

function createTaskElement(task, index) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
        <span class="item-text" contenteditable="true" oninput="editTask(${index}, this)">${task}</span>
        <button type="button" class="btn-success" onclick="deleteTask(${index})">Delete</button>
    `;
    return taskItem;
}

function addItem() {
    const newItemInput = document.getElementById("new-item");
    const taskText = newItemInput.value;

    if (taskText.trim() !== "") {
        const todoList = document.getElementById("todo-list");
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        const newTaskItem = createTaskElement(taskText, tasks.length - 1);
        todoList.appendChild(newTaskItem);
        newItemInput.value = "";
    }
}

function editTask(index, element) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index] = element.innerText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
    const todoList = document.getElementById("todo-list");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        todoList.innerHTML = "";
        tasks.forEach((task, i) => {
            const taskItem = createTaskElement(task, i);
            todoList.appendChild(taskItem);
        });
    }
}

