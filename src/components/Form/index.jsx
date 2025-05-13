import React, {Component} from "react";

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state.title);

        this.setState({
            title: ""
        })
    }

    handleInputChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    render() {
        return (
            <form className="d-flex justify-content-center mt-4" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    className="form-control me-2"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    required
                />
                <button type="submit" className="btn btn-primary">Додати</button>
            </form>
        );
    }
}

export default Form
