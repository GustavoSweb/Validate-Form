const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const ejs = require("ejs");
const Validation = require("./utils/Validation");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("shfkjsdagfhsgd"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

app.get("/", (req, res) => {
  var erro = req.flash("erro");
  var data = req.flash("data")
  erro = erro[0] == undefined || erro.lenght == 0 ? false : erro;
  data = data[0] == undefined || data.lenght == 0 ? [{name:'', email:'', password:''}] : data;
  res.render("index.ejs", {erro,data:data[0]});
});

app.post("/form", (req, res) => {
  const { name, email, password } = req.body;
  try {
    const form = new Validation(req.body);
    form.Check();
    res.redirect("/");
  } catch (err) {
    req.flash("erro", err.message);
    req.flash("data", req.body)
    console.log(err.message);
    res.redirect("/");
  }
});

app.listen(8081, () => {
  console.log("Servidor rodando");
});
