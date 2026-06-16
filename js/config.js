const SITE_CONFIG = {
  recipientName: "Nome",
  birthdayISO: "2026-06-18T00:00:00",
  timezone: "Europe/Rome",
  heroEyebrow: "Festa & celebrazione",
  heroSubtitle: "Doctor by day, birthday legend today.",
  musicFile: "assets/audio/italian-piano.mp3",
  musicAutoplayHome: true,
  musicPromptMessage: "Tap anywhere for Italian piano",

  giftReveal: {
    buttonLabel: "Open the gift",
    hiddenMessage:
      "Happy birthday! May this year bring strong coffee, fewer revision requests, and at least one plot that makes sense. Tanti Auguri!",
  },

  phdTribute:
    "Years of research, late nights, conferences, and breakthroughs — respect to the grind that got you here.",

  phdWishes: [
    "May your thesis defend itself as well as you defend your arguments.",
    "May every challenge turn into a publication-worthy story.",
    "May your next academic year be productive, funded, and surprisingly fun.",
  ],

  wishes: [
    {
      accent: "Tanti auguri!",
      text: "Happy birthday — here's to cake, chaos, and a well-deserved break from citations.",
    },
    {
      accent: "Salute!",
      text: "Wishing you a year of wins, good espresso, and zero surprise deadline extensions.",
    },
    {
      accent: "Per il dottore",
      text: "Brains, hustle, and legendary snack breaks — that's the full package.",
    },
    {
      accent: "Brindiamo a te",
      text: "We raise a glass to you — scholar, troublemaker (the fun kind), and birthday VIP.",
    },
  ],

  phdJokes: [
    {
      title: "Citation needed: your awesomeness",
      text: "Another year older, another bibliography longer. At this point your reference list has its own reference list.",
    },
    {
      title: "PhD survival tip",
      text: "Coffee is not a food group — but on your birthday, we officially declare it one.",
    },
    {
      title: "Reviewer #2 would approve",
      text: "You survived another year of 'minor revisions.' That alone deserves cake. And chocolate. And balloons.",
    },
    {
      title: "Statistically significant",
      text: "p < 0.05 that today will be amazing. p < 0.001 that you deserve every bit of it.",
    },
    {
      title: "Abstract of your year",
      text: "Background: Genius. Methods: Hard work + espresso. Results: One incredible human. Conclusion: Happy birthday!",
    },
    {
      title: "Office hours",
      text: "Today's only assignment: accept compliments, eat treats, and do absolutely zero grading.",
    },
  ],

  funSurprises: [
    { type: "cake", label: "Birthday Cake", message: "Slice of happiness unlocked! Calories don't count on birthdays — it's peer-reviewed." },
    { type: "chocolate", label: "Italian Chocolate", message: "Dark, rich, and irresistible — just like your research papers (but sweeter)." },
    { type: "chocolate", label: "Truffle Box", message: "You found the truffle! Fun fact: truffles are rare. So are people like you." },
    { type: "cake", label: "Tiramisu", message: "Layers of coffee, cream, and joy — the dessert equivalent of your multitasking skills." },
    { type: "gift", label: "Surprise Gift", message: "Inside: zero deadlines, maximum snacks, and one very proud friend group." },
    { type: "balloon", label: "Floating Joy", message: "Pop! Just kidding — this balloon is full of good vibes and bad puns." },
  ],

  // Gallery: drop JPEG/PNG files in assets/gallery/ and list them here.
  // - alt: required (accessibility)
  // - caption: optional — short label on the thumbnail grid
  // - phrase: optional — shown only when the photo is enlarged; omit for photo-only view
  gallery: [
    {
      src: "assets/gallery/01.jpg",
      alt: "Celebration dinner with friends",
      caption: "Celebration night",
      phrase: "The night nobody talked about p-values. Miracle.",
    },
    {
      src: "assets/gallery/02.jpg",
      alt: "Late night research session",
      caption: "Thesis era",
    },
    {
      src: "assets/gallery/03.jpg",
      alt: "Smiling portrait",
      phrase: "Proof of life outside the lab. Rare specimen.",
    },
    {
      src: "assets/gallery/04.jpg",
      alt: "Travel snapshot",
      caption: "Adventures",
      phrase: "Fieldwork or vacation? Yes.",
    },
    {
      src: "assets/gallery/05.jpg",
      alt: "Café study session",
    },
    {
      src: "assets/gallery/06.jpg",
      alt: "Raising glasses together",
      caption: "Cheers",
      phrase: "To surviving another academic year.",
    },
  ],

  nav: [
    { href: "index.html", label: "Home", icon: "home" },
    { href: "gallery.html", label: "Memories", icon: "gallery" },
    { href: "wishes.html", label: "Wishes", icon: "message" },
    { href: "fun.html", label: "Treats", icon: "sparkle" },
  ],
};