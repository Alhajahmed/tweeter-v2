/**
 * Function that is executed when the DOM is ready.
 * It attaches an event listener to the textarea within the .new-tweet class.
 * The event listener listens for the "input" event, which fires when the user types or inputs text in the textarea.
 * It calculates the character count of the input text and updates the counter accordingly.
 * If the remaining character count is less than 0, it adds the "invalid" class to the counter element to indicate an error.
 * If the remaining character count is 0 or more, it removes the "invalid" class from the counter element.
 */
$(document).ready(function () {
  $(".new-tweet textarea").on("input", function () {
    const charCount = $(this).val().length;
    const counter = $(".counter");
    const remaining = 140 - charCount;
    counter.text(remaining);
    if (remaining < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });
});
