export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  datePublished: string;
  faqItems: FaqItem[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'hoe-leer-je-skateboarden',
    title: 'Hoe leer je skateboarden? Complete gids voor beginners',
    description: 'Stap-voor-stap gids voor beginners: hoe leer je skateboarden? Van het bepalen van je stance tot je eerste tricks. Inclusief tips van instructeurs van De Fabriek in Enschede.',
    category: 'Beginners',
    readTime: '8 min lezen',
    datePublished: '2026-03-08',
    faqItems: [
      {
        q: 'Hoe lang duurt het om te leren skateboarden?',
        a: 'De basisvaardigheden — rijden, sturen en remmen — leer je in een paar weken bij regelmatig oefenen. Een ollie leren duurt gemiddeld één tot drie maanden.',
      },
      {
        q: 'Wat is het verschil tussen regulair en goofy stance?',
        a: "Bij regulair staat je linkervoet voorop het board. Bij goofy staat je rechtervoet voor. Er is geen 'juiste' stance — kies wat het meest comfortabel aanvoelt.",
      },
      {
        q: 'Kan ik skateboarden leren zonder lessen?',
        a: 'Ja, maar lessen versnellen je leercurve enorm. Een instructeur geeft directe feedback over je houding en techniek, wat bij zelfstandig leren moeilijk te zien is.',
      },
    ],
  },
  {
    slug: 'welk-skateboard-kopen-beginner',
    title: 'Welk skateboard kopen als beginner? Complete koopgids 2026',
    description: 'Welk skateboard moet je kopen als beginner? Alles over deckmaten, complete boards vs. losse onderdelen, merken en prijzen in Nederland. Eerlijk advies van De Fabriek Enschede.',
    category: 'Gear',
    readTime: '7 min lezen',
    datePublished: '2026-03-08',
    faqItems: [
      {
        q: 'Kan ik een goedkoop skateboard kopen bij de Action of Decathlon?',
        a: 'Nee — goedkope speelgoedboards van supermarkten of Action zijn niet geschikt om te leren skateboarden. Investeer minimaal €80–€130 in een complete board van een echt skatemerk.',
      },
      {
        q: 'Welke deckmaat moet ik kiezen als beginner?',
        a: 'Voor de meeste beginners met schoenmaat EU 39–43 is een 8.0 inch deck de beste keuze. Kinderen van 6–12 jaar beginnen op 7.5 of 7.75 inch.',
      },
      {
        q: 'Is een complete board of losse onderdelen beter voor beginners?',
        a: 'Een complete board is voor beginners de beste keuze: goedkoper, alles al gemonteerd en je hoeft geen keuzes te maken over afzonderlijke onderdelen.',
      },
    ],
  },
  {
    slug: 'beste-indoor-skateparken-nederland',
    title: 'De beste indoor skateparken van Nederland (2026)',
    description: 'Overzicht van de beste indoor skateparken in Nederland: van Area 51 in Eindhoven tot De Fabriek in Enschede. Vind het dichtstbijzijnde indoor skatepark bij jou.',
    category: 'Parken',
    readTime: '6 min lezen',
    datePublished: '2026-03-08',
    faqItems: [],
  },
  {
    slug: 'skatelessen-kinderen',
    title: 'Skatelessen voor kinderen: alles wat ouders willen weten',
    description: 'Skatelessen voor kinderen: vanaf welke leeftijd kan het, wat leren ze, wat kost het en wat zijn de voordelen? Alles wat ouders willen weten, van De Fabriek in Enschede.',
    category: 'Lessen',
    readTime: '6 min lezen',
    datePublished: '2026-03-08',
    faqItems: [
      {
        q: 'Vanaf welke leeftijd kan mijn kind skatelessen volgen?',
        a: 'Bij De Fabriek in Enschede kunnen kinderen lessen volgen vanaf 6 jaar. Sommige skatescholen bieden speciale kleuterlessen aan vanaf 4–5 jaar.',
      },
      {
        q: 'Moet mijn kind zijn eigen skateboard meenemen?',
        a: 'Nee, bij De Fabriek wordt materiaal verhuurd tijdens de lessen. Je kind hoeft geen eigen board mee te nemen, al mag dat natuurlijk altijd.',
      },
      {
        q: 'Is skateboarden gevaarlijk voor kinderen?',
        a: 'Skateboarden heeft een vergelijkbaar blessurerisico als voetbal of andere sporten. Met de juiste bescherming en professionele begeleiding is het veilig. De les begint altijd met het leren van valtechnieken.',
      },
    ],
  },
  {
    slug: 'ollie-leren-stap-voor-stap',
    title: 'Hoe leer je een ollie? Stap-voor-stap trick-gids',
    description: 'Leer de ollie met onze stap-voor-stap gids: voetpositie, pop, slide en landing. De basistrick van skateboarden uitgelegd door de instructeurs van De Fabriek Enschede.',
    category: 'Tricks',
    readTime: '7 min lezen',
    datePublished: '2026-03-08',
    faqItems: [
      {
        q: 'Hoe lang duurt het om een ollie te leren?',
        a: 'Gemiddeld duurt het één tot drie maanden regelmatig oefenen om een consistente ollie te leren.',
      },
      {
        q: 'Moet ik een ollie kunnen voordat ik andere tricks leer?',
        a: 'Ja — de ollie is de basis voor vrijwel alle andere street skateboard tricks zoals kickflips, heelflips en grinds.',
      },
      {
        q: 'Waarom gaat mijn board scheef tijdens de ollie?',
        a: 'Scheve ollies worden veroorzaakt door scheve schouders of een onjuiste slide-beweging. Zorg dat je schouders en heupen recht blijven.',
      },
    ],
  },
  {
    slug: 'indoor-vs-outdoor-skateboarden',
    title: 'Indoor vs. outdoor skateboarden: wat zijn de verschillen?',
    description: 'Indoor of outdoor skateboarden? Vergelijk ondergrond, seizoen, kosten en leersnelheid. Wanneer kies je voor een indoor skatepark zoals De Fabriek in Enschede?',
    category: 'Tips',
    readTime: '5 min lezen',
    datePublished: '2026-03-08',
    faqItems: [],
  },
  {
    slug: 'skateboarden-voor-volwassenen',
    title: 'Skateboarden als volwassene beginnen: is het te laat?',
    description: 'Nee, het is nooit te laat om te leren skateboarden. Tips voor volwassen beginners, realistische verwachtingen en waarom indoor parken ideaal zijn voor volwassenen.',
    category: 'Beginners',
    readTime: '6 min lezen',
    datePublished: '2026-03-08',
    faqItems: [
      {
        q: 'Is het te laat om als volwassene te leren skateboarden?',
        a: 'Nee, absoluut niet. Er zijn skaters die op hun 30e, 40e of later zijn begonnen. Volwassenen leren iets langzamer dan kinderen maar hebben meer discipline en doorzettingsvermogen.',
      },
      {
        q: 'Is skateboarden gevaarlijk voor volwassenen?',
        a: 'Met goede bescherming (helm, polsbeschermers, kniebeschermers) en een voorzichtige aanpak is het goed beheersbaar. Volwassenen genezen iets langzamer, dus bescherming is extra belangrijk.',
      },
    ],
  },
  {
    slug: 'veilig-skateboarden-bescherming',
    title: 'Veilig skateboarden: welke bescherming heb je nodig?',
    description: 'Welke bescherming heb je nodig bij skateboarden? Helmadvies, kniebeschermers, polsbeschermers en merken. Eerlijk advies over veilig skateboarden van De Fabriek Enschede.',
    category: 'Veiligheid',
    readTime: '5 min lezen',
    datePublished: '2026-03-08',
    faqItems: [
      {
        q: 'Moet je een helm dragen bij skateboarden?',
        a: 'Nee, bij De Fabriek is niets verplicht. Een helm is wel sterk aanbevolen — zeker voor beginners en kinderen.',
      },
      {
        q: 'Kan ik een fietshelm gebruiken voor skateboarden?',
        a: 'Nee — een fietshelm is niet geschikt voor skateboarden. Gebruik een multi-sport of skateboard-specifieke helm van merken als Triple Eight, Pro-Tec of REKD.',
      },
      {
        q: 'Zijn polsbeschermers echt nodig?',
        a: 'Ja — polsbeschermers zijn de meest onderschatte maar belangrijkste beschermer. Ongeveer 70% van val-blessures bij skateboarden betreft de polsen.',
      },
    ],
  },
  {
    slug: 'skateparken-enschede-overijssel',
    title: 'Skateparken in Enschede en Overijssel: compleet overzicht 2026',
    description: 'Alle skateparken in Enschede en Overijssel op een rij: indoor en outdoor. Van De Fabriek in Enschede tot skateparken in Hengelo, Almelo, Zwolle en Deventer.',
    category: 'Lokaal',
    readTime: '5 min lezen',
    datePublished: '2026-03-08',
    faqItems: [
      {
        q: 'Is er een indoor skatepark in Enschede?',
        a: 'Ja — De Fabriek is het indoor skatepark van Enschede en Twente, gevestigd op Hogebothofstraat 49. Open woensdag t/m zondag, geen reservering nodig.',
      },
      {
        q: 'Welke skateparken zijn er in Overijssel?',
        a: 'Overijssel heeft drie indoor skateparken: De Fabriek in Enschede, Indoor Skatepark Zwolle en Burnside in Deventer.',
      },
    ],
  },
  {
    slug: 'kosten-skateboarden-beginners',
    title: 'Wat kost skateboarden? Eerlijk budget-overzicht voor beginners',
    description: 'Wat kost skateboarden echt? Overzicht van kosten voor board, bescherming, lessen en parkentree in Nederland. Inclusief besparingstips van De Fabriek Enschede.',
    category: 'Budget',
    readTime: '6 min lezen',
    datePublished: '2026-03-08',
    faqItems: [
      {
        q: 'Hoeveel kost een goed skateboard voor beginners?',
        a: 'Een goede complete board van een echt skatemerk kost €90–€130. Goedkopere boards van supermarkten zijn niet geschikt om te leren skateboarden.',
      },
      {
        q: 'Wat zijn de jaarlijkse kosten van skateboarden?',
        a: 'Het eerste jaar inclusief startkosten kost gemiddeld €200–€600 afhankelijk van of je lessen volgt. Daarna zijn de lopende jaarkosten €80–€400.',
      },
    ],
  },
];
