export type VibeCategory = {
  id: string;
  label: string;
  description: string;
  options: VibeOption[];
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
  flatmates: Flatmate[];
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
    id: "cleanliness",
    label: "Cleanliness",
    description: "How tidy is your ideal living space?",
    options: [
      { id: "spotless", label: "Spotless", emoji: "✨" },
      { id: "tidy", label: "Tidy", emoji: "🧹" },
      { id: "relaxed", label: "Relaxed", emoji: "😌" },
      { id: "creative-chaos", label: "Creative Chaos", emoji: "🎨" },
    ],
  },
  {
    id: "social-energy",
    label: "Social Energy",
    description: "How social do you want your flat to be?",
    options: [
      { id: "party-mode", label: "Party Mode", emoji: "🎉" },
      { id: "social-butterfly", label: "Social Butterfly", emoji: "🦋" },
      { id: "balanced", label: "Balanced", emoji: "⚖️" },
      { id: "quiet-homebody", label: "Quiet Homebody", emoji: "📖" },
    ],
  },
  {
    id: "noise-level",
    label: "Noise Level",
    description: "What's your comfort zone with noise at home?",
    options: [
      { id: "library-quiet", label: "Library Quiet", emoji: "🤫" },
      { id: "low-key", label: "Low Key", emoji: "🎧" },
      { id: "lively", label: "Lively", emoji: "🔊" },
      { id: "festival-mode", label: "Festival Mode", emoji: "🥁" },
    ],
  },
  {
    id: "schedule",
    label: "Schedule",
    description: "When does your day start and end?",
    options: [
      { id: "early-bird", label: "Early Bird", emoji: "🌅" },
      { id: "flexible", label: "Flexible", emoji: "🔄" },
      { id: "night-owl", label: "Night Owl", emoji: "🦉" },
    ],
  },
  {
    id: "cooking",
    label: "Cooking",
    description: "What's your relationship with the kitchen?",
    options: [
      { id: "master-chef", label: "Master Chef", emoji: "👨‍🍳" },
      { id: "meal-prep", label: "Meal Prep", emoji: "🥗" },
      { id: "takeout-lover", label: "Takeout Lover", emoji: "🥡" },
      { id: "cook-together", label: "We Cook Together", emoji: "🍳" },
    ],
  },
];

