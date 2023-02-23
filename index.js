const express = require('express');
const https = require('https');

const app = express();

app.get('/gists/:username', (req, res) => {
    const username = req.params.username;
    const url = `https://api.github.com/users/${username}/gists`;
  
    https.get(url, (response) => {
      let data = '';
  
      if (response.statusCode !== 200) {
        res.status(response.statusCode).json({ error: `Failed to retrieve gists for user ${username}` });
        return;
      }
  
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        try {
          const gists = JSON.parse(data);
          res.json(gists);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
    }).on('error', (error) => {
      res.status(500).json({ error: error.message });
    });
  });


app.get('/gists/:id', (req, res) => {
  const gistId = req.params.id;
  const url = `https://api.github.com/gists/${gistId}`;

  https.get(url, (response) => {
    let data = '';

    if (response.statusCode !== 200) {
      res.status(response.statusCode).json({ error: `Failed to retrieve gist with ID ${gistId}` });
      return;
    }

    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      try {
        const gist = JSON.parse(data);
        res.json(gist);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }).on('error', (error) => {
    res.status(500).json({ error: error.message });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
