
// Connecter au serveur
var socket = io.connect('http://localhost:8080');




// Listening events: 
socket.on('listeTaches', (listeTaches) => {
	$('#liste').empty();
	listeTaches.forEach( (task, index) => {
		addingTask(task, index);
	});
});




// Ajouter une tache
$('#button').on('click', () => {
	var task = $('#myInput').val();
	socket.emit('newTask', task);
});

socket.on('newTask', (taskAndIndex) => {
	addingTask(taskAndIndex.tache, taskAndIndex.index);
});








function addingTask(newTask, newIndex) {
	$('#liste').append(`<li><a class="delete" href="#" data-index="${newIndex}" > ✘ </a> "${newIndex}" ${newTask} </li>`);
}



$('body').on('click', '.delete', function() {
    socket.emit('deleteTask', $(this).data('index'));
});
