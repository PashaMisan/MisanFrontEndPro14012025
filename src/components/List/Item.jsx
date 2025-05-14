import Button from "./Button";
import {Component} from "react";
import Form from "./Form";

class Item extends Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(id, name, value) {
        this.props.onUpdate(id, name, value);
    }

    render() {
        const id = this.props.todo.id;

        return (
            <li className="mb-3 p-3 border rounded shadow-sm bg-white">
                <div className="d-flex justify-content-between align-items-center">
                    <span className="me-3">{this.props.todo.title}</span>

                    <div className="d-flex align-items-center">
                        <Form todo={this.props.todo} onUpdate={this.handleUpdate} id={id}/>
                        <Button
                            className="btn btn-danger ms-2"
                            title="Видалити"
                            onClick={this.props.onDelete}
                            id={id}
                        />
                    </div>
                </div>
            </li>
        );
    }
}

export default Item;
