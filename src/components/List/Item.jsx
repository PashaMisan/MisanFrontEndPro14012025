import Button from "./Button";
import {Component} from "react";
import Form from "./Form";
import Input from "./Input/index.jsx";

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
                    <div className="me-3">
                        <Input text={this.props.todo.title} onUpdate={this.props.onUpdate} id={id}/>
                    </div>
                    <div className="d-flex align-items-center">
                        <Form todo={this.props.todo} onUpdate={this.handleUpdate} id={id}/>
                        <Button
                            className="btn btn-danger ms-2"
                            onClick={this.props.onDelete}
                            id={id}
                            icon={<i className="bi bi-trash"></i>}
                        />
                    </div>
                </div>
            </li>
        );
    }
}

export default Item;
