const Instagram = require('instagram-web-api');
const json = require("./../private_info.json");
var username =json.instaLoginInfo.username
var password =json.instaLoginInfo.password
const clientI = new Instagram({ username, password })
clientI.login()

function instaLogin(msg,command){


  console.log(command)

  if(command[1]=="post"){

    ;(async () => {
      const photos = await clientI.getPhotosByUsername({ username: command[2] })

      msg.channel.send(`ljr_memes: ${command[3]}`)
      msg.channel.send(`${photos.user.edge_owner_to_timeline_media.edges[parseInt(command[3],10)].node.display_url}`)
    })()
  }
  else if(command[1]=="profile"){

    ;(async () => {
      const profileI = await clientI.getProfile()
      const feed = await clientI.getHome()
      // const photos = await clientI.getPhotosByUsername({ username: 'ljr_memes' })
      
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
}
module.exports = instaLogin;