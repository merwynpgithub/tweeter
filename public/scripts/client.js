/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  //slide the form------stretch
  $("nav .tweet").click(function () {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus(); //focus the cursor on the textarea
  });

  const loadTweet = () => {
    $.get('/tweets', (tweets) => {
      $(".error-div").remove();
      renderTweets(tweets);
    })
  };

  //render the tweets from the downloaded JSON 
  const renderTweets = (tweets) => {
    $container = $("#current-tweets");
    $container.empty();
    tweets.forEach(tweet => {
      createTweetElement(tweet);
    });
  };

  //using helper function to prevent XSS Cross Site Scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //generate HTML element for each tweet
  const createTweetElement = (tweet) => {
    const timeStamp = $.timeago(tweet.created_at);
    const tweetElement = `
    <article class="tweet-section">
    <header>
    <div class="profile-name">
    <img src=${tweet.user.avatars} alt=${tweet.user.handle}>
    <h4>${tweet.user.name}</h4>
    </div>
    <h4 class="handle">${tweet.user.handle}</h4>
    </header>
    <div class="message">
    <p>${escape(tweet.content.text)}</p>
    </div>
    <footer class="message-footer">
    <div>${timeStamp}</div>
    <div>
    <i class="fas fa-solid fa-flag"></i>
    <i class="fas fa-solid fa-retweet"></i>
    <i class="fas fa-solid fa-heart"></i>
    </div>
    </footer>
    </article>
    `;
    $("#current-tweets").append(tweetElement);
  };

  loadTweet();



  //create new tweet with form submission
  const form = $(".new-tweet form");

  form.submit(function (e) {
    e.preventDefault();

    const serialData = $(this).serialize();

    const tweetText = serialData.slice(5).replaceAll("%20", " ");
    //Alert if Tweet is longer than 140 characters
    if (tweetText.length > 140) {
      // alert("Please shorten your tweet.");

      //Remove the error div if it exists to add it again
      $(".error-div").remove();

      const errorDiv = `
      <div class="error-div" style="color:red;font-family:sans-serif;">Please reduce your Tweet to 140 characters</div>
      `;
      //add the error div
      $(".new-tweet").prepend(errorDiv);
      $("#tweet-text").focus();
      return false;
    }
    $.post('/tweets', serialData)
      .then((resp) => {
        loadTweet();
      });
    $("#tweet-text").val('');
  });

});


