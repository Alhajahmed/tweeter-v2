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
        <p class="tweet-content"> ${escape(tweetData.content.text)}</p>
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
    $("#tweets-container").empty(); // Clear previous tweets
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
      // Clear previous error message
      // Validate if the tweet is not empty
      if (!tweetContent) {
        $(".error-message").text("Please write a tweet 🐦").slideDown();
      } else if (tweetLength > 140) {
        $(".error-message")
          .text("🛑 Your Tweet exceeds the character limit 🛑")
          .slideDown();
      } else {
        // Send a POST request to the server
        $.post(
          "http://localhost:8080/tweets",
          formData,
          function (data, status) {
            // Clear the form
            $(".error-message").empty().hide();
            // Refetch tweets on Submission
            loadTweet();
            // Clear the textarea
            $("#tweet-text").val("");
            // Reset the counter to 140
            $(".counter").text("140");
          }
        ).fail(function (status, error) {
          $(".error-message")
            .text(
              `Sorry! An error occurred while submitting the form data: ${error}`
            )
            .slideDown();
        });
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
  /**
   * Escapes special characters in a string to prevent cross-site scripting (XSS) attacks.
   * @param {string} str - The input string to escape.
   * @returns {string} - The escaped string.
   */
  const escape = function (str) {
    // Create a new div element
    let div = document.createElement("div");
    // Set the text content of the div to the input string
    div.appendChild(document.createTextNode(str));
    // Return the HTML content of the div, which escapes special characters
    return div.innerHTML;
  };
});
