const Discord = require('discord.js');

const { get } = require("snekfetch"); 

const client = new Discord.Client();


const token = process.env.token;

var prefix = "+";


var commands = "15"; //10


var modération = "10"; //7


var générale = "4"; //3


var botstaff = "0";


var image = "1";


var info = "0"; //0


var serveurs = client.guilds.size;



const ytdl = require('ytdl-core');



const queue = new Map();



var servers = {};




client.login(token);


client.on('guildMemberAdd', member => {

  const channel = member.guild.channels.find(ch => ch.name === 'bienvenue');

  if (!channel) return;
  
  var bvn_embed = new Discord.RichEmbed()


  .addField("Bienvenue sur le serveur " + channel.guild.name, `${member}`)

  .addField("Actuellement nous sommes :", + channel.guild.members.size)

  .addField("Amuse toi bien ! :)", "...")

  .setFooter("By CuBz#7372")

  channel.send(bvn_embed);

});

client.on("ready", () => {


    client.user.setGame(""+prefix+"help | Version 2.1.2 | "+serveurs+"");
    


});



client.on('message', async message => { 

    if(message.content === prefix + "help") {

      var aide_embed = new Discord.RichEmbed()

      .setDescription("Nombre de commandes : **"+commands+"** \n Prefix : "+prefix+" \n \n Liste des commandes :  ")

      .addField(":arrow_right: BotStaff ("+botstaff+")", "`Aucune commande`")

      .addField(":arrow_right: Modération ("+modération+")", "`"+prefix+"kick`, `"+prefix+"ban`, `"+prefix+"clear`, `"+prefix+"say`, `"+prefix+"poll`, `"+prefix+"mute`, `"+prefix+"unmute`, `"+prefix+"warn`, `"+prefix+"deletewarns`")

      .addField(":arrow_right: Générale ("+générale+")", "`"+prefix+"info`, `"+prefix+"8ball`, `"+prefix+"stats`, `"+prefix+"report`")

      .addField(":arrow_right: Image ("+image+")", "`"+prefix+"cat`")

      .setFooter("By CuBz#7372")

      message.channel.send(aide_embed);

    }


    if(message.content === prefix + "info") {

        var info_embed = new Discord.RichEmbed()


        .setTitle("Info : \n \n ")

        .addField(":arrow_right: Nom du discord :", message.guild.name)

        .addField(":arrow_right: Nom du créateur :", message.guild.owner)

        .addField(":arrow_right: Date de la création du discord :", message.guild.createdAt)

        .addField(":arrow_right: Nombre de membre :", message.guild.members.size)

        message.channel.sendMessage(info_embed)

        

    }



    if(message.content.startsWith(prefix + "kick")){

        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("Vous n'avez pas la permission `Kick un membre` !");

    

        if(message.mentions.users.size === 0) {

            return message.channel.send("Vous devez metionner un utilisaeur")

        }

        var kick = message.guild.member(message.mentions.users.first());

        if(!kick) {

            return message.channel.send("Je ne sais pas si l'utilisateur existe :/")

        }

    

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {

            return message.channel.send("Je n'ai pas la permission pour kick");

        }

    

        kick.kick().then(member => {

         var kick_embed = new Discord.RichEmbed()


        .setTitle("Exclusion :exclamation:")

        .addField(":arrow_right: Joueur exclu :", member.user.username)

        .addField(":arrow_right: Personnel l'ayant exécutée :", message.author.username)

        message.channel.sendMessage(kick_embed)

        });

    }



    if(message.content.startsWith(prefix + "ban")) {

        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("Vous n'avez pas la permission `Ban un membre` !");



        if(message.mentions.users.size === 0) {

            return message.channel.send("Vous devez mentionner un utilisateur");

        }



        var ban = message.guild.member(message.mentions.users.first());

        if(!ban) {

            return message.channel.send("Je ne sais pas si l'utilisateur existe");

        }



        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {

            return message.channel.send("Je n'ai pas la permission");

        }

        ban.ban().then(member => {

         var ban_embed = new Discord.RichEmbed()


        .setTitle("Bannissement :exclamation:")

        .addField(":arrow_right: Joueur banni :", member.user.username)

        .addField(":arrow_right: Personnel l'ayant exécutée :", message.author.username)

        message.channel.sendMessage(ban_embed)

        });

        

    }



    if(message.content.startsWith(prefix + "clear")) {

        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission `Gérer les messages` !");



        let args = message.content.split(" ").slice(1);



        if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer !")

        message.delete()

        message.channel.bulkDelete(args[0]).then(() => {

         var clear_embed = new Discord.RichEmbed()


        .setTitle("Clear :white_check_mark:")

        .addField(":arrow_right: Message suprimmer :", args[0])

        .addField(":arrow_right: Personnel l'ayant exécutée :", message.author.username)

        message.channel.sendMessage(clear_embed)

        });

    }



    if(message.content.startsWith(prefix + "mute")) {

        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission `Gérer les messages` !");



        if(message.mentions.users.size === 0) {

            return message.channel.send('Vous devez mentionner un utilisateur !');

        }



        var mute = message.guild.member(message.mentions.users.first());

        if(!mute) {

            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");

        }



        if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je n'ai pas la permission !");

        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {

         var mute_embed = new Discord.RichEmbed()


        .setTitle("Mute :exclamation:")

        .addField(":arrow_right: Joueur mute :", member.user.username)

        .addField(":arrow_right: Personnel l'ayant exécutée :", message.author.username)

        message.channel.sendMessage(mute_embed)

        });

    }



    if(message.content.startsWith(prefix + "unmute")) {

        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission `Gérer les messages` !");



        if(message.mentions.users.size === 0) {

            return message.channel.send('Vous devez mentionner un utilisateur !');

        }



        var mute = message.guild.member(message.mentions.users.first());

        if(!mute) {

            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");

        }



        if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je n'ai pas la permission !");

        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {

            message.channel.send(`${mute.user.username} n'est plus mute !`);

        });

    }



    var fs = require('fs');



