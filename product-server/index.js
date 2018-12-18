const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const selectAllProdQuery = 'select * from products';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node1'
});
connection.connect(err => {
    if (err) {
        return err;
    }
});
// console.log(connection); 
app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /products');
});

app.get('/products', (req, res) => {
    connection.query(selectAllProdQuery, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/products/add', (req, res) => {
    const { name, price } = req.query;
    const InsertQuery = `Insert into products(name,price) values('${name}',${price})`;
    connection.query(InsertQuery, (err, results) => {
        if (err) {
            return res.send();
        }
        else {
            return res.send('Added successfully');
        }
    });
});

app.listen(4000, function () {
    console.log('Listening on port 4000');
});