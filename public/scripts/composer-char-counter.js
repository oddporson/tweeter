$(document).ready(function() {
  $(".message-box").keyup(function() {
    const maxChar = 140;
    let charCount =  $(this).val().length;
    let remainingChar = maxChar - charCount;
    $(".counter").text(remainingChar);

    if (remainingChar < 0) {
      $(".counter").addClass("red");
    } else {
      $(".counter").removeClass("red");
    }
  });
});
