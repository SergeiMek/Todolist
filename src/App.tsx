import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Container, Grid, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {fetchTodolistTC} from "./state/todolists-reducer";
import {useAppDispatch, useAppSelector} from "./state/store";
import {TodolistList} from './components/TodolistsList';
import {CustomizedSnackbars} from "./components/ErrorSnackbar";


function App() {

    console.log("App is called")

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status)

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
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistList/>
            </Container>
            <CustomizedSnackbars/>
        </div>
    );
}


export default App;
