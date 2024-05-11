console.log("welcome to chat app")
mywebsocket = new WebSocket('ws://localhost:8080');
var username = prompt("Please enter your username: ")
const title = document.getElementById("appTitle")
const message = document.getElementById("message")
const messages = document.getElementById("messages")
const sendButton = document.getElementById("sendButton")
title.innerHTML = title.innerHTML + " ,Hello " + username


mywebsocket.onopen = () => {
    let data = {
        username: username,
        login: true,
    }
    data = JSON.stringify(data);
    mywebsocket.send(data);
    console.log("connected to server")
}

mywebsocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);

    if (data.login) {

        const connectionStatusElement = document.createElement("div");
        connectionStatusElement.classList.add("alert", "alert-success"); // Apply Bootstrap success alert class
        connectionStatusElement.textContent = data.username + " is connected";

        messages.appendChild(connectionStatusElement);
    } else if (data.logout) {
        console.log("disconnected");
        const disconnectionStatusElement = document.createElement("div");
        disconnectionStatusElement.classList.add("alert", "alert-danger");
        disconnectionStatusElement.textContent = data.username + " is disconnected";

        messages.appendChild(disconnectionStatusElement);
    } else {

        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");
        if (data.username !== username) {
            const usernameElement = document.createElement("p");
            usernameElement.textContent = data.username;
            usernameElement.classList.add("username");
            messageContainer.appendChild(usernameElement);
        }
        const messageElement = document.createElement("div");
        messageElement.classList.add("alert", "alert-secondary");
        messageElement.textContent = data.message;
        messageContainer.appendChild(messageElement);
        messages.appendChild(messageContainer);
    }
}



// mywebsocket.onclose = () => {

//     let data = {
//         username: username,
//         logout: true
//     }
//     console.log(data)
//     data = JSON.stringify(data);
//     mywebsocket.send(data);
// }
window.addEventListener('beforeunload', () => {
    const data = {
        username: username,
        logout: true
    };
    mywebsocket.send(JSON.stringify(data));
});


sendButton.addEventListener('click', () => {
    let data = {
        username: username,
        message: message.value
    }
    data = JSON.stringify(data)
    mywebsocket.send(data);
    message.value = ""
})