$(document).ready(function() {
  $(".message-box").keyup(function() {
    const maxChar = 140;
    let character =  $(this).val().length;
    character = maxChar - character;
    $(".counter").text(character);
  
  if ($(this).val().character >= maxChar) {
    $(".counter").addClass("red"); {
    }
  }
  });
});

// var content;
// $('textarea').on('keyup', function(){
//     var letters = $(this).val().length;
//     $('#myLetterCount').text(301-letters+" letters left");
//     // limit message
//     if(letters>=301){
//         $(this).val(content);
//         alert('no more than 300 letters, please!');
//     } else {    
//         content = $(this).val();
//     }
// });
