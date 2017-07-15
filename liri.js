
//get data from keys.js
var keys = require('./keys.js');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


// capture user input, and tell user what to enter

console.log("Type my-tweets, spotify-this-song, movie-this, or do-what-it-says to get started!");

//first 
var firstEntry = process.argv[2];
var secondEntry = process.argv[3];

//process multiple words.  if user types anything more than the options and first parameter.
	for(i=4; i<process.argv.length; i++){
		secondEntry += '+' + process.argv[i];
	}

function theSwitcheroo(){
	// testing switch statement here which havent used before;
	// switch statement to declare what action to execute
	switch(firstEntry){

		case 'my-tweets':
		fetchTweets();
		break;

		case 'spotify-this-song':
		spotifyMe();
		break;

		case 'movie-this':
		movieSelector();
		break;

		case 'do-what-it-says':
		readTextFile();
		break;
		
	}
};

//functions / options

function fetchTweets(){
	console.log("Tweets coming at you!");

	// variable for twitter, load keys from keys.js
	var client = new Twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	//parameters for twitter function
	var parameters = {
		screen_name: 'LDSussan',
		count: 20
	};
	
	//get method for twitter instance
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
		for (i=0; i<tweets.length; i++) {
			var returnData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
			console.log(returnData);
			console.log("-------------------------");
		  }	
		};
	});
}; // end fetchTweets;


function spotifyMe(){
	console.log("TONS of music!");

	var spotify = new Spotify({
  		id: "3c34baae066b4d4fbf96847cf7913cce",
  		secret: "2f9922358623466cafbeebbe57cc5e15"
	});

	//variable for search

	var searchTrack;
	if(secondEntry === undefined){
		searchTrack = "The Sign";
	}else{
		searchTrack = secondEntry;
	}
	//spotify search
	spotify.search({ type: 'track', query: searchTrack}, function(err, data){
		if(error){
			console.log('Error occured: ' + err);	
			return;
		}else{
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview Here: " + data.tracks.items[0].preview_url);
		}
	});	
};

function movieSelector() {
	console.log("What's your movie choice?");

	var searchMovie;

	if(secondEntry === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = secondEntry;
	};

	var query = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json';
	request(query, function(error, response, body){
		if(!error && response.statusCode == 200){
			console.log("Title: " + JSON.parse(body)["Title"]);
			console.log("Year: " + JSON.parse(body)["Year"]);
			console.log("IMDb Rating: " + JSON.parse(body)["imdbrating"]);
			console.log("Country: " + JSON.parse(body)["Country"]);
			console.log("Language: " + JSON.parse(body)["Language"]);
			console.log("Plot: " + JSON.parse(body)["Plot"]);
			console.log("Actors: " + JSON.parse(body)["Actors"]);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
			console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
		}
	});
};

function readTextFile(){
	console.log("Looking at random.txt now");
	fs.readFile("random.txt", "utf8", function(error, data) {
		if(error){
		   console.log(error);
		}else{

	//split data, declare variables
	var dataArr = data.split('.');
	firstEntry = data[0];
	secondEntry = dataArr[1];
	//if multi-word search term, add
	for(i=2; i<dataArr.length; i++){
		secondEntry = secondEntry + '+' + dataArr[i];
	};
	//run
		theSwitcheroo();

	};
  
  });

};

theSwitcheroo();




