import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {changeTaskTitleAC} from "./state/tasks-reducer";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (taskId: string, isDune: boolean, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
}


export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    return <div>
        <Checkbox checked={props.task.isDone}
                  onChange={(e) => props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)}/>
        <EditableSpan title={props.task.title}
                      onChange={useCallback((newValue: string) => dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId)),[props.todolistId,props.task.id])}/>
        <IconButton onClick={() => props.removeTask(props.task.id, props.todolistId)}>
            <Delete/>
        </IconButton>
    </div>

})