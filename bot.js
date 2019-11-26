const Discord = require('discord.js');

const client = new Discord.Client();
 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

    }

    if (message.content === 'test') {

        message.reply('A <@' + message.author.id +'> le pica la cabeza por dentro.');

    }

    if (message.content.toLowerCase.includes("siempre") && message.author != this){
        message.reply("S I E M P R E");
    }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
