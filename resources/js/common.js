// common.js
export const ws = new WebSocket('ws://169.254.157.182:8090');

console.log("WebSocket script loaded (Common)");

ws.onopen = () => {
    ws.send(JSON.stringify({
      action: "authenticate",
      token: localStorage.getItem('token'),
    }));
    console.log('WebSocket connection opened and authentication token sent.');
};