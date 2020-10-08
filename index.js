const discord = require("discord.js");
const client = new discord.Client();
const fs = require('fs');
const prefix = '+';
const commands = require("./commands.js")


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  console.log(`${msg.author.username} just wrote: "${msg.content}"`);//Debug: log messages
    if (msg.content.toLowerCase().startsWith(prefix) && msg.content.toLowerCase()!= "+") {
      msg.reply('command issued');//Debug: reply if command was issued
      
      console.log(commands(msg.content.slice(1),msg));//Debug: log commands (+help,...)
    }
  });

var connectionToken = fs.readFileSync('./token.txt','utf8');

console.log(connectionToken)//Debug: log discord bot token
client.login(connectionToken);