const express = require('express'); 
const mysql2 = require('mysql2/promise'); // включая промисы

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'phonebook',
    password: ''
});
 
// express - переменная с функцией. запускает приложение 
const app = express();

// запрос на адрес главной страницы
app.get('/', async function(req, res) {
    // благодаря асинхронности функция возвращает data. Без асинхр было бы через колбек.
    const data = await pool.query('select * from abonents');
    let abonents = data[0];
            res.send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <ul>${abonents.map((a) => '<li>'+a.name+'</li>').join('')}</ul>
                </body>
            </html>
            `);
}); 

// передача параметров в GET-запросе
app.get('/search/:ab_q', async function(req, res) {
    let name = req.params.ab_q; // в req.params лежат все параметры из URL. параметры GET из инпутов лежат в req.query
    let data = await pool.query(`SELECT * from abonents WHERE name LIKE ?`, '%' + name + '%');
    res.json(data[0]);
});


// в самом конце 
app.listen(3000, function () {
    console.log('server started!');
});
