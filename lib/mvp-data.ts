export type VibeCategory = {
  id: string;
  label: string;
  description: string;
  type: "choice" | "slider";
  options?: VibeOption[];
  sliders?: VibeSlider[];
};

export type VibeSlider = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  icon?: string;
};

export type VibeOption = {
  id: string;
  label: string;
  emoji: string;
};

export type Flatmate = {
  name: string;
  age: number;
  occupation: string;
  since: string;
};

export type Listing = {
  id: string;
  title: string;
  vibeTags: string[];
  vibeValues?: Record<string, any>; // maps categoryId -> { sliderId: value } or categoryId -> choiceId
  flatmates: Flatmate[];
  images: {
    room: string;
    flat: string;
  };
  room: {
    price: number;
    size: number;
    available: string;
  };
  location: {
    city: string;
    neighborhood: string;
  };
  description: string;
};

export const vibeCategories: VibeCategory[] = [
  {
    id: "cleanliness-habits",
    label: "Sauberkeit",
    description: "Wie oft schwingst du den Putzlappen?",
    type: "slider",
    sliders: [
      {
        id: "kitchen",
        label: "Küche",
        min: 0,
        max: 7,
        step: 1,
        unit: "x pro Woche",
      },
      {
        id: "bathroom",
        label: "Bad",
        min: 0,
        max: 4,
        step: 1,
        unit: "x pro Monat",
      },
    ],
  },
  {
    id: "social-battery",
    label: "Social Battery",
    description: "Wie viele Abende in der Woche hast du gerne für dich alleine?",
    type: "slider",
    sliders: [
      {
        id: "alone-time",
        label: "Me-Time",
        min: 0,
        max: 7,
        step: 1,
        unit: "Abende pro Woche",
      },
    ],
  },
  {
    id: "guest-policy",
    label: "Besuch",
    description: "Wie oft hast du gerne Gäste oder Übernachtungsbesuch?",
    type: "slider",
    sliders: [
      {
        id: "guests",
        label: "Gäste",
        min: 0,
        max: 7,
        step: 1,
        unit: "Tage pro Woche",
      },
    ],
  },
  {
    id: "sharing",
    label: "Teilen & Gemeinschaft",
    description: "Was teilst du gerne mit deinen Mitbewohnern?",
    type: "slider",
    sliders: [
      {
        id: "sharing-level",
        label: "Teil-Freudigkeit",
        min: 0,
        max: 100,
        step: 10,
        unit: "% (Alles teilen bis strikt getrennt)",
      },
    ],
  },
  {
    id: "noise-level",
    label: "Noise Level",
    description: "What's your comfort zone with noise at home?",
    type: "choice",
    options: [
      { id: "library-quiet", label: "Library Quiet", emoji: "🤫" },
      { id: "low-key", label: "Low Key", emoji: "🎧" },
      { id: "lively", label: "Lively", emoji: "🔊" },
      { id: "festival-mode", label: "Festival Mode", emoji: "🥁" },
    ],
  },
];

