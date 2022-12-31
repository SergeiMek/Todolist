import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistActionType, setTodolistsAC,
    todolistID1,
    todolistID2
} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TasksStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {/**/Dispatch} from "redux";
import {AppRootState} from "./store";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string,
    todolistId: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
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



export type actionsTypeTasks =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodolistActionType
    | SetTasksActionType

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: actionsTypeTasks): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {

            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLIST": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }

        default :
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (taskId: string, status: TasksStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then(res => {
        dispatch(setTasksAC(res.data.items, todolistId))
    })
}

export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
}

export const addTasksTC = (taskTitle: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, taskTitle).then(res => {
        dispatch(addTaskAC(res.data.data.item))
    })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status:TasksStatuses) => (dispatch: Dispatch, getState: () => AppRootState) => {

const task = getState().tasks[todolistId].find(t=>t.id === taskId)

    if(!task){
        console.warn("task not found in the state")
        return
    }

    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description:task.description,
        status: status,
        priority:task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    }

    todolistsAPI.updateTask(todolistId, taskId, apiModel).then(res => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId))
    })

}

export const updateTaskTitleTC = (taskId: string, todolistId: string, title:string) => (dispatch: Dispatch, getState: () => AppRootState) => {

    const task = getState().tasks[todolistId].find(t=>t.id === taskId)

    if(!task){
        console.warn("task not found in the state")
        return
    }

    const apiModel: UpdateTaskModelType = {
        title: title,
        description:task.description,
        status: task.status,
        priority:task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    }

    todolistsAPI.updateTask(todolistId, taskId, apiModel).then(res => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    })

}

