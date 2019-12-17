/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  Test / driver code (temporary). Eventually will get this from the server.

$( () => { // --> same as $(document).ready => {}
  const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
    "text": "What a tweeterific app!"
    },
  "created_at": 1461116232227
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// RENDER TWEET
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $("#wrapper-tweet").prepend(createTweetElement(tweet));
  }
};

// CREATE TWEET ELEMENT
const createTweetElement = function(tweet) {
  // const currentDate = new Date ();
  const newTweet = $(`
    <article class="tweet">
      <img src="${tweet.user.avatars}">
      <h3>${tweet.user.name}</h3>
      <h3 class="handle">${tweet.user.handle}</h3>
      <p>${tweet.content.text}</p>
        <footer>
        10 days ago
          <div class="footer-icons"> <i class="fa fa-flag"></i> <i class="fa fa-retweet"></i> <i class="fa fa-heart"></i> </div>
        </footer>
    </article>`);

    return newTweet;
};


const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#wrapper-tweet').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



renderTweets(data);

})

