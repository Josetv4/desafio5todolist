//VARIABLES GLOBALES
//Elementos del DOM
const taskList = document.querySelector("#tableList");
const taskInput = document.querySelector("#newTask");
const btnAggTask = document.querySelector("#aggTask")
const statistics = document.querySelector("#statistics");
const statistics1 = document.querySelector("#statistics1");

let idCounter = 3;

//Array de tareas
//ARRAY (INCLUYE 3 TAREAS INICIALES)
const tasks = [
    {
        id: Date.now(),
        description: "Preparar desayuno Alondra",
        ID: 1,
        completed: false,
    },
    {
        id: Date.now(),
        description: "Dar Vitaminas a Alondra",
        ID: 2,
        completed: false,
    },
    {
        id: Date.now(),
        description: "Comprar alimentos para el Almuerzo",
        ID: 3,
        completed: false,
    }
];

// Función para renderizar la lista de tareas
function renderList() {
    // Limpia la lista antes de renderizarla nuevamente
    let html = "";
    // Recorro el array de tareas
    tasks.forEach(function(task) {
        html += ` 
            <tr>
                <td>
                    <p>${task.ID}</p>
                </td>
                <td>
                    <p ${task.completed 
                        ? 'class="taskColor"' 
                        : ''}>${task.description}</p>
                </td>
                <td>
                    <label for="checkbox${task.ID}">
                        <input type="checkbox" id="${task.ID}" ${task.completed ? 'checked' : ''}>
                    </label>
                </td>
                <td>
                    <button class="btn-2" onclick="deletes(${task.id})"><img class="trash" src="./assets/imgs/borrar.png" alt="x roja"></button>
                </td>
            </tr>`;
    });
    taskList.innerHTML = html;

    // Evento change a los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            const taskId = parseInt(this.id);
            const index = tasks.findIndex(task => task.ID === taskId);
            updateTaskStatus(index);
            renderList(); // Renderiza la lista después de cambiar el estado de la tarea
        });
    });

    updateStacts();
    concatenateCompletedTasks(tasks);
}


let updateStacts = ()=> {
    statistics.innerHTML = `
    <li class="total">Total tareas: <strong>${tasks.length}</strong></li>
    `;
}


//funcion para borrar tareas con el icono de basura
function deletes(id){
    const index = tasks.findIndex((ele) => ele.id == id);
    tasks.splice(index, 1);
    renderList(tasks);
    }

//Actualizo las tareas
function updateTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
}

function countCompletedTasks(tasks) {
    const completedTasks = tasks.filter(task => task.completed === true);
    return completedTasks.length;
}

//Fue lo unico que se me ocurrio para contar el total de tareas realizadas
function concatenateCompletedTasks(tasks) {
    const completedCount = countCompletedTasks(tasks);
    statistics1.innerHTML = `
    <li class="total">Total tareas realizadas: <strong>${completedCount}</strong></li>
    `;
}


//Botón para agregar una nueva tarea
btnAggTask.addEventListener("click", () => {
    const taskName = taskInput.value;
    idCounter++;
    
    // Crea un nuevo objeto de tarea y agregarlo al array
    if (taskName){
    tasks.push({id: Date.now(), description: taskName, ID: idCounter, completed: false})
    
    // Limpiar el campo de entrada de tarea
    taskInput.value = ""
    
    // Renderizar la lista actualizada
    renderList();
    }
});

// Renderizar la lista inicial
renderList();
