import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
    Typography
} from "@mui/material";
import ContactRow from "./ContactRow/index.jsx";

function Contacts({contacts, removeContact}) {
    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" align="center" sx={{mt: 2}}>
                Список контактів
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ім'я</TableCell>
                        <TableCell>Прізвище</TableCell>
                        <TableCell>Телефон</TableCell>
                        <TableCell>Дії</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                Контакти відсутні
                            </TableCell>
                        </TableRow>
                    ) : (
                        contacts.map(contact => (
                            <ContactRow key={contact.id} contact={contact} onDelete={removeContact}/>
                        ))
                    )}
                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default Contacts;
