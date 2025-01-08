const express = require('express');
const scraper = require('./scraper');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.post('/scrape', async (req, res) => {
  try {
    console.log("Début du scraping...");
    await scraper.scrapeProfiles();
    console.log("Scraping terminé avec succès.");
    res.status(200).send("Données mises à jour avec succès.");
  } catch (error) {
    console.error("Erreur lors du scraping :", error);
    res.status(500).send("Erreur lors de la mise à jour des données.");
  }
});


app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
