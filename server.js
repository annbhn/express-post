// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var todos = ["Đi chợ", "Nấu cơm", "Rửa bát", "Học tại CodersX"];

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (request, response) => {
  
  var query = request.query.q;
  if (query) {
    todos = todos.filter(function(todo) {
      return todo.toLowerCase().includes(query.toLowerCase());
    });
  }
  response.render("index", { todos });
});

app.get('/search', (request, response) => {
  response.render('form');
});

app.get('/create-todo', (request, response) => {
  response.render('create-todo');
})

app.post('/create-todo', (request, response) => {
  var todo = request.body.todo || '';
  todos.push(todo);
  response.redirect('/todos');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
