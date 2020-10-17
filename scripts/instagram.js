const discord = require("discord.js");
const Instagram = require('instagram-web-api');
const json = require("./../private_info.json");
const profileList = require("./../config.json")
const fs = require("fs");
const { DiscordAPIError } = require('discord.js');
var username =json.instaLoginInfo.username
var password =json.instaLoginInfo.password
const clientI = new Instagram({ username, password })
clientI.login()

function writeConfig(data){
  const content = JSON.stringify(data, null, 4);
    fs.writeFile('config.json', content, (err) => {
        if (err) {
            throw err;
    }
    // console.log("JSON data is saved.");
    });
}

function instaLogin(msg,command){


  console.log(command)

  if(command[1]=="post"){

    ;(async () => {
      const photos = await clientI.getPhotosByUsername({ username: command[2],first: 50 })
      
      var instaProfileEmbed = new discord.MessageEmbed()
      instaProfileEmbed.setColor("#eb3461")
      instaProfileEmbed.setAuthor(command[2])
      instaProfileEmbed.setTitle(`instagram.com/${command[2]}`)
      instaProfileEmbed.setURL(`https://instagram.com/${command[2]}`)
      instaProfileEmbed.setThumbnail('https://i.imgur.com/wSTFkRM.png')
      msg.channel.send(`Post de ${command[2]}: ${command[3]}`)
      instaProfileEmbed.setImage(photos.user.edge_owner_to_timeline_media.edges[parseInt(command[3],10)].node.display_url)//add display photo url to embed
      if(photos.user.edge_owner_to_timeline_media.edges[parseInt(command[3],10)].node.edge_media_to_caption.edges[0]!=undefined){//check if caption exists
        if(photos.user.edge_owner_to_timeline_media.edges[parseInt(command[3],10)].node.edge_media_to_caption.edges[0].node.text!=""){//check if caption is not empty
          instaProfileEmbed.setDescription(photos.user.edge_owner_to_timeline_media.edges[parseInt(command[3],10)].node.edge_media_to_caption.edges[0].node.text.slice(0, 60).concat("..."))
        }
      }
      instaProfileEmbed.setTimestamp()
      instaProfileEmbed.setFooter('Provided by the LJR BOT', 'https://i.imgur.com/YvuTNrM.png');
      msg.channel.send(instaProfileEmbed)
      
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      console.log(photos.user.edge_owner_to_timeline_media.edges[parseInt(command[3],10)].node.is_video);
      
      
      
    })()
  }
  else if(command[1]=="profile"){//get the profile

    ;(async () => {
      const profileI = await clientI.getProfile()
      const feed = await clientI.getHome()
      // const photos = await clientI.getPhotosByUsername({ username: 'ljr_memes' })
      const ljrdiscordbot = await clientI.getUserByUsername({ username: 'ljrdiscordbot' })
      console.log(ljrdiscordbot)
      // console.log(profileI);
      // console.log(feed);
      // console.log(photos);
      // console.log(photos.user.edge_owner_to_timeline_media.page_info);
      // console.log(photos.user.edge_owner_to_timeline_media.edges);
      msg.channel.send(`${profileI.first_name} | Instagram: **${profileI.username}**`);
      msg.reply(`Discord Server: ${profileI.external_url}`);
      // msg.reply(`Photo: ${feed.data.user.profile_pic_url}`);
      // msg.channel.send(`ljr_memes: ${command[2]}`)
      // msg.channel.send(`${photos.user.edge_owner_to_timeline_media.edges[parseInt(command[2],10)].node.display_url}`)
    })()
  }
  else if(command[1]=="add"){//saves the profile in config.json
    // console.log(`profile list: ${profileList}`)
    // console.log(profileList.accounts)

    if(!profileList.accounts.includes(command[2])){
      profileList.accounts.push(command[2])

      const data = JSON.stringify(profileList, null, 4);
      fs.writeFile('config.json', data, (err) => {
          if (err) {
              throw err;
      }
      // console.log("JSON data is saved.");
      msg.reply(`Compte ajouté. Il y a ${profileList.accounts.length} comptes.`)
      });
    }
    else {msg.reply("Ce compte a déjà été ajouté!")}
    console.log(profileList.accounts)
  }
  else if(command[1]=="saved"){
    msg.reply(`Il y a ${profileList.accounts.length} comptes ajoutés.\nLes comptes ajoutés sont:\n${profileList.accounts.join("\n")}`);
  }
  else if(command[1]=="remove"){
    if(profileList.accounts.includes(command[2])){
      profileList.accounts.splice(profileList.accounts.indexOf(command[2]), 1);

      writeConfig(profileList);
      
      msg.reply(`Compte enlevé. Il y a ${profileList.accounts.length} comptes.`)
    }
    else{msg.reply("Ce compte n'est pas dans la base de données.")}
  }
}
module.exports = instaLogin;