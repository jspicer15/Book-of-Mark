const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const configRoutes = require("./routes");
const exphbs  = require('express-handlebars');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
app.use(express.static(__dirname + '/public', {redirect : false}));
app.engine('handlebars', exphbs({}));
app.set('view engine', 'handlebars');


app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.engine('handlebars', exphbs({}));
app.set('view engine', 'handlebars');


configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
