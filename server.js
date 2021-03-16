require('dotenv').config();
const express = require('express');
const shopifyExpress = require('shopify-express-x');
const session = require('express-session');

const app = express();

const {
    SHOPIFY_APP_KEY,
    SHOPIFY_APP_SECRET,
    SHOPIFY_APP_HOST,
    PORT_HOST,
    NODE_ENV
} = process.env;

app.use(session({
    secret: SHOPIFY_APP_SECRET,
    // resave: false, // add resave options
    // saveUninitialized: true
}));

const { routes, withShop } = shopifyExpress({
    host: SHOPIFY_APP_HOST,
    apiKey: SHOPIFY_APP_KEY,
    secret: SHOPIFY_APP_SECRET,
    scope: ['read_products, write_products'],
    accessMode: 'offline',
    afterAuth(request, response) {
        const { session: { accessToken, shop } } = request;
        return response.redirect('/');
    }
});

app.use('/shopify', routes);

app.get('/hello', (req, res) => {
    res.json({ hello: "hello" })
});
app.get('/', (req, res) => {
    res.send("<h1>This is my server</h1>")
});


app.listen(PORT_HOST, () => {
    console.log("Server is running at port " + PORT_HOST);
});