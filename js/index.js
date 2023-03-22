"use strict";

const chat = {
    author: "Deez Nuts",
    init() {
        this.fetchMessages();
        document.querySelector('#sendButton');
        document.addEventListener('click', this.sendMessage);

        document.getElementById('chatForm').addEventListener('submit', this.sendMessage);
    },

    sendMessage(event) {
        event.preventDefault();

        const messageInput = document.querySelector('#chatInput');
        console.log(messageInput.value);
        let data = {author:"Deez Nuts", message:messageInput.value};

        fetch('https://dev2chat.onrender.com/message', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data),
        })
        .then((res) => {
            console.log("Request Complete!", res);
        });

        chat.fetchMessages();
    },

    fetchMessages() {
        fetch('https://dev2chat.onrender.com/messages')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                chat.renderMessage(data);
            });
    },

    renderMessage(messages) {
        const messageContainer = document.querySelector('#messageContainer');
        messageContainer.innerHTML = '';

        messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('messageItem');

            messageElement.innerHTML = 
            `<div class="messageItem">
            <div class="header">
                <span class="author">${message.author}</span>
                <span class="time">${message.created_at}</span>
            </div>
            <p>
                ${message.message}
            </p>
            </div>`;

            messageContainer.append(messageElement);

        });
    }

};

chat.init();