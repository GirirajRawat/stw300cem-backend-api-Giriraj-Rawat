const Express = require('express');
const routes = Express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const teacherController = require('../controller/teacher')


routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(cors.apply());


routes.get('/api/v1/teacher', teacherController.get);
routes.post('/api/v1/teacher/signup', teacherController.signUp);
routes.post('/api/v1/teacher/login', teacherController.login);
routes.put('/api/v1/teacher/:id', teacherController.update);
routes.delete('/api/v1/teacher/:id', teacherController.deleteTeacherById);
routes.get('/api/v1/teacher/:id', teacherController.getTeacherById);
module.exports = routes;
