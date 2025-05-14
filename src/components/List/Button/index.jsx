import {Component} from "react";

class Button extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <button className={this.props.className} onClick={this.handleClick}>
                {this.props.icon}
            </button>
        );
    }
}

export default Button;
