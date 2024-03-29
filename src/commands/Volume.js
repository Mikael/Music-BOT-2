const HemartCommand = require('../abstract/HemartCommand.js');

class Volume extends HemartCommand {
    get name() {
        return 'volume';
    }

    get usage() {
        return 'volume [number]';
    }

    get description() {
        return 'Sets the volume of this playback.';
    }

    async run(msg, args) {
        if (!msg.member.voice.channelID)
            return await msg.channel.send('You are not in a voice channel to perform this');
        const dispatcher = this.client.queue.get(msg.guild.id);
        if (!dispatcher)
            return await msg.channel.send('Nothing is playing in this guild.');
        if (dispatcher.player.voiceConnection.voiceChannelID !== msg.member.voice.channelID)
            return await msg.channel.send('You are not in the same voice channel where I am.');
        if (!args[0] || isNaN(args[0])) 
            return await msg.channel.send(`The playback volume is currently at **${dispatcher.link.player.volume}%**`);
        const volume = Number(args[0]);
        if (volume < 10 || volume > 1000)
            return await msg.channel.send('That\'s genuinely not possible :P');
        await dispatcher.player.setVolume(volume);
        await msg.channel.send(`The playback volume is now set to **${volume}%**`);
    }
}
module.exports = Volume;