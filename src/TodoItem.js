import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            this.props.removeTodo(this.props.index);
        } else {

        this.props.changeStatus(this.props.index, this.props.completed);

        this.setState({ delete: true });

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
    }

    render() {
        return (
            <div className="todo-item" onClick={this.handleClick}>
                <p>
                    <span className="todo-container">
                        <span className="check-container">
                            {this.props.completed === 1 && <i className="fas fa-check"></i>}
                        </span>
                        <span className={`${this.props.completed === 1&& 'completed'}`}>
                            <span className={`${this.props.completed === 1 ? 'todo-done' : 'todo'}`}>{this.props.todo}
                            </span>
                        </span>
                    </span>
                    <span onClick={() => this.props.removeTodo(this.props.index)}>
                        <i className="far fa-trash-alt trash"></i>
                    </span>
                </p>
            </div>
        );
    }
}

export default TodoItem;