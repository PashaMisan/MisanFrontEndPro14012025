import React, {Component} from "react";
import credentialManager from "../../utils/credentialManager.js";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: '',
            username: '',
            password: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const token = credentialManager.generateToken(this.state.username, this.state.password);

        if (token === credentialManager.getValidToken()) {
            this.props.onSuccessLogin(token);
        } else {
            this.setState({error: 'Невірний логін або пароль!'});
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h3 className="text-center mb-4">Вхід</h3>

                        {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}

                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Логін</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Увійти</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login
