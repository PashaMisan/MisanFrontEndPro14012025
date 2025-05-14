import {Component} from "react";
import PRIORITIES from "../../../data/priorities.js";
import STATUSES from "../../../data/statuses.js";

class Form extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.props.onUpdate(this.props.id, name, value);
    };

    render() {
        const {priority, status} = this.props.todo;

        return (
            <>
                <select
                    name="priority"
                    value={priority}
                    onChange={this.handleChange}
                    className="form-select form-select-sm me-2"
                >
                    {PRIORITIES.map(({value, label}) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>

                <select
                    name="status"
                    value={status}
                    onChange={this.handleChange}
                    className="form-select form-select-sm me-2"
                >
                    {STATUSES.map(({value, label}) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </>
        );
    }
}

export default Form;