const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, './src/public/styles')));
app.use(express.static(path.join(__dirname, './src/public')));
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

const indexRouter = require('./src/router/index');

app.get('/', indexRouter);

app.listen(5500, err => {
  console.log("Server is listenig on 5500");
});