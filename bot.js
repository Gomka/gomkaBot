const Discord = require('discord.js');

const bot = new Discord.Client();

const markov = require('./app/markov')
const config = require('./app/config')

config.loadConfig()

const tokenizer = require('./app/tokenizer')

const PREFIX = ">"

client
    .on('message', message)
    


bot.on('ready', () => {

    console.log("Logged in as " + client.user.tag)
    console.log(`Currently active on ${client.guilds.size} guilds: ${client.guilds.map(g => g.name)}`)

});

bot.on('message', message => {

    //if(message.author.bot) {
    //    return
    //}

    var input = message.content.toLowerCase();

    if (message.content === 'ping') {

        message.channel.send("pong")

    } else

    if (message.content === 'test') {

        message.channel.send('A <@' + message.author.id + '> le pica la cabeza por dentro.');

    } else

    if (input.includes("siempre")) { //&& !message.author.bot

        message.channel.send("S I E M P R E")

    }

    if (message.content.startsWith("dubs")) {

        var dubs = (Math.floor(Math.random() * 1000000000)).toString();
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
            case 7: message.reply(dubs + " eight in a row. Congratulations you hacked my bot or something");
                break;
            case 8: message.reply(dubs + " go buy some lotto");
                break;
            default: message.channel.send(dubs);
                break;
        }

    }
    
    if(message.channel.type == "dm") {
        replyToMessage(message.content, message.channel)
        return
    }

    const imitateId = config.getConfig(message.guild.id, "imitate")

    if(imitateId) {
        const context = tokenizer.tokenize(message.content)
        const response = markov.generateSentence(imitateId, context)

        if(response) {
            simulateSend(response, message.channel)
        }
    }

    console.log(`Message From ${message.author.tag}@${message.guild.name}: ${message.content}`)

    if(message.content.startsWith(PREFIX)) {
        handleCommand(message)   
    }

    const user = message.author.id
    const channel = message.channel.id
    const guild = message.guild.id

    message.channel.fetchMessages({limit: 3})   
    .then(messages => {
        const contextString = messages.filter(m => m.author.id != message.author.id)
        .map(m => m.content)
        .join(" ")

        const contextTokens = tokenizer.tokenize(contextString)
        //markov.addToChain(message.content, [user, channel, guild], contextTokens)
    })

});

function handleCommand(message) {
    const args = message.content.split(" ")
    const command = args.shift().replace(PREFIX, "")

    console.log(command)

    if(command == "reply") {
        const sentence = args.join(" ")
        replyToMessage(sentence, message.channel)
    } else if (command == "info") {
        const entries = Object.keys(markov.chain).length
        simulateSend(`I currently have ${entries} entries ${Math.floor((entries/1000000) * 100)}% of final goal`, message.channel)
    } else if(command == "imitate") {
        const guildId = message.guild.id

        const user = message.mentions.members.first()
        const channel = message.mentions.channels.first()

        if(user) {
            config.setConfig(guildId, "imitate", user.id)
            simulateSend("Okay. I will imitate " + user + ".", message.channel)
        } else if(channel) {
            config.setConfig(guildId, "imitate", channel.id)
            simulateSend("Okay. I will imitate channel " + channel + ".", message.channel)
        } else {
            config.setConfig(guildId, "imitate", null)
            simulateSend("Okay. I've stopped imitating.", message.channel)
        }
    }
}

function replyToMessage(sentence, channel) {    
    const context = tokenizer.tokenize(sentence)
    const response = markov.generateSentence(null, context)

    if(response) {
        simulateSend(response, channel)
    } else {
        simulateSend("Sorry, I do not understand :(", channel)
    }
}

function simulateSend(message, channel) {
    const delay = message.length * 20
    channel.startTyping()
    setTimeout(() => {
        channel.send(message)
        channel.stopTyping()
    }, delay)
}

// THIS  MUST  BE  THIS  WAY

bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
