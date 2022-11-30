import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../App";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

type actionsType = RemoveTodolistActionType | AddTodolistActionType |ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: actionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: "all"}]
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
            throw new Error("I dont understand this action type")
    }
}

export const RemoveTodolistAC=(id:string):RemoveTodolistActionType=>{
    return {type: 'REMOVE-TODOLIST',id}
}

export const AddTodolistAC=(title:string):AddTodolistActionType=>{
    return {type: 'ADD-TODOLIST',title}
}

export const ChangeTodolistTitleAC=(id:string,title:string):ChangeTodolistTitleActionType=>{
    return {type: 'CHANGE-TODOLIST-TITLE',id,title}
}

export const ChangeTodolistFilterAC=(id:string,filter: FilterValueType):ChangeTodolistFilterActionType=>{
    return {type: 'CHANGE-TODOLIST-FILTER',id,filter}
}
