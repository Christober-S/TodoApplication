// Shared script for login, register, and todos pages
const SERVER_URL = "http://localhost:8080";

function getToken() {
    return localStorage.getItem("token");
}

async function resolveResponse(response, defaultMessage) {
    if (response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            return response.json();
        }
        return response.text();
    }
    let message = defaultMessage;
    try {
        const data = await response.json();
        if (data && data.message) {
            message = data.message;
        }
    } catch (error) {
        // ignore parsing issues and use the default message
    }
    throw new Error(message);
}

// Login page logic
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => resolveResponse(response, "Login failed"))
        .then(data => {
            if (data && data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "todos.html";
            } else {
                throw new Error("Unexpected response from server");
            }
        })
        .catch(error => {
            alert(error.message);
        });
}

// Register page logic
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => resolveResponse(response, "Registration failed"))
        .then(() => {
            alert("Registration successful! Please log in.");
            window.location.href = "login.html";
        })
        .catch(error => {
            alert(error.message);
        });
}

// Todos page logic
function createTodoCard(todo) {
    const card = document.createElement("div");
    card.className = "todo-card";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = Boolean(todo.isCompleted);
    checkbox.addEventListener("change", function () {
        const updatedTodo = { ...todo, isCompleted: this.checked };
        updateTodoStatus(updatedTodo);
    });

    const title = document.createElement("span");
    title.className = "todo-title";
    title.textContent = todo.title;
    if (todo.isCompleted) {
        title.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", `Delete ${todo.title}`);
    deleteBtn.addEventListener("click", function () {
        deleteTodo(todo.id);
    });

    card.appendChild(checkbox);
    card.appendChild(title);
    card.appendChild(deleteBtn);

    return card;
}

function loadTodos() {
    const token = getToken();
    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    fetch(`${SERVER_URL}/api/v1/todo`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => resolveResponse(response, "Failed to load todos"))
        .then(todos => {
            const todoList = document.getElementById("todo-list");
            todoList.innerHTML = "";

            if (!todos || todos.length === 0) {
                todoList.innerHTML = `<p id="empty-message">No todos yet. Add one below!</p>`;
                return;
            }

            todos.forEach(todo => {
                todoList.appendChild(createTodoCard(todo));
            });
        })
        .catch(error => {
            const todoList = document.getElementById("todo-list");
            todoList.innerHTML = `<p class="todo-error">${error.message}</p>`;
        });
}

function addTodo() {
    const token = getToken();
    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    const input = document.getElementById("new-todo");
    const todoText = input.value.trim();
    if (!todoText) {
        input.focus();
        return;
    }

    fetch(`${SERVER_URL}/api/v1/todo/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title: todoText,
            isCompleted: false
        })
    })
        .then(response => resolveResponse(response, "Failed to add todo"))
        .then(() => {
            input.value = "";
            loadTodos();
        })
        .catch(error => {
            alert(error.message);
        });
}

function updateTodoStatus(todo) {
    const token = getToken();
    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    fetch(`${SERVER_URL}/api/v1/todo`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    })
        .then(response => resolveResponse(response, "Failed to update todo"))
        .then(() => {
            loadTodos();
        })
        .catch(error => {
            alert(error.message);
        });
}

function deleteTodo(id) {
    const token = getToken();
    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    fetch(`${SERVER_URL}/api/v1/todo/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => resolveResponse(response, "Failed to delete todo"))
        .then(() => {
            loadTodos();
        })
        .catch(error => {
            alert(error.message);
        });
}

// Page-specific initializations
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("todo-list")) {
        loadTodos();
    }
});
