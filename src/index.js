import './styles.css';

import {ToDo, ToDoList} from './classes/index'
import { crearToDoHTML } from './js/componentes'

export const toDoList = new ToDoList();

toDoList.toDos.forEach(toDo => crearToDoHTML(toDo));