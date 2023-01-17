$(document).ready(function() {
	$('#submit').click(function(event) {
		event.preventDefault();
		const message = $('#chatbot-input').val();
		$.ajax({
			type: 'POST',
			url: 'https://number-trivia.onrender.com/chatbot',
			// url: 'http://localhost:3000/chatbot',
			data: {
				message: message
			},
			success: function(response) {
				// $('#chatbot-response').text(response.text);
        let newMessage = $('<div>', {
          class: 'message'
        }).text(response.text);
        let removeButton = $('<button>', {
          class: 'remove-button'
        }).text('Remove');
        newMessage.append(removeButton);
        $('#chat-history').append(newMessage);
      }
		});
	});
});

$(document).on('click', '.remove-button', function() {
	$(this).parent().remove();
});