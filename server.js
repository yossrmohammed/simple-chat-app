const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();

wss.on('connection', (ws) => {
    console.log('Connected to server');

    clients.add(ws);

    ws.on('message', (message, isBinary) => {
        let data = JSON.parse(message)

        data = isBinary ? message : message.toString();
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });

        console.log(`Received message from client: ${data}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});
