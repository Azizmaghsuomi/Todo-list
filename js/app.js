document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.getElementById("add_btn");
    const modal = document.getElementById("todo_form");
    const todoInput = document.getElementById("todo_input");
    const todoContainer = document.querySelector(".todo-container");
  
    addBtn.addEventListener("click", function () {
      modal.classList.add("active");
    });
  
    todoInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addTodo();
      }
    });
  
    function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText !== "") {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo");
        todoItem.draggable = true;
        todoItem.textContent = todoText;
        const closeBtn = document.createElement("span");
        closeBtn.classList.add("close");
        closeBtn.textContent = "×";
        closeBtn.addEventListener("click", function () {
          todoItem.remove();
        });
        todoItem.appendChild(closeBtn);
        
        const status = document.querySelector(".status:nth-last-child(2)");
        status.appendChild(todoItem);
  
        modal.classList.remove("active");
        todoInput.value = "";
        
        // اضافه کردن رویدادهای درگ و دراپ
        todoItem.addEventListener("dragstart", dragStart);
        todoItem.addEventListener("dragend", dragEnd);
        for (let i = 0; i < todoContainer.children.length; i++) {
          const status = todoContainer.children[i];
          status.addEventListener("dragover", dragOver);
          status.addEventListener("dragenter", dragEnter);
          status.addEventListener("dragleave", dragLeave);
          status.addEventListener("drop", drop);
        }
      }
    }
  
    let draggedItem = null;
  
    function dragStart() {
      draggedItem = this;
      setTimeout(() => {
        this.style.display = "none";
      }, 0);
    }
  
    function dragEnd() {
      setTimeout(() => {
        draggedItem.style.display = "flex";
        draggedItem = null;
      }, 0);
    }
  
    function dragOver(e) {
      e.preventDefault();
    }
  
    function dragEnter(e) {
      e.preventDefault();
      this.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    }
  
    function dragLeave() {
      this.style.backgroundColor = "#f3f3f3";
    }
  
    function drop() {
      this.appendChild(draggedItem);
      this.style.backgroundColor = "#f3f3f3";
    }
  });
  