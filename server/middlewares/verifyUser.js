const jwt = require('jsonwebtoken');
const {mysqlDB} = require('../config/connectDB');
module.exports.verifyUser = async (req, res, next) => {
    try {
        const { accesstoken } = req.headers;
        const decodedToken = jwt.verify(accesstoken, process.env.jwtSecret);

        const selectQuery = `SELECT * FROM user WHERE id = ?;`;

        mysqlDB.query(selectQuery, [decodedToken.id], (error, result) => {
            req.currentUser = result[0];
            next();
        })
    } catch (error) {
        return res.status(200).json({
            success:false,
            msg:"session expired"
        })
    }
}