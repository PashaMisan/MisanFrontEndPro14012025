import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import credentialManager from "./utils/credentialManager.js";
import Login from "./components/Login";
import './App.css'

import React, {Component} from "react";
import Logout from "./components/Logout/index.jsx";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };

        this.updateToken = this.updateToken.bind(this);
        this.removeToken = this.removeToken.bind(this);
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

    render() {
        console.log('render')
        if (this.state.token) {
            return (
                <div className="container mt-5">
                    <div className="position-absolute top-0 end-0 m-3">
                        <Logout onClick={this.removeToken}/>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <h2 className="mb-4">Успішно!</h2>
                            <p className="lead">Ви успішно авторизувались на сайті.</p>
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
