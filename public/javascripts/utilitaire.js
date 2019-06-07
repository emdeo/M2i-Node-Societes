
function AfficheListeDesSocietes(lstSocietes) {

	alert("AfficheListeDesSocietes - début")

	$("#tblSocietesBody").empty(); // Supprime tous les elements enfants de tblSocietesBody	  

	for (societe of lstSocietes) {
		let ligne = $("<tr></tr>");

		ligne.append($("<td></td>").text(societe.ID_Societe));
		ligne.append($("<td></td>").text(societe.Nom));
		ligne.append($("<td></td>").text(societe.Activite));
		ligne.append($("<td></td>").text(societe.CA));

		ligne.append($("<td></td>").append($("<button></button>")
			.addClass("btn btn-link select").attr("data-idSociete", societe.ID_Societe).html("Consulter")));

		ligne.append($("<td></td>").append($("<button></button>")
			.addClass("btn btn-link update").attr("data-idSociete", societe.ID_Societe).html("Modifier")));

		ligne.append($("<td></td>").append($("<button></button>")
			.addClass("btn btn-link delete").attr("data-idSociete", societe.ID_Societe).html("Supprimer")));

		$("#tblSocietesBody").append(ligne);
	}

	$("#tblEmployesBody").empty();
	$("#tblEmployes").hide();
	$("#frmNouveau")[0].reset(); //Réinitialiser le formulaire 
	$("#collapseNouveau").collapse('hide'); // Fermer le collapse

	alert("AfficheListeDesSocietes - fin")
}


function AfficheSociete(societe) {
	$("#tblSocietesUpdateBody").empty()
	alert("Affiche societe en action : " + societe._Nom)

	let ligneSociete = $("<tr></tr>").append($("<td></td>").append($("<input></input>").addClass('form-control').attr("type", "text").attr("id", 'txtIdSociete').val(societe._ID_Societe)));
	ligneSociete.append($("<td></td>").append($("<input></input>").addClass('form-control').attr("type", "text").attr("id", 'txtNomUpdate').val(societe._Nom)));
	ligneSociete.append($("<td></td>").append($("<input></input>").addClass('form-control').attr("type", "text").attr("id", 'txtActiviteUpdate').val(societe._Activite)));
	ligneSociete.append($("<td></td>").append($("<input></input>").addClass('form-control').attr("type", "text").attr("id", 'txtCAUpdate').val(societe._CA)));

	$("#tblSocietesUpdateBody").append(ligneSociete);
}

function AfficheListeDesEmployes(lstEmployes) {
	$("#tblEmployesBody").empty(); // Supprime tous les elements enfants de tblEmployesBody

	for (i = 0; i < lstEmployes.length; i++) {
		let ligne = $("<tr></tr>");
		ligne.append($("<td></td>").text(lstEmployes[i].ID_Personne));
		ligne.append($("<td></td>").text(lstEmployes[i].Nom));
		ligne.append($("<td></td>").text(lstEmployes[i].Prenom));
		ligne.append($("<td></td>").text(lstEmployes[i].Poids));

		ligne.append($("<td></td>").text(lstEmployes[i].Taille));
		ligne.append($("<td></td>").text(lstEmployes[i].Sexe));
		ligne.append($("<td></td>").text(lstEmployes[i].ID_SOCIETE));


		$("#tblEmployesBody").append(ligne);
	}

	$("#tblEmployes").show();
}


function AffichePersonnePourUpdate(personnes) {
	$("#tblPersonnesBodyUpdate").empty();
	for (p of personnes) {
		let ligne = $("<tr></tr>")
		ligne.append($("<td></td>").append($("<input></input>").attr("readonly", "readonly").attr("id", p._ID_Personne).addClass('form-control').val(p._ID_Personne)))

		ligne.append($("<td></td>").append($("<input></input>").attr("readonly", "readonly").attr("id", "txtNomPersonne" + p._ID_Personne).addClass('form-control').val(p._Nom)))
		ligne.append($("<td></td>").append($("<input></input>").attr("readonly", "readonly").attr("id", "txtPrenomPersonne" + p._ID_Personne).addClass('form-control').val(p._Prenom)))

		ligne.append($("<td></td>").append($("<input></input>").attr("readonly", "readonly").attr("id", "txtPoidsPersonne" + p._ID_Personne).addClass('form-control').val(p._Poids)))
		ligne.append($("<td></td>").append($("<input></input>").attr("readonly", "readonly").attr("id", "txtTaillePersonne" + p._ID_Personne).addClass('form-control').val(p._Taille)))

		ligne.append($("<td></td>").append($("<input></input>").attr("readonly", "readonly").attr("id", "txtSexePersonne" + p._ID_Personne).addClass('form-control').val(p._Sexe)))
		ligne.append($("<td></td>").append($("<input></input>").attr("readonly", "readonly").attr("id", "txtIdSocietePersonne" + p._ID_Personne).addClass('form-control').val(p._ID_Societe)))

		ligne.append($("<td></td>").append($("<button></button>").attr("data-idPersonne", p._ID_Personne).attr("id", "txtSexePersonne" + p._ID_Personne).addClass("btn btn-link modifieUpdate").html("Modifier")))
		ligne.append($("<td></td>").append($("<button></button>").attr("data-idPersonne", p._ID_Personne).attr("id", "txtIdSocietePersonne" + p._ID_Personne).addClass('form-control').html("Supprimer")))

		$("#tblPersonnesBodyUpdate").append(ligne);

	}

	$("#UpdateSocieteModal").modal('show');
}




