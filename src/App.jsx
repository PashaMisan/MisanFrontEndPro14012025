import Logout from "./components/Logout";
import Form from "./components/Form";
import List from "./components/List";
import credentialManager from "./utils/credentialManager.js";
import Login from "./components/Login";
import './App.css'

import React, {Component} from "react";
import {v4 as uuidv4} from 'uuid';
import store from "store2";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            todos: store.get('todos', [])
        };

        this.updateToken = this.updateToken.bind(this);
        this.removeToken = this.removeToken.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    updateToken(token) {
        sessionStorage.setItem('token', token);
        this.setState({token: token})
    }

    removeToken() {
        sessionStorage.removeItem('token');
        this.setState({token: ''});
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');

        if (credentialManager.isValidToken(token)) {
            this.updateToken(token)
        }
    }

    handleFormSubmit(title) {
        const newTodo = {id: uuidv4(), title, priority: 'low', status: 'todo'};
        const todos = [...this.state.todos, newTodo]

        store.set('todos', todos);
        this.setState({todos: todos});
    }

    handleDelete(id) {
        const todos = this.state.todos.filter(todo => todo.id !== id);

        store.set('todos', todos);
        this.setState({todos: todos});
    }

    handleUpdate(id, name, value) {
        const todos = this.state.todos;
        const todo = todos.find(item => item.id === id);

        todo[name] = value;
        store.set('todos', todos);
        this.setState({todos: todos});
    }

    render() {
        if (this.state.token) {
            return (
                <div className="container mt-5">
                    <div className="position-absolute top-0 end-0 m-3">
                        <Logout onClick={this.removeToken}/>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <Form onSubmit={this.handleFormSubmit}/>
                            <List todos={this.state.todos} onDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Login onSuccessLogin={this.updateToken}/>;
        }
    }
}

export default App
