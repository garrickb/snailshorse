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


controller.hears(['salesforce','snailshorse'],['ambient','direct_message','direct_mention'],function(bot,message) {
	do {
		var sales = rhymes.sale[Math.floor(Math.random() * rhymes.sale.length)];
		var force = rhymes.force[Math.floor(Math.random() * rhymes.force.length)];
		var salesforce = sales.word.charAt(0).toUpperCase() + sales.word.slice(1) + (sales.word.charAt(sales.word.length - 1) != "s"?"s":"") + force.word.charAt(0).toUpperCase() + force.word.slice(1);
		var question = questions[Math.floor(Math.random() * questions.length)];
    } while ((parseInt(sales.syllables) + parseInt(force.syllables)) > 3);

    console.log(sales.syllables + "," +  force.syllables);


    bot.reply(message, question[0] + "_" + salesforce + "_" + question[1]);
});
