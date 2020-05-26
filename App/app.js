const express = require('express');
const app = express();
// var expressValidator = require('express-validator');
// app.use(expressValidator());
const db = require("./models");
db.sequelize.sync();
const auth = require('./middleware/auth')
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.session({ secret: 'SECRET' }));
// const passport = require('./middleware/passport');

// app.use(passport.initialize());
// app.use(passport.session());



const user_router = require('./routes/user.route.js');
const login_router = require('./routes/login.route.js');
const registration_router = require('./routes/registration.route.js');
const guitar_router = require('./routes/guitar.route.js');
const content_router = require('./routes/content.route.js');
const path = require('path');
var exphbs  = require('express-handlebars');
var hbs = require('hbs');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000;
app.use(express.json({
    extended: true
}));

app.engine('.hbs', exphbs({extname: '.hbs'}));

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

app.use('/users', user_router);

app.use('/login', login_router);

app.get('/', (req,res)=>{
    res.render("home");
});

app.use('/guitars', auth, (req,res, next)=>{
    if(req.user.id_role == 1){
        next();
    }
    else{
        res.redirect('/');
    }
}, guitar_router);

app.use('/content', content_router);


app.use('/registration', registration_router);

app.use('/auth', require('./routes/auth.route'));


app.use(function(req,res,next){
    res.status(404).send("Not Found");
});

app.listen(port);

console.log(`server was started on port: ${port} ...`);