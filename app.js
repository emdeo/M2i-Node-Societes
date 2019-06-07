var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var societesRouter = require('./routes/societes');
const mysql = require('mysql2');

var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dp_formation'
});


app.get("/personne/:id", function (req, res, next) {
  console.log("je suis un middleware ... yes ");
  next();
},
  function (req, res) {
    let id = req.params.id;
    console.log("youpi yeh id = " + id);
    ListeDesPersonnes(id, (r) => { res.json(r) });

  })

/*
  Navigation vers 'companies.pug' = présentation similaire à 'page2.html'
  (tableau de sociétés et d'employés)
*/
app.get('/companies', function (req, res, next) {
  ListeDesSocietes((lstsocietes) => {
    res.render("companies", {
      societes: lstsocietes
    })
  })
})




app.route('/personnes')
  .get(function (req, res) {
    let id = req.query.idsociete;
    console.log("id = " + id);
    ListeDesPersonnes(id, (r) => { res.json(r) });
  })
  .post(function (req, res) {
    res.send("Post ajout d'une personne");
  })
  .put(function (req, res) {
    res.send("Put mise à jour d'une personne");
  })
  .delete(function (req, res) {
    res.send("Delete  Suppression d'une personne");
  });




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
// La page index pointe vers le fichier 'page2.html' (dossier 'public')
app.get('/', function (req, res, next) {
  // Renvoie vers les éléments STATIQUES de ma page html (.sendFile())
  res.sendFile(path.join(__dirname, 'public/page2.html'));
});

app.use('/societes', societesRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Afficher tableau de personnes
function ListeDesPersonnes(id, success) {
  connection.query(
    "SELECT * FROM  personne where ID_Personne = ?", [id],
    function (err, results, fields) {
      if (err) {
        console.log("erreur");
      }
      else {
        success(results);
      }
    });
}

// Afficher tableau de sociétés
function ListeDesSocietes(success) {
  console.log("Liste des societes debut ")
  connection.query(
    "SELECT * FROM  societe",
    function (err, results, fields) {
      if (err) {
        console.log("erreur ");
      }
      else {
        success(results);
        console.log("Liste des societes success ")
      }
    });

  console.log("Liste des societes fin ")
}

// Insérer nouvelle entrée dans la table 'societe'
async function CreeSociete(societe) {
  console.log("\nCréer société - début")
  await connection.execute(
    "Insert into Societe VALUES(?,?,?,?)",
    [societe.ID_Societe, societe.Nom, societe.Activite, societe.CA],
    function (err, results, fields) {
      console.log("Créer entrée société - success ")
    });

  console.log("Créer entrée société - fin ")
}

// Initialiser la table 'societe' avec des entrées prédéfinies
async function InitialiseTable(lstSocietes) {
  console.log("\nInitialiser table 'sociétés' - début ")
  await connection.execute(
    lstSocietes.forEach(function (element) {
      CreeSociete(element)
    })
  )
  console.log("Initialiser table 'sociétés' - fin ")
}


module.exports = app;
