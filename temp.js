const discord = require("discord.js");
const client = new discord.Client();
const json = require('./private_info.json');
client.login(json.token);
var instauser = "ljrdiscord"

client.once('ready', () => {//Debug: log if the bot is ready
        console.log(`Logged in as ${client.user.tag}!`);
        client.channels.cache.get('760901825640923147').send('Pog');
        var instaProfileEmbed = new discord.MessageEmbed()
                .setColor("#eb3461")
                .setAuthor("Nouveau post instagram!")
                .setTitle("instagram")
                .setURL(`https://instagram.com/${instauser}`)
                .setThumbnail('https://i.imgur.com/wSTFkRM.png')

        client.channels.cache.get('760901825640923147').send(instaProfileEmbed)
});






// var channel = ("760901825640923147")
// const channel = client.channels.cache.get('<#760901825640923147>');
// console.log(client.channels.cache)
// channel.send('hi');
// client.channels.get('<#760901825640923147>').send('My Message');
// channel.send(instaProfileEmbed);
// new discord.Message(client,"hi",channel);

// discord.Message.send(instaProfileEmbed)
