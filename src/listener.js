/* eslint-disable no-undef */ 

class Listener {
    constructor(playlistsService, mailSender) {
        this._playlistsService = playlistsService;
        this._mailSender = mailSender;
    
        this.listen = this.listen.bind(this);
    }
  
    async listen(message) {
        try {
            const content = message.content.toString();
            const { playlistId, targetEmail } = JSON.parse(content);
    
            if (!playlistId || !targetEmail) {
                throw new Error('Invalid message format');
            }
    
            const playlists = await this._playlistsService.getPlaylistSong(playlistId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlists));
    
            console.log(result);
        } catch (error) {
            console.error('Error processing message:', error.message);
        }
    }    
}
  
module.exports = Listener;