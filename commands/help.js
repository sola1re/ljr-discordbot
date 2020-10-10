function help(command,msg){
    if(command!==""){
        msg.reply(`Help command issued. Command was: **${command}**`);//Debug: log content of help command
    }
    
    
}
module.exports = help;