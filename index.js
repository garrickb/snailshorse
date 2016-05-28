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
