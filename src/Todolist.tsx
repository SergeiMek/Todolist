import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {FilterValueType, TasksStateType} from "./AppWithRedux";

export type TasksType = {
    id: string,
    title: string
    isDone: boolean
}

type propsType = {
    title: string
    id: string
    changeFilter: (value: FilterValueType, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newValue: string, todolistId: string) => void
}


export const Todolist = (props: propsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[props.id])

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function changeTaskStatus(taskId: string, isDune: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDune, todolistId))
    }


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newValue: string) => props.changeTodolistTitle(newValue, props.id)

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
        <AddItemForm addItem={title=> dispatch(addTaskAC(title, props.id))}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const onRemoveHandler = () => {
                        removeTask(t.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

                        changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
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




