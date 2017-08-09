$(document).ready(function(){
	$('#searchForm').on('submit', function(e) {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
		});
	});
	function getMovies(searchText) {
		axios.get('http://www.omdbapi.com?s='+searchText)
		.then(function(response){
			console.log(response);
			let movies = response.data.Search;
			let output = '';
			$.each(movies, function(index, movie) {
				output += `
					<div class="col-md-3">
						<div class="well text-center">
							<img src="${movie.Poster}" />
							<h5>${movie.Title}</h5>
 <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>						</div>
					</div>
				`;

			});

			$('#movies').html(output);
		})
		.catch(function(error) {
			console.log(error);

		});
	}

	function movieSelected(id){
  	sessionStorage.setItem('movieId', id);
  	window.location = 'movie.html';
  	return false;
}

	function getMovie() {
		let movieId = sessionStorage.getItem('movieId');
		axios.get('http://www.omdbapi.com?i='+movieId)
		.then(function(response){
			console.log(response);
			let movie = response.data;

			let output = `
				<div class="row">
					<div class="col-md-4">
						<img src ="${movie.Poster}" class="thumbnail">
					</div>
					<div class ="col-md-8">
						<h2>${movie.Title}</h2><small>${movie.Country}</small>
						<p>${movie.Plot}</p>
						<ul class="list-group">
							<li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
							<li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
							<li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
							<li class="list-group-item"><strong>Year Released:</strong>${movie.Year}</li>
							<li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
							<li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
						</ul>
					</div>

				</div
				<div class="row">
					<div class="well">
						<a href="http://imbd.com/title/${movie.imdbID}" class="btn btn-primary" target ="_blank"> More About this Movie</a>
						<a href="index.html" class="btn btn-default"> Back to Movie Search</a>

					</div>

				</div>
			`;
			$('#movie').html(output);
			
		})
		.catch(function(error) {
			console.log(error);
		})
	}
		

