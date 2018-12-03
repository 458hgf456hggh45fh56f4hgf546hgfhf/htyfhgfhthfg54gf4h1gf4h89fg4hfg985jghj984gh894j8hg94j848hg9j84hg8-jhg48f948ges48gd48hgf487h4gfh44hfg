const Discord = require('discord.js');



const client = new Discord.Client();


const token = process.env.token;


var prefix = "o*";



const ytdl = require('ytdl-core');



const queue = new Map();



var servers = {};



client.login("process.env.BOT_TOKEN");

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member} ! :tada: :)`);
});



function play(connection, message) {

  

  var server = servers[message.guild.id];



  server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));



  server.queue.shift();



  server.dispatcher.on("end", function() { 

    if (server.queue[0]) play(connection, message);



    else connection.disconnect();



  });

}



client.on("ready", () => {



    console.log("Je suis prêt !");

    client.user.setGame(`o*help | V.1.3`);



});



client.on('message', async message => { 



    if(message.content === "dgfdgfhggfghtrhtrhtrh54trht4h87th4rhrtgfdg"){

        message.reply("dgdfgdfgdfgfggdfggfdgdf");

        console.log('Le bot dit bonjour');

    }



    if(message.content === prefix + "help") {

      var aide_embed = new Discord.RichEmbed()

      .setColor('RANDOM')

      .setTitle(`:robot: Here are my categories of help !`)

      .setDescription(`Here are my available commands :`)

      .setThumbnail(message.author.avatarURL)

      .addField(":tools: Moderation", "Do `o*mod` to see my moderation commands !")

      .addField(":tada: Normal", "Do `o*nrml` to see my animation command !")

      .setFooter("Help Panel")

      .setTimestamp()

      message.channel.send(aide_embed);

    }



    if(message.content === prefix + "mod") {

      var mod_embed = new Discord.RichEmbed()

      .setColor('RANDOM')

      .setTitle(`:tools: Here are my commands moderations !`)

      .setThumbnail(message.author.avatarURL)

      .addField("o*kick <@user>", "Kick the user !")

      .addField("o*ban <@user>", "Ban the user !")

      .addField("o*clear <nombre>", "Deletes the specified number of messages")

      .addField("o*mute <@user>", "Mute the mentioned user")

      .addField("o*unmute <@user>", "Unmute the mentioned user")

      .addField("o*warn <@user> <raison>", "Warn the mentioned user")
      
      .addField("o*seewarns <@user> <raison>", "Warn the mentioned user")

      .addField("o*deletewarns <user> <number>", "Delete Warns")

      .setFooter("Moderation commands")

      .setTimestamp()

      message.channel.send(mod_embed);

    }



    if(message.content === prefix + "nrml") {

      var fun_embed = new Discord.RichEmbed()

      .setColor('RANDOM')

      .setTitle(`:tools: Here are my useful orders !`)

      .setThumbnail(message.author.avatarURL)

      .addField("o*stats", "The bot sends you information about your profile !")

      .addField("o*news", "Give hints about the bot and the server !")

      .addField("o*8ball <Question>", "Random answer !")

      .addField("o*play <Youtube link>", "Music or video youtube !")

      .addField("o*stop", "Stop the music !")

      .addField("o*skip", "Pass the music !")

      .setFooter("Normal commands")

      .setTimestamp()

      message.channel.send(fun_embed);

    }



    if (!message.content.startsWith(prefix)) return;



    var args = message.content.substring(prefix.length).split(" ");



    switch (args[0].toLowerCase()) { 



        case "stats":



        var userCreateDate = message.author.createdAt.toString().split(" ");

        var msgauthor = message.author.id;



        var stats_embed = new Discord.RichEmbed()

        .setColor("#6699FF")

        .setTitle(`Player Statistics : ${message.author.username}`)

        .addField(`Player ID :id:`, msgauthor, true)

        .addField(`Player registration date :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])

        .setThumbnail(message.author.avatarURL)

        message.reply("You can watch your private messages !")

        message.author.send(stats_embed);



        break;

        

  case "play":



    if (!args[1]) {



    message.channel.sendMessage("You have to tell me a YouTube link"); 



    return;



  }



    if(!message.member.voiceChannel) {



    message.channel.sendMessage(":x: You must be in a vocal lounge"); 



    return;



  }





    if(!servers[message.guild.id]) servers[message.guild.id] = {



    queue: []



  };





  var server = servers[message.guild.id];





  server.queue.push(args[1]);



  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {



  play(connection, message) 



  });



  break; 



  case "skip":



    if(!message.member.voiceChannel) {



    message.channel.sendMessage(":x: You must be in a vocal lounge"); 



    return;



  }



    var server = servers[message.guild.id];



    if(server.dispatcher) server.dispatcher.end();



    break;



  case "stop":



    if(!message.member.voiceChannel) 

    

    return message.channel.send(":x: You must be in a vocal lounge");



    message.member.voiceChannel.leave();



    break;

  

  }



    if(message.content === prefix + "news") {

        var info_embed = new Discord.RichEmbed()

        .setColor("#40A497")

        .setTitle("Here is the information about me and the server !")

        .addField(" :robot: Name :", `${client.user.tag}`, true)

        .addField("Descriminator of the bot :hash:", `#${client.user.discriminator}`)

        .addField("ID :id: ", `${client.user.id}`)

        .addField("Number of members", message.guild.members.size)

        .addField("Number of categories and salons", message.guild.channels.size)

        .setFooter("News")

        message.channel.sendMessage(info_embed)

        console.log("Un utilisateur a effectué la commande d'info !")

    }



    if(message.content.startsWith(prefix + "kick")){

        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission !");

    

        if(message.mentions.users.size === 0) {

            return message.channel.send("You must mention a user")

        }

        var kick = message.guild.member(message.mentions.users.first());

        if(!kick) {

            return message.channel.send("I do not know if the user exists :/")

        }

    

        if(message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {

            return message.channel.send("I do not have permission to kick");

        }

    

        kick.kick().then(member => {

            message.channel.send(`${member.user.username} is kick by ${message.author.username}`);

        });

    }



    if(message.content.startsWith(prefix + "ban")) {

        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission !");



        if(message.mentions.users.size === 0) {

            return message.channel.send("You must mention a user");

        }



        var ban = message.guild.member(message.mentions.users.first());

        if(!ban) {

            return message.channel.send("I do not know if the user exists :/");

        }



        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {

            return message.channel.send("I do not have permission to ban");

        }

        ban.ban().then(member => {

            message.channel.send(`${member.user.username} is ban by ${message.author.username} !`)

        });

        

    }



    if(message.content.startsWith(prefix + "clear")) {

        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission !");



        let args = message.content.split(" ").slice(1);



        if(!args[0]) return message.channel.send("You must specify a number of messages to delete !")

        message.channel.bulkDelete(args[0]).then(() => {

            message.channel.send(`${args[0]} messages have been deleted !`);

        });

    }



    if(message.content.startsWith(prefix + "mute")) {

        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have permission !");



        if(message.mentions.users.size === 0) {

            return message.channel.send('You must mention a user !');

        }



        var mute = message.guild.member(message.mentions.users.first());

        if(!mute) {

            return message.channel.send("I do not know if the user exists :/");

        }



        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("I do not have permission !");

        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {

            message.channel.send(`${mute.user.username} is mute !`);

        });

    }



    if(message.content.startsWith(prefix + "unmute")) {

        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have permission !");



        if(message.mentions.users.size === 0) {

            return message.channel.send('You must mention a user !');

        }



        var mute = message.guild.member(message.mentions.users.first());

        if(!mute) {

            return message.channel.send("I do not know if the user exists :/");

        }



        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("I do not have permission !");

        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {

            message.channel.send(`${mute.user.username} no longer mute !`);

        });

    }



    var fs = require('fs');



