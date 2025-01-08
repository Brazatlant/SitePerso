const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeProfiles() {
  const profileUrls = [
    "https://www.root-me.org/Feroz-950161?lang=fr",
    "https://www.root-me.org/cocaclope?lang=fr#91187f7b506ddbf030c388717990a977",
    "https://www.root-me.org/noyza_hamilton44-950166?lang=fr#0a5272a94c4f218e29efbe5f0ed76a02",
    "https://www.root-me.org/Yanis-950151?lang=fr#599a9d3b8af799af655b48e2665b2109",
    "https://www.root-me.org/Mars144hz",
    "https://www.root-me.org/Braz-897646?lang=fr#f2049e8c07bcad72052aa6d0adcc616a",
    "https://www.root-me.org/tyngaa?lang=fr#3be54b61c68639649300b24f0365bf61",
    "https://www.root-me.org/Yaoul-950150?lang=fr",
    "https://www.root-me.org/mirage-950160?lang=fr#b5e544052c89ff58a63c48d7055aa097",
    "https://www.root-me.org/Ylhan?lang=fr#5db6056c0df0496157548de69b5e49af",
    "https://www.root-me.org/Pierre-950162?lang=fr#51632e875842df681222bb41e2ef227a",
    "https://www.root-me.org/vZencowW?lang=fr",
    "https://www.root-me.org/AlexisCK?lang=fr#ffdb61dfa27078d753b7fbceaa7b61f5",
    "https://www.root-me.org/Pulsation?lang=fr#c622e6af0d17d4f6ae8a7f31d8489795",
    "https://www.root-me.org/Lois-950158?lang=fr#8222a4db69783767a921a5b6985020c2",
    "https://www.root-me.org/Alexandre-950164?lang=fr#5b6e7618804ae5574e08a7b5a9897e97",
    "https://www.root-me.org/Soinx?lang=fr#cd80656139c416bb10dc2385c4dbd996",
    "https://www.root-me.org/Zohrair?lang=fr",
    "https://www.root-me.org/Antonio-950153?lang=fr#76559f0ff0d3a05b247cd85641c84208"
  ];

  const delay = (time) => new Promise(resolve => setTimeout(resolve, time));
  const profiles = [];
  const maxRequestsPerSession = 4; // Limiter à 5 requêtes par session

  try {
    console.log("Lancement du navigateur...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (let i = 0; i < profileUrls.length; i += maxRequestsPerSession) {
      const sessionUrls = profileUrls.slice(i, i + maxRequestsPerSession);

      for (const profileUrl of sessionUrls) {
        try {
          console.log(`Accès à l'URL : ${profileUrl}`);
          await page.goto(profileUrl, { waitUntil: "domcontentloaded" });

          // Utilisation de setTimeout pour attendre
          await delay(2000); // Attendre 2 secondes entre les requêtes

          const data = await page.evaluate(() => {
            const pseudo = document.querySelector("h1[itemprop='givenName'] span.txt_6forum")?.textContent.trim() || "Inconnu";
            const classement = document.querySelector(".medium-6.columns .row .columns:nth-child(1) h3")?.textContent.trim() || "N/A";
            const points = document.querySelector(".medium-6.columns .row .columns:nth-child(2) h3")?.textContent.trim() || "N/A";
            const challenges = document.querySelector(".medium-6.columns .row .columns:nth-child(3) h3")?.textContent.trim() || "N/A";
            const compromissions = document.querySelector(".medium-6.columns .row .columns:nth-child(4) h3")?.textContent.trim() || "N/A";

            return { pseudo, classement, points, challenges, compromissions };
          });

          profiles.push(data);
          console.log(`Données récupérées pour le profil : ${data.pseudo}`);
        } catch (error) {
          console.error(`Erreur pour l'URL : ${profileUrl}`, error);
        }
      }

      console.log(`Session terminée, attente avant la prochaine session...`);
      await delay(5000); // Attendre 5 secondes entre les sessions
    }

    console.log("Profils récupérés : ", profiles);

    profiles.sort((a, b) => {
      const pointsA = parseInt(a.points.replace(/\D/g, ''), 10) || 0;
      const pointsB = parseInt(b.points.replace(/\D/g, ''), 10) || 0;
      return pointsB - pointsA;
    });

    console.log("Fermeture du navigateur...");
    await browser.close();
    console.log("Navigation fermée, enregistrement des données...");

    fs.writeFileSync('data.json', JSON.stringify({ profiles }, null, 2));
    console.log("Données mises à jour dans data.json");
  } catch (error) {
    console.error("Erreur lors du lancement du navigateur ou de l'accès à la page :", error);
  }
}

scrapeProfiles()