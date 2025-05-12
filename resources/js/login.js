import { ws } from './common.js';

document.addEventListener('DOMContentLoaded', f_main);

const regExUser = /[a-zA-Z][a-z]+/;
const regExPass = /^\w\w*/

function displayErrorMessage(message) {
    const errorMessagesDiv = document.getElementById('errorMessages');
    if (errorMessagesDiv) {
        errorMessagesDiv.textContent = message;
        errorMessagesDiv.style.color = "red";
    } else {
        console.error('Element with ID "errorMessages" not found to display error.');
    }
}

function f_main() {
    let form = document.forms[0];
    form.addEventListener('submit', checkForm);

    ws.onopen = () => {
        console.log('WebSocket connection established with Ratchet server');
        const errorMessagesDiv = document.getElementById('errorMessages');
        if (errorMessagesDiv) {
            errorMessagesDiv.textContent = "Successfully connected to the server!";
            errorMessagesDiv.style.color = "green";
        }
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log('Received message from server (in LOGIN.js):', data);

            if (data.login === 'success') {
                console.log('Login successful!', data.message);
                const errorMessagesDiv = document.getElementById('errorMessages');
                if (errorMessagesDiv) {
                    errorMessagesDiv.textContent = data.message;
                    errorMessagesDiv.style.color = "green";
                }
                const token = data.token;  // Get the token from the server response
                localStorage.setItem('token', token); // Store it
                setTimeout(() => {
                    window.location.href = '/chat';
                }, 1500);
            } else if (data.login === 'error') {
                console.log('Login failed:', data.message);
                displayErrorMessage(data.message);
            }
             else if (data.error === 'Expired token') { // Handle token expiration
                console.warn('Token expired. Redirecting to login.');
                localStorage.removeItem('token');  // Clear the expired token
                displayErrorMessage('Your session has expired. Please log in again.');
                window.location.href = '/login';    // Redirect to login
            }
            
            
        } catch (error) {
            console.error('Error parsing ws message (in LOGIN.js):', error);
        }
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed.');
        const errorMessagesDiv = document.getElementById('errorMessages');
        if (errorMessagesDiv) {
            errorMessagesDiv.textContent = "Connection to the server lost.";
            errorMessagesDiv.style.color = "red";
        }
    };

    ws.onerror = (error) => {
        console.error('ws error (from LOGIN.js):', error);
        const errorMessagesDiv = document.getElementById('errorMessages');
        if (errorMessagesDiv) {
            errorMessagesDiv.textContent = "Error connecting to the server.";
            errorMessagesDiv.style.color = "red";
        }
    };
}

function checkForm(e) {
    e.preventDefault();
    let user = e.target.querySelector('#uName').value;
    let pass = e.target.querySelector('#pWord').value

    if (user.length > 3 && pass.length > 3) {
        if (regExUser.test(user) && regExPass.test(pass)) {
            sendForms(user, pass);
            console.log("Login data sent to server");
        } else {
            displayErrorMessage("Error: Username or password do not meet the minimum complexity criteria");
        }
    } else {
        displayErrorMessage("Error: Username and password must be at least 4 characters long.");
    }
}

function sendForms(user, pass) {
    ws.send(JSON.stringify({
        action: "login",
        user: user,
        password: pass,
    }));
}
