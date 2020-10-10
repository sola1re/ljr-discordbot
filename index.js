const discord = require("discord.js");
const help = require("./commands/help.js");
const client = new discord.Client();
const prefix = '+';
const instaLogin = require("./scripts/instagram.js")
const json = require('./token.json');
var username =json.loginInfo.username
var password =json.loginInfo.password

//commands functions
function commands(commandRequest,msg){

  x = `${commandRequest}`;
  
  console.log(`Fonction commands: ${commandRequest}`);
  
  if (commandRequest.startsWith("help")){help(commandRequest.slice(5),msg)}//help
  else if (commandRequest.endsWith("--help")){help(commandRequest.slice(0,-7),msg);}//--help
  else if (commandRequest.startsWith("insta_account")){instaLogin(username,password,msg);}//display name, username and url of account
  else if (commandRequest.startsWith("ping")){msg.reply("pong!:laughing:")}//pong!
  else {msg.reply("Cette commande n'est pas reconnue!")}
  return `Command Request was:${commandRequest}`;
}
//Debug: log if the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  console.log(`${msg.author.username} just wrote: "${msg.content}"`);//Debug: log messages
    if (msg.content.toLowerCase().startsWith(prefix) && msg.content.toLowerCase()!= "+") {
      // msg.reply('command issued');//Debug: reply if command was issued
      
      commands(msg.content.slice(1),msg);//Debug: log commands (+help,...)
      
    }
  });


// console.log(json.loginInfo)//Debug: log instagram username and password
// console.log(json.loginInfo.username)//Debug: log intagram username
// console.log(json.token)//Debug: log discord bot token
client.login(json.token);