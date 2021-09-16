const discord = require("discord.js");
const fetch = require("node-fetch");
let starterBot;
let cmdlist = [];
(async function wait(){
    let pr = await fetch("https://raw.githubusercontent.com/TheMinecrafter05/slash_commands.js/main/package.json", {method:"GET"})
    let r = await pr.json();
    if(r.version != "1.8.0"){
        setTimeout(()=>{
            console.error("There is a new version of slash_commands.js available.\nInstall it using npm i slash_commands.js")
        },5000)
    }
})()

class slashCommand{
    constructor(client=discord.Client){
        let that = this;
        this.client = client;
        starterBot = client;
        this.name = "";
        this.description = "";
        this.options = []
        this.setName = function(name=""){
            if(!name) throw new Error("No name provided.")
            if(name.length > 32) throw new Error("The name is to long. Max 32 characters.")
            name = name.toLowerCase()
            if(/[^a-z]/i.test(name)) throw new Error("The name can only include characters from a to z")
            that.name = name
            return that;
        }

        this.setDescription = function(description=""){
            if(!description) throw new Error("No description provided.")
            if(description.length > 100) throw new Error("The description is to long. Max 100 characters.")
            that.description = description;
            return that;
        }

        this.addOptions = function(...options){
            if(options.length == 0) throw new Error("No options provided.");
            if(!options[0].name) options = options[0]
            for(var i=0;i<options.length;i++){
                let cmd = {}
                let option = options[i]
                if(/[^a-z]/i.test(option["name"])) throw new Error("The name can only include characters from a to z")
                cmd["name"] = option["name"].toLowerCase()
                cmd["description"] = option["description"]
                cmd["type"] = option["type"]
                cmd["required"] = option["required"]
                cmd["choices"] = option["choices"]
                that.options.push(cmd)
            }
            return that
        }

        let f = setInterval(async ()=>{
            if(client.readyAt != null){
                clearInterval(f)
                let fouund = false;
                let edit = false;
                let id;
                if(!that.name) throw new Error("No name provided.");
                if(that.name.length > 32) throw new Error("Name must be shorter than 32 characters.");
                if(!that.description) throw new Error("No description provided.");
                if(that.description.length > 100) throw new Error("Description must be shorter than 100 characters.");
                for(var i=0;i<this.options.length;i++){
                    if(this.options[i].name.length > 32) throw new Error("Name must be shorter that 32 characters.");
                    if(this.options[i].description.length > 100) throw new Error("Description must be shorter than 100 characters.");
                    if(!this.options[i].type) throw new Error("No type provided.");
                    if(this.options[i].type == "unvalid"){ throw new Error("Invalid type provided.")}
                    for(var o=0;o<this.options[i].choices.length;o++){
                        if(!this.options[i].choices[o].name) throw new Error("No name provided.");
                        if(!this.options[i].choices[o].value) throw new Error("No value provided.");
                        if(this.options[i].choices[o].value.toString().length > 100) throw new Error("Value must be shorter than 100 characters.");
                        if(this.options[i].choices[o].name.length > 100) throw new Error("Name must be shorter than 100 characters.");
                    }
                }
                let hfejhf = await client.api.applications(client.user.id).commands.get();
                hfejhf.forEach(command=>{
                    if(command.name == that.name){
                        if(command.description != that.description) edit = true;
                        if(!command.options && that.options || command.options && !that.options){
                            edit = true
                        }else{
                            if(command.options.length != that.options.length){
                                edit = true;
                            }else{
                                for(var i=0;i<that.options.length;i++){
                                    if(command.options){
                                        if(command.options[i]){
                                            if(command.options[i].name != that.options[i].name){
                                                edit = true;
                                            }
                                            if(command.options[i].description != that.options[i].description){
                                                edit = true;
                                            }
                                            if(command.options[i].required != that.options[i].required){
                                                edit = true;
                                            }
                                            if(command.options[i].type != that.options[i].type){
                                                edit = true;
                                            }
                                            if(!command.options[i].choices && that.options[i].choices || command.options[i].choices && !that.options[i].choices){
                                                edit = true;
                                            }else{
                                                if(command.options[i].choices.length != that.options[i].choices.length){
                                                    edit = true;
                                                }else{
                                                    for(o=0;o<that.options[i].length;o++){
                                                        if(command.options[i].choices){
                                                            if(command.options[i].choices[o].name != that.options[i].choices[o].name){
                                                                edit = true;
                                                            }
                                                            if(command.options[i].choices[o].value != that.options[i].choices[o].value){
                                                                edit = true;
                                                            }
                                                        }else{
                                                            edit = true;
                                                        }
                                                    }
                                                }
                                            }
                                        }else{
                                            edit = true;
                                        }
                                    }else{edit = true}
                                }
                            }
                        }
                        if(edit == false) {fouund = true;}else{ id = command.id;}
                    }
                })
                if(fouund == true) return;
                if(edit == true){
                    await client.api.applications(client.user.id).commands(id).patch({
                        data: {
                            "name": that.name !== undefined ? that.name : "command",
                            "description": that.description !== undefined ? that.description : "A cool command",
                            "options": that.options !== undefined ? that.options : [],
                            "default_permission":true,
                            "type":1
                        }
                    }).catch(err=>{
                        if(err) return new Error(err)
                    });
                }else{
                    await client.api.applications(client.user.id).commands.post({
                        data: {
                            "name": that.name !== undefined ? that.name : "command",
                            "description": that.description !== undefined ? that.description : "A cool command",
                            "options": that.options !== undefined ? that.options : [],
                            "default_permission":true,
                            "type":1
                        }
                    }).catch(err=>{
                        if(err) return new Error(err)
                    });
                }
                cmdlist.push(that.name)
            }
        },100)
    }
}

