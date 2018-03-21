require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var command = process.argv[2];


// <--- movie-this command (IMBD API) --->
function movieThis() {

    var request = require("request");

    var movieName = process.argv[3];

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line just debugs against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        // Check for error
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Production Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

} //<--- end movieThis() function

// <--- appends commands to log.txt --->
function logCommand() {

    var fs = require("fs");
    var newCommand = "\n" + command + " " + process.argv[3];

    fs.appendFile("log.txt", newCommand, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Command logged in log.txt!");
        }
    });

} //<--- end logCommand() function

if (command === "movie-this") {
    movieThis();
    logCommand();
}