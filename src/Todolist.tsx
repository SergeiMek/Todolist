import React, {ChangeEvent, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {FilterValueType, TasksStateType} from "./AppWithRedux";
import {changeTodolistFilterAC} from "./state/todolists-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string,
    title: string
    isDone: boolean
}

type propsType = {
    title: string
    id: string
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newValue: string, todolistId: string) => void
}


export const Todolist = React.memo((props: propsType) => {
        console.log("Todolist is called")
        const dispatch = useDispatch();
        const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

        const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
            dispatch(changeTodolistFilterAC(todolistId, value))
        }, [])


        const removeTask = useCallback((id: string, todolistId: string) => {
            dispatch(removeTaskAC(id, todolistId))
        }, [])

        const changeTaskStatus = useCallback((taskId: string, isDune: boolean, todolistId: string) => {
            dispatch(changeTaskStatusAC(taskId, isDune, todolistId))
        }, [])


        const onAllClickHandler = useCallback(() => changeFilter("all", props.id), [changeFilter, props.id])
        const onActiveClickHandler = useCallback(() => changeFilter("active", props.id), [changeFilter, props.id])
        const onCompletedClickHandler = useCallback(() => changeFilter("completed", props.id), [changeFilter, props.id])
        const removeTodolist = () => props.removeTodolist(props.id)
        const changeTodolistTitle = useCallback((newValue: string) => props.changeTodolistTitle(newValue, props.id), [props.changeTodolistTitle, props.id])

        let tasksForTodolist = tasks;
        if (props.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(f => f.isDone === true)
        }
        if (props.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(f => f.isDone === false)
        }

        return <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={useCallback(title => dispatch(addTaskAC(title, props.id)), [props.id])}/>
            <div>
                {
                    tasksForTodolist.map(t => <Task task={t} todolistId={props.id} changeTaskStatus={changeTaskStatus} removeTask={removeTask} key={t.id}/>)
                }

            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"success"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    }
)





