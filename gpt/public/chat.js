// public/chat.js
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const message = userInput.value.trim();
  if (message !== '') {
    appendMessage('Você: ' + message);
    userInput.value = '';

    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
      const reply = data.reply;
      appendMessage('Chatbot: ' + reply);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}

function appendMessage(message) {
  const p = document.createElement('p');
  p.textContent = message;
  chatLog.appendChild(p);
}