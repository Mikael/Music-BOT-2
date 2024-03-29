const util = require('util');
const { MessageEmbed } = require('discord.js');
const HemartCommand = require('../abstract/HemartCommand.js');

class Eval extends HemartCommand {
    get name() {
        return 'eval';
    }

    get usage() {
        return 'eval [code]';
    }

    get description() {
        return 'Evaluates the given JS statement';
    }

    get permissions() {
        return 'OWNER';
    }

    async run(msg, args) {
        const code = args.join(' ');
        if (!code)
            return await msg.channel.send('What is the code you want me to run?');
        let res;
        try {
            res = eval(code);
            res = util.inspect(res, { depth: 0 });
        } catch (error) {
            res = util.inspect(error, { depth: 0 });
        }
        const embed = new MessageEmbed()
            .setColor(this.client.color)
            .setTitle('Eval Results')
            .setDescription(`\`\`\`js\n${this.trim(res, 2000)}\`\`\``)
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        await msg.channel.send(embed);
    }

    trim(string, max) {
        return string.length > max ? string.slice(0, max) : string;
    }
}
module.exports = Eval;