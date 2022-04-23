const mysql = require('mysql');
const mongoose = require('mongoose');

const connectDB = (app, PORT) => {
    mongoose.connect(process.env.mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => app.listen(PORT, () => console.log(`server started at ${PORT}`)) )
    .catch( (error) => console.log(error.message) )
}

const mysqlDB = mysql.createPool({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socialApp'
})

module.exports = { connectDB, mysqlDB };