const { Listener } = require("discord-akairo")

class Ready extends Listener {
    constructor() {
        super('ready', {
            event: 'ready',
            emitter: 'client'
        });
    }

    exec() {

        let i = 0;
        setInterval(() => this.client.user.setActivity(`a!help | Powered by Akairo, Template By DeadShot`, { type: 'WATCHING' }), 15000);

        console.log(`${this.client.user.tag} is online!`);

    }
}

module.exports = Ready;
