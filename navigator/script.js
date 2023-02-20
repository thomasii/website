$('#search-form').on('submit', function(event) {
	event.preventDefault();
	var query = $('#search-input').val();
	if (query) {
		window.location.href = 'https://www.google.com/search?q=' + query;
	}
});