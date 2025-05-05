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

server.post('/contact', (req, res) => {
    const { name, email, meassage } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        console.log('Form submitted:', { name, email, message });
    } catch (error) {
        console.error('Error processing form:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});