let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));



if (message.content.startsWith(prefix + "warn")){



if (message.channel.type === "dm") return;



var mentionned = message.mentions.users.first();



if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: You do not have the `Manage Server` permission in this server **").catch(console.error);



if(message.mentions.users.size === 0) {



  return message.channel.send("**:x: You did not mention any users **");



}else{



    const args = message.content.split(' ').slice(1);



    const mentioned = message.mentions.users.first();



    if (message.member.hasPermission('MANAGE_GUILD')){



      if (message.mentions.users.size != 0) {



        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {



          if (args.slice(1).length != 0) {



            const date = new Date().toUTCString();



            if (warns[message.guild.id] === undefined)



              warns[message.guild.id] = {};



            if (warns[message.guild.id][mentioned.id] === undefined)



              warns[message.guild.id][mentioned.id] = {};



            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;



            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){



              warns[message.guild.id][mentioned.id]["1"] = {"reason": args.slice(1).join(' '), time: date, user: message.author.id};



            } else {



              warns[message.guild.id][mentioned.id][warnumber+1] = {"reason": args.slice(1).join(' '),



                time: date,



                user: message.author.id};



            }



            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});



message.delete();



            message.channel.send(':warning: | **'+mentionned.tag+' have been warned**');



message.mentions.users.first().send(`:warning: **Warn |** since **${message.guild.name}** given by **${message.author.username}**\n\n**Reason:** ` + args.slice(1).join(' '))



          } else {



            message.channel.send("Misuse error: "+prefix+"warn <user> <reason>");



          }



        } else {



          message.channel.send("Misuse error: "+prefix+"warn <user> <reason>");



        }



      } else {



        message.channel.send("Misuse error: "+prefix+"warn <user> <reason>");



      }



    } else {



      message.channel.send("**:x: You do not have the `Manage Server` permission in this server **");



    }



  }



}







  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {



if (message.channel.type === "dm") return;



if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: You do not have the `Manage Server` permission in this server **").catch(console.error);



    const mentioned = message.mentions.users.first();



    const args = message.content.split(' ').slice(1);



    if (message.member.hasPermission('MANAGE_GUILD')){



      if (message.mentions.users.size !== 0) {



        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {



          try {



            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {



              message.channel.send("**"+mentioned.tag+"** has no warn :eyes:");



              return;



            }



          } catch (err) {



            message.channel.send("**"+mentioned.tag+"** has no warn :eyes:");



            return;



          }



          let arr = [];



          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");



          for (var warn in warns[message.guild.id][mentioned.id]) {



            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+



            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");



          }



          message.channel.send(arr.join('\n'));



        } else {



          message.channel.send("Misuse error: "+prefix+"seewarns <user> <reason>");



          console.log(args);



        }



      } else {



        message.channel.send("Misuse error: "+prefix+"seewarns <user> <reason>");



      }



    } else {



      message.channel.send("**:x: You do not have the `Manage Server` permission in this server **");



    }



  }











  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {



if (message.channel.type === "dm") return;



if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: You do not have the `Manage Server` permission in this server **").catch(console.error);



   const mentioned = message.mentions.users.first();



    const args = message.content.split(' ').slice(1);



    const arg2 = Number(args[1]);



    if (message.member.hasPermission('MANAGE_GUILD')){



      if (message.mentions.users.size != 0) {



        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){



          if (!isNaN(arg2)) {



            if (warns[message.guild.id][mentioned.id] === undefined) {



              message.channel.send(mentioned.tag+" has no warn");



              return;



            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {



              message.channel.send("**:x: This warn does not exist**");



              return;



            }



            delete warns[message.guild.id][mentioned.id][arg2];



            var i = 1;



            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){



              var val=warns[message.guild.id][mentioned.id][key];



              delete warns[message.guild.id][mentioned.id][key];



              key = i;



              warns[message.guild.id][mentioned.id][key]=val;



              i++;



            });



            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});



            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {



              delete warns[message.guild.id][mentioned.id];



            }



            message.channel.send(`The warn of **${mentioned.tag}**\': **${args[1]}** has been removed successfully !`);



            return;



          } if (args[1] === "all") {



            delete warns[message.guild.id][mentioned.id];



            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});



            message.channel.send(`The warns of **${mentioned.tag}** has been removed successfully !`);



            return;



          } else {



            message.channel.send("Misuse error: "+prefix+" clearwarns <user> <number>");



          }



        } else {



          message.channel.send("Misuse error: "+prefix+" clearwarns <user> <number>");



        }



      } else {



       message.channel.send("Misuse error: "+prefix+" clearwarns <user> <number>");



      }



    } else {



      message.channel.send("**:x: You do not have the `Manage Server` permission in this server**");



    }



  }



  const réponse = JSON.parse(fs.readFileSync('./eightball.json', "utf8"));



if (message.content.startsWith(prefix + "8ball")) {



  var args = message.content.split(' ').join(' ').slice(6);



  if(!args) return message.channel.send("You have to ask me a question !")



  var ball_embed = new Discord.RichEmbed()

  .setColor('RANDOM')

  .setTitle('Here is my 8ball commands :')

  .addField('Question :', `${args}`)

  .addField('Reply', réponse[Math.round(Math.random() * réponse.length)])

  .setFooter('8ball :)')

  message.channel.send(ball_embed);

}



});
