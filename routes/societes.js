var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'dp_formation'
});

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
	extended: true
}));

// Remplir la table 'societe' dans la BDD
// var lstSocietes = [{ "ID_Societe": 1, "Nom": "Alcibiad", "CA": 45, "Activite": "ENERGIE", "Employe": 2 },
// 	{ "ID_Societe": 2, "Nom": "Barthom", "CA": 789.5, "Activite": "COMMERCE", "Employe": 2 },
// 	{ "ID_Societe": 3, "Nom": "Calipyge", "CA": 24, "Activite": "NUMERIQUE", "Employe": 2 },
// 	{ "ID_Societe": 4, "Nom": "Durotron", "CA": 666, "Activite": "SCIENCES", "Employe": 1 }]
// InitialiseTable(lstSocietes)

/* GET users listing. */
router.get('/', function (req, res, next) {


	console.log('params: ' + JSON.stringify(req.params));
	console.log('body: ' + JSON.stringify(req.body));
	console.log('query: ' + JSON.stringify(req.query));


	// Récupération de la liste des sociétés 
	// connection.query(
	// 	"SELECT * FROM  societe",
	// 	function (err, results, fields) {

	// 		for (ligne of results) // results contains rows returned by server 	  
	// 		{
	// 			console.log(ligne.Nom)
	// 		}
	// 	}
	// );

	ListeDesSocietes(function (retour) {
		let jsonRetour = JSON.stringify(retour);
		console.log("Liste de sociétés :\n" + jsonRetour);
		res.send(jsonRetour);
	})
})

router.post('/', function (req, res, next) {
	//  console.log('params: ' + JSON.stringify(req.params));
	var societe = JSON.parse(req.body.p1);
	//console.log('body: ' + JSON.parse(obj1).Nom)
	//console.log('query: ' + JSON.stringify(req.query));

	// console.log("Appel de create societe")
	// CreeSociete(societe);
	// console.log("Appel de liste societes")
	// ListeDesSocietes((retour) => {			 
	// res.send( JSON.stringify(retour));
	// });

	// console.log("Fin traitement")

	CreeSociete(societe).then(ListeDesSocietes((retour) => {
		res.send(JSON.stringify(retour));
	}));


});

router.put('/', function (req, res, next) {
	res.send('Put en action');
});

router.delete('/', function (req, res, next) {
	//console.log('params: ' + JSON.stringify(req.params));
	// 
	// console.log('body: ' + JSON.stringify(req.body))
	// console.log('query: ' + JSON.stringify(req.query));	


	var idsociete = JSON.parse(req.body.id);
	SupprimeSociete(idsociete);
	ListeDesSocietes((retour) => {
		res.send(JSON.stringify(retour));
	})
	//res.send('Delete en action');
});

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
				console.log("Liste des societes success")
			}
		});

	console.log("Liste des societes fin ")
}



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

async function InitialiseTable(lstSocietes) {
	console.log("\nInitialiser table 'sociétés' - début ")
	await connection.execute(
		lstSocietes.forEach(function (element) {
			CreeSociete(element)
		})
	)
	console.log("Initialiser table 'sociétés' - fin ")
}

async function SupprimeSociete(idsociete) {
	await connection.execute(
		"delete from Societe where ID_Societe = ?",
		[idsociete],
		function (err, results, fields) {

		});
}

module.exports = router;
