const discord = require("discord.js");
const help = require("./commands/help.js");
const client = new discord.Client();
const prefix = '+';
const instaLogin = require("./scripts/instagram.js")
const json = require('./private_info.json');


function commands(commandRequest,msg){//Commands function

  var command = commandRequest.split(" ");
  
  console.log(`Fonction commands: ${commandRequest}`);
  
  if (command[0]=="help"){help(command,msg)}//help
  else if (command[-1]=="--help"){help(command,msg);}//--help
  else if (command[0]=="insta"){instaLogin(msg,command);}//display name, username and url of account
  else if (command[0]=="ping"){msg.reply(`🏓Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);}//pong!
  else {msg.reply("Cette commande n'est pas reconnue!")}
  return `Command Request was:${commandRequest}`;
}

client.once('ready', () => {//Debug: log if the bot is ready
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {//Scan all messages for commands
  console.log(`#${msg.channel.name}: ${msg.author.username} just wrote: "${msg.content}"`);//Debug: log messages
    if (msg.content.toLowerCase().startsWith(prefix) && msg.content.toLowerCase()!= "+") {
      // msg.reply('command issued');//Debug: reply if command was issued
      
      commands(msg.content.slice(1),msg);//Debug: log commands (+help,...)
      
    }
  });


client.login(json.token);
