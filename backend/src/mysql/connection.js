const mysql = require("mysql");
require("dotenv").config();

const connectionMYSQL = mysql.createConnection({
    host: process.env.HOST_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL,
});

connectionMYSQL.connect((err) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("CONNECTION WITH THE DB WAS CLOSED");
        } else if (err.code === "ECONNREFUSED") {
            console.log("CONNECTION TO DB REJECTED");
        } else if (err.code === "ER_ACCESS_DENIED_ERROR") {
            console.log("ACCESS DENIED");
        } else {
            console.log("New ERROR ", err);
        }
        return;
    }
    console.log("------ ¡Successful connection to MYSQL! -----");
});

module.exports = connectionMYSQL;