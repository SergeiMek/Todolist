import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState<Array<taskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValueType>("all")

    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    function addTasks(title: string) {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }

    function changeTaskStatus(taskId: string, isDune: boolean) {
        let task = tasks.find(f => f.id === taskId)
        if (task) {
            task.isDone = isDune
        }
        setTasks([...tasks])
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(f => f.isDone === true)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(f => f.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTasks={addTasks}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}


export default App;
