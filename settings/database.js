import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.MYSQL_LOGIN,
    password: process.env.MYSQL_PASSWORD,
    database: 'ticket_service'
}).catch((error) => console.log('Ошибка подключения к базе данных: ', error));

export default db;