const Discord = require('discord.js');

const bot = new Discord.Client();

const config = require("./config.json");

const mysql = require('mysql');

const { Client } = require('pg');

var robaladaShinyList = [];
var robaladaList = [];

const client = new Client({
    connectionString: process.env.DATABASE_URL, //Database connection
    ssl: true,
});

bot.on('ready', () => {

    console.log('c biene');

    bot.user.setPresence({ game: { name: '👀', type: 3 } });

    robaladaList = [];
    client.connect();
    client.query('SELECT robalada FROM robaladas;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            robaladaList.push(row.robalada);
        }
    });

    
    robaladaShinyList = [];
    client.query('SELECT robalada FROM robaladasshiny;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            robaladaShinyList.push(row.robalada);
        }
    });
});

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log('new guild');
});

bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log('left guild');
});

bot.on('message', async message => {

    if (message.author.bot && config.ignoreBots) return;

    var messageLower = message.content.toLowerCase();
    var messageStrings = message.content.trim().split(/ +/g); // array of strings of all the words in the message
    var messageStringsLower = messageLower.trim().split(/ +/g);

    if (messageStringsLower[0] === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms. A <@` + message.author.id + `> le pica la cabeza por dentro.`);
    }

    /*if (messageStringsLower[0] === '¡ignorebot') {
        if(messageStringsLower[1] === "true") {

            config.ignoreBots = true;
            message.channel.send("Ignore bots set to `true`");

        } else if(messageStringsLower[1] === "false"){

            config.ignoreBots = false;
            message.channel.send("Ignore bots set to `false`");
        }
    }*/

    if (messageLower.includes("siempre")) {

        message.channel.send("S I E M P R E");

    }

    if (messageLower == "robalda" || messageLower == "roblda" || messageLower == "robalanda") {

        message.channel.send("ximplet, ximplet...");

    }

    if (messageLower == "gomkabot" || messageLower == "gomka bot") {

        message.channel.send("E x p o s e d: https://github.com/Gomka/gomkaBot");
    }

    if (messageLower.includes("robalada") && !message.author.bot) {

        shiny = (Math.floor(Math.random() * 75) == 0);

        if (messageLower.startsWith("robalada shiny add ") && messageLower.length > 19) {

            robaladaAdd(true)

        } else if (messageLower.startsWith("robalada add ") && messageLower.length > 13) {

            robaladaAdd(false);

        } else if (messageLower.startsWith("robalada shiny cleanse")) {

            robaladaCleanse(true);

        } else if (messageLower.startsWith("robalada cleanse")) {

            robaladaCleanse(false);

        } else if (messageLower === "robalada shiny all" && message.author.id == process.env.AUTHOR_ID) {

            robaladaAll(true);

        } else if (messageLower === "robalada all" && message.author.id == process.env.AUTHOR_ID) {

            robaladaAll(false);

        } else if (messageLower.startsWith("robalada shiny num") && parseInt(messageStringsLower[3], 10) >= 0 && message.author.id == process.env.AUTHOR_ID) {

            robaladaNum(true);

        } else if (messageLower.startsWith("robalada num") && parseInt(messageStringsLower[2], 10) >= 0) {

            robaladaNum(false);

        } else if (messageLower === "robalada shiny last" && message.author.id == process.env.AUTHOR_ID) {

            robaladaLast(true);

        } else if (messageLower === "robalada last") {

            robaladaLast(false);

        } else {

            robaladaRandom(shiny);

        }
    }

    function robaladaAdd(shiny) {

        if (shiny) {

            if (message.author.id == process.env.AUTHOR_ID) {

                try {

                    var robaladaStr = message.content.substr(19);

                    //The commented code is string sanitization. For your database's sake, uncomment it

                    robaladaStr = robaladaStr.replace(/'/g, "");
                    //robaladaStr = robaladaStr.replace(/\n/g, ", ");
                    //robaladaStr = robaladaStr.replace(/\\n/g, ", ");
                    //robaladaStr = robaladaStr.replace(/\r/g, ", ");
                    //robaladaStr = robaladaStr.replace(/\r\n/g, ", ");
                    //robaladaStr = robaladaStr.replace(/\\"/g, "*");

                    robaladaShinyList.push(robaladaStr);

                    var sql = "INSERT INTO robaladasshiny VALUES(default, '" + robaladaStr + "');"; //replace ['"+robaladaStr+"'] with [?]

                    //var inserts = [robaladaStr];
                    //sql = mysql.format(sql, inserts);

                    client.query(sql, (err, res) => {
                        if (err) throw err;
                    });

                    var length = robaladaShinyList.length - 1;

                    message.channel.send("`Robalada shiny nº" + length + " satisfactoriamente sintetizada.`");

                }
                catch (error) {
                    message.channel.send("Algo se ha crujio oh fuc");
                    console.error(error);
                }

            } else {

                message.channel.send("Kemekomenta kuenta");
                bot.users.get(process.env.AUTHOR_ID).send(message.content); //Sends the potential robalada to the bot owner

            }

        } else {

            if (message.author.id == process.env.AUTHOR_ID) {

                try {

                    var robaladaStr = message.content.substr(13);

                    //The commented code is string sanitization. For your database's sake, uncomment it

                    //robaladaStr = robaladaStr.replace(/'/g, "");
                    //robaladaStr = robaladaStr.replace(/\n/g, ", ");
                    //robaladaStr = robaladaStr.replace(/\\n/g, ", ");
                    //robaladaStr = robaladaStr.replace(/\r/g, ", ");
                    //robaladaStr = robaladaStr.replace(/\r\n/g, ", ");
                    //robaladaStr = robaladaStr.replace(/\\"/g, "*");

                    robaladaList.push(robaladaStr);

                    var sql = "INSERT INTO robaladas VALUES(default, '" + robaladaStr + "');"; //replace ['"+robaladaStr+"'] with [?]

                    //var inserts = [robaladaStr];
                    //sql = mysql.format(sql, inserts);

                    client.query(sql, (err, res) => {
                        if (err) throw err;
                    });

                    var length = robaladaList.length - 1;

                    message.channel.send("`Robalada nº" + length + " satisfactoriamente sintetizada.`");

                }
                catch (error) {
                    message.channel.send("Algo se ha crujio oh fuc");
                    console.error(error);
                }

            } else {

                message.channel.send("Kemekomenta kuenta");
                bot.users.get(process.env.AUTHOR_ID).send(message.content); //Sends the potential robalada to the bot owner

            }
        }
    }

    function robaladaCleanse(shiny) {

        if (shiny) {

            if (message.author.id == process.env.AUTHOR_ID) {

                try {

                    var posicionABorrar = parseInt(messageStringsLower[3], 10);

                    if (!isNaN(posicionABorrar) && posicionABorrar >= 0 && posicionABorrar < robaladaShinyList.length) {

                        client.query("DELETE FROM robaladasshiny WHERE robalada = \'" + robaladaShinyList[posicionABorrar] + "\';", (err, res) => {
                            if (err) throw err;
                        });

                        robaladaShinyList.splice(posicionABorrar, 1);

                        message.channel.send("`Robalada cleansed successfully`");

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
        } else {

            if (message.author.id == process.env.AUTHOR_ID) {

                try {

                    var posicionABorrar = parseInt(messageStringsLower[2], 10);

                    if (!isNaN(posicionABorrar) && posicionABorrar >= 0 && posicionABorrar < robaladaList.length) {

                        client.query("DELETE FROM robaladas WHERE robalada = \'" + robaladaList[posicionABorrar] + "\';", (err, res) => {
                            if (err) throw err;
                        });

                        robaladaList.splice(posicionABorrar, 1);

                        message.channel.send("`Robalada cleansed successfully`");

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
        }
    }

    function robaladaAll(shiny) {

        if (shiny) {

            if (robaladaShinyList.length == 0) {

                message.channel.send("Robalada shiny list currently empty.");

            } else {

                var totalString = "";

                for (i in robaladaShinyList) {

                    if (((totalString.length + robaladaShinyList[i].length + i.toString().length) + 7) <= 2000) {

                        totalString += "```" + i + "-" + robaladaShinyList[i] + "```";

                    } else {

                        message.channel.send(totalString);
                        totalString = "```" + i + "-" + robaladaShinyList[i] + "```";

                    }
                }

                message.channel.send(totalString);
            }

        } else {

            if (robaladaList.length == 0) {

                message.channel.send("Robalada list currently empty.");

            } else {

                var totalString = "";

                for (i in robaladaList) {

                    if (((totalString.length + robaladaList[i].length + i.toString().length) + 7) <= 2000) {

                        totalString += "```" + i + "-" + robaladaList[i] + "```";

                    } else {

                        message.channel.send(totalString);
                        totalString = "```" + i + "-" + robaladaList[i] + "```";

                    }
                }

                message.channel.send(totalString);
            }
        }
    }

    function robaladaNum(shiny) {

        if (shiny) {

            if (parseInt(messageStringsLower[3], 10) < robaladaShinyList.length) {

                message.channel.send(robaladaShinyList[parseInt(messageStringsLower[3], 10)]);

            } else {

                message.channel.send("Aquesta robalesca encara no existeix (de moment)");

            }

        } else {

            if (parseInt(messageStringsLower[2], 10) < robaladaList.length) {

                message.channel.send(robaladaList[parseInt(messageStringsLower[2], 10)]);

            } else {

                message.channel.send("Aquesta robalesca encara no existeix (de moment)");

            }
        }
    }

    function robaladaLast(shiny) {

        if (shiny) {

            var length = robaladaShinyList.length;

            message.channel.send("En total hay " + length + " robaladas. La última (índice `" + (length - 1) + "`) es:");
            message.channel.send(robaladaShinyList[length - 1]);

        } else {

            var length = robaladaList.length;

            message.channel.send("En total hay " + length + " robaladas. La última (índice `" + (length - 1) + "`) es:");
            message.channel.send(robaladaList[length - 1]);

        }
    }

    function robaladaRandom(Shiny) {

        if (Shiny) {

            if (robaladaShinyList && robaladaShinyList.length > 0) {

                index = Math.floor(Math.random() * robaladaShinyList.length);

                message.channel.send("`BATUA L'OLLA, ROBALESCA SHINY!😳` " + robaladaShinyList[index]);

            } else {

                message.channel.send("No robaladas SHINY to deliver (yet)");
            }
            
        } else {

            if (robaladaList && robaladaList.length > 0) {

                index = Math.floor(Math.random() * robaladaList.length);

                message.channel.send("`" + index + ":` " + robaladaList[index]);

            } else {

                message.channel.send("No robaladas to deliver (yet)");
            }
        }
    }
    
    if (messageStringsLower[0] === "roll") {

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
