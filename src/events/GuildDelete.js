const HemartEvent = require('../abstract/HemartEvent.js');


class GuildDelete extends HemartEvent {
    get name() {
        return 'guildDelete';
    }

    get once() {
        return false;
    }

    async run(guild) {
        if (!guild.available) return;
        this.client.logger.log(this.constructor.name, `Removed guild => ${guild.name} with ${guild.memberCount} members`);
        await this.client.settings.destroy(guild.id);
    }
}
module.exports = GuildDelete;
