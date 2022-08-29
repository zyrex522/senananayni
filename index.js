const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const  db  = require('nrc.db')


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

///////////////////////eklendim atıldım

client.on("message", async msg => {

    if(msg.content.startsWith(ayarlar.prefix)) return;
  
    const db = require('wio.db');
  
    var id = msg.author.id;
  
    var gid = msg.guild.id;
  
    var xp = await db.fetch(`xp_${id}_${gid}`);
  
    var lvl = await db.fetch(`lvl_${id}_${gid}`);
  
    let seviyexp = await db.fetch(`seviyexp${msg.guild.id}`)
  
    const skanal = await db.fetch(`seviyekanal${msg.guild.id}`)
  
    let kanal = msg.guild.channels.cache.get(skanal)
  
    if (msg.author.bot === true) return;
  
    let seviyeEmbed = new Discord.MessageEmbed()
  
     seviyeEmbed.setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun!`)
  
     seviyeEmbed.setFooter(`${client.user.username} | Seviye Sistemi`)
  
     seviyeEmbed.setColor("RANDOM")
  
     if(!lvl) {
      db.set(`xp_${id}_${gid}`, 5);
  
      db.set(`lvl_${id}_${gid}`, 1);
  
      db.set(`xpToLvl_${id}_${gid}`, 100);
  
      db.set(`top_${id}`, 1)
  
      }
  
    
  
    let veri1 = [];
  
    
  
    if(seviyexp) veri1 = seviyexp
  
    if(!seviyexp) veri1 = 5
  
    
  
    if (msg.content.length > 7) {
  
      db.add(`xp_${id}_${gid}`, veri1)
  
    };
  
    let seviyesınır = await db.fetch(`seviyesınır${msg.guild.id}`)
  
      let veri2 = [];
  
    
  
    if(seviyesınır) veri2 = seviyesınır
  
    if(!seviyesınır) veri2 = 250
  
     
  
    if (await db.fetch(`xp_${id}_${gid}`) > veri2) {
  
      if(skanal) {
  
   kanal.send(new Discord.MessageEmbed()
  
     .setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun:tada:`)
  
     .setFooter(`${client.user.username} | Seviye Sistemi`)
  
     .setColor("RANDOM"))
  
      }
  
      db.add(`lvl_${id}_${gid}`, 1)
  
      db.delete(`xp_${id}_${gid}`)};
  
      db.set(`top_${id}`, Math.floor(lvl+1))
  
    });
  
  //SEVİYE-ROL-----------------------------------
  client.on('message', async message => {
  
    var id = message.author.id;
  
    var gid = message.guild.id;
  
    let rrol = await db.fetch(`rrol.${message.guild.id}`)
  
    var level = await db.fetch(`lvl_${id}_${gid}`);
  
    
  
      if(rrol) {
  
    rrol.forEach(async rols => {
  
      var rrol2 = await db.fetch(`rrol2.${message.guild.id}.${rols}`)
  
      if(Math.floor(rrol2) <= Math.floor(level)) {
  
        let author = message.guild.member(message.author)
  
        author.roles.add(rols)
  
      }
  
       else if(Math.floor(rrol2) >= Math.floor(level)) {
  
        let author = message.guild.member(message.author)
  
        author.roles.remove(rols)
  
      }
  
    })
  
    }
  
    
  
      if(message.content == '!rütbeler') {
  
      if(!rrol) {
  
                  message.channel.send(new Discord.MessageEmbed()
  
                        .setColor("RANDOM")
  
                        .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)
  
                        .setDescription(`Herhangi bir rol oluşturulmadı.`))
  
        
  
        
  
        return;
  
      }
  
          const { MessageEmbed } = require('discord.js')
  
        let d = rrol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`rrol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")
  
      message.channel.send(new MessageEmbed()
  
                        .setColor("RANDOM")
  
                        .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)
  
                        .setDescription(`${d}`))
  
    }
  
    
  })
  
  client.on('message', async message => {
  
     var id = message.author.id;
  
    var gid = message.guild.id;
  
    let srol = await db.fetch(`srol.${message.guild.id}`)
  
    var level = await db.fetch(`lvl_${id}_${gid}`);
  
    if(srol) {
  
    srol.forEach(async rols => {
  
      var srol2 = await db.fetch(`srol2.${message.guild.id}.${rols}`)
  
      if(Math.floor(srol2) <= Math.floor(level)) {
  
        let author = message.guild.member(message.author)
  
        author.roles.add(rols)
  
      }
  
       else if(Math.floor(srol2) >= Math.floor(level)) {
  
        let author = message.guild.member(message.author)
  
  
      }
  
    })
  
    }
  
      if(message.content == '!seviyerolleri' || message.content == "!levelroles") {
  
    if(!srol) {
  
                  message.channel.send(new Discord.MessageEmbed()
  
                        .setColor("RANDOM")
  
                        .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)
  
                        .setDescription(`Herhangi bir rol oluşturulmadı.`))
  
        return;
  
      }
  
          const { MessageEmbed } = require('discord.js')
  
        let d = srol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`srol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")
  
      message.channel.send(new MessageEmbed()
  
                        .setColor("RANDOM")
  
                        //.setColor(message.guild.member(message.author).highestRole.hexColor)
  
                        .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)
  
                        .setDescription(`${d}`))
  
    }
  
})  
    
client.login(ayarlar.token);