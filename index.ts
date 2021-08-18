import { Channel, Client, Guild, GuildChannel, GuildMember, Message, User } from "discord.js";

declare module "slash_commands.js" {
    
    /**
     * Creates a slash command.
     * @param client The client the command gets added to.
     */

    export class slashCommand {
        /** @param client The client the command gets added to.*/
        constructor(client?: Client);
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
        /** @param client The client the command gets added to.*/
        constructor(client?: Client);
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
        /** Sets the type of the option*/
        public setType(type:"string"|"number"|"boolean"|"user"|"channel"|"role") : slashOption;
        /**Sets the choices of the option */
        public addChoices(choices:object[]) : slashOption;
        /** Returns the name of the option*/
        readonly name: string;
        /** Returns the description of the option*/
        readonly description: string;
        /** Returns the requirement of the option*/
        readonly required: boolean;
        /**Returns the type of the option */
        readonly type : string;
    }

    /**
     * Creates a slash command option choice.
    */

     export class slashOptionChoice {
        constructor();
        /** Sets the name of the choice*/
        public setName(name: string): slashOptionChoice;
        /** Sets the value of the choice to identify it*/
        public setValue(value: string) : slashOptionChoice;
        /** Returns the name of the choice*/
        readonly name: string;
        /** Returns the value of the choice*/
        readonly value: string;
    }

    class slashResponse{
        readonly content: string;

        readonly id:string;

        readonly command_id:string;

        readonly options:messageOptions[];

        readonly channel:GuildChannel;

        readonly guild: Guild;

        readonly author: User;

        readonly member: GuildMember;

        readonly user: User;

        readonly application_id:string;

        readonly interaction: object;

        readonly client: Client;
    }

    class messageOptions{
        readonly name:string;
        readonly value:string;
        readonly type:number;
    }

    /**
     * Calls the listener when a slash command gets executed.
     * @param client The client that the message was sent from.
     * @param listener Gets called when a slash command gets executed. Returns void.
     */
    function onExecute(client: Client, listener : (message: slashResponse) => void) : Promise<void>;

    /**
     * Respond to a slash command with a message or an embed.
     * @param message The API message from the onExecute event.
     * @param text The text or the embed that gets send.
     * @param private determines if the message is public or can only be seen by the author.
     * @param components add components like buttons or menus
    */

    function reply(message: slashResponse, text: string, private: boolean, components:object) : Promise<Message>

    /**
     * Delete a slash command.
     * @param client The client that has the slash command.
     * @param command The command name of the command you want to delete.
    */

    function deleteSlashCommand(client: Client, command: string): Promise<void>;

    /**
     * Delete a guild slash command.
     * @param client The client that has the guild slash command.
     * @param command The command name of the command you want to delete.
     * @param guildId The guild ID of the guild command you want to delete.
    */

     function deleteGuildSlashCommand(client: Client, command: string, guildId: string): Promise<void>;
}
