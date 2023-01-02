import mysql from 'mysql2/promise';


const db = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: '',
    password: '',
    database: 'ticket_service'
}).catch((error) => console.log(error));

export default db;