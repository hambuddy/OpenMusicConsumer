/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
        console.log('Database connected successfully');
    }

    async getPlaylistSong(playlistId) {
        const query = {
            text: 'SELECT id, name FROM playlists WHERE id = $1',
            values: [playlistId],
        };
    
        const songQuery = {
            text: `SELECT songs.id, songs.title, songs.performer FROM playlists
            JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
            JOIN songs ON songs.id = playlist_songs.song_id 
            WHERE playlists.id = $1`,
            values: [playlistId],
        };
    
        const result = await this._pool.query(query);
        const resultSongs = await this._pool.query(songQuery);
    
        const playlist = result.rows[0];
        const exportResult = {
            playlist: {
                id: playlist.id,
                name: playlist.name,
                songs: resultSongs.rows,
            },
        };
    
        return exportResult;
    }
    
}

module.exports = PlaylistsService;