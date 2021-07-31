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
.setRequired(false)

//create a command
const helpCommand = new slash.slashCommand(client /*your discord client*/)
.setName("help")
.setDescription("The help command.")
.addOption(helpcommandOption) //add the option declared on the top
```
## Respond Example
```javascript
slash.onExecute(client, (command, interaction,args)=>{ //explanation is down below
    if(command == "help"){ // test if the command executed is the help command
        slash.reply(bot, interaction, "Hello!", false).then(msg=>{ //send a response (if you write true instead of false only you can see the message)
            setTimeout(()=>{
                slash.edit(client,"bye!",interaction) //edit the message 
            },5000)
        })
    }
})
```
#### Explanation:
the __command__ option will be the command executed : the __interaction__ is needed for sending a message back : the __args__ are what you enter in the options

# Documentation
- __new slash.slashCommand( client: Discord.Client )__ - Creates a new slash command
- __new slash.slashOption()__ - Creates a new slash option
- __slash.onExecute(client: Discord.Client, listener?: (command: string, interaction: any, args: any)__ - listen when a command gets executed
- __slash.reply(client: any, interaction: any, text: any, private: boolean)__ - reply with a message or embed
- __slash.edit(client: Discord.Client, message: any, interaction: any)__ - edit a message
- __slash.remove(client: Discord.Client, interaction: any)__ - delete a message
# WARNING
## Discord takes a lot of time to create or update a slash command. So be paitent if you add one.
## Also you need to invite your bot with the application.commands permission:
#### https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0scope=applications.commands%20bot

## License
[ISC](https://choosealicense.com/licenses/isc/)
