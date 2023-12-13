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

function removeSong(id) {
  // send a POST request to remove the song from the playlist
  fetch('/remove-song', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
      // reload the page to update the playlist
      window.location.reload();
    })
    .catch(error => console.error(error));
}