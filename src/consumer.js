/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

require('dotenv').config();
const amqp = require('amqplib');
const PlaylistsService = require('./PlaylistsService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
    try {
        const playlistsService = new PlaylistsService();
        const mailSender = new MailSender();
        const listener = new Listener(playlistsService, mailSender);

        const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
        const channel = await connection.createChannel();

        await channel.assertQueue('export:playlists', {
            durable: true,
        });

        console.log('Waiting for messages in export:playlists queue...');
        channel.consume('export:playlists', listener.listen, { noAck: true });
    } catch (error) {
        console.error('Error initializing consumer:', error.message);
    }
};

init();