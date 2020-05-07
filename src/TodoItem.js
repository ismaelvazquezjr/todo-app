import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: false,
            delete: false
        }

        this.timerHandle = null;

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timerHandle);
    }

    handleClick() {
        if (this.state.delete) {
            this.props.removeTodo(this.props.id);
        }

        this.setState(currState => {
            return { completed: !currState.completed, delete: true };
        });

        // Ensures only one instance of this.timerHandle exists to prevent 
        // memory leaks.
        if (this.timerHandle === null) {
            this.timerHandle = setTimeout(() => {
                this.setState({
                    delete: false
                });
                this.timerHandle = null;
            }, 500);
        }
    }

    render() {
        return (
            <div className="todo-item" onClick={this.handleClick}>
                <p>
                    <span className="todo-container">
                        <span className="check-container">
                            {this.state.completed && <i className="fas fa-check"></i>}
                        </span>
                        <span className={`${this.state.completed && 'completed'}`}>
                            <span className={`${this.state.completed ? 'todo-done' : 'todo'}`}>{this.props.todo}
                            </span>
                        </span>
                    </span>
                    <span onClick={() => this.props.removeTodo(this.props.id)}>
                        <i className="far fa-trash-alt trash"></i>
                    </span>
                </p>
            </div>
        );
    }
}

export default TodoItem;