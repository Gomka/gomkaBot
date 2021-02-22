const Discord = require('discord.js');

const bot = new Discord.Client();

const config = require("./config.json");

const { Client } = require('pg');

var robaladaList = [];

const client = new Client({
    connectionString: process.env.DATABASE_URL, //Database connection
    ssl: { rejectUnauthorized: false },
});

bot.on('ready', () => {

    console.log('c biene');

    bot.user.setPresence({ game: { name: '👀', type: 3 } });

    client.connect();

    client.query('SELECT robalada FROM robaladas;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          robaladaList.push(row.robalada);
        }
    });
});

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
});

bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
});

bot.on('message', async message => {

    if (message.author.bot && config.ignoreBots) return;

    var messageLower = message.content.toLowerCase();

    var messageStrings = message.content.trim().split(/ +/g); // array of strings of all the words in the message
    var messageStringsLower = messageLower.trim().split(/ +/g);
    var command = messageStringsLower[0];

    if (command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms. A <@` + message.author.id + `> le pica la cabeza por dentro.`);
    }

    if (messageLower.includes("siempre")) {

        message.channel.send("S I E M P R E")

    }

    if (messageLower.includes("robalada") && !message.author.bot) {

        if (messageLower.startsWith("robalada add ")) {

            if(messageLower.length>13 && message.author.id == process.env.AUTHOR_ID) {

            try {

                var robaladaStr = message.content.replace("robalada add ", "");

                robaladaList.push(robaladaStr);

                client.query("INSERT INTO robaladas VALUES(default, \'" + robaladaStr + "\');", (err, res) => {
                    if (err) throw err;
                  });

                message.channel.send("`Robalada satisfactoriamente sintetizada.`");

            }
            catch (error) {
                message.channel.send("Algo se ha crujio oh fuc");
                console.error(error);
            }

            } else {

                message.channel.send("Kemekomenta kuenta");

            }

        } else if (messageStrings[1] === "cleanse") {

            if(message.author.id == process.env.AUTHOR_ID) {
                
                try {

                    var posicionABorrar = parseInt(messageStringsLower[2], 10);
    
                    if (!isNaN(posicionABorrar) && posicionABorrar >= 0 && posicionABorrar < robaladaList.length) {
    
                        client.query("DELETE FROM robaladas WHERE robalada = \'"+ robaladaList[posicionABorrar]+ "\';", (err, res) => {
                            if (err) throw err;
                          });
    
                        robaladaList.splice(posicionABorrar, 1);
    
                        message.channel.send("Robalada cleansed successfully");
    
                    } else {
                        
                        message.channel.send("No sigui mico. No hi puc fer l'esborreja d'aquesta robaleja.");
                    }
                }
                catch (error) {
                    message.channel.send("Algo se ha crujio :/");
                    console.error(error);
                }

            } else {

                message.channel.send("Oh, senyor <@" + message.author.id + ">, veig que intenta jaqejar el nostre sistema Robalesc. La Colla Herba hi será informada.");

            }

        } else if (messageStrings[1] === "all") {

            if (robaladaList.length == 0) {

                message.channel.send("Robalada list currently empty.");

            } else {

                var totalString = "";
                var sent = false;

                for (i in robaladaList) {

                    if ((totalString.length + robaladaList[i].length + i.toString().length) < 2000) {

                        totalString += "```" + i + "-" + robaladaList[i] + "```";
                        sent = false;

                    } else {

                        message.channel.send(totalString);
                        sent = true;
                        totalString = "```" + i + "-" + robaladaList[i] + "```";

                    }

                }

                if (!sent) message.channel.send(totalString);
            }

        } else {
            try {
                if (robaladaList && robaladaList.length > 0) {

                    message.channel.send(robaladaList[Math.floor(Math.random() * robaladaList.length)]);

                } else {

                    message.channel.send("No robaladas to deliver (yet)");
                }
            } catch (error) {
                console.error(error);
            }

        }

    }

    if (command === "roll") {

        var dubs = message.id;
        var tot = 0;

        for (var i = dubs.length - 1; i > 0; i--) {

            if (dubs.charAt(i - 1) == dubs.charAt(i)) {
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
            case 18: message.reply(dubs + "... go buy some lotto");
                break;
            default: message.channel.send(dubs);
                break;
        }

    }

});

// Heroku integration

bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
