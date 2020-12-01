const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class UserInfo extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'ui', 'info', 'whois', 'profile', 'me'],
            channel: 'guild',
            category: 'Information',
            description: {
                content: 'Displays information about a provided user or the command executor.',
                usage: '[user]',
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ],
            typing: true
        });
    }

    async exec(message, args) {
       const flags = {
            DISCORD_EMPLOYEE: '<:staff:780263034018594898>',
            DISCORD_PARTNER: '<:partner:780264302938292234>',
            BUGHUNTER_LEVEL_1: '<:bughunter:780263436780961822>',
            BUGHUNTER_LEVEL_2: '<:bughuntergold:780263478497116160>',
            HYPESQUAD_EVENTS: '<:hypesquadevents:780263122862080022>',
            HOUSE_BRAVERY: '<:bravery:780263217704337455>',
            HOUSE_BRILLIANCE: '<:brilliance:780263380052344833>',
            HOUSE_BALANCE: '<:balance:780263192915345448>',
            EARLY_SUPPORTER: '<:earlysupporter:780263712560381992>',
            TEAM_USER: 'Team User',
            SYSTEM: '<:verifieddcsystem:780263856831987742>',
            VERIFIED_BOT: '<:VerifiedBot:780263828390150184>',
            VERIFIED_DEVELOPER: '<:botdev:780262998144450570>'
        };
        

        const member = args.member;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = (member.user.flags ? member.user.flags.toArray() : []);

        let status = ""
        if (member.user.presence.clientStatus && member.user.presence.clientStatus.mobile) status = "Mobile"
        if (member.user.presence.clientStatus && member.user.presence.clientStatus.desktop) status = "Desktop"
        if (member.user.presence.clientStatus && member.user.presence.clientStatus.web) status = "Website"
        if (member.user.presence.status === "offline") status = "The user is offline/invisible or there is some issue to track device."

        let emoji = ""
        if (`${member.user.presence.status}` === "online") emoji = "<:OnlineStatus:780264748591480833>"
        if (`${member.user.presence.status}` === "idle") emoji = "<:IdleStatus:780265734910509107>"
        if (`${member.user.presence.status}` === "dnd") emoji = "<:dnd:780264818262278155>"
        if (`${member.user.presence.status}` === "offline") emoji = "<:OfflineStatus:780264777691299841>"

        // let game;
        // if (member.user.presence.activities.length >= 1) game = `${member.user.presence.activities[0].type} - ${member.user.presence.activities[0].name}`;
        // else if (member.user.presence.activities.length < 1) game = "Not playing a game"; 
        
        var permissions = [];
        
        if (member.hasPermission("ADMINISTRATOR")) {
            permissions.push("Administrator");
        }

        if (member.hasPermission("CREATE_INSTANT_INVITE")) {
            permissions.push("Create Invite");
        }

        if (member.hasPermission("KICK_MEMBERS")) {
            permissions.push("Kick Members");
        }

        if (member.hasPermission("BAN_MEMBERS")) {
            permissions.push("Ban Members");
        }

        if (member.hasPermission("MANAGE_CHANNELS")) {
            permissions.push("Manage Channels");
        }

        if (member.hasPermission("MANAGE_GUILD")) {
            permissions.push("Manage Server");
        }

        if (member.hasPermission("ADD_REACTIONS")) {
            permissions.push("Add Reaction");
        }

        if (member.hasPermission("VIEW_AUDIT_LOG")) {
            permissions.push("View Audit Log");
        }

        if (member.hasPermission("PRIORITY_SPEAKER")) {
            permissions.push("Priority Speaker");
        }

        if (member.hasPermission("STREAM")) {
            permissions.push("Stream");
        }

        if (member.hasPermission("VIEW_CHANNEL")) {
            permissions.push("View Channel");
        }

        if (member.hasPermission("SEND_MESSAGES")) {
            permissions.push("Send Messages");
        }

        if (member.hasPermission("SEND_TTS_MESSAGES")) {
            permissions.push("Send TTS Messages");
        }

        if (member.hasPermission("MANAGE_MESSAGES")) {
            permissions.push("Manage Messages");
        }

        if (member.hasPermission("EMBED_LINKS")) {
            permissions.push("Embed Link");
        }

        if (member.hasPermission("ATTACH_FILES")) {
            permissions.push("Attach Files");
        }

        if (member.hasPermission("READ_MESSAGE_HISTORY")) {
            permissions.push("Read Message History");
        }

        if (member.hasPermission("MENTION_EVERYONE")) {
            permissions.push("Mention Everyone");
        }

        if (member.hasPermission("USE_EXTERNAL_EMOJIS")) {
            permissions.push("Use External Emojis");
        }

        if (member.hasPermission("VIEW_GUILD_INSIGHTS")) {
            permissions.push("View Server Insights");
        }

        if (member.hasPermission("CONNECT")) {
            permissions.push("Connect");
        }

        if (member.hasPermission("SPEAK")) {
            permissions.push("Speak");
        }

        if (member.hasPermission("MUTE_MEMBERS")) {
            permissions.push("Mute Members");
        }

        if (member.hasPermission("DEAFEN_MEMBERS")) {
            permissions.push("Deafen Members");
        }

        if (member.hasPermission("MOVE_MEMBERS")) {
            permissions.push("Move Members");
        }

        if (member.hasPermission("USE_VAD")) {
            permissions.push("Use Voice Activity");
        }

        if (member.hasPermission("CHANGE_NICKNAME")) {
            permissions.push("Change Nickname");
        }

        if (member.hasPermission("MANAGE_NICKNAMES")) {
            permissions.push("Manage Nickname");
        }

        if (member.hasPermission("MANAGE_ROLES")) {
            permissions.push("Manage Roles");
        }

        if (member.hasPermission("MANAGE_WEBHOOKS")) {
            permissions.push("Manage Webhooks");
        }

        if (member.hasPermission("MANAGE_EMOJIS")) {
            permissions.push("Manage Emojis");
        }


        const embed = new MessageEmbed()
            .setTitle('User Information')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor('#ffc0cb')
            .addField('__General__', [
                `**❯ Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}`,
                `**❯ Tag:** ${member.user.tag}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Device:** ${status} `,
                `**❯ Status:** ${member.user.presence.status} (${emoji})`,
             //   `**❯ Game:** ${game}`,
                `**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')}, ${moment(member.user.createdTimestamp).format('LL')} (${moment(member.user.createdTimestamp).fromNow()})`,
                `\u200b`
            ])
            .addField('__Member Information__', [
                `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**❯ Joinned:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**❯ Roles [${roles.length}]:** ${roles.slice(0, 10).join(', ') || 'None'}`,
                `\u200b`
            ])
           .addField('__Member Permissions__', [
                `${permissions.join(", ")}`,
                `\u200b`
            ]) 
            .setFooter(`Akairo Template | Made With ❤️ By DeadShot`)
            .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = UserInfo;