class guildSlashCommand{
    constructor(client=discord.Client){
        let that = this;
        this.client = client;
        starterBot = client;
        this.name = "";
        this.description = "";
        this.options = []
        this.guildID = ""
        this.setName = function(name=""){
            if(!name) throw new Error("No name provided.")
            if(name.length > 32) throw new Error("The name is to long. Max 32 characters.")
            name = name.toLowerCase()
            if(/[^a-z]/i.test(name)) throw new Error("The name can only include characters from a to z")
            that.name = name
            return that;
        }

        this.setDescription = function(description=""){
            if(!description) throw new Error("No description provided.")
            if(description.length > 100) throw new Error("The description is to long. Max 100 characters.")
            that.description = description;
            return that;
        }

        this.setGuildID = function(guildID){
            that.guildID = guildID;
            return that;
        }

        this.addOptions = function(...options){
            if(options.length == 0) throw new Error("No options provided.");
            if(!options[0].name) options = options[0]
            for(var i=0;i<options.length;i++){
                let cmd = {}
                let option = options[i]
                if(/[^a-z]/i.test(option["name"])) throw new Error("The name can only include characters from a to z")
                cmd["name"] = option["name"].toLowerCase()
                cmd["description"] = option["description"]
                cmd["type"] = option["type"]
                cmd["required"] = option["required"]
                cmd["choices"] = option["choices"]
                that.options.push(cmd)
            }
            return that;
        }

        let f = setInterval(async ()=>{
            if(client.readyAt != null){
                clearInterval(f)
                let fouund = false;
                let edit = false;
                let id;
                if(!that.name) throw new Error("No name provided.");
                if(that.name.length > 32) throw new Error("Name must be shorter than 32 characters.");
                if(!that.description) throw new Error("No description provided.");
                if(that.description.length > 100) throw new Error("Description must be shorter than 100 characters.");
                if(!that.guildID) throw new Error("No guildID provided.");
                if(!client.guilds.cache.get(that.guildID)) throw new Error("Invalid guildID provided.");
                if(!this.name) throw new Error("No name provided.");
                for(var i=0;i<this.options.length;i++){
                    if(this.options[i].name.length > 32) throw new Error("Name must be shorter that 32 characters.");
                    if(this.options[i].description.length > 100) throw new Error("Description must be shorter than 100 characters.");
                    if(!this.options[i].type) throw new Error("No type provided.");
                    if(this.options[i].type == "unvalid"){ throw new Error("Invalid type provided.")}
                    for(var o=0;o<this.options[i].choices.length;o++){
                        if(!this.options[i].choices[o].name) throw new Error("No name provided.");
                        if(!this.options[i].choices[o].value) throw new Error("No value provided.");
                        if(this.options[i].choices[o].value.toString().length > 100) throw new Error("Value must be shorter than 100 characters.");
                        if(this.options[i].choices[o].name.length > 100) throw new Error("Name must be shorter than 100 characters.");
                    }
                }
                let hfejhf = await client.api.applications(client.user.id).guilds(that.guildID).commands.get();
                hfejhf.forEach(command=>{
                    if(command.name == that.name){
                        if(command.description != that.description) edit = true;
                        if(!command.options && that.options || command.options && !that.options){
                            edit = true
                        }else{
                            if(command.options.length != that.options.length){
                                edit = true;
                            }else{
                                for(var i=0;i<that.options.length;i++){
                                    if(command.options){
                                        if(command.options[i]){
                                            if(command.options[i].name != that.options[i].name){
                                                edit = true;
                                            }
                                            if(command.options[i].description != that.options[i].description){
                                                edit = true;
                                            }
                                            if(command.options[i].required != that.options[i].required){
                                                edit = true;
                                            }
                                            if(command.options[i].type != that.options[i].type){
                                                edit = true;
                                            }
                                            if(!command.options[i].choices && that.options[i].choices || command.options[i].choices && !that.options[i].choices){
                                                edit = true;
                                            }else{
                                                if(command.options[i].choices.length != that.options[i].choices.length){
                                                    edit = true;
                                                }else{
                                                    for(o=0;o<that.options[i].choices.length;o++){
                                                        if(command.options[i].choices[o]){
                                                            if(command.options[i].choices[o].name != that.options[i].choices[o].name){
                                                                edit = true;
                                                            }
                                                            if(command.options[i].choices[o].value != that.options[i].choices[o].value){
                                                                edit = true;
                                                            }
                                                        }else{
                                                            edit = true;
                                                        }
                                                    }
                                                }
                                            }
                                        }else{
                                            edit = true;
                                        }
                                    }else{edit = true}
                                }
                            }
                        }
                        if(edit == false) {fouund = true;}else{ id = command.id;}
                    }
                })
                if(fouund == true) return;
                if(edit == true){
                    await client.api.applications(client.user.id).guilds(that.guildID).commands(id).patch({
                        data: {
                            "name": that.name ? that.name : "command",
                            "description": that.description !== undefined ? that.description : "A cool command",
                            "options": this.options ? this.options : [],
                            "default_permission":true,
                            "type":1
                        }
                    }).catch(err=>{
                        if(err) return new Error(err)
                    });
                }else{
                    await client.api.applications(client.user.id).guilds(that.guildID).commands.post({
                        data: {
                            "name": that.name !== undefined ? that.name : "command",
                            "description": that.description !== undefined ? that.description : "A cool command",
                            "options": that.options !== undefined ? that.options : [],
                            "default_permission":true,
                            "type":1
                        }
                    }).catch(err=>{
                        if(err) return new Error(err)
                    });
                }
                cmdlistguild.push(that.name)
            }
        },100)
    }
}

