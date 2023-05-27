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
      $("#tweets-container").prepend($tweet);
    }
  };

  /**
   * Event handler for form submission
   * Prevents the default form submission behavior, serializes the form data,
   * and sends a POST request to the server.
   */
  const submitTweet = function () {
    $("form").on("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Serialize the form data
      const formData = $(this).serialize();
      // Get the character count of the tweet content
      const tweetContent = $("#tweet-text").val();
      const tweetLength = tweetContent.length;
      // Validate if the tweet is not empty
      if (!tweetContent) {
        alert("Please write a tweet");
      } else if (tweetLength > 140) {
        alert("Your Tweet exceeds the character limit");
      } else {
        // Send a POST request to the server
        $.post(
          "http://localhost:8080/tweets",
          formData,
          function (data, status) {
            // Refetch tweets on Submission
            loadTweet();
          }
        );
      }
    });
  };
  submitTweet();

  /**
   * Loads tweets from the server by making a GET request to the specified URL.
   * Renders the tweets on success.
   */
  const loadTweet = function () {
    $.get("http://localhost:8080/tweets", function (data, status) {
      console.log(
        "Form data submitted successfully. Data:",
        data,
        "Status:",
        status
      );
      // Call the renderTweets function to display the tweets
      renderTweets(data);
    });
  };
  loadTweet();
});
