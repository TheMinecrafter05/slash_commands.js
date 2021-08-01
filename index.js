const discord = require("discord.js")

class slashCommand{
    constructor(client=discord.Client){
        let that = this;
        this.client = client;
        this.name = "";
        this.description = "";
        this.options = []
        this.setName = function(name=""){
            if(!name) throw new Error("No name provided.");
            that.name = name
            return that;
        }

        this.setDescription = function(description=""){
            if(!description) throw new Error("No description provided.");
            that.description = description;
            return that;
        }

        this.addOption = function(option=slashOption){
            let cmd = {}
            cmd["name"] = option["name"]
            cmd["description"] = option["description"]
            cmd["type"] = option["type"]
            cmd["required"] = option["required"]
            that.options.push(cmd)
        }

        this.addOptions = function(options=[]){
            for(var i=0;i<options.length;i++){
                let cmd = {}
                let option = options[i]
                cmd["name"] = option["name"]
                cmd["description"] = option["description"]
                cmd["type"] = option["type"]
                cmd["required"] = option["required"]
                that.options.push(cmd)
            }
        }

        let f = setInterval(async ()=>{
            if(client.readyAt != null){
                clearInterval(f)
                let fouund = false;
                let edit = false;
                let id
                let hfejhf = await client.api.applications(client.user.id).commands.get();
                hfejhf.forEach(command=>{
                    if(command.name == that.name){
                        if(command.description != that.description) edit = true;
                        if(!command.options && that.options || command.options && !that.options){
                            edit = true
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
                                    }else{
                                        edit = true;
                                    }
                                }else{edit = true}
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
                            "options": that.options !== undefined ? that.options : []
                        }
                    }).catch(err=>{
                        if(err) return new Error(err)
                    });
                }else{
                    await client.api.applications(client.user.id).commands.post({
                        data: {
                            "name": that.name !== undefined ? that.name : "command",
                            "description": that.description !== undefined ? that.description : "A cool command",
                            "options": that.options !== undefined ? that.options : []
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
            if(!name) throw new Error("No name provided.");
            that.name = name
            return that;
        }

        this.setDescription = function(description=""){
            if(!description) throw new Error("No description provided.");
            that.description = description;
            return that;
        }

        this.setGuildID = function(guildID){
            if(guildID == undefined) throw new Error("No guildID provided.");
            that.guildID = guildID;
            return that;
        }

        this.addOption = function(option=slashOption){
            let cmd = {}
            cmd["name"] = option["name"]
            cmd["description"] = option["description"]
            cmd["type"] = option["type"]
            cmd["required"] = option["required"]
            that.options.push(cmd)
            return that
        }

        this.addOptions = function(options=[]){
            for(var i=0;i<options.length;i++){
                let cmd = {}
                let option = options[i]
                cmd["name"] = option["name"]
                cmd["description"] = option["description"]
                cmd["type"] = option["type"]
                cmd["required"] = option["required"]
                that.options.push(cmd)
            }
            return that
        }

        let f = setInterval(async ()=>{
            if(client.readyAt != null){
                clearInterval(f)
                let fouund = false;
                let edit = false;
                let id
                let hfejhf = await client.api.applications(client.user.id).guilds(that.guildID).commands.get();
                hfejhf.forEach(command=>{
                    if(command.name == that.name){
                        if(command.description != that.description) edit = true;
                        if(!command.options && that.options || command.options && !that.options){
                            edit = true
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
                                    }else{
                                        edit = true;
                                    }
                                }else{edit = true}
                            }
                        }
                        if(edit == false) {fouund = true;}else{ id = command.id;}
                    }
                })
                if(fouund == true) return;
                if(edit == true){
                    await client.api.applications(client.user.id).guilds(that.guildID).commands(id).patch({
                        data: {
                            "name": that.name !== undefined ? that.name : "command",
                            "description": that.description !== undefined ? that.description : "A cool command",
                            "options": that.options !== undefined ? that.options : []
                        }
                    }).catch(err=>{
                        if(err) return new Error(err)
                    });
                }else{
                    await client.api.applications(client.user.id).guilds(that.guildID).commands.post({
                        data: {
                            "name": that.name !== undefined ? that.name : "command",
                            "description": that.description !== undefined ? that.description : "A cool command",
                            "options": that.options !== undefined ? that.options : []
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
        this.setName = function(name=""){
            if(!name) throw new Error("No name provided.");
            that.name = name
            return that;
        }

        this.setDescription = function(description=""){
            if(!description) throw new Error("No description provided.");
            that.description = description;
            return that;
        }

        this.setRequired = function(state = false){
            if(state == undefined) throw new Error("No state provided.");
            that.required = state;
            return that;
        }

        this.setType = function(type){
            if(!type){ throw new Error("Invalid type provided.")}
            if(type.toLowerCase() == "string"){ type = 3} else
            if(type.toLowerCase() == "number") {type = 10} else
            if(type.toLowerCase() == "boolean") {type = 5} else
            if(type.toLowerCase() == "user") {type = 6} else
            if(type.toLowerCase() == "channel") {type = 7} else
            if(type.toLowerCase() == "role") {type = 8} else {
                type = "unvalid"
            }
            if(type == "unvalid"){ throw new Error("Invalid type provided.")}
            that.type = type;
            return that;
        }
    }
}

function onExecute(client=discord.Client, listener = function(command="", interaction, args){}){
    client.ws.on('INTERACTION_CREATE', async interaction => {
        if(!interaction.data.name) return;
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;
        listener(command, interaction, args)
    });
}

async function reply(client, interaction,text, private=false){
   await client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 5,
            data:{
                flags: private == true ? 64 : 0,
            }
        }
    }).catch(err=>{
        if(err) {console.warn(err); return undefined;}
    })
    return await new discord.WebhookClient(client.user.id,interaction.token).send(typeof(text) == "object" ? {embeds:[text]} : text)
}

async function remove(client, interaction){
    await client.api.webhooks(client.user.id, interaction.token).messages('@original').delete().catch(e=>null)
}

async function edit(client, message, interaction){
    if(typeof(message) == "object"){
        await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({data: {content:"",embeds:[message]}}).catch(e=>console.error)
    }else{
        await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({data: {content:message, embeds:[]}}).catch(e=>console.error)
    }
}

async function deleteslashCommand(client, cmd="", timeout=0){
    if(timeout > (1000 * 60 * 15) - 1000) timeout = (1000 * 60 * 15) - 1000;
    let f = setInterval(async ()=>{
        if(client.readyAt != null){
            clearInterval(f)
            let list = await client.api.applications(client.user.id).commands.get()
            list.forEach(command=>{
                if(command.name == cmd){
                    setTimeout(()=>{
                        client.api.applications(client.user.id).commands(command.id).delete().catch(console.error)
                    },timeout)
                }
            })
        }
    },100)
}

module.exports = {slashCommand,guildSlashCommand,slashOption, onExecute, reply, remove,edit, deleteslashCommand}
