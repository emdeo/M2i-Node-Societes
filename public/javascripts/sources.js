
$(document).ready(function () {

	// Récupération de la liste des sociétés
	$.ajax(
		{
			url: "/societes",
			type: "get",
			dataType: 'json',
			success: function (resultat, status) {
				
				//alert(JSON.stringify(resultat));					  

				// Création dynamique du tableau des sociétés
				AfficheListeDesSocietes(resultat)
			}
		});


	$("#tblSocietes").on("click", ".update", function () {

		let idSociete = $(this).attr("data-idSociete");
		$("#cmdNouvellePersonne").attr("data-idSociete", idSociete);

		$.ajax({
			url: 'MaServlet',
			type: 'Get',
			data: 'idsociete=' + idSociete + "&action=update",
			success: function (resultats, status) {
				$("#tblSocietesUpdateBody").html(resultats);
				// Récupération des Employés de la société
				$.ajax({
					url: 'MaServlet',
					type: 'Get',
					data: 'idsociete=' + idSociete + "&action=listepersonnes",
					success: function (tblRes, status) {
						$("#tblPersonnesBodyUpdate").html(tblRes);
						$("#UpdateSocieteModal").modal('show');
					}
				}

				)

			}

		}

		);
	});


	$("#tblSocietes").on("click", ".select", function () {
		//alert("yes selection en cours");
		$.ajax({

			// Lien vers '/personnes/:id' dans 'app.js'
			url: "/personnes/" + $(this).attr("data-idSociete"),
			
			type: "GET",
			dataType: "json",
			success: function (code, status) {
				alert(JSON.stringify(code));
				AfficheListeDesEmployes(code)
			}
		});
	});

	$("#tblSocietes").on("click", ".delete", function () {

		let idsociete = $(this).attr("data-idSociete");

		$.ajax({
			//	url:"/societes?id="+idsociete,
			url: "/societes",
			type: "delete",
			data: { id: idsociete },
			dataType: 'json',
			dataContent: 'application/json',
			success: function (resultat, status) {
				AfficheListeDesSocietes(resultat)

			}
		}
		);
	});


	$("#cmdAjout").on("click", function () {
		let idsociete = $("#txtIDSociete").val();
		let nom = $("#txtNom").val();
		let activite = $("#txtActivite").val();
		let ca = $("#txtCA").val();


		let p = { ID_Societe: idsociete, Nom: nom, Activite: activite, CA: ca }

		$.ajax({
			url: "/societes",
			type: "post",
			data: { p1: JSON.stringify(p) },
			dataType: 'json',
			dataContent: 'application/json',
			success: function (resultat, status) {
				alert(JSON.stringify(resultat));
				AfficheListeDesSocietes(resultat)
			}

		}

		)


	})



	$("#tblPersonnesUpdate tbody").on("click", ".modifieUpdate", function (event) {

		event.preventDefault();
		let zones = $(this).parent().siblings().children();

		if ($(this).html() == "Modifier") {

			for (i = 1; i < 6; i++) {
				zones[i].removeAttribute("readonly");
			}

			$(this).html("Enregistrer");

		}

		else {
			if ($(this).html() == "Enregistrer") {
				//Sauvegarde des données 

				let idPers = $(this).attr("data-idPersonne");

				nom = $("#txtNomPersonne" + idPers).val();
				prenom = $("#txtPrenomPersonne" + idPers).val();
				poids = $("#txtPoidsPersonne" + idPers).val();
				taille = $("#txtTaillePersonne" + idPers).val();
				sexe = $("#txtSexePersonne" + idPers).val();
				idSoc = $("#txtIdSocietePersonne" + idPers).val();

				$.ajax({
					url: 'MaServlet?idPers=' + idPers + "&nom=" + nom + "&prenom=" + prenom
						+ "&poids=" + poids + "&taille=" + taille + "&sexe=" + sexe + "&idSoc=" + idSoc,
					type: 'Put',
					success: function (retour, status) {

					},
					error: function (erreur) {
						alert(erreur)
					}
				}
				);






				for (i = 1; i < 6; i++) {
					zones[i].setAttribute("readonly", "true");
				}

				$(this).html("Modifier");
			}
		}

	});

	$("#tblPersonnesUpdate tbody").on("click", ".supprimeUpdate", function (event) {
		event.preventDefault();

		// Recuperation de l'idPersonne 
		let idPersonne = $(this).attr("data-idPersonne");
		alert(idPersonne)

		$.ajax({
			url: 'MaServlet?idPersonne=' + idPersonne,
			type: 'delete',
			success: function (res, status) {

			}
		}
		)

		// Suppression de la ligne visuellement
		$(this).parent().parent().empty();



	});


	// Ajout d'un nouvel employé
	$("#cmdNouvellePersonne").on("click", function (event) {
		// Récupération du Max ID_Personne 
		event.preventDefault();
		$.ajax({
			url: 'MaServlet',
			type: 'Get',
			data: "IdMax=1",
			success: function (result, status) {
				idPersonne = result;;
				let ligne = $("<tr></tr>");
				ligne.append($("<td></td>").append($("<input></input>").attr("value", idPersonne).attr("id", "txtIdPersonneAjout").addClass("form-control")));
				ligne.append($("<td></td>").append($("<input></input>").attr("id", "txtNomAjout").addClass("form-control")));
				ligne.append($("<td></td>").append($("<input></input>").attr("id", "txtPrenomAjout").addClass("form-control")));
				ligne.append($("<td></td>").append($("<input></input>").attr("id", "txtPoidsAjout").addClass("form-control")));
				ligne.append($("<td></td>").append($("<input></input>").attr("id", "txtTailleAjout").addClass("form-control")));
				ligne.append($("<td></td>").append($("<input></input>").attr("id", "txtSexeAjout").addClass("form-control")));
				ligne.append($("<td></td>").append($("<input></input>").attr("value", $("#cmdNouvellePersonne").attr("data-idSociete")).attr("id", "txtIdSocieteAjout").attr("readonly", "readonly").addClass("form-control")));

				ligne.append($("<td></td>").append($("<button></button>").
					attr("data-idPersonne", idPersonne).text("Enregistrer").addClass("btn btn-link Create")))

				ligne.append($("<td></td>").append($("<button></button>").
					attr("data-idPersonne", idPersonne).text("Supprimer").addClass("btn btn-link supprimeUpdate").css("style", "visibility:hidden")))

				$("#tblPersonnesBodyUpdate").append(ligne);
			}
		}
		);
	});

	$("#tblPersonnesUpdate tbody").on("click", ".Create", function (event) {
		event.preventDefault();
		alert("création en cours")
		let idPersonne = $("#txtIdPersonneAjout").val();
		let nom = $("#txtNomAjout").val();
		let prenom = $("#txtPrenomAjout").val();
		let poids = $("#txtPoidsAjout").val();
		let taille = $("#txtTailleAjout").val();
		let sexe = $("#txtSexeAjout").val();
		let idSociete = $("#txtIdSocieteAjout").val();

		let params = "idpers=" + idPersonne + "&nom=" + nom + "&prenom="
			+ prenom + "&poids=" + poids + "&taille=" + taille + "&sexe=" + sexe
			+ "&idsoc=" + idSociete
		alert(params)
		$.ajax({
			url: 'MaServlet',
			type: 'Post',
			data: params,
			success: function (result, status) {
				alert(status)
			}

		}
		)

		let zones = $(this).parent().siblings().children();

		for (i = 0; i < 6; i++) {
			zones[i].setAttribute("readonly", "true");
		}

		$(this).html("Modifier");
		$(this).removeClass("Create");
		$(this).addClass("modifieUpdate");

	});

	$("#cmdSocieteMAJ").on("click", function () {

		let idSociete = $("#txtIdSociete").val();
		let nom = $("#txtNomUpdate").val();
		let activite = $("#txtActiviteUpdate").val();
		let ca = $("#txtCAUpdate").val();
		let params = "idsoc=" + idSociete + "&nom=" + nom + "&acti=" + activite +
			"&ca=" + ca
		$.ajax({
			url: 'MaServlet?' + params,
			type: 'Put',
			success: function () {
				$("#UpdateSocieteModal").modal('hide');
			}
		}
		)
	});
});