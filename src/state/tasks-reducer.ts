import {AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {TaskPriorities, TasksStatuses} from "../api/todolists-api";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string,
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    status: TasksStatuses
    taskId: string
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


type actionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

let initialState:TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: "CSS", status: TasksStatuses.Completed,addedDate:"",startDate:"",order:1,deadline:"",todoListId:todolistID1,priority:TaskPriorities.Low,description:""},
        {id: v1(), title: "JS", status: TasksStatuses.Completed,addedDate:"",startDate:"",order:1,deadline:"",todoListId:todolistID1,priority:TaskPriorities.Low,description:""},
        {id: v1(), title: "React", status: TasksStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",todoListId:todolistID1,priority:TaskPriorities.Low,description:""},
        {id: v1(), title: "Redux", status: TasksStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",todoListId:todolistID1,priority:TaskPriorities.Low,description:""}
    ],
    [todolistID2]: [
        {id: v1(), title: "Book", status: TasksStatuses.Completed,addedDate:"",startDate:"",order:1,deadline:"",todoListId:todolistID2,priority:TaskPriorities.Low,description:""},
        {id: v1(), title: "Mongo", status: TasksStatuses.Completed,addedDate:"",startDate:"",order:1,deadline:"",todoListId:todolistID2,priority:TaskPriorities.Low,description:""},
        {id: v1(), title: "Angular", status: TasksStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",todoListId:todolistID2,priority:TaskPriorities.Low,description:""},
    ]
}

export const tasksReducer = (state: TasksStateType =initialState, action: actionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {

            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, status: TasksStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",todoListId:action.todolistId,priority:TaskPriorities.Low,description:""}, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {

            return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id === action.taskId?{...t,status:action.status}:t)}
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state}
            let task = stateCopy[action.todolistId].find(f => f.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id=== action.taskId ?{...t,title:action.title}:t)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default :
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: TasksStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}


