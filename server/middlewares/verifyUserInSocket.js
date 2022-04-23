const jwt = require("jsonwebtoken");
const { mysqlDB } = require("../config/connectDB");

const verifyUserInSocket = async (accesstoken, idFromInteractedUser=null, callback ) => {
  try {
    const decodedToken = jwt.verify(accesstoken, process.env.jwtSecret);

    const selectQuery = "SELECT * FROM user WHERE id IN (?)";
    const arrayOfId = [decodedToken.id, idFromInteractedUser];
    
    mysqlDB.query(selectQuery, [arrayOfId], async (error, result) => {
      if (error) {
        console.log(error.message)
        return null;
      }

      if (result.length > 0) {
        const date = new Date();

        const today_Date =
          date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();

        const today_year = date.getFullYear();

        const today_month =
          date.getMonth() + 1 <= 9
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;

            const hours = date.getHours() % 12 > 0 ? date.getHours() % 12 : "12";
            const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const ampm = date.getHours() >= 12 ? 'pm' : 'am';

        const DATE = `${today_year}-${today_month}-${today_Date}`;
        const TIME = `${hours}:${min} ${ampm}`
        

        if(decodedToken.id == result[0].id) {
          return callback(result[0], result[1], DATE, TIME);
        }
         else {
          return callback(result[1], result[0], DATE, TIME);
         }
        
      }
    });
  } catch (error) {
    return null;
  }
};

module.exports = { verifyUserInSocket };
