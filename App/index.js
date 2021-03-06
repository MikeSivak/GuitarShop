const express = require('express');
const app = express();
const db = require("./models");
db.sequelize.sync();
const auth = require('./middleware/auth');


const user_router = require('./routes/user.route.js');
const registration_router = require('./routes/registration.route.js');
const guitar_router = require('./routes/guitar.route.js');
const content_router = require('./routes/content.route.js');
const order_router = require('./routes/order.route.js');
const path = require('path');
var exphbs = require('express-handlebars');
var hbs = require('hbs');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000;
app.use(express.json({
    extended: true
}));

app.engine('.hbs', exphbs({ extname: '.hbs' }));

app.set("view engine", "hbs");

app.set('views', path.join(__dirname, '/views'));
app.engine("hbs", exphbs(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "main",
        extname: "hbs",
        hbs: allowInsecurePrototypeAccess(hbs)
    }
));

app.use(express.static('public'));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use('/users', auth, (req, res, next) => {
    if (req.user.id_role == 1) {
        next();
    }
    else {
        res.redirect('/');
    }
}, user_router);

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/guitars', auth, (req, res, next) => {
    if (req.user.id_role == 1) {
        next();
    }
    else {
        res.redirect('/');
    }
}, guitar_router);

app.use('/content', content_router);


app.use('/registration', registration_router);

app.use('/auth', require('./routes/auth.route'));

app.use('/orders', auth, (req, res, next) => {
    if (req.user.id_role == 1) {
        next();
    }
    else {
        res.redirect('/');
    }
}, order_router);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(port);

console.log(`server was started on port: ${port} ...`);