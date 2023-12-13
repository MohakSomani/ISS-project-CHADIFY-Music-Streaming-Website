
const addToPlaylistButtons = document.querySelectorAll('#add-to-playlist');
addToPlaylistButtons.forEach(button => button.addEventListener('click', addToPlaylist));

console.log(albumTitle)

async function addToPlaylist(event) {
  console.log('addToPlaylist() called');
  const gridTableDiv = event.target.closest('.grid-table');
  const songNameDiv = gridTableDiv.querySelector('div:nth-child(1)');
  const durationDiv = gridTableDiv.querySelector('div:nth-child(2)');
  const YearofRelease = gridTableDiv.querySelector('div:nth-child(3)');
  const albumTitle = document.querySelectorAll('h1')[0].textContent.trim()
  const artistName = document.querySelectorAll('h2')[1].textContent.trim()
  const songName = songNameDiv.textContent.trim();
  const duration = durationDiv.textContent.trim();

  const data = { name: songName, duration: duration, album: albumTitle, artist: artistName};
  const dataString = JSON.stringify(data);

  try {
    const response = await fetch('http://127.0.0.1:5000/add-to-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dataString
    });
    
    if (response.ok) {
      alert('Song added to playlist!');
    } else {
      throw new Error('Failed to add song to playlist.');
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

