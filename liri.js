require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
var fs = require("fs");
var command = process.argv[2];
var value = process.argv[3];


// <--- movie-this command (IMBD API) --->
function movieThis() {

    var request = require("request");

    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

    // This line just debugs against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        // Check for error
        if (!error && response.statusCode === 200) {
            console.log("-------------------------------------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Production Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-------------------------------------------------------------------");
        }
    });

} //<--- end movieThis() function

// <--- do-what-it-says command (Random LIRI Command)
function doWhatItSays() {

    fs.readFile("random.txt", "utf-8", function(error, data) {
        // check for error
        if (error) {
            return console.log(error);
        }
        
        //make random.txt an array
        var randomArray = data.split("+ ");    
        
        //choose a random array item from random.txt
        Array.prototype.randomElement = function () {
            return this[Math.floor(Math.random() * this.length)]
        }
        var randomCommand = randomArray.randomElement();
        
        //make the selected random item an array
        var newArray = randomCommand.split(",");
        command = newArray[0];
        value = newArray[1];

        console.log("-------------------------------------------------------------------");
        console.log("LIRI chose this command: " + command + " " + value);
        console.log("-------------------------------------------------------------------");

        if (command === "movie-this") {
            movieThis();
        }     
    
    });
} //<--- end doWhatItSays() function

// <--- appends commands to log.txt --->
function logCommand() {
    
    var newCommand = "\n" + command + " " + "'" + value + "'";

    fs.appendFile("log.txt", newCommand, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("-------------------------------------------------------------------");
            console.log("This command has been logged in log.txt");
        }
    });

} //<--- end logCommand() function

if (command === "do-what-it-says") {
    doWhatItSays();
    value = "";
    logCommand();
} else if (command === "movie-this") {
    movieThis();
    logCommand();
}