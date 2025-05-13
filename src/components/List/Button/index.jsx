import {Component} from "react";

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            isDisabled: false,
        };

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }


    handleDeleteClick() {
        debugger
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <button
                className={this.props.className}
                onClick={this.handleDeleteClick}
            >
                {this.props.title}
            </button>
        );
    }
}

export default Button;
