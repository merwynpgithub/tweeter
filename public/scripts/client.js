/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const loadTweet = () => {
    $.get('/tweets', (tweets) => {
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
  //generate HTML element for each tweet
  const createTweetElement = (tweet) => {
    const tweetElement = `
    <article class="tweet-section">
      <header>
        <div class="profile-name">
          <img src=${tweet.user.avatars} alt=${tweet.user.handle}>
          <h4>${tweet.user.name}</h4>
        </div>
        <h4 class="handle">${tweet.user.handle}</h4>
      </header>
      <section class="message">
      ${tweet.content.text}
      </section>
      <footer class="message-footer">
        <div>${tweet.created_at} ago</div>
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
  const form  = $(".new-tweet form");
  form.submit(function(e) {
    e.preventDefault();

    //Alert if Tweet is empty
    if (!$("#tweet-text").val()) {
      alert("Tweet message cannot be empty! Please add a message");
      return;
    }
    
    const serialData = $(this).serialize();
    $.post('/tweets', serialData)
    .then((resp) => {
      console.log(resp);
      loadTweet();

    });
    $("#tweet-text").val('');
  });

});


