var express = require('express');
var router = require('./router/router.js');

var app = express();

app.set('view engine','ejs');
app.use(express.static('./public'))


app.get('/', router.showIndex);

app.post('/login', router.doLogin)

app.listen(3000);