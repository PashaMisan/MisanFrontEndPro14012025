import {
    TableRow,
    TableCell,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ContactRow({contact, onDelete}) {
    return (
        <TableRow key={contact.id}>
            <TableCell>{contact.firstName}</TableCell>
            <TableCell>{contact.lastName}</TableCell>
            <TableCell>{contact.phone}</TableCell>
            <TableCell>
                <IconButton
                    color="error"
                    onClick={() => onDelete(contact.id)}
                    aria-label={`Видалити контакт ${contact.firstName} ${contact.lastName}`}
                >
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default ContactRow;