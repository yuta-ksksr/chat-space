$(function(){
  function buildHTML(message) {
    var image = (message.image.url) ? `<img class= "lower-message__image" src="${message.image.url}" >` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
  return html;
   }
  
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $(document).scrollTop($(document).height());
    })
    .fail(function(){
      alert('メッセージを入力してください。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
  
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id"); 
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        // $(document).scrollTop($(document).height());
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      })
      .fail(function() {
        alert('自動更新エラー');
      });
    }
};
  setInterval(reloadMessages, 5000);
}); 