declare module "slash_commands.js" {
    
    /**
     * Creates a slash command.
     * @param client The client the command gets added to.
     */

    export class slashCommand {
        constructor(client?: any);
        /** Sets the name of the command*/
        public setName(name: string): slashCommand;
        /** Sets the description of the command*/
        public setDescription(description: string) : slashCommand;
        /** Adds an option the command*/
        public addOption(option: slashOption): slashCommand;
        /** Adds multiple options to the command*/
        public addOptions(options: object): slashCommand;
        /** Returns the name of the command*/
        readonly name: string;
        /** Returns the description of the command*/
        readonly description: string;
        /** Returns the options of the command*/
        readonly options: object;
    }

    /**
     * Creates a guild only slash command.
     * @param client The client the command gets added to.
     */

    export class guildSlashCommand {
        constructor(client?: any);
        /** Sets the name of the command*/
        public setName(name: string): guildSlashCommand;
        /** Sets the description of the command*/
        public setDescription(description: string) : guildSlashCommand;
        /** Sets the guild ID of the command*/
        public setGuildID(guildID: string) : guildSlashCommand;
        /** Adds an option the command*/
        public addOption(option: slashOption): guildSlashCommand;
        /** Adds multiple options to the command*/
        public addOptions(options: object): guildSlashCommand;
        /** Returns the name of the command*/
        readonly name: string;
        /** Returns the description of the command*/
        readonly description: string;
        /** Returns the options of the command*/
        readonly options: object;
        /** Returns the options of the command*/
        readonly guildID: string;
    }

    /**
     * Creates a slash command option.
    */

    export class slashOption {
        constructor();
        /** Sets the name of the option*/
        public setName(name: string): slashOption;
        /** Sets the description of the option*/
        public setDescription(description: string) : slashOption;
        /** Sets the requirement of the option*/
        public setRequired(state: boolean) : slashOption
        /** Returns the name of the option*/
        readonly name: string;
        /** Returns the description of the option*/
        readonly description: string;
        /** Returns the requirement of the option*/
        readonly required: boolean;
    }

    /**
     * Calls the listener when a slash command gets executed.
     * @param client The client that the message was sent from.
     * @param listener Gets called when a slash command gets executed. Returns void.
     */
    function onExecute(client: any, listener : (command : string, interaction : any, args : object) => void) : Promise<void>;

    /**
     * Respond to a slash command with a message or an embed.
     * @param client The client that the message was sent from.
     * @param interaction The interaction that comes from the slash command.
     * @param text The text or the embed that gets send.
     * @param private determines if the message is public or can only be seen by the author.
     */

    function reply(client: any, interaction: any, text: string, private: boolean) : Promise<void>

    /**
     * Edit a message sent with a slash command.
     * @param client The client that the message was sent from.
     * @param text The text that the message gets edited to.
     * @param interaction The interaction that comes from the slash command.
     */
    function edit(client: any, text: string, interaction: any): Promise<void>;

    /**
     * Delete a message sent with a slash command.
     * @param client The client that the message was sent from.
     * @param interaction The interaction that comes from the slash command.
     */
    function remove(client: any, interaction: any): Promise<void>;

    /**
     * Delete a slash command.
     * @param client The client that the message was sent from.
     * @param command The command name of the command you want to delete.
     */

    function deleteslashCommand(client: any, command: string): Promise<void>;
}