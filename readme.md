# slash_commands.js

#### slash_commands.js is a free easy to use slash command package for discords.js
If you find any bugs, [contact me](https://discord.com/users/435786731514494977)

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) to install slash_commands.js.

```bash
npm i slash_commands.js
```

## Create Example

```javascript
const slash = require("slash_commands.js") //define the package

//create a slash command option
const helpcommandOption = new slash.slashOption() 
.setName("name")
.setDescription("Enter your name")
.setType("string")
.setRequired(false)

//create a command
const helpCommand = new slash.slashCommand(client /*your discord client*/)
.setName("help")
.setDescription("The help command.")
.addOption(helpcommandOption) //add the option declared on the top
```
## Respond Example
```javascript
slash.onExecute(client, (message)=>{
    if(message.content == "help"){ // test if the command executed is the help command
        slash.reply(message, "Hello!", false).then(msg=>{ //send a response (if you write true instead of false only you can see the message)
            setTimeout(()=>{
                msg.edit({content:"bye!"}) //edit the message 
            },5000)
        })
    }
})
```

# Documentation
- __new slash.slashCommand( client: Discord.Client )__ - Creates a new slash command
- __new slash.slashOption()__ - Creates a new slash option
- __new slash.slashOptionChoice()__ - Creates a new slash option choice
- __slash.onExecute(client: Discord.Client, listener?: (message: any)__ - listen when a command gets executed
- __slash.reply(message: any, text: any, private: boolean)__ - reply with a message or embed
- reply returns a Discord message, so you can edit, delete, react etc.
# WARNING
## Discord takes a lot of time to create or update a slash command. So be patient if you add one.
## Also you need to invite your bot with the application.commands permission:
#### https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0scope=applications.commands%20bot

## License
[ISC](https://choosealicense.com/licenses/isc/)
