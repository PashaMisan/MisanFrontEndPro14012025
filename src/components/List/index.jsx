import {Component} from "react";
import Item from "./Item.jsx";

class List extends Component {
    render() {
        return (
            <ul className="list-group mt-4 list-unstyled">
                {this.props.todos.map(todo => (
                    <Item key={todo.id} todo={todo} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate} onEdit={this.props.onEdit}/>
                ))}
            </ul>
        )
    }
}

export default List;
