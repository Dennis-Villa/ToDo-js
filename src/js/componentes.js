
import {ToDo} from '../classes/toDo.class'
import {toDoList} from '../index'


// Referencias en el HTML
const divToDoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrarComp = document.querySelector('.clear-completed'); 
const ulFiltros     = document.querySelector('.filters');
const listFiltros   = document.querySelectorAll('.filtro');

// Funciones
export const crearToDoHTML = (toDo) => {

    const htmlToDo = `
    <li class="${(toDo.completado) ? 'completed' : ''}" data-id="${toDo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(toDo.completado) ? 'checked' : ''}>
            <label>${toDo.tarea}</label>
            <button class="destroy"></button>
        </div>
	    <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlToDo;

    divToDoList.append(div.firstElementChild);

    return div.firstElementChild;

};

// Eventos
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {

        const nuevoToDo = new ToDo(event.target.value);
        toDoList.nuevoToDo(nuevoToDo);

        crearToDoHTML(nuevoToDo);
        txtInput.value = '';

    }
})

divToDoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const toDoElemento = event.target.parentElement.parentElement;
    const toDoId = toDoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        toDoList.marcarCompletado(toDoId);
        toDoElemento.classList.toggle('completed');
    }
    if (nombreElemento.includes('button')) {
        toDoList.eliminarToDo(toDoId);
        divToDoList.removeChild(toDoElemento);
    }
});

btnBorrarComp.addEventListener('click', () => {
    toDoList.eliminarCompletados();

    for (let i = divToDoList.children.length - 1; i >= 0; i--) {

        const elemento = divToDoList.children[i];
        
        if (elemento.classList.contains('completed')) {
            divToDoList.removeChild(elemento);
        }

    }
});

ulFiltros.addEventListener('click', (event) => {
    
    const filtro = event.target.text;
    
    if(!filtro) {return;}

    listFiltros.forEach(filtro => filtro.classList.remove('selected'))
    event.target.classList.add('selected');

    for(const elemento of divToDoList.children) {

        const clases = elemento.classList;

        elemento.classList.remove('hidden');

        switch(filtro) {
    
            case 'Pendientes':
                if(clases.contains('completed')) {
                    clases.add('hidden');
                }
                break;

            case 'Completados':
                if(!clases.contains('completed')) {
                    clases.add('hidden');
                }
                break;

            
        }

    }

});