class slashOption{
    constructor(){
        let that = this;
        this.name = "";
        this.description = "";
        this.required = false;
        this.type = 3;
        this.choices = []
        this.setName = function(name=""){
            while(name.includes(" ")){
                name = name.replace(" ","_")
            }
            that.name = name.toLowerCase()
            return that;
        }

        this.setDescription = function(description=""){
            that.description = description;
            return that;
        }

        this.setRequired = function(state = false){
            if(state == undefined) throw new Error("No state provided.");
            if(typeof(state) != "boolean") throw new Error("Invalid state provided.");
            that.required = state;
            return that;
        }

        this.setType = function(type){
            if(type.toLowerCase() == "string"){ type = 3} else
            if(type.toLowerCase() == "number") {type = 10} else
            if(type.toLowerCase() == "boolean") {type = 5} else
            if(type.toLowerCase() == "user") {type = 6} else
            if(type.toLowerCase() == "channel") {type = 7} else
            if(type.toLowerCase() == "role") {type = 8} else {
                type = "unvalid"
            }
            that.type = type;
            return that;
        }

        this.setChoices = function(choices=[]){
            if(!choices.length) throw new Error("Choices must be an object[].");
            if(choices.length == 0) throw new Error("No choices provided.");
            for(var i=0;i<choices.length;i++){
                that.choices.push(choices[i]);
            }
            return that;
        }
    }
}

class slashOptionChoice{
    constructor(){
        let that = this;
        this.name = "";
        this.value = "";

        this.setName = function(name=""){
            that.name = name;
            return that;
        }

        this.setValue = function(value=""){
            that.value = value;
            return that;
        }
    }
}

async function createReturnObject(data, msgObj){
    let interaction = msgObj.interaction;
    let client = msgObj.client;
    return {
        content:data.content,
        command_id:interaction.data.id,
        command_name:interaction.data.name,
        options:interaction.data.options,
        channel:client.channels.cache.get(interaction.channel_id),
        guild: client.guilds.cache.get(interaction.guild_id) || undefined,
        author: client.users.cache.get(interaction.member ? interaction.member.user.id : interaction.user.id) || await client.users.fetch(interaction.member ? interaction.member.user.id : interaction.user.id).catch(err=>{return}) || interaction.member ? interaction.member.user : interaction.user,
        member: client.guilds.cache.get(interaction.guild_id) ? client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member ? interaction.member.user.id : interaction.user.id) || await client.guilds.cache.get(interaction.guild_id).members.fetch(interaction.member ? interaction.member.user.id : interaction.user.id).catch(err=>{return undefined}) || undefined : undefined,
        application_id:interaction.application_id,
        interaction: interaction,
        client:client,
        embeds:data.embeds,
        components:data.components,
        ephemeral:data.flags == 64 ? true : false,
        reply: async (options)=>{
            return await rawreply(options, msgObj)
        },edit: async (options)=>{
            return await rawedit(options, msgObj)
        },delete: async ()=>{
            return await rawdelete(msgObj)
        }
    }
}

