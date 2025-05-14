import {Component} from "react";

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
        };

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <button className={this.props.className} onClick={this.handleClick}>
                {this.props.title}
            </button>
        );
    }
}

export default Button;
