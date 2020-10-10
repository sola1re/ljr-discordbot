const Instagram = require('instagram-web-api');


function instaLogin(username,password,msg){

  const clientI = new Instagram({ username, password })

  ;(async () => {
    await clientI.login()
    const profileI = await clientI.getProfile()
    
    console.log(profileI);
    msg.reply(`Name: ${profileI.first_name}`);
    msg.reply(`Username: ${profileI.username}`);
    msg.reply(`Url: ${profileI.external_url}`);
    return profileI;
  })()
}
module.exports = instaLogin;