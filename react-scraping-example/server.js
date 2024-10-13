const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Function to scrape data from a website
async function scrapeWebsite(code) {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/product/${code}`);  // Replace with the target website
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract the desired data, e.g., the first h2 tag
    const scrapedData = $('h2').eq(1).text();
    return scrapedData;
  } catch (error) {
    console.error(error);
  }
}

// API endpoint to serve scraped data
app.get('/api/scrape', async (req, res) => {
  const { code } = req.query; // Extract the 'url' query parameter
  const data = await scrapeWebsite(code);
  res.json({ data });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
