import {useEffect, useState} from "react";
import Contacts from "./components/Contacts";
import Form from "./components/Form";
import {Container, Tabs, Tab, Box, Paper} from "@mui/material";
import store from "store2";
import {v4 as uuidv4} from 'uuid';

const STORAGE_KEY = "contacts";

function App() {
    const [page, setPage] = useState("contacts");
    const [contacts, setContacts] = useState(() => {
        return store.get(STORAGE_KEY) || [];
    });

    useEffect(() => {
        if (!store.has(STORAGE_KEY)) {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(res => res.json())
                .then(data => {
                    const parsed = data.map(user => {
                        const [firstName, ...lastNameParts] = user.name.split(" ");
                        return {
                            id: user.id,
                            firstName,
                            lastName: lastNameParts.join(" "),
                            phone: user.phone
                        };
                    });

                    setContacts(parsed);
                    store.set(STORAGE_KEY, parsed);
                });
        }
    }, []);

    const addContact = (contactData) => {
        const updatedContacts = [
            ...contacts,
            {id: uuidv4(), ...contactData}
        ];

        setContacts(updatedContacts);
        store.set(STORAGE_KEY, updatedContacts);
        setPage("contacts");
    };

    const removeContact = (id) => {
        const updatedContacts = contacts.filter(contact => contact.id !== id);

        setContacts(updatedContacts);
        store.set(STORAGE_KEY, updatedContacts);
    };

    const cancelAdd = () => {
        setPage("contacts");
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: "white"
                }}
            >
                <Container maxWidth="sm">
                    <Box display="flex" justifyContent="center">
                        <Tabs
                            value={page}
                            textColor="primary"
                            indicatorColor="primary"
                            centered
                        >
                            <Tab label="Контакти" value="contacts" onClick={() => setPage('contacts')}/>
                            <Tab label="Додати контакт" value="form" onClick={() => setPage('form')}/>
                        </Tabs>
                    </Box>
                </Container>
            </Paper>

            <Container maxWidth="sm" sx={{mt: 4}}>
                {page === "contacts" && <Contacts contacts={contacts} removeContact={removeContact}/>}
                {page === "form" && <Form onSubmit={addContact} onCancel={cancelAdd}/>}
            </Container>
        </>
    );
}

export default App;
