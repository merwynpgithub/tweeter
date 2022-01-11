$(document).ready(function() {
  //do not use change event
  $("#tweet-text").on('input', function() {
    const textLimit = 140 - this.value.length;
    $(".new-tweet div output").html(textLimit);
    if (textLimit < 0) {
      $(".new-tweet div output").css("color", "red");
    } else {
      $(".new-tweet div output").css("color", "#545149");
    }
  });
});