let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));



if (message.content.startsWith(prefix + "warn")){



if (message.channel.type === "dm") return;



var mentionned = message.mentions.users.first();



if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("**:x: Vous n'avez pas la permission `Gérer les message` dans ce serveur**").catch(console.error);



if(message.mentions.users.size === 0) {



  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");



}else{



    const args = message.content.split(' ').slice(1);



    const mentioned = message.mentions.users.first();



    if (message.member.hasPermission('MANAGE_MESSAGES')){



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



              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};



            } else {



              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),



                time: date,



                user: message.author.id};



            }



            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});



message.delete();



            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');



message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))



          } else {



            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");



          }



        } else {



          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");



        }



      } else {



        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");



      }



    } else {



      message.channel.send("**:x: Vous n'avez pas la permission `Accès 20` dans ce serveur**");



    }



  }



}







  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {



if (message.channel.type === "dm") return;



if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("**:x: Vous n'avez pas la permission `Gérer les message` dans ce serveur**").catch(console.error);



    const mentioned = message.mentions.users.first();



    const args = message.content.split(' ').slice(1);



    if (message.member.hasPermission('MANAGE_GUILD')){



      if (message.mentions.users.size !== 0) {



        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {



          try {



            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {



              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");



              return;



            }



          } catch (err) {



            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");



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



          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");



          console.log(args);



        }



      } else {



        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");



      }



    } else {



      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");



    }



  }











  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {



if (message.channel.type === "dm") return;



if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("**:x: Vous n'avez pas la permission `Gérer les message` dans ce serveur**").catch(console.error);



   const mentioned = message.mentions.users.first();



    const args = message.content.split(' ').slice(1);



    const arg2 = Number(args[1]);



    if (message.member.hasPermission('MANAGE_GUILD')){



      if (message.mentions.users.size != 0) {



        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){



          if (!isNaN(arg2)) {



            if (warns[message.guild.id][mentioned.id] === undefined) {



              message.channel.send(mentioned.tag+" n'a aucun warn");



              return;



            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {



              message.channel.send("**:x: Ce warn n'existe pas**");



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



            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);



            return;



          } if (args[1] === "tout") {



            delete warns[message.guild.id][mentioned.id];



            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});



            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);



            return;



          } else {



            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");



          }



        } else {



          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");



        }



      } else {



       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");



      }



    } else {



      message.channel.send("**:x: Vous n'avez pas la permission `Gérer les message` dans ce serveur**");



    }



  }



  const réponse = JSON.parse(fs.readFileSync('./eightball.json', "utf8"));



