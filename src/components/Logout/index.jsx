import React, {Component} from "react";

class Logout extends Component {
    render() {
        return (
            <button className="btn btn-danger mt-3" onClick={this.props.onClick}>Вийти</button>
        );
    }
}

export default Logout;