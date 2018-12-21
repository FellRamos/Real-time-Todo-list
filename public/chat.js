
// Connecter au serveur
var socket = io.connect('http://localhost:8080');

// Liste des taches

socket.on('listeTaches', (listeTaches) => {
	$('#Liste').empty(); // A chaque foi, on fait le refresh de la page
	listeTaches.forEach( (tache, index) => {
		insererTache(tache, index);
	});
});

// Ajouter une tache
$('#button').on('click', () => {
	var task = $('#myInput').val();
	socket.emit('newTask', task);
});

// Supprimer une tache
$('#Liste').on('click', '.delete', function() {
    socket.emit('deleteTask', $(this).data('index'));
});
/*
	Note importante: Pour le deleteTask, les Arrow Functions ( => ) ne marche pas!
	J'ai reste des heures dessus, mais le "this" ne marche pas. J'ai trouve ca:
	"There are several things conventional functions define for you that arrow functions 
	do not, like arguments and as Max pointed out, this."
	-> https://teamtreehouse.com/community/arrow-functions-jquery
*/

// Fonction pour ajouter les taches dans le HTML
function insererTache(tache, index) {
	$('#Liste').append(`<li class="delete" data-index="${index}">${tache}</li>`);
}




