import response from "../responses.js";
import db from "../settings/database.js";
import jwt from 'jsonwebtoken'
import { jwtKey } from "../settings/variables.js";

export const auth = async (req, res) => {
    const sql = `select * from user where Email='${req.query.email}' and Password='${req.query.password}'`
    const [result, fields] = await db.query(sql)

    if (result.length === 0) response.status(401, 'NOT_FOUND', res)
    else {
        console.log(result);

        const token = jwt.sign({
            idUser: result[0].idUser,
            email: result[0].Email,
            password: result[0].Password
        }, jwtKey)
    
        response.status(200, {...result[0], token}, res)
    }

}

export const booking = async (req, res) => {
    console.log(req.body);
    const userData = jwt.decode(req.body.token)
    console.log(userData);
    const idUser = userData.idUser

    const sql = 'INSERT INTO `reservation` (`Sector_id`, `Row_id`, `Number_id`, `EventPlace_id`, `Event_id`, `ReservationDate`, `User_id`) VALUES ("'+req.body.sector+'", "'+req.body.row+'", "'+req.body.number+'", "'+req.body.eventplace_id+'", "'+req.body.event_id+'", NOW(), "'+idUser+'")'

    const [result, fields] = await db.query(sql)
    console.log(result);

    response.status(200, result, res)
}