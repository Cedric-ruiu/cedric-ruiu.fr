---
layout: page
title: "Mentions légales — cedric-ruiu.fr"
description: "Éditeur, hébergeur, propriété intellectuelle, absence de cookies et traitement des données du formulaire de contact du site cedric-ruiu.fr."
permalink: /mentions-legales/
eyebrow: "Informations légales"
heading: "Mentions légales"
lead: "Qui édite ce site, qui l'héberge, et ce qu'il advient des informations que vous y laissez."
---

## Éditeur du site

Ce site est édité à titre personnel par :

**{{ site.legal.publisher }}**, {{ site.jobTitle }}<br>
{{ site.legal.address.street }}<br>
{{ site.legal.address.postalCode }} {{ site.legal.address.city }}, {{ site.legal.address.country }}

- Email : [{{ site.email }}](mailto:{{ site.email }})
- Téléphone : [{{ site.phone | phoneDisplay }}](tel:{{ site.phone | phoneE164 }})
{% if site.legal.statut %}- Statut : {{ site.legal.statut }}
{% endif %}{% if site.legal.siret %}- SIRET : {{ site.legal.siret }}
{% endif %}{% if site.legal.tva %}- Numéro de TVA intracommunautaire : {{ site.legal.tva }}
{% endif %}

## Directeur de la publication

{{ site.legal.publisher }}.

## Hébergement

Le site est hébergé par :

**{{ site.legal.host.name }}**<br>
{{ site.legal.host.address }}<br>
[{{ site.legal.host.url }}]({{ site.legal.host.url }})

## Propriété intellectuelle

Les textes, les photographies, le logo et l'identité visuelle de ce site sont la
propriété exclusive de {{ site.legal.publisher }}. Toute reproduction ou
réutilisation, totale ou partielle, est soumise à autorisation écrite préalable.

Le code source du site — gabarits, configuration, feuilles de style — est publié
sous licence MIT et consultable librement. Cette licence ne couvre pas le
contenu.

Les captures d'écran présentées dans le portfolio illustrent des sites réalisés
par {{ site.legal.publisher }}. Les marques, logos et contenus qui y figurent
restent la propriété de leurs titulaires respectifs.

## Cookies et mesure d'audience

**Ce site ne dépose aucun cookie.** Il n'embarque ni outil de mesure d'audience,
ni pixel publicitaire, ni bouton de réseau social, ni service tiers chargé au
fil de votre navigation. C'est précisément pour cette raison qu'aucun bandeau de
consentement ne vous est présenté : il n'y a rien à consentir.

Aucune donnée de navigation n'est collectée, analysée ni transmise à quiconque.

## Formulaire de contact et données personnelles

Le formulaire de la page [contact](/contact/) est le seul endroit du site où des
données personnelles vous sont demandées.

**Ce qui est collecté** : votre nom, votre adresse email, le sujet et le contenu
de votre message. Rien d'autre, et rien à votre insu.

**Pourquoi** : uniquement pour prendre connaissance de votre demande et y
répondre. Ces informations ne sont ni revendues, ni cédées, ni utilisées à des
fins de prospection.

**Sur quelle base** : votre consentement, recueilli par la case à cocher du
formulaire, que vous devez valider pour pouvoir l'envoyer (article 6.1.a du
Règlement général sur la protection des données).

**Qui les traite** : l'envoi est assuré par **Web3Forms**, un service tiers qui
transmet le contenu du formulaire vers ma boîte email et agit à ce titre comme
sous-traitant. Les informations transitent donc par ses serveurs. Leur politique
de confidentialité est consultable sur
[web3forms.com/privacy](https://web3forms.com/privacy).

**Combien de temps** : le temps nécessaire au traitement de votre demande, et au
maximum douze mois après notre dernier échange. Passé ce délai, le message est
supprimé.

**Vos droits** : vous disposez d'un droit d'accès, de rectification,
d'effacement, de limitation et d'opposition sur les informations vous
concernant. Pour les exercer, écrivez-moi à
[{{ site.email }}](mailto:{{ site.email }}) : je vous réponds et je m'exécute
sous un mois.

Si la réponse ne vous satisfait pas, vous pouvez saisir la Commission nationale
de l'informatique et des libertés (CNIL) :
[cnil.fr/fr/plaintes](https://www.cnil.fr/fr/plaintes).

## Liens vers d'autres sites

Le portfolio renvoie vers des sites que je n'édite pas et sur lesquels je n'ai
aucun contrôle. Leur contenu et leurs pratiques en matière de données ne relèvent
pas de ma responsabilité.
