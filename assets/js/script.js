import { saveToLocalStorage } from "../js/localStorage.js";

const addToDoForm = document.querySelector("#addToDoForm");
const todoList = document.querySelector("#todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
const date = new Date();

addToDoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const todo = formData.get("todo");
    const endDate = formData.get("endDate");
    const finallyEndDate = endDate.replaceAll("-", ".").split(".").reverse().join(".");
    
    const newTodo = {
        todo,
        starDate: date.toLocaleDateString(),
        finallyEndDate,
        isCompleted: false
    };

    todos.push(newTodo);
    saveToLocalStorage(todos, "todos");
    renderTodos();
    e.target.reset();
});

function renderTodos() {
    // Önce todoList'i temizle
    todoList.innerHTML = "";

    // Her bir görev için HTML içeriğini oluştur
    const todoItemsHTML = todos.map((task, index) => {
        // Tamamlandı durumuna göre stil belirle
        const textDecoration = task.isCompleted ? 'text-decoration: line-through;' : '';
        
        return `
            <div class="todoCard">
                <span style="${textDecoration}">${task.todo}</span>
                <button class="btns">Düzenle</button>
                <button class="deleteBtns btns" data-index="${index}">Sil</button>
                <button class="completeBtn btns" data-index="${index}">Tamamlandı</button>
            </div>
        `;
    });

    // Oluşturulan HTML içeriğini todoList'e ekle
    todoList.innerHTML = todoItemsHTML.join("");
}

// Silme butonlarına click event listener ekleme
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtns")) {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index)) {
            // Silme işlemi öncesinde onay iletişimi göster
            const confirmed = confirm("Bu görevi silmek istediğinize emin misiniz?");
            if (confirmed) {
                deleteTodoAndRender(index);
            }
        }
    }

    if (e.target.classList.contains("completeBtn")) {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index)) {
            toggleCompletion(index);
        }
    }
});

function deleteTodoAndRender(index) {
    todos.splice(index, 1);
    saveToLocalStorage(todos, "todos");
    renderTodos();
}

function toggleCompletion(index) {
    todos[index].isCompleted = !todos[index].isCompleted;
    saveToLocalStorage(todos, "todos");
    renderTodos();
}

renderTodos();