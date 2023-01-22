import response from "../settings/response.js";
import db from "../settings/database.js";
import jwt from 'jsonwebtoken';
import * as requests from '../settings/requests.js';

export const auth = async (req, res) => {
    // const sql = `select * from user where Email='${req.body.email}' and Password='${req.body.password}'`;
    const sql = requests.GET_USER.format(req.body.email, req.body.password);
    const [result, fields] = await db.query(sql);

    if (result.length === 0) response.send(401, 'USER_NOT_FOUND', res);
    else {
        const token = jwt.sign({
            user_id: result[0].idUser,
            email: result[0].Email,
        }, process.env.JWT_KEY);

        response.send(200, { token: token }, res);
    }
};

export const booking = async (req, res) => {
    console.log(req.body);
    console.log(req.issuer);
    // const userData = jwt.decode(req.body.token);
    const userData = req.issuer;
    console.log(userData);
    const idUser = userData.idUser;
    // TODO: check if requested place exists and is not reserved
    // const sql = 'INSERT INTO `reservation` (`Sector_id`, `Row_id`, `Number_id`, `EventPlace_id`, `Event_id`, `ReservationDate`, `User_id`) VALUES ("' + req.body.sector + '", "' + req.body.row + '", "' + req.body.number + '", "' + req.body.eventplace_id + '", "' + req.body.event_id + '", NOW(), "' + idUser + '")';
    const sql = requests.BOOKING.format(req.body.sector, req.body.row, req.body.number, req.body.eventplace_id, req.body.event_id, idUser);

    const [result, fields] = await db.query(sql);
    console.log(result);

    response.send(200, result, res);
};