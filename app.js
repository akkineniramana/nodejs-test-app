const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port || "3000";

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/partials/");
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
})



app.use((req, res, next) => {
    var date = new Date().toString();
    fs.appendFile('server.log', `${date} - ${req.method} - ${req.url} \n`);
    next();

});
/* 
app.use((req, res, next) => {
    res.render('maintainence');
}) */

app.use(express.static(__dirname + "/public/"));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        content: "Welcome to FUcking NODE JS TUTORIAL"
    });
});
app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: "About Page"
    });
});

app.listen(3000, () => {
    console.log('Server Listening on Port 3000');
})