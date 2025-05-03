const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

let users = [];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', (req, res) => {
    users.push({...req.body, id: + new Date()})
    res.json(users);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
