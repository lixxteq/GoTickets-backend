import * as mainController from '../controllers/mainController.js';
import * as usersController from '../controllers/usersController.js';
import { authenticateToken } from '../services/usersService.js';

const routes = (app) => {
    app.route('/api/auth').post(usersController.auth);
    app.route('/api/test').get(authenticateToken, usersController.test);
    app.route('/api/events').get(mainController.events);
    app.route('/api/event/:id').get(mainController.event);
    app.route('/api/booking').post(authenticateToken, usersController.booking);
    app.route('/api/events/search').get(mainController.searchEvents);
    app.route('/api/event/delete').post(authenticateToken, mainController.deleteEvent);
    app.route('/api/event/edit').post(authenticateToken, mainController.editEvent);
};

export default routes;