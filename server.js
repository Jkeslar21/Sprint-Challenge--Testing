const express = require('express');
const server = express();

// Middleware
server.use(express.json());

const games = [
    {id: 1, title: 'Donkey Kong Country', genre: 'Platform', releaseYear: 1994},
    {id: 2, title: 'Ms. Pac-Man', genre: 'Arcade', releaseYear: 1981},
    {id: 3, title: 'Kingdom Hearts', genre: 'Action', releaseYear: 2002},
    {id: 4, title: 'Guitar Hero II', genre: 'Musical', releaseYear: 2006},
    {id: 5, title: 'Mario Kart', genre: 'Racing', releaseYear: 1992},
]

server.get('/games', async (req, res) => {
    if (games.length !== 0) {
        res.status(200).json(games);
    } else {
        res.status(204).json([]);
    }
});

server.post("/games", (req, res) => {
    const { id, title, genre } = req.body;
    if (!id || !title || !genre) {
      res.status(422).json({ error: 'Please Provide: Id, Title, and Genre'});
    } else {
      res.status(201).json(req.body);
    }
  });
  
module.exports = server;