export const listings: Listing[] = [
  {
    id: "wg-001",
    title: "Chill Creative Collective",
    vibeTags: ["creative-chaos", "social-butterfly", "lively", "night-owl", "cook-together"],
    flatmates: [
      { name: "Lina", age: 26, occupation: "Graphic Designer", since: "2 years" },
      { name: "Marco", age: 28, occupation: "Musician", since: "1 year" },
    ],
    room: { price: 850, size: 16, available: "2026-05-01" },
    location: { city: "Zürich", neighborhood: "Kreis 4" },
    description:
      "We're a laid-back creative duo who love spontaneous jam sessions, late-night sketching, and cooking big Sunday dinners together. Our flat is colourful, a little chaotic, and full of life.",
  },
  {
    id: "wg-002",
    title: "Morning Run & Meal Prep Squad",
    vibeTags: ["tidy", "balanced", "low-key", "early-bird", "meal-prep"],
    flatmates: [
      { name: "Sarah", age: 30, occupation: "Product Manager", since: "3 years" },
      { name: "Jonas", age: 29, occupation: "Physiotherapist", since: "2 years" },
    ],
    room: { price: 920, size: 18, available: "2026-04-15" },
    location: { city: "Zürich", neighborhood: "Wiedikon" },
    description:
      "We start our days early with a run along the Sihl and wind down with home-cooked meals. The flat is well-organized, calm, and perfect for anyone who values routine and good food.",
  },
  {
    id: "wg-003",
    title: "Study Hard, Play Hard",
    vibeTags: ["tidy", "social-butterfly", "low-key", "flexible", "takeout-lover"],
    flatmates: [
      { name: "Amélie", age: 23, occupation: "Med Student", since: "1 year" },
      { name: "Nils", age: 24, occupation: "Law Student", since: "1 year" },
      { name: "Priya", age: 22, occupation: "CS Student", since: "6 months" },
    ],
    room: { price: 680, size: 14, available: "2026-06-01" },
    location: { city: "Bern", neighborhood: "Länggasse" },
    description:
      "Student WG steps from the Uni. Quiet during exam periods, social on weekends. We order in a lot but also explore Bern's food scene together. Looking for someone chill who respects study time.",
  },
  {
    id: "wg-004",
    title: "Quiet Professional Pad",
    vibeTags: ["spotless", "quiet-homebody", "library-quiet", "early-bird", "meal-prep"],
    flatmates: [
      { name: "Thomas", age: 34, occupation: "Architect", since: "4 years" },
    ],
    room: { price: 1100, size: 20, available: "2026-04-01" },
    location: { city: "Basel", neighborhood: "Gundeli" },
    description:
      "Beautifully designed flat with a minimalist aesthetic. I work from home two days a week and value silence and order. Ideal for a working professional who appreciates a calm, well-kept space.",
  },
  {
    id: "wg-005",
    title: "International Foodie House",
    vibeTags: ["relaxed", "party-mode", "lively", "night-owl", "master-chef"],
    flatmates: [
      { name: "Giulia", age: 27, occupation: "Chef", since: "2 years" },
      { name: "Kenji", age: 25, occupation: "Sommelier", since: "1 year" },
      { name: "Elisa", age: 26, occupation: "Food Blogger", since: "8 months" },
    ],
    room: { price: 780, size: 15, available: "2026-05-15" },
    location: { city: "Lausanne", neighborhood: "Flon" },
    description:
      "Our kitchen is the heart of the flat. We host dinner parties, experiment with recipes from around the world, and always have wine open. If you love food and good company, you'll fit right in.",
  },
  {
    id: "wg-006",
    title: "Green Living Co-op",
    vibeTags: ["tidy", "balanced", "low-key", "early-bird", "cook-together"],
    flatmates: [
      { name: "Lea", age: 31, occupation: "Sustainability Consultant", since: "3 years" },
      { name: "Fabian", age: 29, occupation: "Urban Farmer", since: "2 years" },
    ],
    room: { price: 720, size: 16, available: "2026-04-15" },
    location: { city: "Winterthur", neighborhood: "Altstadt" },
    description:
      "We share a veggie garden on the rooftop, compost everything, and cook together from what we grow. Low-waste lifestyle without being preachy about it. Farmers' market Saturdays are sacred.",
  },
  {
    id: "wg-007",
    title: "Tech & Board Game Nights",
    vibeTags: ["relaxed", "social-butterfly", "low-key", "night-owl", "takeout-lover"],
    flatmates: [
      { name: "David", age: 27, occupation: "Software Engineer", since: "2 years" },
      { name: "Yuki", age: 26, occupation: "UX Researcher", since: "1 year" },
    ],
    room: { price: 900, size: 17, available: "2026-05-01" },
    location: { city: "Zürich", neighborhood: "Oerlikon" },
    description:
      "Friday night is board game night — no exceptions. We're into tech, sci-fi, and the occasional LAN party. Flat is comfortable and lived-in. Perfect for introverted-social types.",
  },
  {
    id: "wg-008",
    title: "Music & Art Collective",
    vibeTags: ["creative-chaos", "party-mode", "festival-mode", "night-owl", "cook-together"],
    flatmates: [
      { name: "Zara", age: 25, occupation: "DJ / Producer", since: "1 year" },
      { name: "Matteo", age: 27, occupation: "Painter", since: "2 years" },
      { name: "Aisha", age: 24, occupation: "Dancer", since: "6 months" },
    ],
    room: { price: 650, size: 13, available: "2026-04-01" },
    location: { city: "Bern", neighborhood: "Matte" },
    description:
      "Living art project in the heart of Matte. Expect paint on the walls (intentional), vinyl spinning on weekends, and communal dinners that turn into deep conversations. Creatives strongly preferred.",
  },
  {
    id: "wg-009",
    title: "Outdoor Adventure Base",
    vibeTags: ["relaxed", "balanced", "lively", "early-bird", "meal-prep"],
    flatmates: [
      { name: "Nico", age: 28, occupation: "Mountain Guide", since: "3 years" },
      { name: "Anna", age: 27, occupation: "Veterinarian", since: "2 years" },
    ],
    room: { price: 750, size: 18, available: "2026-06-01" },
    location: { city: "St. Gallen", neighborhood: "Centrum" },
    description:
      "We hike, ski, climb, and trail run. The hallway is basically a gear room. Looking for someone who loves the outdoors and doesn't mind muddy boots by the door. Early starts, big adventures.",
  },
  {
    id: "wg-010",
    title: "Cozy Sunday Brunch Crew",
    vibeTags: ["tidy", "social-butterfly", "low-key", "flexible", "master-chef"],
    flatmates: [
      { name: "Sophie", age: 29, occupation: "Journalist", since: "2 years" },
      { name: "Luca", age: 30, occupation: "Primary School Teacher", since: "3 years" },
      { name: "Mia", age: 28, occupation: "Nurse", since: "1 year" },
    ],
    room: { price: 820, size: 15, available: "2026-05-01" },
    location: { city: "Luzern", neighborhood: "Neustadt" },
    description:
      "Sunday brunch is our weekly ritual — fresh bread, eggs, the works. We're warm, welcoming, and love a good chat over coffee. The flat overlooks the lake and always smells like something baking.",
  },
];

export function getVibeLabel(vibeId: string): { label: string; emoji: string } | null {
  for (const category of vibeCategories) {
    const option = category.options.find((o) => o.id === vibeId);
    if (option) return { label: option.label, emoji: option.emoji };
  }
  return null;
}
