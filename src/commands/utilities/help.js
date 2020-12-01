const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'commands'],
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    default: null
                }
            ],
            category: 'Utilities',
            description: {
                content: 'Displays information about a command',
                usage: '[command]',
                examples: ['userinfo']  
            }
        });
    }

    exec(message, { command }) {
        const prefix = this.handler.prefix;
        const embed = new MessageEmbed().setColor('#ffc0cb');

        if (command) {
            embed
                .setColor('#ffc0cb')
                .addField(
                    '❯ Description:',
                    command.description.content || 'No Description provided'
                )
		.addField(
                    '❯ Usage:',
                    `\`${command.aliases[0]} ${command.description.usage ? command.description.usage : ''
                    }\``
                );
		
            if (command.aliases.length > 1) {
                embed.addField('❯ Aliases Available:', `\`${command.aliases.join('`, `')}\``);
            }
            if (command.description.examples && command.description.examples.length) {
                embed.addField(
                    '❯ Example:',
                    `\`${command.aliases[0]} ${command.description.examples.join(
                        `\`\n\`${command.aliases[0]} `
                    )}\``
                );
            }
        } else {
            embed
                .setTitle('Help Interface')
                .setThumbnail(this.client.user.displayAvatarURL())
                .setDescription(
                    stripIndents`
                    These are the commands which are executable for usage in **${this.client.user.username}**.
					For additional info on a command, type \`ex!help <command>\`.`
                )
                .setFooter(
                    `Akairo Template | Made With ❤️ By DeadShot`,
                    this.client.user.displayAvatarURL()
                );

            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `❯ ${category.id.replace(/(\b\w)/gi, (lc) =>
                        lc.toUpperCase())}:`,
                    `${category
                        .filter((cmd) => cmd.aliases.length > 0)
                        .map((cmd) => `\`${cmd.aliases[0]}\``)
                        .join(' , ')}`
                );    
            }
            embed.addField(`__Quick Links__`, [
                `[**GitHub**](https://github.com/Exynos-Discord)`
            ]);

        }

        return message.util.send(embed);
    }
}

module.exports = HelpCommand;