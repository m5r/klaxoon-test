# Test technique - Klaxoon

## Instructions

Cet exercice a pour but d’évaluer vos compétences en JS. Vous devrez réaliser une application de gestion de bookmarks avec React et l'API des Hooks (https://fr.reactjs.org/docs/hooks-reference.html).

L'utilisation de Typescript est également un pré-requis.

Vous implémenterez l'ajout de deux types de liens :
* vidéo (provenant de Vimeo)
* photo (provenant de Flickr)

Les propriétés communes d’un lien référencé sont :
* URL
* titre
* auteur
* date d'ajout

Les liens de type video auront les propriétés spécifiques suivantes :
* largeur
* hauteur
* durée

Les liens de type photo devront avoir en plus les propriétés :
* largeur
* hauteur

Il est possible d’avoir des mots-clés pour chaque lien référencé.

La récupération des propriétés d’un lien référencé sont obtenues en utilisant l'API https://noembed.com/. 

Pour visualiser et gérer ses liens référencés, l’utilisateur aura une vue principale sous forme de liste paginée avec un bouton d’ajout. 

Chaque ligne du tableau doit avoir les informations communes et des liens pour modifier ou supprimer le lien.

La page de modification du lien comporte un formulaire pour ajouter, modifier et supprimer les mots clés associé au lien.

=> Le livrable attendu est l’application sous forme de repository git ou package zip incluant les instructions d’installation. 

Il n’est pas demandé de s’attarder sur l’aspect graphique de l’application.
