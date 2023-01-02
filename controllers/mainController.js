import response from '../responses.js'
import db from "../settings/database.js";

export const main = (req, res) => {
    response.status('hello world', res)
}

export const events = async (req, res) => {
    const sql = `SELECT idEvent, event.Name as EventName, Date, Description, Poster, EventPlace_id, eventplace.Name as EventPlaceName, Address, SeatAmount, Photos, city.Name as CityName FROM event join eventplace on event.EventPlace_id=eventplace.idEventPlace join city on eventplace.City_id=city.idCity`
    const [result, fields] = await db.query(sql)

    response.status(200, result, res)
}

export const event = async (req, res) => {
    const sql = 'select * from (select `Sector`, `Row`, `Number`, `seat`.`EventPlace_id`, `seat`.`SeatClass_id`, `reservation`.`Sector_id` from `seat` left join (select * from `reservation` where `Event_id`= '+ req.params.id +') as `reservation` on ( `seat`.`Sector`=`reservation`.`Sector_id` AND `seat`.`Row`=`reservation`.`Row_id` AND `seat`.`Number`=`reservation`.`Number_id` AND `seat`.`EventPlace_id`=`reservation`.`EventPlace_id` ) where `reservation`.`Sector_id` is null and `seat`.`EventPlace_id` = (select `event`.`EventPlace_id` from `event` where `idEvent`= '+ req.params.id +') ) as `emptyseat` join `seatclass` on `emptyseat`.`SeatClass_id`= `seatclass`.`idSeatClass` join (select `pricing`.`idPricing`, `SeatClass_id`, `Price` from `pricing` join `event_pricing` on `pricing`.`idPricing`=`event_pricing`.`idPricing` where `event_pricing`.`idEvent` = '+ req.params.id +') as `pricings` on `seatclass`.`idSeatClass`=`pricings`.`SeatClass_id`'
    const sql2 = `SELECT idEvent, event.Name as EventName, Date, Description, Poster, EventPlace_id, eventplace.Name as EventPlaceName, Address, SeatAmount, Photos, city.Name as CityName FROM event join eventplace on event.EventPlace_id=eventplace.idEventPlace join city on eventplace.City_id=city.idCity where idEvent=${req.params.id}`

    const [seats, fields] = await db.query(sql)
    const [eventInfo, fields2] = await db.query(sql2)

    const concat = {seats, eventInfo} 

    response.status(200, concat, res)
}

export const searchEvents = async (req, res) => {
    const sql = `SELECT idEvent, event.Name as EventName, Date, Description, Poster, EventPlace_id, eventplace.Name as EventPlaceName, Address, SeatAmount, Photos, city.Name as CityName FROM event join eventplace on event.EventPlace_id=eventplace.idEventPlace join city on eventplace.City_id=city.idCity where event.Name like '%${req.query.query}%';`
    const [result, fields] = await db.query(sql)

    response.status(200, result, res)
}

export const count = async (req, res) => {
    const sql = 'SELECT count(*) FROM `event`'
    const [result, fields] = await db.query(sql)

    response.status(200, result, res)
}

export const deleteEvent = async (req, res) => {
    const sql = 'DELETE FROM event WHERE `event`.`idEvent` = ' + req.body.idEvent

    const [result, fields] = await db.query(sql)
    response.status(200, result, res)
}

export const editEvent = async (req, res) => {
    const sql = "UPDATE `event` SET `Description` = '"+req.body.description+"' WHERE `event`.`idEvent` = " + req.body.idEvent

    const [result, fields] = await db.query(sql)
    response.status(200, result, res)
}