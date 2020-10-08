const help = require("./commands/help")

function commands(commandRequest,msg){

    x = `${commandRequest}`;
    
    console.log(`Fonction commands: ${commandRequest}`);
    
    if (commandRequest.startsWith("help")){help(commandRequest.slice(5),msg)}//help
    else if (commandRequest.endsWith("--help")){help(commandRequest.slice(0,-7),msg);}//--help
    
    else {msg.reply("Cette commande n'est pas reconnue!")}
    return commandRequest;
}
module.exports = commands;