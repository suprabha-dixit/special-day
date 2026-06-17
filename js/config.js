const SITE_CONFIG = {
  recipientName: "Suprabha",
  birthdayISO: "2026-06-18T00:00:00+02:00", // midnight, 18 June — Turin (CEST)
  timezone: "Europe/Rome", // Turin, Italy

  birthdayGate: {
    enabled: false, // set false to preview full site before June 18
    title: "Buon Compleanno",
    subtitle: "Something special is on its way…",
    unlockLine: "Tanti Auguri! The celebration is ready.",
    musicOnGate: true,
    quotes: [
      "Good things come to those who wait…",
      "Preparati per una sorpresa!",
      "The countdown has begun.",
      "A little patience — a big celebration awaits.",
      "Tra poco… qualcosa di speciale!",
    ],
  },

  earlyCelebration: {
    enabled: true,
    birthdayISO: "2026-06-17T00:00:00+05:30",
    gateBanner: "From India with love — we've already started celebrating you!",
    gateHint: "Your Turin birthday arrives soon. The countdown is for Italy time.",
    quotes: [
      "June 18 has begun back home — the party started early!",
      "India cheers first; Italy joins when the clock strikes in Turin.",
      "Distance doesn't delay love — only the official confetti.",
    ],
  },

  heroEyebrow: "With love & admiration",
  heroSubtitle: "Doctor by day, birthday legend today.",
  musicFile: "assets/audio/italian-piano.mp3",
  musicAutoplayHome: true,
  musicPromptMessage: "Tap anywhere for music",

  airplaneBanner: {
    enabled: true,
    message: "Happy Birthday, {name}!",
    journeyLabel: "Ind → Italy",
  },

  giftReveal: {
    buttonLabel: "Open the gift",
    hiddenMessage:
      "Happy birthday! May this year bring strong coffee, fewer revision requests, and at least one plot that makes sense. Tanti Auguri!",
    closeLabel: "Continue celebrating",
    fireworkSound: "assets/audio/fireworks.mp3",
    cheerSound: "assets/audio/cheer.mp3",
  },

  wishBalloons: {
    enabled: true,
    popPhrases: ["Cheers!", "Happy birthday!", "You rock!", "Celebrate big!", "For you!"],
  },

  phdTribute:
    "Years of research, late nights, conferences, and breakthroughs — respect to the grind that got you here.",

  phdWishes: [
    "May your hard work open doors, your dedication inspire others, and your next chapter be your best yet.",
    "May every challenge turn into a publication-worthy story.",
    "May your next academic year be productive, funded, and surprisingly fun.",
  ],

  wishes: [
    {
      accent: "Cheers!",
      text: "Happy birthday — here's to cake, chaos, and a well-deserved break from citations.",
    },
    {
      accent: "To you!",
      text: "Wishing you a year of wins, good espresso, and zero surprise deadline extensions.",
    },
    {
      accent: "For our doctor",
      text: "Brains, hustle, and legendary snack breaks — that's the full package.",
    },
    {
      accent: "Raise a glass",
      text: "We raise a glass to you — scholar, loyal friend, and the person who makes every room brighter.",
    },
    {
      accent: "Health & happiness",
      text: "May this year bring you good health, peaceful days, and the simple joys that make life feel full — rest, laughter, and time with the people who matter most.",
    },
  ],

  treatReveal: {
    closeLabel: "Got it!",
  },

  funSurprises: [
    { type: "cake", label: "Birthday Cake", accent: "Enjoy!", message: "Slice of happiness unlocked! Calories don't count on birthdays — it's peer-reviewed." },
    {
      type: "chocolate",
      label: "Chocolate Bar",
      accent: "Sweet!",
      message: "Something special is wrapped inside — verify to unwrap your surprise.",
      voucher: {
        code: "RWK3-NH6QKT-AVHQ",
        verifyDelayMs: 1800,
        intro: "Verify to unwrap your birthday Sweet Surprise.",
        authLabel: "Enter your mobile number",
        authPlaceholder: "......",
        authValue: "8378994776",
        authError: "Reviewer #2 rejected that — minor revision required. Try again!",
        verifyButton: "Verify & unlock",
        verifyingText: "Running peer review on your digits… hold tight!",
        revealTitle: "Take your healthy-sweets steps!",
        revealMessage: "You cracked the chocolate bar. This code is your passport to smarter treats — dark chocolate, dates, nuts, and whatever counts as 'healthy' in your lab.",
        copyLabel: "Copy gift card code",
        copiedLabel: "Copied!",
        redeemTitle: "Your sweet redemption path",
        redeemSteps: [
          { label: "Copy", text: "Grab the code above — your golden ticket, no peer review required." },
          { label: "Open", text: "Amazon app → Gift Cards → Add a gift card. Paste and tap Apply." },
          { label: "Treat", text: "Checkout with guilt-free sweets. PhD-approved snacking only from here." },
        ],
        redeemHelp: "Keep this code private. If Amazon says no, check for typos — or blame Reviewer #2.",
      },
    },
    {
      type: "gift",
      label: "Surprise Gift",
      accent: "Surprise!",
      message: "Inside: zero deadlines, maximum snacks, and one very proud friend group.",
      puzzles: {
        intro: "Unwrap your gift — tap each piece, then tap where it belongs!",
        gridSize: 2,
        nextPuzzleLabel: "Next surprise",
        celebrationMessages: [
          "Happy birthday, Suprabha!",
          "Another piece of the puzzle — just like your PhD journey.",
          "You're crushing it — cake-level achievements only from here.",
          "Tanti auguri! Reviewer #2 has no notes on this performance.",
        ],
        finaleCelebration: {
          title: "Happy birthday, Suprabha!",
          message: "Here's to everything ahead — success, joy, and a future as bright as you are.",
        },
        items: [
          { image: "assets/gallery/101.jpeg", alt: "" },
          { image: "assets/gallery/102.jpeg", alt: "" },
        ],
      },
    },
  ],

  gallery: [
    {
      src: "assets/gallery/01.jpg",
      //alt: "Celebration dinner with friends",
     // caption: "Celebration night",
      phrase: "Once upon a time, a little princess arrived 👑",
    },
    {
      src: "assets/gallery/02.jpeg",
      alt: "Late night research session",
      //caption: "Thesis era",
    },
    {
      src: "assets/gallery/03.jpeg",
      //alt: "Smiling portrait",
      //phrase: "Proof of life outside the lab. Rare specimen.",
    },
    {
      src: "assets/gallery/04.jpeg",
      //alt: "Travel snapshot",
      //caption: "Adventures",
      //phrase: "Fieldwork or vacation? Yes.",
    },
    {
      src: "assets/gallery/05.jpeg",
      alt: "",
    },
    {
      src: "assets/gallery/06.jpeg",
      alt: "Raising glasses together",
      caption: "Cheers",
      phrase: "To surviving another academic year.",
    },
	{
      src: "assets/gallery/07.jpeg",
      alt: "",
    },
	    {
      src: "assets/gallery/08.jpeg",
      alt: "",
    },
	    {
      src: "assets/gallery/09.jpeg",
      alt: "",
    },
	    {
      src: "assets/gallery/10.jpeg",
      alt: "",
    },
	    {
      src: "assets/gallery/11.jpeg",
      alt: "",
    },
	    {
      src: "assets/gallery/12.jpeg",
      alt: "",
    },
	 {
      src: "assets/gallery/13.jpeg",
      alt: "",
    },
	 {
      src: "assets/gallery/14.jpeg",
      alt: "",
    },
	 {
      src: "assets/gallery/15.jpeg",
      alt: "",
    },
	 {
      src: "assets/gallery/16.jpeg",
      alt: "",
    },
  ],

  nav: [
    { href: "index.html", label: "Home", icon: "home" },
    { href: "gallery.html", label: "Memories", icon: "gallery" },
    { href: "wishes.html", label: "Wishes", icon: "message" },
    { href: "fun.html", label: "Treats", icon: "sparkle" },
  ],
};
