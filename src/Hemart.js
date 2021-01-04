const { Client, Util } = require('discord.js');
const HemartLogger = require('./modules/HemartLogger.js');
const ShoukakuHandler = require('./modules/ShoukakuHandler.js');
const SettingsManager = require('./modules/SettingsManager.js');
const Queue = require('./modules/Queue.js');
const CommandHandler = require('./modules/CommandHandler.js');
const EventHandler = require('./modules/EventHandler.js');

const defaults = require('../misc.json');
const options = require('./DiscordJSOptions.js');
const { token } = require('../config.json');

class Hemart extends Client {
    constructor() {
        super(options);
        Object.defineProperty(this, 'location', { value: process.cwd() });
        Object.defineProperty(this, 'color', { value: 0x7E686C });

        this.logger = new HemartLogger(this);
        this.settings = new SettingsManager(this);
        this.shoukaku = new ShoukakuHandler(this);
        this.queue = new Queue(this);

        new CommandHandler(this).build();
        new EventHandler(this).build();
    }

    get getDefaultConfig() {
        return defaults;
    }

    async sortie() {
        await Util.delayFor(5000);
        await this.login(token);
    }

    async login() {
        await super.login(token);
        return this.constructor.name; 
    }
}

module.exports = Hemart;
