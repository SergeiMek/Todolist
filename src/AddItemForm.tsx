import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


export type AddItemPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm =React.memo( (props: AddItemPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
console.log("AddItemForm is called")
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
            setError(null)
        } else {
            setError("Title is required")

        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if (e.charCode === 13) {
            addTask()
        }
    }


    return <div>
        <div >
            {/* <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />*/}
            <TextField value={newTaskTitle}
                       label={"Type value"}
                       variant={"outlined"}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTask} color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    </div>

})