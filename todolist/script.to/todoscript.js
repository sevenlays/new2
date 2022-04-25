const   addTaskInput = document.querySelector('.input'),
        addTaskBtn = document.querySelector('.button'),
        todosWrapper = document.querySelector('.tasks-list'),
        importantBtn = document.querySelector('.btn-important');


        let tasks;
        !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
        let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
    this.important = false;
}
const createTemplate = (task,index) => {
    return `
        <li class="task-item ${task.completed ? 'checked' : ''} ${task.important ? 'important' : ''}"> ${task.description}
            <input class="checkbox-custom" onclick="completeTask(${index})" type="checkbox" ${task.completed ? 'checked' : ''}>

            <button onclick="importantTask(${index})"          class="btn-important">Imp</button>
            
            <button onclick="deleteTask(${index})" class="btn-delete">Del</button>
        </li>
    `;
};

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.important == true, item => item.completed == false);
    const completedTask = tasks.length && tasks.filter(item => item.important == false, item => item.completed == false);
    tasks = [...activeTasks,...completedTask];
    if (tasks.filter(item => item.completed == true)) {
        tasks = [...activeTasks,...completedTask];
    }
};




const fillHtmlList = () => {
     todosWrapper.innerHTML = "";
     if(tasks.length > 0) {
        filterTasks();
        
         tasks.forEach((item, index)=> {
            todosWrapper.innerHTML += createTemplate(item,index); 
         });
         todoItemElems = document.querySelectorAll('.task-item');
     }
};

fillHtmlList();

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    }else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
};

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(addTaskInput.value));
    updateLocal();
    fillHtmlList();
    addTaskInput.value = '';
});

const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },500);
};
const importantTask = index => {
    tasks[index].important = !tasks[index].important;
    if(tasks[index].important) {
        todoItemElems[index].classList.toggle('important');
    }
    updateLocal();
    fillHtmlList();
};


