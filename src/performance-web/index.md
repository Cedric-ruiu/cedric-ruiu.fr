---
layout: service
title: "Performance web : des sites rapides sur mobile | Cédric Ruiu"
description: "Des sites légers qui s'affichent vite, même en 4G : ma spécialité depuis plus de dix ans. Audit de performance et conseils pour accélérer votre site."
permalink: /performance-web/
service: "performance"
eyebrow: "Performance web"
heading: "Performance web : un site rapide, surtout sur mobile"
lead: >-
  Un site rapide s'affiche vite, réagit tout de suite et ne saute pas pendant le
  chargement, même sur un téléphone en 4G moyenne. C'est ma spécialité depuis
  plus de dix ans : chaque site que je livre est conçu léger dès le départ, et
  je peux mesurer votre site actuel pour trouver ce qui le ralentit.
# Home page, measured with tmp/measure/lighthouse.sh (median of three, mobile)
# and tmp/measure/pages.mjs (on the wire, KiB). Re-measure before editing.
# `median` is the median mobile page of the Web Almanac 2024, in kB.
vitals:
  measured: "3 octobre 2026"
  lcp: "1,6 s"
  cls: "0"
  tbt: "0 ms"
weight:
  measured: "3 octobre 2026"
  site: 94.8
  median: 2311
faq:
  - question: "Comment savoir si mon site est lent ?"
    answer: >-
      Rendez-vous sur <a href="https://pagespeed.web.dev/" class="font-medium text-ocean underline underline-offset-2">PageSpeed
      Insights</a>, l'outil gratuit de Google, et saisissez l'adresse de votre
      site. Regardez d'abord l'onglet Mobile, puis le bloc du haut : quand
      Google dispose d'assez de données, il reflète l'expérience de vos vrais
      visiteurs. Si les trois indicateurs sont au vert, votre site est rapide ;
      sinon, il y a de la marge.
  - question: "Un bon score Lighthouse suffit-il ?"
    answer: >-
      Non. Lighthouse mesure votre page en laboratoire, sur un appareil simulé :
      c'est très utile pour trouver les problèmes, mais ce n'est pas ce que
      vivent vos visiteurs. Google se fonde sur les mesures réelles, recueillies
      auprès des internautes qui utilisent Chrome. Un bon score est un bon
      signe, pas une garantie.
  - question: "Faut-il refaire mon site pour qu'il soit rapide ?"
    answer: >-
      Pas forcément. Les gains les plus importants viennent souvent de quelques
      corrections ciblées : des images trop lourdes, une police mal chargée, un
      script inutile. L'audit sert justement à distinguer ce qui se corrige
      simplement de ce qui demanderait une refonte.
cta:
  title: "Et si votre site allait plus vite ?"
  text: >-
    Envoyez-moi son adresse : je vous réponds sous 48 heures, avec un premier
    avis sur ce qui le ralentit.
---

## Pourquoi la vitesse compte

Un visiteur qui attend devant une page blanche ne reste pas longtemps : il
revient à Google et choisit le résultat suivant — souvent un concurrent. Sur
téléphone, avec une connexion moyenne, chaque élément superflu se paie en
secondes.

La vitesse compte aussi pour Google, qui mesure l'expérience réelle de vos
visiteurs et en tient compte dans son classement. Soyons honnêtes : c'est un
critère parmi beaucoup d'autres, et un site rapide au contenu faible ne passera
pas devant un site plus lent qui répond mieux à la question. Mais à contenu
comparable, l'expérience fait la différence — et un visiteur qui n'attend pas
a tout le temps de vous découvrir.

## Les trois mesures de Google

Google résume l'expérience d'une page en trois indicateurs, les **Core Web
Vitals**. Ils sont relevés sur les visites réelles de votre site, et une page
est jugée bonne lorsque les trois seuils sont tenus pour au moins 75 % des
visites.

<div class="overflow-x-auto">

| Mesure | Ce qu'elle observe | Bon résultat |
|---|---|---|
| **LCP** — affichage | Le temps avant que le contenu principal de la page soit visible | 2,5 secondes ou moins |
| **INP** — réactivité | Le délai entre un geste (toucher, clic) et la réaction de la page | 200 millisecondes ou moins |
| **CLS** — stabilité | Les sauts de mise en page pendant le chargement, ceux qui font toucher le mauvais bouton | 0,1 ou moins |

</div>

## La preuve par ce site

