const Discord = require('discord.js');

const bot = new Discord.Client();

bot.on('ready', () => {

    console.log('I am ready!');

    client.user.setActivity('Exceso de ${client.guilds.size} cromosomas');

    var robaladaList;

});

bot.on('message', message => {

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const prefix = args[0].toLowerCase();

    if (message.content === 'ping') {

        message.channel.send("pong")

    }

    if (message.content === 'test') {

        message.channel.send('A <@' + message.author.id + '> le pica la cabeza por dentro.');

    }

    if (message.toLowerCase.includes("siempre")) {

        message.channel.send("S I E M P R E")

    }

    if (prefix === "roll") {

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

    if(prefix === "robalada" && !message.author.bot) {

        if(args[1] === "add") {

            var string = "";

            args.forEach(element => {
                string +=(element+" ");
            });

            robaladaList.push(string);

            message.channel.send("`Robalada satisfactoriamente sintetizada.`");

        } else {
            message.channel.send(robaladaList[Math.floor(Math.random() * Math.floor(robaladaList.length-1))])
        }

    }

});

// THIS  MUST  BE  THIS  WAY

bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
