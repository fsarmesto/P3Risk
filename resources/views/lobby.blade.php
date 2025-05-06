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
            <select id="onlineUsers"><option value="">Select a user</option></select>
            <div id="messages"></div>
            <div id="chat">
                <input autocomplete="off" type="text" id="messageInput" placeholder="Enter your message">
                <button id="sendButton" onclick="sendMessage()">Send</button>
            </div>
        </main>
    </body>
</html>