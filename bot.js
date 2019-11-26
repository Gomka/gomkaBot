const Discord = require('discord.js');

const bot = new Discord.Client();
 

bot.on('ready', () => {

    console.log('I am ready!');

});

 

bot.on('message', message => {

    var input = message.content.toLowerCase();

    if (message.content === 'ping') {

       message.reply('pong');

    }

    if (message.content === 'test') {

        message.reply('A <@' + message.author.id +'> le pica la cabeza por dentro.');

    }

    if (input.inexOf("siempre")>0 && !message.author.bot){
        message.reply("S I E M P R E");
    }

}); 



// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
