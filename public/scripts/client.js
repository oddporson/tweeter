/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// PREVENT CROSS-SITE SCRIPTING
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(() => { // --> same as $(document).ready(function(){insert here} - provided by Andy Lindsay
  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "What a tweeterific app!"
  //   },
  //   "created_at": 1461116232227
  // };

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];

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
      <img src="${escape(tweet.user.avatars)}">
      <h3>${escape(tweet.user.name)}</h3>
      <h3 class="handle">${escape(tweet.user.handle)}</h3>
      <p>${escape(tweet.content.text)}</p>
        <footer>
        ${moment(tweet.created_at).fromNow()}
          <div class="footer-icons"> <i class="fa fa-flag"></i> <i class="fa fa-retweet"></i> <i class="fa fa-heart"></i> </div>
        </footer>
    </article>`
    );
    return newTweet;
  };

  // const $tweet = createTweetElement(tweetData);
  // console.log($tweet); // to see what it looks like
  // $('#wrapper-tweet').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  // renderTweets(data);


  // // POSTING TWEET
  // const $form = $('#tweet-form');
  // $form.on('submit', function (event) {
  //   // console.log('Button clicked, performing ajax call...');
  //   event.preventDefault();
  //   $.ajax({
  //     url:'/tweets/',
  //     method: 'POST',
  //     data: $form.serialize(),
  //     success: function(){
  //       // console.log("everything went well");
  //       const newTweet = createTweetElement(
  //         {
  //           "user": {
  //             "name": "Porson",
  //             "avatars": "https://i.imgur.com/73hZDYK.png",
  //             "handle": "@oddporson" },
  //           "content": {
  //             text: $('.message-box').val()
  //           },
  //           "created_at": 1461116232227
  //         }
  //       )
  //       $('#wrapper-tweet').prepend(newTweet);
  //       $(".message-box").val(""); //get rid of text once submitted
  //       }
  //     });
  //   });

  // LOAD TWEET / FETCH TWEET
  const loadTweets = function() {
    return $.ajax({
      url: '/tweets/',
      type: "GET",
      success: function(data) {
        $("#wrapper-tweet").empty();
        console.log(data);
        renderTweets(data);
      }
    });
  };
  loadTweets();



  // FORM VALIDATION
  $(".error1").hide();
  $(".error2").hide();

  $('.message-box').on('input', function() {
    const content = $(this).val();
    event.preventDefault();
    if (content.length > 145) {
      $(".error2").slideDown(200).delay(2000).fadeOut(400);
    }
  });

  const $emptyForm = $('#tweet-form');
  $emptyForm.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const tweetMsgArea = $(this).find('.message-box').val();
    if (tweetMsgArea === "" || tweetMsgArea === null) {
      $(".error1").slideDown(200).delay(2000).fadeOut(400);
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data
    })
      .then(function() {
        loadTweets();
        console.log('Success', data);
        $(".message-box").val("");
      });
  });

  // TOGGLE TWEET FORM
  $('#btn-tweet').click(function() {
    $('#tweet-form').slideToggle('slow');
  });

}); // ends (document).ready
