const express = require('express');
const UsersController = require('./controllers/UsersController');
const ServiceController = require('./controllers/ServiceController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.create);

routes.get('/profile', ProfileController.index);

routes.get('/services', ServiceController.index);
routes.post('/services', ServiceController.create);
routes.delete('/services/:id', ServiceController.delete);

module.exports = routes;