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
        fetch("/get")
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
        fetch("/get")
        .then(res => res.json())
        .then(data => {
            if (data === null) return;
            this.setState({todos: data});
        });
    }

    changeHandler(evt) {
        this.setState({
            [evt.target.name]: [evt.target.value]
        });
    }

    updateStatus(idx, status) {
        const endpoint = "/update?id=" + this.state.todos[idx].id;
        fetch(endpoint)
        .then(() => {
            this.getTasks();
        })
    }

    removeTodo(idx) {
        let todos = [...this.state.todos];
        todos.splice(idx, 1);
        this.setState({ todos: todos});
    }

    addItem() {
        const newTodoObj = {
            task: this.state.task,
            id: uuid()
        };
        this.setState(currState => {
            return {
                todos: [...currState.todos, newTodoObj],
                task: ""
            }
        });
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