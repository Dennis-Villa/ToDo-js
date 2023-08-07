
import {ToDo} from './toDo.class'

export class ToDoList {

    constructor() {
        this.cargarLocalStorage();
    }

    nuevoToDo(toDo) {
        this.toDos.push(toDo);
        this.guardarLocalStorage();
    }

    eliminarToDo(id) {
        this.toDos = this.toDos.filter(toDo => (toDo.id != id));
        this.guardarLocalStorage();
    }

    eliminarCompletados() {
        this.toDos = this.toDos.filter(toDo => (!toDo.completado));
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {

        for ( const toDo of this.toDos ) {
            if ( toDo.id == id ) {
                toDo.completado = !toDo.completado;
                this.guardarLocalStorage();
                break;
            }
        }

    }

    guardarLocalStorage() {
        
        localStorage.setItem('toDo', JSON.stringify(this.toDos));

    }
    
    cargarLocalStorage() {

        this.toDos  = (localStorage.getItem('toDo')) 
                    ? JSON.parse(localStorage.getItem('toDo')) 
                    : [];

        this.toDos = this.toDos.map( obj => ToDo.fromJSON(obj));
    }

}
