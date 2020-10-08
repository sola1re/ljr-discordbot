function help(command,msg){
    console.log(`Help command issued. Command was: ${command}`);//Debug: log content of help command
    msg.reply(`Help command issued. Command was: **${command}**`)
}
module.exports = help;