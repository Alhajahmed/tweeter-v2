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
