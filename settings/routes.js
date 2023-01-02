import * as mainController from '../controllers/mainController.js'
import * as usersController from '../controllers/usersController.js'

const routes = (app) => {
    app.route('/api/auth').get(usersController.auth)
    app.route('/api/events').get(mainController.events)
    app.route('/api/event/:id').get(mainController.event)
    app.route('/api/booking').post(usersController.booking)
    app.route('/api/events/search').get(mainController.searchEvents)
    app.route('/api/events/count').get(mainController.count)
    app.route('/api/event/delete').post(mainController.deleteEvent)
    app.route('/api/event/edit').post(mainController.editEvent)
}

export default routes;