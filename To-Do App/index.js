    let tasks = [];

    function addTask() {
      const input = document.getElementById("taskInput");
      const text = input.value.trim();
      if (!text) return;
      const task = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date(),
        completedAt: null
      };
      tasks.push(task);
      input.value = "";
      renderTasks();
    }

    function toggleComplete(id) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date() : null;
        renderTasks();
      }
    }

    function deleteTask(id) {
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
    }

    function editTask(id) {
      const task = tasks.find(t => t.id === id);
      if (task.completed) return; // Prevent editing if task is completed
      const newText = prompt("Edit task:", task.text);
      if (newText !== null) {
        task.text = newText.trim();
        renderTasks();
      }
    }

    function renderTasks() {
      const pendingList = document.getElementById("pendingList");
      const completedList = document.getElementById("completedList");

      pendingList.innerHTML = "";
      completedList.innerHTML = "";

      tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
          <div>
            ${task.text}<br>
            <span class="timestamp">${task.completed ? `Completed: ${task.completedAt.toLocaleString()}` : `Added: ${task.createdAt.toLocaleString()}`}</span>
          </div>
          <div class="task-controls">
            <button onclick="toggleComplete(${task.id})">✔️</button>
            ${!task.completed ? `<button onclick="editTask(${task.id})">✏️</button>` : ""}
            <button onclick="deleteTask(${task.id})">🗑️</button>
          </div>
        `;
        if (task.completed) {
          completedList.appendChild(li);
        } else {
          pendingList.appendChild(li);
        }
      });
    }