import React, { Component } from 'react';
import DateForm from './DateForm';
import TodoItem from './TodoItem';
import emptyImage from "./todo-app-empty.png";
import {v4 as uuid} from 'uuid';
import './TodoApp.css';

class TodoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: "",
            todos: []
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.getTasks = this.getTasks.bind(this);
    }

    componentDidMount() {
        fetch("https://thegibson.directory:3000/get")
        .then(res => res.json())
        .then(data => {
            if (data === null) return;
            this.setState({todos: data});
        });
        setInterval(() => {
            this.getTasks();
        }, 5000);
    }

    getTasks() {
        fetch("https://thegibson.directory:3000/get")
        .then(res => res.json())
        .then(data => {
            if (data === null) data = [];
            this.setState({todos: data});
        });
    }

    changeHandler(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    updateStatus(idx, status) {
        const endpoint = "https://thegibson.directory:3000/update?id=" + this.state.todos[idx].id;
        fetch(endpoint)
        .then(() => {
            this.getTasks();
        });
    }

    removeTodo(idx) {
        const endpoint = "https://thegibson.directory:3000/delete?id=" + this.state.todos[idx].id;
        fetch(endpoint)
        .then(() => {
            this.getTasks();
        });
    }

    addItem() {
        const newTodoObj = {
            task: this.state.task,
            id: uuid(),
            created: new Date().getTime().toString(),
            completed: 0
        };
        this.postData(newTodoObj)
        .then(() => {
            this.setState({task: ""});
            this.getTasks();
        });
    }

    // Example POST method implementation:
    async postData(data) {
        // Default options are marked with *
        const response = await fetch("https://thegibson.directory:3000/add", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response; // parses JSON response into native JavaScript objects
    }

    render() {
        return (
            <div className="todo-app">
                <DateForm />
                <div className="todos-container">
                    {this.state.todos.length > 0 ? 
                        this.state.todos.map((todo, i)=> 
                        <TodoItem 
                        key={todo.id} 
                        todo={todo.task} 
                        index={i} id={todo.id} 
                        completed={todo.completed} 
                        changeStatus={this.updateStatus} 
                        removeTodo={this.removeTodo}/>) 
                        : <img className="empty-todo-image" src={emptyImage} alt="Blank todo list" />}
                </div>      
                <input type="text" placeholder="Add new todo item here..." name="task" id="new-todo" value={this.state.task} onChange={this.changeHandler} onKeyPress={evt => {if (evt.key === 'Enter') this.addItem()}} />
                <button className="add-button" onClick={this.addItem}><i className="fas fa-plus"></i></button>
            </div>
        )
    }
}

export default TodoApp;