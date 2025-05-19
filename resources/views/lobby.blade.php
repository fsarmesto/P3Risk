<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>LOBBY</title>
        <script>
            // Load all img urls.

            const sword = "{{ asset('build/assets/sword_selectorNOBG.png') }}";
        </script>
        @vite(['resources/css/lobby.css', 'resources/js/lobby.js', 'resources/js/lobby-dom.js'])
    </head>
    <body>
        <h1>Welcome to <br><img src="{{ asset('build/assets/RISK_NBG.png') }}" /></h1>
        <main id="app">
        <div id="menu">
            <div class="b-container">
                <button class="gbutton" tabindex="0">Start a new game</button>
            </div>
            <div class="b-container">
                <button class="gbutton" tabindex="0">Browse current games</button>
            </div>
            <div class="b-container">
                <button class="gbutton" tabindex="0" onclick="window.location.href=`https://www.wikihow.com/Play-Risk`">How to play</button>
            </div>
            <div class="b-container">
                <button class="gbutton" id="l-out" tabindex="0">Log out</button>
            </div>
        </div>
            
            <div id="messages">
                <button id="close-msg">⬆</button>
            </div>
            <div id="chat">
                <div id="messageText">
                    <h3>Chat</h3>
                    <input autocomplete="off" type="text" id="messageInput" placeholder="Enter your message">
                    <button id="sendButton" onclick="sendMessage()">Send</button>
                </div>
                <div id="chat-log"><u>Here you will see your messages...</u></div>
                <select id="onlineUsers"><option value="">Select a user</option></select>
            </div>
        </main>
    </body>
</html>