import React from 'react';
import { useState } from 'react';
// import { useEffect } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import List from '@mui/material/List';
import TaskItemComponent from './TaskItemComponent';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './todo.scss';
import useLocalStorage from '../useLocalStorage.js';
function ToDo() {
    const sample = [
        {id:0,description: "Buy groceries"},
        {id:1,description: "Walk the dog"},
        {id:2,description: "Finish homework"},
    ];

    const [task,setTask] =   useState("");
    const [tasks,setTasks] = useState(sample);
    const [count,setCount] = useState(3);
    const [done,setDone]  = useState([]);
    
    //to add task into tasks
    const handleAdd = () => {
        if(task === "") return;

        setCount(prev=>prev+1);
        const newTask = {id:count,description:task}

        setTasks((tasks) => [...tasks,newTask]);    
        setTask("");
    }
    //to delete a task
    const handleDelete = (id) => {
        const uTasks = [...tasks].filter(task => task.id !== id);
        setTasks(uTasks);
    }
    //to enable drag and drop
    const handleDragDrop = (results) => {
        const {source, destination} = results;
        
        if(!destination)return;
        if(source.droppableId === destination.droppableId && source.index === destination.index) return;

        const itasks = [...tasks];
        const [utask] =itasks.splice(source.index,1);
        itasks.splice(destination.index,0,utask);
        setTasks(itasks);
    }
    //to keep track of delete,done,undone,total tasks
    const handleTaskStatus = (isDone,id) => {
        if (isDone === true){
            if (!done.includes(id)){
                setDone(prev => [...prev,id]);
            }
        }        
        else{
            if(done.includes(id)){
                const fdone = [...done].filter(tid => tid !== id);
                setDone(fdone);
            }
            if(isDone === null){
                handleDelete(id);
            }
        }
    }

    return (
    <div className="todo-wrapper">
        {/* <h1 id="todo_list">ToDo List</h1> */}
        <div className = "status-wrapper">
            <h2>Total: {tasks.length}</h2>
            <h2>Finished: {done.length}</h2>
            <h2>Remaining: {tasks.length - done.length}</h2>
        </div>
        
        <div className = "input-field">
            <TextField 
                onChange = {(e)=>setTask(e.target.value)}
                onKeyDown = {(e)=> e.key==='Enter' ? handleAdd() : null}
                value = {task}
                autoFocus={true}
                fullWidth label="Task"
                variant="outlined"
            />
            <IconButton onClick = {handleAdd} size="large">
                <AddIcon />
            </IconButton>
        </div>

        <div className = "task-list">
            <List>
            <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable droppableId='ROOT'>
                {(provided)=>(
                    <div {...provided.droppableProps} ref = {provided.innerRef}>
                        {tasks.map((task_item,index) => { return (
                            <Draggable draggableId={String(task_item.id)} key = {String(task_item.id)} index = {index}>
                                {(provided)=>(
                                    <TaskItemComponent 
                                        desc={task_item.description}
                                        ID = {task_item.id}
                                        key_id = {task_item.id}
                                        onTaskStatusChange = {(isFinished) => handleTaskStatus(isFinished,task_item.id)}
                                        provided={provided}
                                    />
                                )}
                            </Draggable>
                        )})}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
            </List>
        </div>
    </div>
  )
}

export default ToDo;