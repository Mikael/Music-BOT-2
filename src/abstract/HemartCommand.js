class HemartCommand {
    constructor(client) {
        this.client = client;
        if (this.constructor === HemartCommand) throw new TypeError('Abstract class "HemartCommand" cannot be instantiated directly.'); 
        if (this.name === undefined) throw new TypeError('Classes extending HemartCommand must have a getter "name"');
        if (this.usage === undefined) throw new TypeError('Classes extending HemartCommand must have a getter "usage"');
        if (this.description === undefined) throw new TypeError('Classes extending HemartCommand must have a getter "description"');
        if (this.run !== undefined) {
            if (this.run.constructor.name !== 'AsyncFunction')
                throw new TypeError('Classes extending HemartCommand must implement "run" as async function');
        } else throw new TypeError('Classes extending HemartCommand must implement an async function "run"');
    }
    
    get permissions() {
        return null;
    }
}
module.exports = HemartCommand;