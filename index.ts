import { Client, Guild, GuildChannel, GuildMember, Message, MessageEmbed, User } from "discord.js";

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
        public setType(type:slashChoiceType) : slashOption;
        /**Sets the choices of the option */
        public setChoices(choices:object[]) : slashOption;
        /** Returns the name of the option*/
        readonly name: string;
        /** Returns the description of the option*/
        readonly description: string;
        /** Returns the requirement of the option*/
        readonly required: boolean;
        /**Returns the type of the option */
        readonly type : string;
    }

    type slashChoiceType = "string"|"number"|"boolean"|"user"|"channel"|"role";

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

    class slashInteraction{
        readonly content: string;

        readonly id:string;

        readonly command_id:string;

        readonly options:messageOptions[];

        channel:GuildChannel;

        guild: Guild;

        author: User;

        member: GuildMember;

        user: User;

        readonly application_id:string;

        interaction: object;

        client: Client;

        /**Reply to an interaction
         * @param options can be only text, only embed or an object that contains them.
        */

        public reply(options:string|replyObject) : Promise<slashResponse>

        /**Defer an interaction*/

        public defer() : Promise<boolean>
    }

    class slashResponse{
        readonly content:string;
        readonly command_id:string;
        readonly command_name:string;
        readonly options:replyObject;
        channel:GuildChannel;
        guild: Guild;
        author: User;
        member: GuildMember;
        readonly application_id:string;
        interaction:any;
        client:Client;
        readonly embeds:object;
        readonly components:object;
        readonly ephemeral:boolean;
        public reply(options:replyObject) : Promise<slashResponse>;
        public edit(options:replyObject) : Promise<slashResponse>;
        public delete() : Promise<any>;
        public react(emoji:string|object) : Promise<slashResponse>
        public fetch() : Promise<Message>
    }

    class replyObject{
        content:string;
        embeds:object;
        components:object;
        ephemeral:boolean;
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
    function onExecute(client: Client, listener : (message: slashInteraction) => void) : Promise<void>;

    /**
     * Respond to a slash command with a message or an embed.
     * @deprecated
     * @param message The API message from the onExecute event.
     * @param text The text or the embed that gets send.
     * @param private determines if the message is public or can only be seen by the author.
     * @param components add components like buttons or menus
    */

    function reply(message: slashInteraction, text: string|object, private: boolean, components:object) : Promise<Message>

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

     /**
     * Get all slash commands.
     * @param client The client that has the slash commands.
    */

    function getAllCommands(client: Client): Promise<void>;

    /**
     * Get all guild slash commands.
     * @param client The client that has the guild slash command.
     * @param guildId The guild ID of the guild command.
    */

     function getAllGuildCommands(client: Client, guildId: string): Promise<void>;

     /**
     * Get a specific slash command.
     * @param client The client that has the guild slash command.
     * @param name The name of the command.
    */

      function getCommand(client: Client, name: string): Promise<void>;

      /**
     * Get a specific guild slash command.
     * @param client The client that has the guild slash command.
     * @param guildID The guild ID of the guild command.
     * @param name The name of the command.
    */

       function getGuildCommand(client: Client, guildID:string, name: string): Promise<void>;
}
