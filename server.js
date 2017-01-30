'use strict';

var path = require('path');
var dir = __dirname;

require('dotenv').config();

var express = require('express');
var app = express();

/**
 * This is for development purpose. Choose one from below based on our use cases
 * https://github.com/expressjs/session#compatible-session-stores
 */
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var csrf = require('csurf');

var config = require('./config');
var apiRoutes = require('./server-api');

app.set('view engine', 'ejs');
app.set('views', path.join(dir, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.disable('x-powered-by'); // Removes the backed server details.

/**
 * Encrypt session key with secret and save it  - this key will be stored in Memorystore and will be able to communicate with client, based on this id. On client it will be stored in cookie as connect.sid. In this session object all the other variables like tokens etc.. are saved.
 */
var MongoDBStore = require('connect-mongodb-session')(expressSession);
var store = new MongoDBStore({
    uri: config.connectionUrl,
    collection: 'activeSessions'
});

app.use(expressSession({
    name: 'sessionId',
    store: store,
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 week 
    }
}));

app.use(csrf());

/**
 * This middleware is helpful to retrieve jwt token saved in session for all /api calls and validate against it's content like username, role etc... It will intercept all api calls and add user object to it.
 */
app.use('/api', expressJwt({ secret: config.jwtSecret }).unless(
    { path: ['/api/users/authenticate', '/api/users/register'] }));

/**
 * Router configurations
 */
app.use('/app', require('./server-auth/app'));
app.use('/login', require('./server-auth/login'));
app.use('/register', require('./server-auth/register'));

/**
 * Api service routes
 */
var routes = Object.keys(apiRoutes);
for (var i = 0; i < routes.length; i++) {
    var routeKey = routes[i];
    app.use('/api/' + routeKey, apiRoutes[routeKey]);
}

/**
 * Making '/app' as by default route. This will allow me to validate the session token and proceed further accordingly.
 */
app.use('/', function (req, res) {
    return res.redirect('/app');
});

/**
 *Start the server
 */
var server = app.listen(config.port, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
