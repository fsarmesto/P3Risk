const websocket = new WebSocket('ws://169.254.157.182:8090');

console.log("WebSocket script loaded (Ratchet)");

websocket.onopen = () => {
    websocket.send(JSON.stringify({
        action: "login", // CAMBIAR A CHECK LOCALSTORAGE
        user: "Puru",
        password: "1234",
    }));
    console.log("Test");
    console.log('WebSocket connection established with Ratchet server.');
};

websocket.onmessage = (event) => {
    let svmsg = document.getElementById('messages');
    let chatlog = document.getElementById('chat-log');
    try {
        const data = JSON.parse(event.data);
        console.log('Received message from server:', data);

        if (data.online_users) {
            console.log('Online Users:', data.online_users);
            const onlineUsers = data.online_users;
            const onlineUsersListElement = document.getElementById('onlineUsers'); // Assuming you have a <ul> with this ID

            if (onlineUsersListElement) {
                onlineUsersListElement.innerHTML = ''; // Clear previous list
                const defaultOption = document.createElement('option');
                defaultOption.value = ''; // Set a default empty value
                defaultOption.textContent = 'Select a recipient';
                onlineUsersListElement.appendChild(defaultOption);
            
                for (const resourceId in onlineUsers) {
                    if (onlineUsers.hasOwnProperty(resourceId)) {
                        const userId = onlineUsers[resourceId];
                        console.log(`Resource ID: ${resourceId}, User ID: ${userId}`);
            
                        const userItem = document.createElement('option');
                        userItem.value = resourceId; // Set the resourceId as the value
                        userItem.textContent = `User ID: ${userId} (Connection ID: ${resourceId})`;
                        onlineUsersListElement.appendChild(userItem);
                    }
                }
            } else {
                console.warn('Element with ID "onlineUsers" not found to display user list.');
            }
        } else if (data.message) {
            console.log('Server Message:', data.message);
            const messageElement = document.createElement('span');
            messageElement.textContent = `Server: ${data.message}`;
            svmsg.appendChild(messageElement);
        } else if (data.offline_user) {
            console.log('User Offline:', data.offline_user);
            const offlineMessage = document.createElement('span');
            offlineMessage.textContent = `User ${data.offline_user} disconnected.`;
            svmsg.appendChild(offlineMessage);
        } else if (data.msg && data.from_user_id) {
            const privateMessageElement = document.createElement('span');
            privateMessageElement.style.color = "lavender";
            privateMessageElement.textContent = `Private message from ${data.from_user_id}: ${data.msg}`;
            chatlog.appendChild(privateMessageElement);
        } else if (data.error) {
            console.error('Server Error:', data.error);
            const errorElement = document.createElement('span');
            errorElement.classList.add('error');
            errorElement.textContent = `Error: ${data.error} (To: ${data.to})`;
            svmsg.appendChild(errorElement);
        } else if (data.type === 'chat' && data.from_user_id && data.message) {
            // Handle broadcast chat messages
            let chatMessageElement = document.createElement('span');
            chatMessageElement.style.color = "lavender";
            chatMessageElement.textContent = `${data.from_user_id}: ${data.message}`;
            chatlog.appendChild(chatMessageElement);
        }
        // ... handle other potential message types
    } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        console.log('Raw message:', event.data);
    }
};

websocket.onclose = () => {
    console.log('WebSocket connection with Ratchet server closed.');
    // You might want to implement reconnection logic here
    // setTimeout(() => { websocket = new WebSocket('ws://169.254.157.182:8090'); }, 5000);
};

websocket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

window.sendMessage = function() {
    const messages = document.getElementById("messages");
    const messageInput = document.getElementById('messageInput');
    const recipientSelect = document.getElementById('onlineUsers');
    const message = messageInput.value;
    const recipientId = recipientSelect.value; // This will directly get the resourceId

    if (websocket.readyState === WebSocket.OPEN && message.trim() !== '' && recipientId) {
        websocket.send(JSON.stringify({
            action: "message",
            to: recipientId,
            content: message,
        }));
        messageInput.value = '';

        let chatMessageElement = document.createElement('span');

        chatMessageElement.textContent = "Puru: " + message;

        messages.appendChild(chatMessageElement);
        
        console.log(`Mensaje privado enviado al Connection ID: ${recipientId}`);
    } else if (!recipientId) {
        alert('Please select a recipient from the online users list.');
    } else if (message.trim() === '') {
        alert('Please enter a message.');
    }
};