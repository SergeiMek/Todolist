import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type setTodolistActionType = {
    type: 'SET-TODOLIST'
    todolists: Array<TodolistType>
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

export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

export type actionsTypeTodolistd =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodolistActionType

export let todolistID1 = v1();
export let todolistID2 = v1();

let initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionsTypeTodolistd): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist,filter:"all"}, ...state]
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
        case 'SET-TODOLIST': {
            return action.todolists.map(tl => {
                return {
                    ...tl, filter: "all"
                }
            })
        }
        default :
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

export const setTodolistsAC = (todolists: Array<TodolistType>): setTodolistActionType => {
    return {type: "SET-TODOLIST", todolists}
}

export const fetchTodolistTC =()=>{
   return (dispatch:Dispatch)=>{
       todolistsAPI.getTodolists().then(res=>{
           dispatch(setTodolistsAC(res.data))
       })
   }
}

export const removeTodolistTC =(todolistId: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.deleteTodolist(todolistId).then(res=>{
            dispatch(removeTodolistAC(todolistId))
        })}
}

export const addTodolistTC =(todolistTitle: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.createTodolist(todolistTitle).then(res=>{
            dispatch(addTodolistAC(res.data.data.item))
        })}
}

export const changeTodolistTitleTC =(todolistId: string,todolistTitle: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.updateTodolist(todolistId,todolistTitle).then(res=>{
            dispatch(changeTodolistTitleAC(todolistId,todolistTitle))
        })}
}