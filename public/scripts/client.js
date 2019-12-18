/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => { // --> same as $(document).ready(function(){insert here} - provided by Andy Lindsay
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
  };

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
  ];

  // RENDER TWEET
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $("#wrapper-tweet").prepend(createTweetElement(tweet));
    }
  };

  // CREATE TWEET ELEMENT
  const createTweetElement = function(tweet) {
    const newTweet = $(
      `<article class="tweet">
      <img src="${tweet.user.avatars}">
      <h3>${tweet.user.name}</h3>
      <h3 class="handle">${tweet.user.handle}</h3>
      <p>${tweet.content.text}</p>
        <footer>
        ${moment(tweet.created_at).fromNow()}
          <div class="footer-icons"> <i class="fa fa-flag"></i> <i class="fa fa-retweet"></i> <i class="fa fa-heart"></i> </div>
        </footer>
    </article>`
    );
    return newTweet;
  };

  const $tweet = createTweetElement(tweetData);
  console.log($tweet); // to see what it looks like
  $('#wrapper-tweet').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  renderTweets(data);


  // POSTING TWEET
$(function() {
  const $form = $('#tweet-form');
  $form.on('submit', function (event) {
    // console.log('Button clicked, performing ajax call...');
    event.preventDefault();
    $.ajax({
      url:'/tweets/',
      method: 'POST',
      data: $form.serialize(),
      success: function(){
        // console.log("everything went well");
        const newTweet = createTweetElement(
          {
            "user": {
              "name": "Porson",
              "avatars": "https://i.imgur.com/73hZDYK.png",
              "handle": "@oddporson" },
            "content": {
              text: $('.message-box').val()
            },
            "created_at": 1461116232227 
          }
        )
        $('#wrapper-tweet').prepend(newTweet);
        $(".message-box").val(""); //get rid of text once submitted
        }
      });
    });
  });

// LOAD TWEET / FETCH TWEET
const loadTweets = function() {
  return $.ajax({
    url: '/tweets/',
    type: "GET",
    success: function (data) {
      $("#wrapper-tweet").empty();
      // console.log(data);
      renderTweets(data);
    }
  });
};
loadTweets();

});




// // DOCUMENT READY
// $(document).ready(function() {
//   loadTweets();

//   const $form = $('#form');
//   $form.on('submit', function(event) {
//     const url = $(this).attr("action");
//     const type = $(this).attr("method");
//     event.preventDefault();
//     const data = $(this).serialize();

//     const msgArea = data.substring(5);
//     if (msgArea === "" || msgArea === null) {
//       $("#error1").slideDown(200).delay(2000).fadeOut(400);
//     }
//     if (msgArea.length > 140) {
//       $("#error2").slideDown(200).delay(2000).fadeOut(400)(function() {
//         return $(this).delay(2000).then(function() {
//           return $(this).fadeOut(400);
//         });
//       });
//     }
//     $.ajax({
//       url: url,
//       type: type,
//       data: data
//     })
//       .then(function() {
//         loadTweets();
//         console.log('Success', data);
//         $(".comp-container").hide();
//         $(".msg").val("");
//       });
//   });


