function help(command,msg){
    if(command!==""){
        //msg.reply(`Help command issued. Command was: **${command}**`);//Debug: log content of help command
        
const Discord = require('discord.js');

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#ffffff')
	.setTitle('Commande +help')
	.setAuthor('St. Marie')
	.addFields(
		{ name: 'Toutes les commandes possibles:', value: '+help \n +insta \n +ping' },
		{ name: '\u200B', value: '\u200B' },
		{ name: '+insta', value: 'Ex: +insta post \'profile\' 0', inline: true },
		{ name: '+ping', value: 'donne le ping de l\'utilisateur', inline: true },
	)
	.setFooter('Provided by the LJR BOT', 'https://i.imgur.com/YvuTNrM.png');

message.channel.send(helpEmbed);

    }
    
    
}
module.exports = help;
