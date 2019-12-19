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

$(() => {

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
    if (content.length > 140) {
      $(".error2").slideDown(200);
    } else {
      $(".error2").fadeOut();
    }
  });
  const $emptyForm = $('#tweet-form');
  $emptyForm.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const tweetMsgArea = $(this).find('.message-box').val();
    if (tweetMsgArea === "" || tweetMsgArea === null) {
      $(".error1").slideDown(200).delay(2000).fadeOut(400);
      return;
    } else if (tweetMsgArea.length > 140) {
      $(".error2").slideDown(200);
      return;
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
