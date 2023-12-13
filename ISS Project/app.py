from flask import Flask, request, json, render_template, send_from_directory
import sqlite3
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

def generate_key(s):
    """Create an integer hash key from a string using Rabin-Karp rolling hash."""
    BASE = 31
    MOD = 10**9 + 9
    key = 0
    for i, ch in enumerate(s):
        key = (key * BASE + ord(ch)) % MOD
    return key

conn = sqlite3.connect('music.db')
conn.execute('CREATE TABLE IF NOT EXISTS tracks (id INTEGER PRIMARY KEY, title TEXT, length TEXT, album TEXT, artist TEXT)')
conn.commit()
conn.close()

@app.route('/add-to-playlist', methods=['POST'])
def add_track():
    track = request.get_json()
    title = track['name']
    length = track['duration']
    album = track['album']
    artist = track['artist']
    id = generate_key(title)
    print(track)
    conn = sqlite3.connect('music.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM tracks WHERE id=?', (id,))
    result = cursor.fetchone()
    conn.close()
    
    if result:
        return json.jsonify({'message': 'Track already exists in playlist.'}), 409

    conn = sqlite3.connect('music.db')
    conn.execute('INSERT INTO tracks (id, title, length, album, artist) VALUES (?, ?, ?, ?, ?)', (id, title, length, album, artist))
    conn.commit()
    conn.close()

    return json.jsonify({'message': 'Track added to playlist successfully.'}), 200

@app.route('/')
def show_playlist():
    conn = sqlite3.connect('music.db')
    c = conn.cursor()
    c.execute('SELECT * FROM tracks')
    tracks = c.fetchall()
    conn.close()

    return render_template('Playlists_Page.html', songs=tracks)

@app.route('/remove-song', methods=['POST'])
def delete_track():
    track_id = request.json.get('id')

    conn = sqlite3.connect('music.db')
    c = conn.cursor()
    c.execute('DELETE FROM tracks WHERE id=?', (track_id,))
    conn.commit()
    conn.close()

    return json.jsonify(success=True)

@app.route('/ISS PROJECT/<directory>/<path:filename>')
def serve_file_within_directory(directory, filename):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    print(root_dir)
    return send_from_directory(os.path.join(root_dir, directory), filename)

@app.route('/ISS PROJECT/<path:filename>')
def serve_file(filename):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    print(root_dir)
    return send_from_directory(root_dir,  filename)


if __name__ == '__main__':
    app.run(debug=True)
