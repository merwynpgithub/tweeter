$(document).ready(function() {
  $(window).scroll(function() {
    const scrollHeight = $(this).scrollTop();
    const scrollLength = window.innerHeight * 0.5;
    //do not use absolute values in px as screen sizes can change
    if (scrollHeight > scrollLength) {
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