var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
const path = require('path');
var wnumb = require('wnumb');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var handleLayoutMDW = require('./middle-wares/handleLayout'),
    handle404MDW = require('./middle-wares/handle404'),
    restrict = require('./middle-wares/restrict');

var homeController = require('./controllers/homeController'),
    accountController = require('./controllers/accountController'),
    categoryController = require('./controllers/categoryController'),
    brandController = require('./controllers/brandController'),
    productController = require('./controllers/productController'),    
    cartController = require('./controllers/cartController');

const app = express();
const port = 3000;

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    helpers: {
        section: express_handlebars_sections(),
        number_format: n => {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        }
    }
}));
app.set('view engine', 'hbs');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//
// session

var sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'doanshop',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(handleLayoutMDW);


app.get('/', (req, res) => {
    res.redirect('/home');
});


app.use('/home', homeController);
app.use('/account', accountController);
app.use('/category', categoryController);
app.use('/brand', brandController);
app.use('/product', productController);
app.use('/cart', restrict, cartController);

app.use(handle404MDW);

app.listen(port, () => {
    console.log('Site running on port' + port);
});