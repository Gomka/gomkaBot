const Discord = require('discord.js');

const bot = new Discord.Client();
 

bot.on('ready', () => {

    console.log('I am ready!');

});

 

bot.on('message', message => {

    var input = message.content.toLowerCase();

    if (message.content === 'ping') {

       message.channel.send("pong")

    }

    if (message.content === 'test') {
        
        message.channel.send('A <@' + message.author.id +'> le pica la cabeza por dentro.');

    }

    if (input.includes("siempre")) { //&& !message.author.bot

        message.channel.send("S I E M P R E")

    }

    if (input.includes("dubs")) {

        var dubs = Math.random * 1000000000;

        message.channel.send(dubs);
        message.channel.send(100);
        message.channel.send(dubs.toString);
        
    }

}); 



// THIS  MUST  BE  THIS  WAY

bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
