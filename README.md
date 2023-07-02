Le grand jour est arrivé, c'est le lancement du projet ! Pour commencer cette aventure passionnante, suivez ces consignes avec entrain :

Mettez-vous en mouvement vers le chemin /src en utilisant la commande suivante :

1. Préparez-vous à accueillir les paquets nécessaires en exécutant cette commande magique :

npm i

2. Pour vous connecter à la base de données AWS RDS et garantir une communication fluide, faites une copie du fichier .env.example et renommez-la en ".env". Remplissez les informations de connexion à votre base de données (hôte, nom d'utilisateur, mot de passe et base de données) avec soin :

RDS_HOSTNAME=
RDS_USERNAME=
RDS_PASSWORD=
RDS_DATABASE=
JWT_KEY=secretkey

3. Maintenant, il est temps de lancer le projet et de le voir prendre vie ! Rendez-vous sur http://localhost:3001/ pour explorer ses fonctionnalités.
APIs à explorer et exemples de requêtes :

Vous pouvez également utiliser POSTMAN pour tester les APIs suivantes et voir ce qu'elles ont dans le ventre :

a. Inscription (POST)
Lien : http://localhost:3001/user/register
Requête :

{
    "email": "test@gmail.com",
    "password": "coumbita",
    "firstName": "coumbito",
    "lastName": "coumbiti"
}

b. Connexion (POST)
Lien : http://localhost:3001/user/login
Requête :

{
    "email": "test@gmail.com",
    "password": "coumbita"
}

Prêt à plonger dans ce monde plein de possibilités ? :-) !
