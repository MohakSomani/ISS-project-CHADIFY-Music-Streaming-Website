			const searchButton = document.getElementById('search-button');
			const searchBar = document.getElementById('search-bar');
			const searchResults = document.getElementById('search-results');
			const explicitCheckbox = document.getElementById('explicit');
			const filterCheckbox = document.getElementById('filter');
			const Duration = document.getElementById("duration");
			document.getElementById('search-container').addEventListener('submit', event => {
			event.preventDefault();
			searchButton.click();
			console.log("Submitted");
			console.log(filterCheckbox.checked);
			console.log(Duration.value);
			});
			if(!filterCheckbox.checked || (filterCheckbox.checked && !Duration)){
				console.log("OK");
				searchButton.addEventListener('click', () => {
				const searchTerm = searchBar.value;
				if (searchTerm.trim() !== '') {
					let url = `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=10`;
					if (explicitCheckbox.checked && filterCheckbox.checked) {
					url += '&explicit=no';
					}
					fetch(url)
					.then(response => response.json())
					.then(data => {
						searchResults.innerHTML = '';
						data.results.forEach(result => {
						const resultElement = document.createElement('div');
						resultElement.className = 'result';

						const artworkElement = document.createElement('img');
						artworkElement.src = result.artworkUrl100;
						artworkElement.alt = result.collection
						const artistNameElement = document.createElement('h3');
						artistNameElement.textContent = result.artistName;

						const trackNameElement = document.createElement('h3');
						trackNameElement.textContent = result.trackName;

						resultElement.appendChild(artworkElement);
						resultElement.appendChild(artistNameElement);
						resultElement.appendChild(trackNameElement);

						if (result.previewUrl) {
							const audioPlayerElement = document.createElement('div');
							audioPlayerElement.classList.add('audio-player');

							const audioElement = document.createElement('audio');
							audioElement.src = result.previewUrl;

							const playButton = document.createElement('button');
							playButton.textContent = 'Play Audio';

							playButton.addEventListener('click', () => {
							if (audioElement.paused) {
								audioElement.play();
								playButton.textContent = 'Pause';
							} else {
								audioElement.pause();
								playButton.textContent = 'Play Audio';
							}
							});

							audioPlayerElement.appendChild(audioElement);
							audioPlayerElement.appendChild(playButton);
							resultElement.appendChild(audioPlayerElement);
						}

						searchResults.appendChild(resultElement);
						});
					})
					.catch(error => console.error(error));
				}
				});
			}
			if(filterCheckbox.checked && Duration.value != ""){
				console.log('gay');
				// Add event listener to search button
				searchButton.addEventListener('click', () => {
				const searchTerm = searchBar.value.trim();
				if (searchTerm !== '') {
					// Construct URL based on search term, media type, and limit
					let url = `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=200`;

					// Add filter parameters based on explicit and filter checkboxes
					if (explicitCheckbox.checked && filterCheckbox.checked) {
					url += '&explicit=no';
					}
					console.log(Duration);
					// Fetch data from iTunes API and process the results
					fetch(url)
					.then(response => response.json())
					.then(data => {
						// Clear the search results container
						searchResults.innerHTML = '';
						duration = parseInt(Duration.value , 10);
						// Filter the results based on the duration input value
						data.results
						.filter(result => result.trackTimeMillis <= (duration * 60000))
						.forEach(result => {
							// Create elements to display the search result
							const resultElement = document.createElement('div');
							resultElement.className = 'result';

							const artworkElement = document.createElement('img');
							artworkElement.src = result.artworkUrl100;
							artworkElement.alt = result.collectionName;

							const artistNameElement = document.createElement('h3');
							artistNameElement.textContent = result.artistName;

							const trackNameElement = document.createElement('h3');
							trackNameElement.textContent = result.trackName;

							// Add elements to the search result container
							resultElement.appendChild(artworkElement);
							resultElement.appendChild(artistNameElement);
							resultElement.appendChild(trackNameElement);

							// Add audio player if a preview URL is available
							if (result.previewUrl) {
							const audioPlayerElement = document.createElement('div');
							audioPlayerElement.classList.add('audio-player');

							const audioElement = document.createElement('audio');
							audioElement.src = result.previewUrl;

							const playButton = document.createElement('button');
							playButton.textContent = 'Play Audio';
							playButton.addEventListener('click', () => {
								if (audioElement.paused) {
								audioElement.play();
								playButton.textContent = 'Pause';
								} else {
								audioElement.pause();
								playButton.textContent = 'Play Audio';
								}
							});

							// Add audio player elements to the search result container
							audioPlayerElement.appendChild(audioElement);
							audioPlayerElement.appendChild(playButton);
							resultElement.appendChild(audioPlayerElement);
							}

							// Add the search result to the search results container
							searchResults.appendChild(resultElement);
						});
					})
					.catch(error => console.error(error));
				}
				});
			}
			console.log("END");


			const navbarLinks = document.querySelectorAll('.navbar a');
			navbarLinks.forEach(link => {
			  link.addEventListener('mouseover', function() {
				this.style.color = 'rgb(2, 225, 255)';
				this.style.fontSize = '22px';
			  });
			  link.addEventListener('mouseout', function() {
				this.style.color = '#eeeeee';
				this.style.fontSize = '20px';
			  });
			});