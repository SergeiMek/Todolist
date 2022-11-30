import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {FilterValueType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import { Delete} from "@mui/icons-material";

export type taskType = {
    id: string,
    title: string
    isDone: boolean
}

type propsType = {
    title: string
    id: string
    tasks: Array<taskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDune: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (newValue: string, taskId: string, todolistId: string) => void
    changeTodolistTitle: (newValue: string, todolistId: string) => void
}


export const Todolist = (props: propsType) => {

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => props.removeTodolist(props.id)
    const addTask = (title: string) => props.addTasks(title, props.id)
    const changeTodolistTitle = (newValue: string) => props.changeTodolistTitle(newValue, props.id)

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} >
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(newValue, t.id, props.id)
                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox  checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler} >
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }

        </div>
        <div>
            <Button  variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
            <Button color={"success"} variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}




