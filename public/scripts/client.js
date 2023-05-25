/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * jQuery ready event handler
 * It is executed when the DOM is fully loaded and ready for manipulation
 */
$(document).ready(function () {
  // Sample tweet data array
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  /**
   * Function to create a tweet element based on tweet data
   * @param {object} tweetData - The tweet data object
   * @returns {string} - The HTML markup for the tweet element
   */
  const createTweetElement = function (tweetData) {
    const $tweet = `
    <article class="tweet">
      <header>
        <div class="user-display">
          <img
            id="user-avatar"
            src=${tweetData.user.avatars}
            alt="User Avatar"
          />
          <h3>${tweetData.user.name}</h3>
        </div>
        <div>
          <p>${tweetData.user.handle}</p>
        </div>
      </header>
        <p class="tweet-content"> ${tweetData.content.text}</p>
      <footer>
        <div class="tweet-time">
          <i class="fas fa-clock"></i>
            <span>${timeago.format(tweetData.created_at)}</span>
        </div>
        <div class="tweet-icons">
          <i class="fas fa-reply"></i>
            <span>Reply</span>
          <i class="fas fa-retweet"></i>
            <span>Retweet</span>
          <i class="fas fa-heart"></i>
            <span>Like</span>
        </div>
      </footer>
    </article>`;
    return $tweet;
  };

  /**
   * Function to render tweets by appending them to the #tweets-container
   * @param {array} tweets - Array of tweet objects
   */
  const renderTweets = function (tweets) {
    for (const tweetData of tweets) {
      const $tweet = createTweetElement(tweetData);
      $("#tweets-container").append($tweet);
    }
  };

  // Call the renderTweets function with the sample data to display the tweets
  renderTweets(data);
});
