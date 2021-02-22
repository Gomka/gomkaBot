# gomkaBot
Gomka's discord bot

Intended to do wonky shit, but for now it's in progress.

All variables from process.env are from heroku's config vars.

## Commands:

`roll`: To roll dubs based on your message's ID. 
	If two or more digits starting from lower to higher are equal the bot will announce it

`ping`: The bot will pong, measuring both the bot and api latency. The bot will also announce that your head itches from inside.

if a message contains the word `siempre` the bot will say S I E M P R E
if a message contains the text `comid` the bot will say 𝓮𝓷𝓳𝓸𝔂 𝔂𝓸𝓾𝓻 𝓶𝓮𝓪𝓵

`gomkabot restart`: Restarts the bot. (this command can only be issued by the bot owner).

### `robalada` family of commands: Consists on a postgresql based persistency storage of strings.

`robalada add [string]`: If that message was sent by the author of the bot, the string in [] is added to the database, and the bot will announce the index of the robalada added.
	
`robalada cleanse [int]`: If the message was sent by the author of the bot, deletes the n string in the list of robaladas from the database.
	
`robalada all`: Prints all the strings in the database. Only the bot owner can issue this command to prevent massive spam.
	
`robalada last`: Indicates the total ammount of robaladas and prints the last one added.

`robalada num [int]`: Prints the nth robalada.

`robalada bomb`: Dumps 4 robaladas in a row. (only one message to prevent spam)

`gomkabot restart`: Restarts the bot (only the bot owner can issue this command)
	
- if a message contains the word `robalada` and is not triggering the previous commands, the bot will print a random string from the robalada database. There is a 1/50 to get a shiny special robalada, stored in a different table in the database.

All of the previous commands apply to the shiny robaladas with the syntax `robalada shiny [command]` (Only the bot owner can issue the shiny versions).
