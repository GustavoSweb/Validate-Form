const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const ejs = require("ejs")
const Validation = require("./utils/Validation")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(flash());

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

app.post("/form", (req, res)=>{
  const {name, email, password} = req.body
  try{
    const form = new Validation(req.body)
    form.Check()
    res.redirect("/")
  }catch(err){
    console.log(err.message)
    res.redirect("/")

  }
})

app.listen(8081, () => {
    console.log("Servidor rodando")
});
