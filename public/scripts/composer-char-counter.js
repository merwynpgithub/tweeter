$(document).ready(function() {
  //do not use change event
  $("#tweet-text").keyup(function() {
    const textLimit = 140 - this.value.length;
    $(".new-tweet div output").html(textLimit);
    if (textLimit < 0) {
      $(".new-tweet div output").css("color", "red");
    }
  });
});