async function rawreply(options, msgObj){
    let data;
    if(options.type){
        data = {
            content:"",
            flags: options.ephemeral ? options.ephemeral == true ? 64 : 0 : 0,
            embeds:[options],
            components:[],
        }
    }else if(options.content || options.embeds || options.components){
        data = {
            content: options.content || "",
            flags: options.ephemeral ? options.ephemeral == true ? 64 : 0 : 0,
            embeds: options.embeds || [],
            components: options.components || [],
        }
    }else if(typeof(options[0]) == "object"){
        console.log(options[0].type)
        if(options[0].type){
            if(options[0].type == "rich"){
                data = {
                    content:"",
                    flags: 0,
                    embeds:options,
                    components:[],
                }
            }
        }
    }else{
        data = {
            content:options,
            flags: options.ephemeral ? options.ephemeral == true ? 64 : 0 : 0,
            embeds:[],
            components:[],
        }
    }

    if(data == undefined){
        console.log(Error("The reply options are invalid."))
    }

    let message = msgObj

    await message.client.api.interactions(message.interaction.id, message.interaction.token).callback.post({
        data: {
            type: 4,
            data:data
        }
    }).catch(async err=>{
        if(err) {
            await message.client.api.webhooks(message.client.user.id, message.interaction.token).post({
                type: 4,
                data:data
            }).catch(err=>{
                if(err) {console.log(err); return undefined;}
            })
        }
    })
    return await createReturnObject(options, message)
}

async function rawdefer(message){
    let er = 0;
    await message.client.api.interactions(message.interaction.id, message.interaction.token).callback.post({
        data: {
            type: 5,
        }
    }).catch(err=>{
        if(err) er = 1;
    })
    if(er == 1){
        return false;
    }else{
        return true;
    }
}

async function rawedit(options, msgObj){
    let data;
    if(options.type){
        data = {
            content:"",
            flags: options.ephemeral ? options.ephemeral == true ? 64 : 0 : 0,
            embeds:[options],
            components:[],
        }
    }else if(options.content || options.embeds || options.components){
        data = {
            content: options.content || "",
            flags: options.ephemeral ? options.ephemeral == true ? 64 : 0 : 0,
            embeds: options.embeds || [],
            components: options.components || [],
        }
    }else if(typeof(options[0]) == "object"){
        if(options[0].type){
            if(options[0].type == "rich"){
                data = {
                    content:"",
                    flags: options.ephemeral ? options.ephemeral == true ? 64 : 0 : 0,
                    embeds:options,
                    components:[],
                }
            }
        }
    }else{
        data = {
            content:options,
            flags: 0,
            embeds:[],
            components:[],
        }
    }

    if(data == undefined){
        console.log(Error("The reply options are invalid."))
    }

    let f = await msgObj.client.api.webhooks(msgObj.client.user.id, msgObj.interaction.token).messages("@original").patch({type:4, data:data})

    return await createReturnObject(f, msgObj);
}

async function rawdelete(msgObj){
    await msgObj.client.api.webhooks(msgObj.client.user.id, msgObj.interaction.token).messages("@original").delete()

    return true;
}

function onExecute(client, listener = function(){}){
    client.ws.on('INTERACTION_CREATE', async interaction => {
        if(!interaction.data.name) return;
        let msgObj = {
            content:interaction.data.name,
            id:interaction.id,
            command_id:interaction.data.id,
            options:interaction.data.options,
            channel:client.channels.cache.get(interaction.channel_id),
            guild: client.guilds.cache.get(interaction.guild_id),
            author: interaction.member ? interaction.member.user : undefined,
            member: client.guilds.cache.get(interaction.guild_id) ? client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member ? interaction.member.user.id : interaction.user.id) || await client.guilds.cache.get(interaction.guild_id).members.fetch(interaction.member ? interaction.member.user.id : interaction.user.id).catch(err=>{return}) || undefined : undefined,
            application_id:interaction.application_id,
            interaction: interaction,
            client:client,
            reply: async (options)=>{
                return await rawreply(options, msgObj)
            },
            defer: async ()=>{
                return await rawdefer(msgObj)
            }
        }
        listener(msgObj)
    });
}

