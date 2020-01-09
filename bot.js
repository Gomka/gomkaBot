const Discord = require('discord.js');

const bot = new Discord.Client();

const config = require("./config.json");

var robaladaList = require("./robalada.json");

var fs = require('fs');

bot.on('ready', () => {

    console.log('c biene');

    var size = bot.guilds.size

    bot.user.setPresence({ game: { name: '👀', type: 3 } });
});

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    // bot.user.setActivity(`Exceso de ${bot.guilds.size} cromosomas`);
});

bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    // bot.user.setActivity(`Exceso de ${bot.guilds.size} cromosomas`);
});

bot.on('message', async message => {

    if(message.author.bot && config.ignoreBots) return;

    var messageLower = message.content.toLowerCase();
    
    var messageStrings = message.content.trim().split(/ +/g); // array of strings of all the words in the message
    var messageStringsLower = messageLower.trim().split(/ +/g);
    var command = messageStringsLower[0];

    if(command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms. A <@` + message.author.id + `> le pica la cabeza por dentro.`);
    }

    if (command === '¡ignorebot') {
        if(messageStringsLower[1] === "true") {

            config.ignoreBots = true;
            message.channel.send("Ignore bots set to `true`");

        } else if(messageStringsLower[1] === "false"){

            config.ignoreBots = false;
            message.channel.send("Ignore bots set to `false`");
        }
    }

    if (messageLower.includes("siempre")) {

        message.channel.send("S I E M P R E")

    }

    if(messageLower.includes("robalada") && !message.author.bot) {

        if(messageLower.startsWith("robalada add ")) {

            try {
                
            var robaladaStr = message.content.replace("robalada add ", "");

            robaladaList.robaladas.push("\*\""+robaladaStr+"\"\* -Robalito");

            var jsonRobalada = JSON.stringify(robaladaList);

            fs.writeFile("./robalada.json", jsonRobalada, 'utf8', function (err) {
                console.log("Escrito en persistencia");
            });

            message.channel.send("`Robalada satisfactoriamente sintetizada.`");

              }
              catch(error) {
                message.channel.send("Algo se ha crujio oh fuc. @Gomka#9124");
                console.error(error);
              }

        } else if(messageStrings[1] === "cleanse"){

            try {
                
                var posicionABorrar = parseInt(messageStringsLower[2], 10);

                if(!isNaN(posicionABorrar) && posicionABorrar>=0 && posicionABorrar<robaladaList.robaladas.length) {

                    robaladaList.robaladas[posicionABorrar] = "";
                    message.channel.send("Oh, senyor <@" + message.author.id + ">, veig que intenta jaqejar el nostre sistema Robalesc. La Colla Herba hi será informada.");
                    
                } else {
                    message.channel.send("No sigui mico. No hi puc fer l'esborreja d'aquesta robaleja.");    
                }            
              }
            catch(error) {
                message.channel.send("@Gomka#9124 Algo se ha crujio oh fuc.");
                console.error(error);
            }            
            
        } else if(messageStrings[1] === "all"){

            for (i in robaladaList.robaladas) {
                message.channel.send(robaladaList.robaladas[i]);
              }

        } else{
            try {
                if(robaladaList.robaladas.length>0) {
                    var stringToPrint = robaladaList.robaladas[Math.floor(Math.random() * robaladaList.robaladas.length)];
                    if(stringToPrint != null) {
                        message.channel.send(stringToPrint);
                    } else {
                        message.channel.send("algo se ha crujio ");
                    }

                } else {
                    message.channel.send("No robaladas to deliver (yet)");
                }
            } catch(error) {
                console.error(error);
            }              
            
        }

    }

    if (command === "roll") {

        var dubs = message.id;
        var tot = 0;

        for (var i = dubs.length-1; i > 0; i--) {

            if (dubs.charAt(i-1) == dubs.charAt(i)) {
                tot++;
            }
            else {
                break;
            }

        }

        switch (tot) {
            case 1: message.reply(dubs + " check them dubs");
                break;
            case 2: message.reply(dubs + " bruh trips checked");
                break;
            case 3: message.reply(dubs + " el diablo that be some quads");
                break;
            case 4: message.reply(dubs + " the fuck man you hackin' that be quints");
                break
            case 5: message.reply(dubs + " six in a row, you'r'e mams a hoe");
                break;
            case 6: message.reply(dubs + " seven eleven this string is probably never getting printed");
                break;
            case 7: message.reply(dubs + " eight in a row. Loko ke marrrdito ratatwuá");
                break;
            case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: 
            case 18: message.reply(dubs + " go buy some lotto");
                break;
            default: message.channel.send(dubs);
                break;
        }

    }

});

// Heroku integration

bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
