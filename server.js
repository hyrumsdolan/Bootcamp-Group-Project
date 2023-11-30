require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/data', async (req, res) => {
  try {
    const response = await axios.get('YOUR_API_URL', {
      params: req.body,
      headers: {'Authorization': `Bearer ${process.env.API_KEY}`}
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
