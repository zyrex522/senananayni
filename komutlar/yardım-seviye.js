const Discord = require('discord.js');
exports.run = async (client, message, args) => {
 if(!args[0]) {
   
    if (!message.guild) {
        const ozelmesajuyari = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTimestamp()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField('**Seviye Komutları Özel Mesajlarda Kullanılamaz!**')
        return message.author.send(ozelmesajuyari); }
    const NARCOSEMBED = new Discord.MessageEmbed()
    .setAuthor("Seviye || Yardım Menüsü", client.user.avatarURL())
   .setColor("#BLUE")
  .setDescription(`<:saret:823577810382618655> **| NarcosCode Altyapı - Made By MustafaMert & Croxy**

  <:kurallar:823577810488393738> Yetkili Komutları:
  
> <:uye:823577810383667200> **| \`!seviye-ayarlar\` ➔ Seviye Ayarlarını Gösterir.**
> <:uye:823577810383667200> **| \`!seviye-xp\` ➔ Mesaj Başına Gelen XP Yi Ayarlarsınız.**
> <:uye:823577810383667200> **| \`!seviye-sınır\` ➔ Max Seviyeyi Ayarlarsınız.**
> <:uye:823577810383667200> **| \`!seviye-sıfırla\` ➔ Seviye Ayarlarını Sıfırlarsınız.**
> <:uye:823577810383667200> **| \`!seviye-log\` ➔ Seviye Logunu Ayarlarlarsınız.**
> <:uye:823577810383667200> **| \`!seviye-rol\` ➔ Seviye Rollerini Sıfırlarsınız.**

  <:kurallar:823577810488393738> Kullanıcı Komutları:

> <:uye:823577810383667200> **| \`!seviyem\` ➔ Seviyene Bakarsın.**
> <:uye:823577810383667200> **| \`!seviye-top\` ➔ Seviye Sıralamasındaki İlk 5 İ Gösterir.**  

  `)   

  message.channel.send(NARCOSEMBED)

}else {

}
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım', 
  description: '',
  usage: ''
};
