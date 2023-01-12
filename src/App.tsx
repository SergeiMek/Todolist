import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {fetchTodolistTC} from "./state/todolists-reducer";
import {useAppDispatch} from "./state/store";
import {TaskType} from './api/todolists-api';
import {TodolistList} from './components/TodolistsList';




function App() {

    console.log("App is called")

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

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
                <TodolistList/>
            </Container>
        </div>
    );
}


export default App;
