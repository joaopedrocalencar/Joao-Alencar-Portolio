const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = 8080;

app.use(express.static(__dirname));
app.use(express.static('assets'));

app.use(express.static(__dirname + "/public"));
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");


//ROUTES HERE

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get("/", async function (req, res) {
    res.render('index', {
        title: 'Home',
        page: 'index'
    });
});

app.get("/contact", async function (req, res) {
    res.render('contact', {
        title: 'Contact',
        page: 'contact'
        // other data
    });
});

app.get("/about", async function (req, res) {
    res.render('about', {
        title: 'About',
        page: 'about'
    });
});
