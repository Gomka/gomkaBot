# gomkaBot
Gomka's discord bot

Intended to do wonky shit, but for now it's in progress.

All variables from process.env are from heroku's config vars.

## Commands:

`roll`: To roll dubs based on your message's ID. 
	If two or more digits starting from lower to higher are equal the bot will announce it

`ping`: The bot will pong.

`test`: The bot will announce that your head itches from inside.

if a message contains the word `siempre` the bot will say S I E M P R E

`robalada` family of commands: Consists on a postgresql based persistency storage of strings.
	- `robalada add []`: If that message was sent by the author of the bot, the string in [] is added to the database.
	- `robalada cleanse [n]`: If the message was sent by the author of the bot, deletes the n string in the list of robaladas from the database
	- `robalada all` prints all the strings in the database
	- if a message contains the word `robalada` and is not triggering the previous commands listed, the bot will print a random string from the robalada database.