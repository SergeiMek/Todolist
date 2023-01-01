import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {ActionsType} from "./store";



///types
export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}
export type actionsTypeTodolists =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>


let initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionsTypeTodolists): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=>tl.id === action.id?{...tl,title:action.title}: tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=>tl.id === action.id?{...tl,filter:action.filter}:tl)
        case 'SET-TODOLIST': {
            return action.todolists.map(tl =>({...tl,filter:'all'}))}
        default :
            return state
    }
}


///action

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLIST", todolists} as const)

///thunk

export const fetchTodolistTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.getTodolists().then(res => {
            dispatch(setTodolistsAC(res.data))
        })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTodolist(todolistId).then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
    }
}

export const addTodolistTC = (todolistTitle: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.createTodolist(todolistTitle).then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
    }
}

export const changeTodolistTitleTC = (todolistId: string, todolistTitle: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolist(todolistId, todolistTitle).then(res => {
            dispatch(changeTodolistTitleAC(todolistId, todolistTitle))
        })
    }
}

