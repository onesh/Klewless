var express  = require('express');
var app      = express();
var port     = process.env.PORT || 7777;
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var cors = require('cors');
var MongoStore = require('connect-mongo')(session);
const connection = require('./config/database')['connection'];

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

//app.use(cors());

app.use(cors({
  origin: 'http://localhost:3030',
  credentials: true
}));

// required for passport
app.use(session({
  name: 'klewless',
  secret: 'onesh_auth_users',
  store: new MongoStore({mongooseConnection: connection}),
  cookie: {
    maxAge: 3600000 // one hour
  }
})); // session secret


app.use(flash()); // use connect-flash for flash messages stored in session
var passport_setup = require('./config/passport')(app);
var routes = require('./routes')(app, passport_setup);
app.listen(port);

console.log('Authbase server running at port, ', port);
