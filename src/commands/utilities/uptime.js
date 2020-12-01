const { Command } = require('discord-akairo');
const ms = require('ms');

class Uptime extends Command {
    constructor() {
        super('uptime', {
            aliases: ['uptime', 'up'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This provides the current uptime of the bot.'
            }
        });
    }

    async exec(message) {

        message.channel.send(`My current **uptime** is \`${ms(this.client.uptime, { long: true })}\``);
    }
}

module.exports = Uptime;