async function reply(message,text, private=false, components=[]){
    console.log("WARNING: .reply() is deprecated. Please start using the reply function from the slashInteraction.\nMore information here: https://www.npmjs.com/package/slash_commands.js")
    let embed;
    if(typeof(text) == "object" && text.length > 10 && text.type == "rich"){embed = [text]}else
    if(typeof(text) == "object" && text.length <= 10 && !text.embeds){embed = text}else{
        embed = []
    }
   await message.client.api.interactions(message.interaction.id, message.interaction.token).callback.post({
        data: {
            type: 4,
            data:{
                flags: private == true ? 64 : 0,
                content: typeof(text) == "string" ? text : "",
                embeds: embed,
                components: components
            }
        }
    }).catch(async err=>{
        if(err) {
            await message.client.api.webhooks(message.client.user.id, message.interaction.token).post({
                type: 4,
                data:{
                    flags: private == true ? 64 : 0,
                    content: typeof(text) == "string" ? text : "",
                    embeds: typeof(text) == "object" ? [text] :  [],
                    components: components
                }
            }).catch(err=>{
                if(err) {console.log(err); return undefined;}
            })
        }
    })
    let r = await message.channel.messages.fetch({limit: 15});
    r = r.find(m=>m.content==typeof(text) == "string" ? text : "" && m.embeds[0] == typeof(text) == "object" ? text : {});
    return r ? r : undefined;
}

async function deleteSlashCommand(client, cmd=""){
    let f = setInterval(async ()=>{
        if(client.readyAt != null){
            clearInterval(f)
            let list = await client.api.applications(client.user.id).commands.get()
            list.forEach(async command=>{
                if(command.name == cmd){
                    await client.api.applications(client.user.id).commands(command.id).delete().catch(console.error)
                    console.log("Deleted slash command "+command.name);
                }
            })
        }
    },100)
}

async function deleteGuildSlashCommand(client, cmd="", guildId=""){
    let f = setInterval(async ()=>{
        if(client.readyAt != null){
            clearInterval(f)
            let list = await client.api.applications(client.user.id).guilds(guildId).commands.get()
            list.forEach(async command=>{
                if(command.name == cmd){
                    await client.api.applications(client.user.id).guilds(guildId).commands(command.id).delete().catch(console.error)
                    console.log("Deleted guild slash command "+command.name);
                }
            })
        }
    },100)
}

async function getAllCommands(client){
    if(!client) throw new Error("No client provided.")
    let cmds = await client.api.applications(client.user.id).commands.get();
    return cmds
}

async function getAllGuildCommands(client, guildID){
    if(!client) throw new Error("No client provided.")
    if(!guildID) throw new Error("No guild ID provided.")
    let cmds = await client.api.applications(client.user.id).guilds(guildID).commands.get();
    return cmds
}

async function getCommand(client, name){
    if(!client) throw new Error("No client provided.")
    if(!name) throw new Error("No name provided.")
    let cmds = await getAllCommands(client);
    let cmd;
    for(i=0;i<cmds.length;i++){
        if(cmds[i].name.toLowerCase() == name.toLowerCase()){
            cmd = cmds[i];
            break;
        }
    }
    return cmd;
}

async function getGuildCommand(client, guildID, name){
    if(!client) throw new Error("No client provided.")
    if(!guildID) throw new Error("No guild ID provided.")
    if(!name) throw new Error("No name provided.")
    let cmds = await getAllGuildCommands(client,guildID);
    let cmd;
    for(i=0;i<cmds.length;i++){
        if(cmds[i].name.toLowerCase() == name.toLowerCase()){
            cmd = cmds[i];
            break;
        }
    }
    return cmd;
}

let autodelete = setInterval(async ()=>{
    if(starterBot ? starterBot.readyAt != null : 1+1==3){
        clearInterval(autodelete);
        setTimeout(async ()=>{
            let cmds = await getAllCommands(starterBot);
            cmds.forEach(async cmd=>{
                if(!cmdlist.includes(cmd.name)){
                    await deleteSlashCommand(starterBot, cmd.name)
                }
            })
        },10000)
    }
},1000)

module.exports = {  slashCommand,
                    guildSlashCommand,
                    slashOption,
                    slashOptionChoice,
                    onExecute, 
                    reply,
                    deleteSlashCommand,
                    deleteGuildSlashCommand,
                    getAllCommands,
                    getAllGuildCommands,
                    getCommand,
                    getGuildCommand
                }
