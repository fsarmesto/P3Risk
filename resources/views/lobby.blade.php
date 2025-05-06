<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Chat</title>
        @vite(['resources/css/lobby.css', 'resources/js/lobby.js'])
    </head>
    <body>
        <h1>Welcome to RISK!</h1>
        <main id="app">
            
            <div id="messages"></div>
            <div id="chat">
                <div id="messageText">
                    <h3>Chat</h3>
                    <input autocomplete="off" type="text" id="messageInput" placeholder="Enter your message">
                    <button id="sendButton" onclick="sendMessage()">Send</button>
                </div>
                <select id="onlineUsers"><option value="">Select a user</option></select>
            </div>
        </main>
    </body>
</html>