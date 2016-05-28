/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Send a message with attachments
* Send a message via direct message (instead of in a public channel)

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node demo_bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "Attach"

  The bot will send a message with a multi-field attachment.

  Send: "dm me"

  The bot will reply with a direct message.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var Botkit = require('botkit');
var fs = require('fs');
var rhymes = JSON.parse(fs.readFileSync('rhymes.json', 'utf8'));


if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

var questions = [
	["Are you talking about ", "?"],
	["Did you mean ", "?"],
	["You meant ", ", right?"],
	["I think you meant ", "."],
	["How about ", "?"],
	["It's called ", "."],
	["...", ""]
];


controller.hears(['salesforce','snailshorse'],['direct_message','direct_mention','mention'],function(bot,message) {
	var sales = rhymes.sale[Math.floor(Math.random() * rhymes.sale.length)].word;
	var force = rhymes.force[Math.floor(Math.random() * rhymes.force.length)].word;
	var salesforce = sales.charAt(0).toUpperCase() + sales.slice(1) + (sales.charAt(sales.length - 1) != "s"?"s":"") + force.charAt(0).toUpperCase() + force.slice(1);
	var question = questions[Math.floor(Math.random() * questions.length)];

    bot.reply(message, question[0] + "_" + salesforce + "_" + question[1]);
});
