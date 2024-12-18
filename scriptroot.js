// Fonction pour récupérer les données de l'API et afficher les profils
async function fetchAndDisplayProfiles() {
  const response = await fetch("/api/rankings");
  const profiles = await response.json();
  
  const tbody = document.querySelector("#classementTable tbody");
  tbody.innerHTML = ''; // Effacer le contenu existant

  profiles.forEach((profile, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td><a href="https://www.root-me.org/${profile.pseudo}" target="_blank">${profile.pseudo}</a></td>
      <td>${profile.classement}</td>
      <td>${profile.points}</td>
      <td>${profile.challenges}</td>
      <td>${profile.compromissions}</td>
    `;

    tbody.appendChild(row);
  });
}

// Appeler la fonction pour afficher les données
fetchAndDisplayProfiles();
