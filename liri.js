require("dotenv").config();
const keys = require('./keys');

var fs = require("fs");

var command = process.argv[2];
var value = process.argv[3];

// <--- my-tweets command (Twitter API) --->
function myTweets() {
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitter);

    var params = {screen_name: 'BootcampStudent', count: 20};
    
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            return console.log(error);
        } else if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var counter = i + 1;
                console.log("Tweet #" + counter);
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("---------------------------------------------------");
            }
        }
    });
    logCommand();
}//<--- end myTweets() function

// <--- spotify-this-song command (Spotify API) --->
function spotifyThisSong() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: value, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Preview the song here: " + data.tracks.items[0].preview_url);
        console.log("---------------------------------------------------");
    });
    logCommand();
}//<--- end spotifyThisSong() function

// <--- movie-this command (IMBD API) --->
function movieThis() {

    var request = require("request");

    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

    // This line just debugs against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        // Check for error
        if (!error && response.statusCode === 200) {
            console.log("---------------------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Production Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("---------------------------------------------------");
        }
    });
    logCommand();
} //<--- end movieThis() function

// <--- do-what-it-says command (Random LIRI Command) --->
function doWhatItSays() {

    fs.readFile("random.txt", "utf-8", function(error, data) {
        // checks for error
        if (error) {
            return console.log(error);
        }
        
        //makes random.txt an array
        var randomArray = data.split("\n");    
        
        //chooses a random array item from random.txt
        Array.prototype.randomElement = function () {
            return this[Math.floor(Math.random() * this.length)]
        }
        var randomCommand = randomArray.randomElement();
        
        //makes the selected random item an array
        var newArray = randomCommand.split(",");
        command = newArray[0];
        value = newArray[1];

        console.log("---------------------------------------------------");
        console.log("LIRI randomly chose this command ---> " + command + " " + value);
        console.log("---------------------------------------------------");

        if (command === "movie-this") {
            movieThis();
        } else if (command === "spotify-this-song") {
            spotifyThisSong();
        } else if (command === "my-tweets") {
            myTweets(); 
        }   
    
    });
    logCommand();
} //<--- end doWhatItSays() function

// <--- appends commands to log.txt --->
function logCommand() {
    
    //if the command is movie-this or spotify, it will add quotes around the value in log.txt
    var newCommand;
    if (command === "do-what-it-says"){
        newCommand = "\n** " + command + ":";
    } else if (command === "my-tweets" ) {
        newCommand = "\n" + command;
    } else {
        newCommand = "\n" + command + " " + "'" + value + "'";
    }

    fs.appendFile("log.txt", newCommand, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("---------------------------------------------------");
            console.log("This command has been logged in log.txt");
        }
    });

} //<--- end logCommand() function

//run program
if (command === "do-what-it-says") {
    doWhatItSays();
} else if (command === "movie-this") {
    movieThis();
} else if (command === "my-tweets") {
    myTweets();
} else if (command === "spotify-this-song") {
    spotifyThisSong();
}