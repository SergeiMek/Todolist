import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../AppWithRedux";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id: string
}

type actionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export let todolistID1 = v1();
export let todolistID2 = v1();

let initialState:Array<TodolistType> = [
    {id: todolistID1, title: "What to learn", filter: "completed"},
    {id: todolistID2, title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: actionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: "all"},...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let stateCopy = [...state]
            let todolist = stateCopy.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return stateCopy
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let stateCopy = [...state]
            let todolist = stateCopy.find(t => t.id === action.id)
            if (todolist) {
                todolist.filter = action.filter

            }
            return stateCopy
        }
        default :
           return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}