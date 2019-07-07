const Express = require('express');
const routes = Express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const studentController = require('../controller/student')


routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(cors.apply());


// routes.get('/api/v1/student', studentController.get);
// routes.put('/api/v1/student/:id', studentController.update);
// routes.post('/api/v1/student', studentController.insert);
// routes.delete('/api/v1/student/:id', studentController.deleteById);
// routes.get('/api/v1/student/:id', studentController.getStudentDetailById);
// routes.get('/api/v1/Teacher', studentController.getTeacherDetails);

module.exports = routes;
