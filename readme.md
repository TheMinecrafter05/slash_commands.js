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
.addOptions(helpcommandOption) //add the option declared on the top
```
## Respond Example
```javascript
slash.onExecute(client, (message)=>{
    if(message.content == "help"){ // test if the command executed is the help command
        message.reply({content:"Hi", ephemeral:false}).then(msg=>{ //send a response (if you write true instead of false only you can see the message)
            setTimeout(()=>{
                msg.edit({content:"bye!"}) //edit the message 
            },5000)
        })
    }
})
```

# Documentation
## https://theminecrafter05.github.io/slash_commands.js/index.html
# WARNING
## Discord takes a lot of time to create or update a slash command. So be patient if you add one.
## Also you need to invite your bot with the application.commands permission:
#### https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0scope=applications.commands%20bot

## License
[ISC](https://choosealicense.com/licenses/isc/)
