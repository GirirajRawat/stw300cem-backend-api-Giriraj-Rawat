const Express = require('express');
const routes = Express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const adminController = require('../controller/admin');

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(cors.apply());

routes.post('/api/v1/admin/login', adminController.login);
routes.post('/api/v1/admin/register', adminController.insert);
module.exports = routes;
