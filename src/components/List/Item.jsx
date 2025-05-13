import Button from "./Button";
import {Component} from "react";

class Item extends Component {
    render() {
        return (
            <li className="mb-3 p-3 border rounded shadow-sm d-flex justify-content-between align-items-center bg-white">
                <span>{this.props.todo.title}</span>
                <div>
                    <Button className="btn btn-success mx-2" title="Виконати" />
                    <Button className="btn btn-danger" title="Видалити" onClick={this.props.onDelete} id={this.props.todo.id}/>
                </div>
            </li>
        );
    }
}

export default Item;
