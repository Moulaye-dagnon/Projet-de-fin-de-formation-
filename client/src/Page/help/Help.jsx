export default function Help() {
  return (
    <div className="overflow-auto h-screen ">
      <h1 className="text-center font-bold text-2 sm:text-sm md:text-md lg:text-2xl">
        🔰 Guide d’utilisation de l’application
      </h1>
      <p>
        Bienvenue sur notre plateforme de gestion de projets ! Ce guide vous
        aidera à bien démarrer et à profiter pleinement des fonctionnalités
        disponibles.
      </p>

      <section className="mt-6">
        <h2 className="font-bold">🏠 1. Page d’accueil</h2>
        <p>Depuis la landing page, vous pouvez :</p>
        <ul>
          <li>Découvrir les fonctionnalités principales</li>
          <li>
            Vous <strong>inscrire</strong> ou vous <strong>connecter</strong>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-bold">👤 2. Connexion & Inscription</h2>
        <ul>
          <li>Remplissez le formulaire d’inscription avec vos informations</li>
          <li>
            Si vous êtes invité à un projet, vous recevrez un e-mail avec un
            lien d’accès
          </li>
          <li>
            En cas d’oubli du mot de passe, cliquez sur{" "}
            <em>“Mot de passe oublié”</em>
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-bold">📊 3. Tableau de bord</h2>
        <p>Votre dashboard affiche :</p>
        <ul>
          <li>Vos projets</li>
          <li>Les tâches par statut : À faire, En cours, Terminées</li>
          <li>Le pourcentage de progression</li>
          <li>Le résumé de vos tâches personnelles</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-bold">🧩 4. Gestion des tâches</h2>
        <ul>
          <li>Création, modification, suppression de tâches (admin)</li>
          <li>Attribution d’une tâche à un membre</li>
          <li>Changement du statut par le membre responsable</li>
          <li>Statistiques des tâches : terminées, en cours, à faire</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-bold">👥 5. Gestion des membres</h2>
        <ul>
          <li>Voir la liste des membres du projet</li>
          <li>Ajouter/supprimer un membre (admin)</li>
          <li>Donner des droits admin à un autre membre</li>
          <li>Envoi d’invitation par e-mail</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-bold">📄 6. Profils & Activité</h2>
        <ul>
          <li>
            Consulter le profil d’un membre : nombre de tâches, dernières
            activités
          </li>
          <li>Modifier son propre profil</li>
          <li>Se déconnecter</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-bold">✉️ 7. Notifications</h2>
        <p>Les utilisateurs reçoivent des notifications pour :</p>
        <ul>
          <li>L’attribution d’une tâche</li>
          <li>L’ajout à un projet</li>
          <li>Les mises à jour de statut</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-bold">🛟 8. Assistance</h2>
        <ul>
          <li>
            Utilisez la fonction "mot de passe oublié" en cas de souci de
            connexion
          </li>
          <li>Contactez l’admin ou le support pour tout bug ou question</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-bold">🎯 9. Bonnes pratiques</h2>
        <ul>
          <li>Gardez votre profil à jour</li>
          <li>Mettez à jour vos tâches régulièrement</li>
          <li>Consultez votre tableau de bord chaque jour</li>
          <li>Communiquez avec vos coéquipiers</li>
        </ul>
      </section>

      <p>
        <strong>Merci d’utiliser notre application !</strong>
        <br />
        Nous espérons qu’elle vous aidera à mieux organiser vos projets et à
        travailler plus efficacement en équipe.
      </p>
    </div>
  );
}
