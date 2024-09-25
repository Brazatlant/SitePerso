<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collecte des données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Adresse e-mail du destinataire (remplacez par votre adresse)
    $to = "votre-adresse-email@example.com";

    // Sujet de l'e-mail
    $subject = "Contact Form Submission from $name";

    // Corps de l'e-mail
    $body = "Nom: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message\n";

    // En-têtes de l'e-mail
    $headers = "From: $email";

    // Envoi de l'e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Message envoyé avec succès !";
    } else {
        echo "Échec de l'envoi du message.";
    }
} else {
    echo "Méthode de requête non valide.";
}
?>
