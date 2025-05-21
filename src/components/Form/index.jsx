import {useState} from "react";
import {TextField, Button, Stack, Box} from "@mui/material";

export default function Form({onSubmit, onCancel}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({firstName, lastName, phone});
    };

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{maxWidth: 400, mx: "auto"}}
            onSubmit={handleSubmit}
        >
            <Stack spacing={3}>
                <TextField
                    label="Ім'я"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Прізвище"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Телефон"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    required
                />
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button type="submit" variant="contained" color="success">
                        Зберегти
                    </Button>
                    <Button variant="outlined" color="error" onClick={onCancel}>
                        Скасувати
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
