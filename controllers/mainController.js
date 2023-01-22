import response from '../settings/response.js';
import db from "../settings/database.js";
import * as requests from '../settings/requests.js';

export const getEvents = async (req, res) => {
    const sql = requests.GET_EVENTS;
    const [result, fields] = await db.query(sql);
    console.log('{0}'.format('123'));

    response.send(200, result, res);
};

export const getEvent = async (req, res) => {
    // const sql = 'select * from (select `Sector`, `Row`, `Number`, `seat`.`EventPlace_id`, `seat`.`SeatClass_id`, `reservation`.`Sector_id` from `seat` left join (select * from `reservation` where `Event_id`= ' + req.params.id + ') as `reservation` on ( `seat`.`Sector`=`reservation`.`Sector_id` AND `seat`.`Row`=`reservation`.`Row_id` AND `seat`.`Number`=`reservation`.`Number_id` AND `seat`.`EventPlace_id`=`reservation`.`EventPlace_id` ) where `reservation`.`Sector_id` is null and `seat`.`EventPlace_id` = (select `event`.`EventPlace_id` from `event` where `idEvent`= ' + req.params.id + ') ) as `emptyseat` join `seatclass` on `emptyseat`.`SeatClass_id`= `seatclass`.`idSeatClass` join (select `pricing`.`idPricing`, `SeatClass_id`, `Price` from `pricing` join `event_pricing` on `pricing`.`idPricing`=`event_pricing`.`idPricing` where `event_pricing`.`idEvent` = ' + req.params.id + ') as `pricings` on `seatclass`.`idSeatClass`=`pricings`.`SeatClass_id`';
    const sql = requests.GET_SEATS_BY_EVENT.format(`${req.params.id}`);
    const sql2 = requests.GET_EVENT_BY_ID.format(req.params.id);
    // const sql2 = `SELECT idEvent, event.Name as EventName, Date, Description, Poster, EventPlace_id, eventplace.Name as EventPlaceName, Address, SeatAmount, Photos, city.Name as CityName FROM event join eventplace on event.EventPlace_id=eventplace.idEventPlace join city on eventplace.City_id=city.idCity where idEvent=${req.params.id}`;

    const [seats, seatsFields] = await db.query(sql);
    const [eventInfo, eventInfoFields] = await db.query(sql2);

    response.send(200, {seats, eventInfo}, res);
};

export const searchEvents = async (req, res) => {
    // const sql = `SELECT idEvent, event.Name as EventName, Date, Description, Poster, EventPlace_id, eventplace.Name as EventPlaceName, Address, SeatAmount, Photos, city.Name as CityName FROM event join eventplace on event.EventPlace_id=eventplace.idEventPlace join city on eventplace.City_id=city.idCity where event.Name like '%${req.query.query}%';`;
    const sql = requests.GET_EVENTS_BY_NAME.format(req.query.query);
    const [result, fields] = await db.query(sql);

    response.send(200, result, res);
};

export const deleteEvent = async (req, res) => {
    // const sql = 'DELETE FROM event WHERE `event`.`idEvent` = ' + req.body.idEvent;
    const sql = requests.DELETE_EVENT.format(req.body.idEvent);

    const [result, fields] = await db.query(sql);
    response.send(200, result, res);
};

export const editEvent = async (req, res) => {
    // const sql = "UPDATE `event` SET `Description` = '" + req.body.description + "' WHERE `event`.`idEvent` = " + req.body.idEvent;
    const sql = requests.UPDATE_EVENT.format(req.body.description, req.body.idEvent);
    const [result, fields] = await db.query(sql);
    response.send(200, result, res);
};