const Discord = require('discord.js');

const db = require("nrc.db")

const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {

  var user = message.mentions.users.first() || message.author;
  var id = user.id
  var gid = message.guild.id;

  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xp = await db.fetch(`xp_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);
  let u = message.mentions.users.first() || message.author;
if(u.bot === true) { message.channel.send(new Discord.MessageEmbed()

                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM"))}  

  else 

  message.channel.send(new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setThumbnail(user.avatarURL)             
  .setDescription(`
  
  <:saret:823577810382618655> **| ${user.username} **Kullanıcının Seviye Bilgisi;**
  
<:uye:823577810383667200> **| Kullanıcı: <@${user.id}>**
<:uye:823577810383667200> **| Kullanıcının XP'si: \`${xp || 0}\`**
<:uye:823577810383667200> **| Kullanıcının Seviye'si: \`${lvl || 0}\`**
  `)
  .setFooter(`${client.user.username} Seviye Sistemi!`, client.user.avatarURL())   
  .setTimestamp())

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'seviyem'
};