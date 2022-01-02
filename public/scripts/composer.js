$(document).ready(function() {
  $(window).scroll(function() {
    const scrollHeight = $(this).scrollTop();
    if (scrollHeight > 450) {
      $("#scroll button").show();
    } else {
      $("#scroll button").hide();
    }
  });
  $("#scroll button").click(function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $(".new-tweet").show();
    $("#tweet-text").focus();
  });
});