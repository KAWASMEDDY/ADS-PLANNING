// Réglages de connexion à la base de données (Supabase).
// Ces deux valeurs se trouvent dans Supabase : Project Settings > API.
// La clé "anon" est publique par conception : ce sont les règles de sécurité de la base qui protègent les données.
window.ADS_CONFIG = {
  SUPABASE_URL: "https://VOTRE-PROJET.supabase.co",
  SUPABASE_ANON_KEY: "VOTRE-CLE-ANON",
  // Adresse du compte "équipe" partagé par les salariés (créé dans Supabase, voir le guide).
  // Son mot de passe est le code d'équipe : il n'est écrit nulle part dans le site.
  TEAM_EMAIL: "equipe@planning-ads.fr"
};
