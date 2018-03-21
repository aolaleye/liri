# LIRI Node Application
LIRI is a command line node app that takes in parameters and gives back data. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI accesses information from the Twitter, Spotify and OMDB APIs.

LIRI is able to take in the following commands:
* `my-tweets`
* `spotify-this-song`
* `movie-this`
* `do-what-it-says`

__node liri.js my-tweets__
_This will show the last 20 tweets from a twitter account and when the tweets were created at in the terminal/bash window._

__node liri.js spotify-this-song '<song name here>'__
_This will show the following information about the song in your terminal/bash window:_
* _Artist(s)_
* _The song's name_
* _A preview link of the song from Spotify_
* _The album that the song is from_

__node liri.js movie-this '<movie name here>'__
_This will output the following information to your terminal/bash window:_
* _Title of the movie._
* _Year the movie came out._
* _IMDB Rating of the movie._
* _Rotten Tomatoes Rating of the movie._
* _Country where the movie was produced._
* _Language of the movie._
* _Plot of the movie._
* _Actors in the movie._