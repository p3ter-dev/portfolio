const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const server = express();
const port = 3000;
const path = require('path');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static(path.join(__dirname)));
server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
    res.sendFile(path.join('index.html'), (error) => {
        if(error) {
            console.error('Error sending file:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

server.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                message
            }
        });
        res.status(200).render('feedback',{ name: 
            req.body.name
        });
        console.log('contact saved: ', newMessage);
    } catch (error) {
        console.error('Error processing form:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});