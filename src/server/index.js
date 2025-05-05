const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const orders = [];

app.get('/orders', (req, res) => {
    res.json(orders);
})

app.post('/order', (req, res) => {
    orders.push({...req.body, id: + new Date()})
    res.json(orders);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
