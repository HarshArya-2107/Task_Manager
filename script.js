const apiUrl = 'http://localhost:3000/tasks';

async function fetchTasks() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error:', error);
        alert('Could not fetch tasks. Please try again later.');
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        taskItem.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p><strong>Due Date:</strong> ${task.dueDate}</p>
            </div>
            <div class="task-actions">
                <button onclick="editTask('${task.id}')">Edit</button>
                <button onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

async function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('task-date').value;

    const task = { title, description, dueDate };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        if (!response.ok) throw new Error('Failed to add task');
        fetchTasks();
    } catch (error) {
        console.error('Error:', error);
        alert('Could not add task. Please try again later.');
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete task');
        fetchTasks();
    } catch (error) {
        console.error('Error:', error);
        alert('Could not delete task. Please try again later.');
    }
}

document.addEventListener('DOMContentLoaded', fetchTasks);