if (message.content.startsWith(prefix + "8ball")) {



  var args = message.content.split(' ').join(' ').slice(6);



  if(!args) return message.channel.send("Tu dois me poser une question !")



  var ball_embed = new Discord.RichEmbed()

  .addField('Question :', `${args}`)

  .addField('Réponse', réponse[Math.round(Math.random() * réponse.length)])

  message.channel.send(ball_embed);

}

if(message.content.startsWith(prefix + "say")){

  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("Vous n'avez pas la permission `Administrateur`");

  var args = message.content.split(' ').join(' ').slice(5);

  if(!args) return message.reply("Veuillez marquer une phrase ou un mot !")

  var say_embed = new Discord.RichEmbed()

  .setDescription(`${args}`)

  .setFooter("Envoyé par " + message.author.username)

  message.delete()

  message.channel.send(say_embed);

}

if(message.content.startsWith(prefix + "poll")){
  if(message.author.id === "253911060954742784"){
    let args = message.content.split(" ").slice(1)
    let thingToEcho = args.join(" ")
    var embed = new Discord.RichEmbed()

    .setDescription("Un nouveau sondage est disponible !")

    .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")

    message.channel.send("**Votre sondage à bien été lancé dans 📊-sondages**")
    message.guild.channels.find("name", "📊-sondages").sendEmbed(embed)
    .then(function (message) {
      message.react("✅")
      message.react("❌")
    }).catch(function() {
    });
    }else{
      return message.reply("Cette commande est actuellement en test ! Merci de patienter !")

  }

}

if (!message.content.startsWith(prefix)) return;
var args = message.content.substring(prefix.length).split(" ");
switch (args[0].toLowerCase()) { 
    case "stats":
    var userCreateDate = message.author.createdAt.toString().split(" ");
    var msgauthor = message.author.id;
    var stats_embed = new Discord.RichEmbed()
    .setTitle(`Statistiques du joueurs : ${message.author.username}`)
    .addField(`Date d'inscrisption du joueur dans le serveur`, message.member.joinedAt)
    .addField(`Date d'inscription discord du joueur :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
    .setThumbnail(message.author.avatarURL)
    message.reply("**Regarde dans tes messages privés ! Il y a t'es statistiques !**")
    message.author.send(stats_embed);
    break;
  }

  if(message.content.startsWith(prefix + "report")){ 
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("**Mentionner un utilisateur**");
    let rreason = args.join(" ").slice(22);
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Report")
    .addField("La Personne Report", `${rUser} ID: ${rUser.id}`)
    .addField("Report par", `${message.author} ID: ${message.author.id}`)
    .addField("Salon", message.channel)
    .addField("Date", message.createdAt)
    .addField("Raison", rreason);
    let reportschannel = message.guild.channels.find(`name`, "📝-report");
    if(!reportschannel) return message.channel.send("**Le salon '📝-report' n'existe pas !**");
    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    message.reply("**Le report à bien été envoyé au staff !** :white_check_mark:")
  }
  if(message.content.startsWith(prefix + 'cat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.RichEmbed()
				.setImage(res.body.file)
				return message.channel.send({embed});
			});
		} catch(err) {
			return message.channel.send(error.stack);
		}
  }

});