Le site que vous consultez applique ce que je vous propose. Voici ces trois
mesures, relevées sur sa page d'accueil avec Lighthouse, l'outil d'analyse de
Google, en simulant un téléphone moyen sur une connexion 4G lente :

{% include "partials/vitals-proof.njk" %}

La réactivité réelle (INP) ne se mesure que sur de vraies visites, et Google ne
publie ces données qu'au-delà d'un certain trafic. En laboratoire, son meilleur
indicateur est le temps pendant lequel la page est occupée et ne peut pas
répondre à vos gestes : ici, zéro.

Le secret de ces résultats, c'est la légèreté. Pour afficher une page, un
téléphone doit d'abord la télécharger : textes, images, polices de caractères,
scripts. Moins il y a à télécharger, plus la page s'affiche vite. Une page web
moyenne représente environ 2,3 Mo de données sur mobile ; la page d'accueil de
ce site, moins de 0,1 Mo — vingt-quatre fois moins, et moins qu'une seule photo
prise avec un téléphone.

{% include "partials/weight-compare.njk" %}

Son [code source est public]({{ site.repository }}) : chaque choix y est
documenté et mesuré.

## Un site léger, c'est aussi un site plus sobre

Le numérique représente environ 4 % de l'empreinte carbone de la France, selon
[l'ADEME et l'Arcep](https://www.arcep.fr/la-regulation/grands-dossiers-thematiques-transverses/lempreinte-environnementale-du-numerique.html).
La moitié de cet impact vient des appareils eux-mêmes, et d'abord de leur
fabrication.

Un site internet ne changera pas ces chiffres à lui seul, soyons clairs. Mais
sa conception compte, à deux niveaux :

- **moins de données à transporter et à traiter** — une page légère sollicite
  moins les serveurs, les réseaux et le processeur du téléphone, et consomme
  donc moins d'énergie, à chaque visite ;
- **des appareils qui durent plus longtemps** — un site léger reste fluide sur
  un téléphone ancien. Ne pas pousser vos visiteurs à changer d'appareil, c'est
  agir sur la part la plus lourde de l'empreinte du numérique.

C'est ce qu'on appelle l'écoconception : se demander, pour chaque
fonctionnalité et chaque fichier, s'il est vraiment utile. Les bonnes
pratiques de performance et celles d'écoconception se recouvrent presque
entièrement — un site plus rapide est, presque toujours, un site plus sobre.

## Mes principes

- **Moins, d'abord.** La ressource la plus rapide est celle qu'on ne charge
  pas : pas de bibliothèque pour trois lignes de code, pas d'extension pour une
  fonction simple.
- **Des images au bon format et à la bonne taille.** Formats modernes comme
  l'AVIF et le WebP, dimensions adaptées à chaque écran, chargement différé
  pour ce qui est hors de vue.
- **Des polices maîtrisées.** Hébergées avec le site, et allégées aux seuls
  caractères utiles.
- **Pas de dépendance superflue à des services tiers.** Chaque script externe
  est une requête de plus, souvent lente, sur laquelle vous n'avez aucune prise.
- **Une mise en page qui ne bouge pas.** Chaque image a sa place réservée avant
  d'arriver : rien ne saute pendant le chargement.
- **Mesurer dans des conditions réalistes.** Les tests se font en simulant un
  téléphone moyen et une connexion 4G médiocre, pas sur l'ordinateur du
  développeur.

## Votre site est lent ? L'audit de performance

Je peux mesurer votre site et vous dire précisément ce qui le ralentit.
L'analyse part des données réelles de vos visiteurs quand Google en dispose,
complétées par des mesures page par page. Vous recevez, comme pour
l'[audit SEO](/audit-seo/), un rapport d'actions hiérarchisé : les corrections
qui feront gagner le plus de temps d'affichage, dans l'ordre, expliquées pas à
pas. Et si vous le souhaitez, je les applique moi-même.

La performance fait d'ailleurs partie de chaque audit SEO que je réalise : un
site lent sur mobile part avec un handicap.

## Onze ans de spécialisation

Avant de m'installer en indépendant, j'ai passé onze ans comme développeur
frontend senior et manager sur des sites grand public de codes promo et de
cashback. J'y avais la charge de toute l'architecture frontend, de
l'organisation des feuilles de style à l'amélioration continue des
performances.

Cette exigence s'applique aujourd'hui à chaque site que je livre, du site
vitrine de cinq pages à l'application web.
