const express = require(`express`);
const app = express();
const session = require(`express-session`);
const flash = require(`connect-flash`);
const {engine} = require(`express-handlebars`);
const bodyParser = require(`body-parser`);
const path = require(`path`);
const authRoutes = require(`./routes/auth`);
const tasksRoutes = require(`./routes/tasks`);
const PORT = 3000;

app.use(session({
  secret: 'senha_secreta_para_o_secreto', // chave para assinar a sessão
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.engine(`handlebars`, engine({defaultLayout: `main`}))
app.set(`view engine`, `handlebars`);
app.set(`views`, path.join(__dirname, `views`));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, `public`)));

app.use((req, res, next) => {
    res.locals.success_msg = req.flash(`success_msg`);
    res.locals.error_msg = req.flash(`error_msg`);
    next();
});

app.use(`/auth`, authRoutes);
app.use(`/tasks`, tasksRoutes);

app.get(`/`, (req, res) => {
  res.render(`auth`);
})

app.listen(PORT, function() {
    console.log(`Servidor ouvindo a porta ${PORT}`);
})