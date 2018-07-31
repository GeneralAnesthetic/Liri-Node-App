require("dotenv").config();
var Twitter = require('twitter');
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
// console.log(keys);



var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});
// console.log(client);
// Added Spotify Client from Spotify npm documentation
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// Add the code required to import the `keys.js` file and store it in a variable.
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
// const db = require('db')
// db.connect({
//     host: process.env.DB_HOST,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS
// })

// ===================================================================================================================
// =========================================  ALL NPMs have been Added  =========================================
// =========================================  ALL API Keys have been Included  =========================================
// =========================================  Refer to Homework Instructions  =========================================

// 1. `node liri.js my-tweets`
//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.

// var client = new Twitter({

//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });
// var clientInit = process.argv[2];

// switch (process.argv[2]) {
//     case "description":
//         console.log("This is description: " + JSON.parse(client.description))
//         break
// }




function getTweets(twitterHandle) {
    if (!twitterHandle) {
        twitterHandle = "ComanderCorn";
    }


    var params = {
        // by this time the parameter should be called by the user
        screen_name: twitterHandle
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // response send info back to twitter
            console.log(tweets);
            // console.log("This is description: " + tweets.timeline.description);
            // console.log("This is tweets: " + JSON.parse(tweets));
            // console.log("This is response: " + JSON.parse(response));
        }
    });

}



function doWhat() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        // split turns strings into arrays
        var commandArray = data.split(",");
        getUserCommand(commandArray[0], commandArray[1])
    })

}
// // Info from previous activiy 

// // // Node starts at index 2
// // var firstNum = parseFloat(process.argv[3]);
// // var secondNum = parseFloat(process.argv[4]);
// // // console.log(process);
// // switch (process.argv[2]) {
// //     case "add":
// //         firstNum + secondNum
// //         break
// //     case "subtract":
// //         firstNum - secondNum
// //         break
// //     case "multiply":
// //         firstNum * secondNum
// //         break
// //     case "divide":
// //         firstNum / secondNum
// //         break
// //     default: "Not a Recognized Command"

// // }
// // /===============================================================================================================
// // 2. Spotify Parts... . `node liri.js spotify-this-song '<song name here>'`

// // * This will show the following information about the song in your terminal/bash window
// // * Artist(s)
// // * The song's name
// // * A preview link of the song from Spotify
// // * The album that the song is from
// // * If no song is provided then your program will default to "The Sign" by Ace of Base.



// var spotify = new Spotify({
//     id: process.env.SPOTIFY_ID,
//     secret: process.env.SPOTIFY_SECRET,
// });
// console.log(spotify);

function searchSong(song) {
    if (!song) {
        song = "the sign"
    };

    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + (err));
        } else {

            console.log(data);
        }

    })
};

function movieSearch(movie) {
    if (!movie) {
        // if the user searches for nothing or undefined its sets to Mr. Nobody
        movie = "Mr. Nobody";
    }
}

function movie(movieSearch) {


    var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy"

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieObj = JSON.parse(body);



            // Since an object was returned, I didn't need to push to an empty array
            // Instead I could create my array and add the key value pairs I needed
            var movieLogArry = [
                "=================================",
                new Date(),
                "Title: " + movieObj.Title,
                "Year: " + movieObj.Year,
                "Rating: " + movieObj.Rated,
                "Rotten Tomatoes: " + movieObj.Ratings[1].Value,
                "Country: " + movieObj.Country,
                "Language: " + movieObj.Language,
                "Plot: " + movieObj.Plot,
                "Actors: " + movieObj.Actors
            ];

            // Iterate over my array to console log and append/write to my log.txt file
            for (var i = 0; i < movieLogArry.length; i++) {
                fs.appendFile("log.txt", movieLogArry[i] + "\n", function (err) {

                    // If the code experiences any errors it will log the error to the console.
                    if (err) {
                        return console.log(err);
                    }
                });

                console.log(movieLogArry[i]);
            }
        }
    });
};

function getUserCommand(userCommand, userSearch) {
    switch (userCommand) {
        case "my-tweets":
            getTweets(userSearch)
            break;
        case "spotify-this-song":
            searchSong(userSearch)
            break;
        case "movie-this":
            searchMovie(userSearch)
            break;
        case "do-what-it-says":
            doWhat()
            break;
        default:
            console.log("Please Enter a Valid Command Sucka!")
            break;
    }
}

getUserCommand(process.argv[2], process.argv[3]);

// // ==================================================================================================================
// // 3. `node liri.js movie-this '<movie name here>'`

// // Include the request npm package (Don't forget to run "npm install request" in this folder first!)


// // Grab the movieName which will always be the third node argument.
// var movieName = process.argv[2];

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// request(queryUrl, function (error, response, body) {

//     // If the request is successful
//     if (!error && response.statusCode === 200) {

//         // Parse the body of the site and recover just the imdbRating
//         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//         console.log("Release Year: " + JSON.parse(body).Year);
//     }
// }); // Level 2 (More Challenging):
// // Take a move with multiple words (ex: Forrest Gump) as a Node argument and retrieve the year it was created.
// // ---------------------------------------------------------------------------------------------------------

// // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// // var request = require("request");

// // Store all of the arguments in an array
// var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
// var movieName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {

//     if (i > 2 && i < nodeArgs.length) {

//         movieName = movieName + "+" + nodeArgs[i];

//     } else {

//         movieName += nodeArgs[i];

//     }
// }

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// request(queryUrl, function (error, response, body) {

//     // If the request is successful
//     if (!error && response.statusCode === 200) {

//         // Parse the body of the site and recover just the imdbRating
//         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//         console.log("Release Year: " + JSON.parse(body).Year);
//     }
// });

// //    * This will output the following information to your terminal/bash window:

// //      ```
// //        * Title of the movie.
// //        * Year the movie came out.
// //        * IMDB Rating of the movie.
// //        * Rotten Tomatoes Rating of the movie.
// //        * Country where the movie was produced.
// //        * Language of the movie.
// //        * Plot of the movie.
// //        * Actors in the movie.
// //      ```

// //    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


// // =====================================================================================================================
// // 4. `node liri.js do-what-it-says`


// // Example from previous activity

// fs.writeFile("movies.txt", "Inception, Die Hard", function (err) {

//     // If the code experiences any errors it will log the error to the console.

//     if (err) {
//         return console.log(err);
//     }

//     // Otherwise, it will print: "something was updated!"

//     console.log("something was updated!");

//     fs.appendFile("movies.txt", ", Lion King, Frozen, Toy Story", function (err) {
//         if (err) {
//             return console.log(err)
//         }
//     })
// });