export const listings: Listing[] = [
  {
    id: "wg-001",
    title: "Chill Creative Collective",
    vibeTags: ["creative-chaos", "social-butterfly", "lively", "night-owl", "cook-together"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 3, bathroom: 1 },
      "social-battery": { "alone-time": 1 },
      "guest-policy": { guests: 4 },
      sharing: { "sharing-level": 80 },
      "noise-level": "lively"
    },
    flatmates: [
      { name: "Lina", age: 26, occupation: "Graphic Designer", since: "2 years" },
      { name: "Marco", age: 28, occupation: "Musician", since: "1 year" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/bedroom,interior?lock=101",
      flat: "https://loremflickr.com/800/520/apartment,living-room,interior?lock=201",
    },
    room: { price: 850, size: 16, available: "2026-05-01" },
    location: { city: "Zürich", neighborhood: "Kreis 4" },
    description:
      "We're a laid-back creative duo who love spontaneous jam sessions, late-night sketching, and cooking big Sunday dinners together. Our flat is colourful, a little chaotic, and full of life.",
  },
  {
    id: "wg-002",
    title: "Morning Run & Meal Prep Squad",
    vibeTags: ["tidy", "balanced", "low-key", "early-bird", "meal-prep"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 3, bathroom: 1 },
      "social-battery": { "alone-time": 1 },
      "guest-policy": { guests: 4 },
      sharing: { "sharing-level": 80 },
      "noise-level": "lively"
    },
    flatmates: [
      { name: "Sarah", age: 30, occupation: "Product Manager", since: "3 years" },
      { name: "Jonas", age: 29, occupation: "Physiotherapist", since: "2 years" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/room,cozy,interior?lock=102",
      flat: "https://loremflickr.com/800/520/flat,modern,interior?lock=202",
    },
    room: { price: 920, size: 18, available: "2026-04-15" },
    location: { city: "Zürich", neighborhood: "Wiedikon" },
    description:
      "We start our days early with a run along the Sihl and wind down with home-cooked meals. The flat is well-organized, calm, and perfect for anyone who values routine and good food.",
  },
  {
    id: "wg-003",
    title: "Study Hard, Play Hard",
    vibeTags: ["tidy", "social-butterfly", "low-key", "flexible", "takeout-lover"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 6, bathroom: 3 },
      "social-battery": { "alone-time": 2 },
      "guest-policy": { guests: 1 },
      sharing: { "sharing-level": 40 },
      "noise-level": "low-key"
    },
    flatmates: [
      { name: "Amélie", age: 23, occupation: "Med Student", since: "1 year" },
      { name: "Nils", age: 24, occupation: "Law Student", since: "1 year" },
      { name: "Priya", age: 22, occupation: "CS Student", since: "6 months" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/student-room,bedroom?lock=103",
      flat: "https://loremflickr.com/800/520/shared-apartment,interior?lock=203",
    },
    room: { price: 680, size: 14, available: "2026-06-01" },
    location: { city: "Bern", neighborhood: "Länggasse" },
    description:
      "Student WG steps from the Uni. Quiet during exam periods, social on weekends. We order in a lot but also explore Bern's food scene together. Looking for someone chill who respects study time.",
  },
  {
    id: "wg-004",
    title: "Quiet Professional Pad",
    vibeTags: ["spotless", "quiet-homebody", "library-quiet", "early-bird", "meal-prep"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 7, bathroom: 4 },
      "social-battery": { "alone-time": 5 },
      "guest-policy": { guests: 0 },
      sharing: { "sharing-level": 10 },
      "noise-level": "library-quiet"
    },
    flatmates: [
      { name: "Thomas", age: 34, occupation: "Architect", since: "4 years" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/minimal-bedroom,interior?lock=104",
      flat: "https://loremflickr.com/800/520/minimalist-apartment,interior?lock=204",
    },
    room: { price: 1100, size: 20, available: "2026-04-01" },
    location: { city: "Basel", neighborhood: "Gundeli" },
    description:
      "Beautifully designed flat with a minimalist aesthetic. I work from home two days a week and value silence and order. Ideal for a working professional who appreciates a calm, well-kept space.",
  },
  {
    id: "wg-005",
    title: "International Foodie House",
    vibeTags: ["relaxed", "party-mode", "lively", "night-owl", "master-chef"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 7, bathroom: 4 },
      "social-battery": { "alone-time": 5 },
      "guest-policy": { guests: 0 },
      sharing: { "sharing-level": 10 },
      "noise-level": "library-quiet"
    },
    flatmates: [
      { name: "Giulia", age: 27, occupation: "Chef", since: "2 years" },
      { name: "Kenji", age: 25, occupation: "Sommelier", since: "1 year" },
      { name: "Elisa", age: 26, occupation: "Food Blogger", since: "8 months" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/boho-bedroom,interior?lock=105",
      flat: "https://loremflickr.com/800/520/kitchen,apartment,interior?lock=205",
    },
    room: { price: 780, size: 15, available: "2026-05-15" },
    location: { city: "Lausanne", neighborhood: "Flon" },
    description:
      "Our kitchen is the heart of the flat. We host dinner parties, experiment with recipes from around the world, and always have wine open. If you love food and good company, you'll fit right in.",
  },
  {
    id: "wg-006",
    title: "Green Living Co-op",
    vibeTags: ["tidy", "balanced", "low-key", "early-bird", "cook-together"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 2, bathroom: 1 },
      "social-battery": { "alone-time": 1 },
      "guest-policy": { guests: 6 },
      sharing: { "sharing-level": 90 },
      "noise-level": "lively"
    },
    flatmates: [
      { name: "Lea", age: 31, occupation: "Sustainability Consultant", since: "3 years" },
      { name: "Fabian", age: 29, occupation: "Urban Farmer", since: "2 years" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/scandinavian-bedroom,room?lock=106",
      flat: "https://loremflickr.com/800/520/eco-apartment,living-room?lock=206",
    },
    room: { price: 720, size: 16, available: "2026-04-15" },
    location: { city: "Winterthur", neighborhood: "Altstadt" },
    description:
      "We share a veggie garden on the rooftop, compost everything, and cook together from what we grow. Low-waste lifestyle without being preachy about it. Farmers' market Saturdays are sacred.",
  },
  {
    id: "wg-007",
    title: "Tech & Board Game Nights",
    vibeTags: ["relaxed", "social-butterfly", "low-key", "night-owl", "takeout-lover"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 5, bathroom: 2 },
      "social-battery": { "alone-time": 3 },
      "guest-policy": { guests: 2 },
      sharing: { "sharing-level": 70 },
      "noise-level": "low-key"
    },
    flatmates: [
      { name: "David", age: 27, occupation: "Software Engineer", since: "2 years" },
      { name: "Yuki", age: 26, occupation: "UX Researcher", since: "1 year" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/modern-bedroom,desk?lock=107",
      flat: "https://loremflickr.com/800/520/apartment,workspace,interior?lock=207",
    },
    room: { price: 900, size: 17, available: "2026-05-01" },
    location: { city: "Zürich", neighborhood: "Oerlikon" },
    description:
      "Friday night is board game night — no exceptions. We're into tech, sci-fi, and the occasional LAN party. Flat is comfortable and lived-in. Perfect for introverted-social types.",
  },
  {
    id: "wg-008",
    title: "Music & Art Collective",
    vibeTags: ["creative-chaos", "party-mode", "festival-mode", "night-owl", "cook-together"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 4, bathroom: 1 },
      "social-battery": { "alone-time": 4 },
      "guest-policy": { guests: 1 },
      sharing: { "sharing-level": 30 },
      "noise-level": "low-key"
    },
    flatmates: [
      { name: "Zara", age: 25, occupation: "DJ / Producer", since: "1 year" },
      { name: "Matteo", age: 27, occupation: "Painter", since: "2 years" },
      { name: "Aisha", age: 24, occupation: "Dancer", since: "6 months" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/artistic-bedroom,interior?lock=108",
      flat: "https://loremflickr.com/800/520/loft,creative,interior?lock=208",
    },
    room: { price: 650, size: 13, available: "2026-04-01" },
    location: { city: "Bern", neighborhood: "Matte" },
    description:
      "Living art project in the heart of Matte. Expect paint on the walls (intentional), vinyl spinning on weekends, and communal dinners that turn into deep conversations. Creatives strongly preferred.",
  },
  {
    id: "wg-009",
    title: "Outdoor Adventure Base",
    vibeTags: ["relaxed", "balanced", "lively", "early-bird", "meal-prep"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 1, bathroom: 1 },
      "social-battery": { "alone-time": 0 },
      "guest-policy": { guests: 5 },
      sharing: { "sharing-level": 100 },
      "noise-level": "festival-mode"
    },
    flatmates: [
      { name: "Nico", age: 28, occupation: "Mountain Guide", since: "3 years" },
      { name: "Anna", age: 27, occupation: "Veterinarian", since: "2 years" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/wood-bedroom,mountain-style?lock=109",
      flat: "https://loremflickr.com/800/520/cabin-apartment,living-room?lock=209",
    },
    room: { price: 750, size: 18, available: "2026-06-01" },
    location: { city: "St. Gallen", neighborhood: "Centrum" },
    description:
      "We hike, ski, climb, and trail run. The hallway is basically a gear room. Looking for someone who loves the outdoors and doesn't mind muddy boots by the door. Early starts, big adventures.",
  },
  {
    id: "wg-010",
    title: "Cozy Sunday Brunch Crew",
    vibeTags: ["tidy", "social-butterfly", "low-key", "flexible", "master-chef"],
    vibeValues: {
      "cleanliness-habits": { kitchen: 5, bathroom: 3 },
      "social-battery": { "alone-time": 2 },
      "guest-policy": { guests: 3 },
      sharing: { "sharing-level": 80 },
      "noise-level": "low-key"
    },
    flatmates: [
      { name: "Sophie", age: 29, occupation: "Journalist", since: "2 years" },
      { name: "Luca", age: 30, occupation: "Primary School Teacher", since: "3 years" },
      { name: "Mia", age: 28, occupation: "Nurse", since: "1 year" },
    ],
    images: {
      room: "https://loremflickr.com/800/520/bright-bedroom,interior?lock=110",
      flat: "https://loremflickr.com/800/520/cozy-apartment,sunday-brunch,kitchen?lock=210",
    },
    room: { price: 820, size: 15, available: "2026-05-01" },
    location: { city: "Luzern", neighborhood: "Neustadt" },
    description:
      "Sunday brunch is our weekly ritual — fresh bread, eggs, the works. We're warm, welcoming, and love a good chat over coffee. The flat overlooks the lake and always smells like something baking.",
  },
];

export function getVibeLabel(vibeId: string): { label: string; emoji: string } | null {
  for (const category of vibeCategories) {
    const option = category.options?.find((o) => o.id === vibeId);
    if (option) return { label: option.label, emoji: option.emoji };
  }
  return null;
}
