
export class ToDo {

    constructor(tarea) {
        this.tarea      = tarea;
        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();
    }

    static fromJSON ({tarea, id, completado, creado}) {
        const tempToDo = new ToDo(tarea);
        
        tempToDo.id = id;
        tempToDo.completado = completado;
        tempToDo.creado = creado;

        return tempToDo;
    }
    
}
