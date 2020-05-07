import React, { Component } from 'react';
import DateForm from './DateForm';
import TodoItem from './TodoItem';
import emptyImage from "./todo-app-empty.png";
import './TodoApp.css';

class TodoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newTodo: "",
            todos: []
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    changeHandler(evt) {
        this.setState({
            [evt.target.name]: [evt.target.value]
        });
    }

    removeTodo(idx) {
        let todos = [...this.state.todos];
        todos.splice(idx, 1);
        this.setState({ todos: todos});
    }

    addItem() {
        this.setState(currState => {
            return {
                todos: [...currState.todos, currState.newTodo],
                newTodo: ""
            }
        });
    }

    render() {
        return (
            <div className="todo-app">
                <DateForm />
                <div className="todos-container">
                    {this.state.todos.length > 0 ? this.state.todos.map((todo, i)=> <TodoItem key={i} todo={todo} id={i} removeTodo={this.removeTodo}/>) : <img className="empty-todo-image" src={emptyImage} alt="Blank todo list" />}
                </div>      
                <input type="text" placeholder="Add new todo item here..." name="newTodo" id="new-todo" value={this.state.newTodo} onChange={this.changeHandler} onKeyPress={evt => {if (evt.key === 'Enter') this.addItem()}} />
                <button className="add-button" onClick={this.addItem}><i className="fas fa-plus"></i></button>
            </div>
        )
    }
}

export default TodoApp;