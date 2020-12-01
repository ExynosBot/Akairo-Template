const { log } = require('console');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const { config } = require('dotenv');
const { join } = require('path');

config();

const commandsPath = join(__dirname, '..', 'commands/');
const listenersPath = join(__dirname, '..', 'listeners/');

class Akairo extends AkairoClient{
    constructor() {
        super(
            {
                ownerID: 'YourID'
            },
            {
                disableEveryone: true
            }
        );

        this.commandHandler = new CommandHandler(this, {
            prefix: ['a!'],
            blockBots: true,
            blockClient: true,
            allowMention: true,
            defaultCooldown: 500,
            commandUtil: true,
            directory: join(__dirname, "commands")
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "listeners")
        });

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
    }
}

const client = new Akairo();

client.login('Bot_Token');