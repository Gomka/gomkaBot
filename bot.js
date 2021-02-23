const Discord = require('discord.js');

const bot = new Discord.Client();

const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET);

var robaladaShinyList = [];
var robaladaList = [];

bot.on('ready', () => {

    console.log('c biene');

    bot.user.setPresence({ game: { name: '👀', type: 3 } });

    robaladaShinyList = [];
    robaladaList = [];

    fetchRobaladas();

});

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log('new guild');
});

bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log('left guild');
});

bot.on("error", error => {
    // notify bot author when errors occur
    bot.users.get(process.env.AUTHOR_ID).send(error);
});

bot.on('message', async message => {

    if (message.author.bot) return;

    var messageLower = message.content.toLowerCase();
    var messageStrings = message.content.trim().split(/ +/g); // array of strings of all the words in the message
    var messageStringsLower = messageLower.trim().split(/ +/g);

    if (messageStringsLower[0] === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms. A <@` + message.author.id + `> le pica la cabeza por dentro.`);
    }

    if (messageLower.includes("siempre")) {

        message.channel.send("S I E M P R E");

    }

    if (messageLower == "me quiero morir") {

        message.channel.send("nah pero ten en cuenta");
    }

    if (messageLower == "robalda" || messageLower == "roblda" || messageLower == "robalanda") { // hay que hacer un diccionario de las pronunciaciones incorrectas

        message.channel.send("ximplet, ximplet...", { tts: true });

    }

    if (messageLower == "gomkabot" || messageLower == "gomka bot") {

        message.channel.send("E x p o s e d: https://github.com/Gomka/gomkaBot");
    }

    if (messageLower.includes("comid")) {

        message.channel.send("𝓮𝓷𝓳𝓸𝔂 𝔂𝓸𝓾𝓻 𝓶𝓮𝓪𝓵");
    }

    if (messageLower == "gomkabot restart" && message.author.id == process.env.AUTHOR_ID) {

        restart();
    }

    if (messageLower.includes("robalada") && !message.author.bot) {

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

        } else if (messageStringsLower[0] === "robalada" && messageStringsLower[1] === "bomb") {

            robaladaBomb();

        } else {

            shiny = Math.random() >= 0.98;
            randomTTs = Math.random() >= 0.95;

            message.channel.send(robaladaRandom(shiny), { tts: randomTTs });

        }
    }

    function robaladaAdd(shiny) {

        if (shiny) {

            if (message.author.id == process.env.AUTHOR_ID) {

                try {

                    var robaladaStr = message.content.substr(19);

                    robaladaStr = robaladaStr.replace("'", "");

                    addRobalada(robaladaStr, shiny === true ? 1 : 0); //1 for shiny, 0 for regular

                    robaladaShinyList.push([robaladaStr, "*"]);

                    var length = robaladaShinyList.length - 1;

                    message.channel.send("`Robalada shiny nº" + length + " satisfactoriamente sintetizada.`");

                }
                catch (error) {
                    restart(error);
                }

            } else {

                message.channel.send("Kemekomenta kuenta");
                bot.users.get(process.env.AUTHOR_ID).send(message.content); //Sends the potential robalada to the bot owner

            }

        } else {

            if (message.author.id == process.env.AUTHOR_ID) {

                try {

                    var robaladaStr = message.content.substr(13);

                    robaladaStr = robaladaStr.replace("'", "");

                    addRobalada(robaladaStr, shiny === true ? 1 : 0); // 1 for shiny, 0 for regular

                    robaladaList.push([robaladaStr, "*"]);

                    var length = robaladaList.length - 1;

                    message.channel.send("`Robalada nº" + length + " satisfactoriamente sintetizada.`");

                }
                catch (error) {
                    restart(error);
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

                        deleteRobalada(posicionABorrar, shiny === true ? 1 : 0) // 1 for shiny, 0 for regular

                        robaladaShinyList.splice(posicionABorrar, 1);

                        message.channel.send("`Robalada cleansed successfully`");

                    } else {

                        message.channel.send("No sigui mico. No hi puc fer l'esborreja d'aquesta robaleja.");
                    }
                }
                catch (error) {
                    restart(error);
                }

            } else {

                message.channel.send("Oh, senyor <@" + message.author.id + ">, veig que intenta jaqejar el nostre sistema Robalesc. La Colla Herba hi será informada.");

            }
        } else {

            if (message.author.id == process.env.AUTHOR_ID) {

                try {

                    var posicionABorrar = parseInt(messageStringsLower[2], 10);

                    if (!isNaN(posicionABorrar) && posicionABorrar >= 0 && posicionABorrar < robaladaList.length) {

                        deleteRobalada(posicionABorrar, shiny === true ? 1 : 0) // 1 for shiny, 0 for regular

                        robaladaList.splice(posicionABorrar, 1);

                        message.channel.send("`Robalada cleansed successfully`");

                    } else {

                        message.channel.send("No sigui mico. No hi puc fer l'esborreja d'aquesta robaleja.");
                    }
                }
                catch (error) {
                    restart(error);
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

                    if (((totalString.length + robaladaShinyList[i][0].length + i.toString().length) + 7) <= 2000) {

                        totalString += "```" + i + "-" + robaladaShinyList[i][0] + "```";

                    } else {

                        message.channel.send(totalString);
                        totalString = "```" + i + "-" + robaladaShinyList[i][0] + "```";

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

                    if (((totalString.length + robaladaList[i][0].length + i.toString().length) + 7) <= 2000) {

                        totalString += "```" + i + "-" + robaladaList[i][0] + "```";

                    } else {

                        message.channel.send(totalString);
                        totalString = "```" + i + "-" + robaladaList[i][0] + "```";

                    }
                }

                message.channel.send(totalString);
            }
        }
    }

    function robaladaNum(shiny) {

        if (shiny) {

            var i = parseInt(messageStringsLower[3], 10);

            console.log(i);

            if (i < robaladaShinyList.length) {

                message.channel.send(robaladaShinyList[i][0]);

                if(robaladaShinyList[i][0] != "*")

                    message.channel.send("```" + "Lore: " + robaladaShinyList[i][0] + "```");

            } else {

                message.channel.send("Aquesta robalesca encara no existeix (de moment)");

            }

        } else {

            var i = parseInt(messageStringsLower[3], 10);

            console.log(i);

            if (i < robaladaList.length) {

                message.channel.send(robaladaList[i][0]);

                if(robaladaList[i][0] != "*")

                    message.channel.send("```" + "Lore: " + robaladaList[i][0] + "```");

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

                return ("`BATUA L'OLLA, ROBALESCA SHINY!😳` " + robaladaShinyList[index][0]);

            } else {

                return ("No robaladas SHINY to deliver (yet)");
            }

        } else {

            if (robaladaList && robaladaList.length > 0) {

                index = Math.floor(Math.random() * robaladaList.length);

                return ("`" + index + ":` " + robaladaList[index][0]);

            } else {

                return ("No robaladas to deliver (yet)");
            }
        }
    }

    function robaladaBomb() {

        var robaladaBomb = "";
        var robaladaBomb2 = "";
        var robaladaAux = "";

        randomTTs = Math.random() >= 0.95;

        for (let index = 0; index < 4; index++) {

            shiny = Math.random() >= 0.98;
            robaladaAux = robaladaRandom(shiny);

            if ((robaladaBomb + robaladaAux + "\n").length < 2000) {
                robaladaBomb += robaladaAux + "\n";

            } else
                robaladaBomb2 += robaladaAux + "\n";
        }

        message.channel.send(robaladaBomb, { tts: randomTTs });

        if (robaladaBomb2.length > 0)
            message.channel.send(robaladaBomb2, { tts: randomTTs });
    }

    function restart(error) {

        console.log('restarting');

        if (error) {
            bot.users.get(process.env.AUTHOR_ID).send(error);
        }

        message.channel.send("A wueno adios master 😩");
        bot.destroy();
        bot.login(process.env.BOT_TOKEN);
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

async function fetchRobaladas() {

    await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const robaladaSheet = doc.sheetsByIndex[0]; // 0 is regular robaladas sheet

    var robaladaRows = await robaladaSheet.getRows();
    
    robaladaRows.forEach(row => {
        robaladaList.push([row.robalada, row.lore]);
    }); 

    const shinySheet = doc.sheetsByIndex[1]; // 1 is shiny robaladas sheet

    const shinyRows = await shinySheet.getRows();

    shinyRows.forEach(row => {
        robaladaShinyList.push([row.robalada, row.lore]);
    });   
    
}

async function addRobalada(robaladaStr, isShiny) {

    await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[isShiny]; // 0 is regular robaladas sheet, 1 shiny
    
    await sheet.addRow({ robalada: robaladaStr, lore: '*' });  
    
}

async function deleteRobalada(num, isShiny) {

    await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[isShiny]; // 0 is regular robaladas sheet

    var rows = await sheet.getRows();
    
    await rows[num].delete();
    
}

// Heroku integration

bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret