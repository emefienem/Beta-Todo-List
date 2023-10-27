function showConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'block'
}
            
function hideConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}
            
window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load tasks from localStorage
            
    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create a new task
    function createTask(task) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');
                
        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
                
        task_el.appendChild(task_content_el);
                
        const task_el_input = document.createElement('input');
        task_el_input.classList.add('text');
        task_el_input.type = 'text';
        task_el_input.value = task;
        task_el_input.setAttribute('readonly', 'readonly');
                
        task_content_el.appendChild(task_el_input);
                
        const task_action_el = document.createElement('div');
        task_action_el.classList.add('actions');
                
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';
                
        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';
                
        const task_done_el = document.createElement('button');
        task_done_el.classList.add('done');
        task_done_el.innerText = 'Done';
                
        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_delete_el);
        task_action_el.appendChild(task_done_el);
                
        task_el.appendChild(task_action_el);
                
        list_el.appendChild(task_el);
                
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() === 'Edit') {
                task_el_input.removeAttribute('readonly');
                task_el_input.focus();
                task_edit_el.innerText = 'Save';
            } else {
                task_el_input.setAttribute('readonly', 'readonly');
                task_edit_el.innerText = 'Edit';
            }
            saveTasksToLocalStorage();
        });
                
        task_delete_el.addEventListener('click', () => {
            showConfirmationModal();
            // Handle delete action after confirmation
            document.getElementById('confirmButton').addEventListener('click', () => {
                tasks.splice(tasks.indexOf(task), 1); // Remove the task from the tasks array
                list_el.removeChild(task_el); // Remove the task element from the UI
                hideConfirmationModal();
                saveTasksToLocalStorage();
            });
            document.getElementById('cancelButton').addEventListener('click', hideConfirmationModal)
        });
                
        task_done_el.addEventListener('click', () => {
            task_done_el.innerText = 'Completed✔'
            task_edit_el.remove();
            saveTasksToLocalStorage();
        });
    }
                
    // Load existing tasks
    tasks.forEach(task => createTask(task));
                
    form.addEventListener('submit', (e) => {
        e.preventDefault();
                
        const task = input.value;
        if (!task) {
            alert('Please fill out the task');
            return;
        }
                
        createTask(task);
        tasks.push(task);
        saveTasksToLocalStorage();
                
        input.value = '';
    });
});
            