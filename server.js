const express = require('express');
const server = express();
const port = 3000;
const path = require('path');

server.use(express.static(path.join(__dirname)));
server.use(express.static(path.join(__dirname, 'public')));
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

server.get('/', (req, res) => {
    res.sendFile(path.join('index.html'), (error) => {
        if(error) {
            console.error('Error sending file:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});