const discord = require("discord.js");
const fetch = require("node-fetch");

(async function wait(){
    let pr = await fetch("https://raw.githubusercontent.com/TheMinecrafter05/slash_commands.js/main/package.json", {method:"GET"})
    let r = await pr.json();
    if(r.version != "1.6.5"){
        setTimeout(()=>{
            console.error("There is a new version of slash_commands.js available.\nInstall it using npm i slash_commands.js")
        },5000)
    }
})()

class slashCommand{
    constructor(client=discord.Client){
        let that = this;
        this.client = client;
        this.name = "";
        this.description = "";
        this.options = []
        this.setName = function(name=""){
            that.name = name.toLowerCase()
            return that;
        }

        this.setDescription = function(description=""){
            that.description = description;
            return that;
        }

        this.addOption = function(option=slashOption){
            if(!option) throw new Error("No option provided.");
            let cmd = {}
            cmd["name"] = option["name"].toLowerCase()
            cmd["description"] = option["description"]
            cmd["type"] = option["type"]
            cmd["required"] = option["required"]
            cmd["choices"] = option["choices"]
            that.options.push(cmd)
        }

        this.addOptions = function(options=[]){
            if(!options.length) throw new Error("Options need to be an object[]");
            if(options.length == 0) throw new Error("No options provided.");
            for(var i=0;i<options.length;i++){
                let cmd = {}
                let option = options[i]
                cmd["name"] = option["name"].toLowerCase()
                cmd["description"] = option["description"]
                cmd["type"] = option["type"]
                cmd["required"] = option["required"]
                cmd["choices"] = option["choices"]
                that.options.push(cmd)
            }
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
                    if(!this.options[i].description) throw new Error("No description provided.");
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
            }
        },100)
    }
}

class guildSlashCommand{
    constructor(client=discord.Client){
        let that = this;
        this.client = client;
        this.name = "";
        this.description = "";
        this.options = []
        this.guildID = ""
        this.setName = function(name=""){
            that.name = name
            return that;
        }

        this.setDescription = function(description=""){
            that.description = description;
            return that;
        }

        this.setGuildID = function(guildID){
            that.guildID = guildID;
            return that;
        }

        this.addOption = function(option=slashOption){
            if(!option) throw new Error("No option provided.");
            let cmd = {}
            cmd["name"] = option["name"].toLowerCase()
            cmd["description"] = option["description"]
            cmd["type"] = option["type"]
            cmd["required"] = option["required"]
            cmd["choices"] = option["choices"]
            that.options.push(cmd)
            return that
        }

        this.addOptions = function(options=[]){
            if(!options.length) throw new Error("Options need to be an object[]");
            if(options.length == 0) throw new Error("No options provided.");
            for(var i=0;i<options.length;i++){
                let cmd = {}
                let option = options[i]
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
                    if(!this.options[i].description) throw new Error("No description provided.");
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

function onExecute(client=discord.Client, listener = function(){}){
    client.ws.on('INTERACTION_CREATE', async interaction => {
        if(!interaction.data.name) return;
        let msgObj = {
            content:interaction.data.name,
            id:interaction.id,
            command_id:interaction.data.id,
            options:interaction.data.options,
            channel:client.channels.cache.get(interaction.channel_id),
            guild: client.guilds.cache.get(interaction.guild_id),
            author: interaction.member.user,
            member: interaction.member,
            application_id:interaction.application_id,
            interaction: interaction,
            client:client
        }
        listener(msgObj)
    });
}

async function reply(message,text="", private=false, components=[]){
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
    }).catch(err=>{
        if(err) {console.warn(err); return undefined;}
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
            list.forEach(command=>{
                if(command.name == cmd){
                    client.api.applications(client.user.id).commands(command.id).delete().catch(console.error)
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
            list.forEach(command=>{
                if(command.name == cmd){
                    client.api.applications(client.user.id).guilds(guildId).commands(command.id).delete().catch(console.error)
                }
            })
        }
    },100)
}

module.exports = {slashCommand,guildSlashCommand,slashOption,slashOptionChoice, onExecute, reply, deleteSlashCommand, deleteGuildSlashCommand}
