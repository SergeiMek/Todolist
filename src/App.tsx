import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValueType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Mongo", isDone: true},
            {id: v1(), title: "Angular", isDone: false},
        ]
    })

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: "completed"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    function removeTask(id: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id)
        setTasks({...tasks})

        //setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    function addTasks(title: string, todolistId: string) {
        tasks[todolistId] = [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]
        setTasks({...tasks})
        //setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }

    function changeTaskStatus(taskId: string, isDune: boolean, todolistId: string) {
        let task = tasks[todolistId].find(f => f.id === taskId)
        if (task) {
            task.isDone = isDune
        }
        setTasks({...tasks})
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(f => f.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        let todolistId = v1();
        setTodolists([{id: todolistId, title: title, filter: "all"}, ...todolists])
        setTasks({[todolistId]: [], ...tasks})

    }

    function changeTaskTitle(newValue: string, taskId: string, todolistId: string) {
        let task = tasks[todolistId].find(f => f.id === taskId)
        if (task) {
            task.title = newValue
        }
        setTasks({...tasks})
    }

    function changeTodolistTitle(newValue: string, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newValue
        }
        setTodolists([...todolists])
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container  style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {

                        let tasksForTodolist = tasks[tl.id];
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(f => f.isDone === true)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(f => f.isDone === false)
                        }

                        return <Grid item>
                            <Paper style={{padding: "20px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTasks={addTasks}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
