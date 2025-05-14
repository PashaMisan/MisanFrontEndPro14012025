import React, {Component} from 'react';

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            text: props.text
        };
    }

    handleTextClick = () => {
        this.setState({editing: true});
    };

    handleInputChange = (e) => {
        this.setState({text: e.target.value});
    };

    handleBlurOrEnter = (event) => {
        if (event.type === 'blur' || event.key === 'Enter') {
            if (this.state.text.trim() === '') return;

            this.setState({editing: false});
            this.props.onUpdate(this.props.id, 'title', this.state.text);
        }
    };

    render() {
        const {editing, text} = this.state;

        if (editing) {
            return (
                <input
                    type="text"
                    value={text}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlurOrEnter}
                    onKeyDown={this.handleBlurOrEnter}
                    autoFocus
                />
            );
        } else {
            return (
                <span onClick={this.handleTextClick}>
                {text}
            </span>
            );
        }
    }

}

export default Input;
