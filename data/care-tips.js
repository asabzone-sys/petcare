/**
 * FurEver Care - Static Data Store: Daily Curated Pet Care Tips
 */
const DAILY_CARE_TIPS_DATA = [
  {
    id: "tip-1",
    category: "Nutrition & Hydration",
    icon: "fa-droplet",
    badgeColor: "var(--primary-500)",
    tip: "Add a splash of unsalted bone broth or warm water to dry kibble to enhance aromatic palatability and support daily kidney filtration.",
    author: "Dr. Hamza Ahmed, DVM",
    fact: "Hydration improves nutrient absorption and significantly reduces the risk of urinary crystal formation in both dogs and cats."
  },
  {
    id: "tip-2",
    category: "Dental Hygiene",
    icon: "fa-tooth",
    badgeColor: "var(--accent-teal)",
    tip: "Introduce enzymatic tooth gel using a soft silicone finger brush for 30 seconds daily. Focus on the upper outer molars where plaque gathers fastest.",
    author: "Dr. Areeba Khan, DVM",
    fact: "Daily brushing can prevent periodontal disease, which affects over 80% of companion animals by age 3."
  },
  {
    id: "tip-3",
    category: "Mental Enrichment",
    icon: "fa-brain",
    badgeColor: "var(--accent-amber)",
    tip: "Ditch the traditional food bowl for interactive snuffle mats or puzzle feeders. 15 minutes of scent foraging provides mental stimulation equivalent to an hour walk.",
    author: "Bilal Hassan, Master Trainer",
    fact: "Canines possess up to 300 million olfactory receptors. Scent work naturally lowers heart rate and cortisol levels."
  },
  {
    id: "tip-4",
    category: "Grooming & Coat Health",
    icon: "fa-scissors",
    badgeColor: "var(--primary-600)",
    tip: "Always brush your dog's coat thoroughly before giving a bath. Water tightens existing undercoat tangles and mats, making them much harder to remove.",
    author: "Mahnoor Sheikh, LVT",
    fact: "Removing dead undercoat allows air to reach the epidermis, preventing hot spots and bacterial dermatitis."
  },
  {
    id: "tip-5",
    category: "Paw & Nail Care",
    icon: "fa-paw",
    badgeColor: "var(--accent-peach)",
    tip: "If you hear your pet's nails clicking against hardwood or tile floors, it's time for a micro-trim. Long nails alter skeletal posture and strain wrist joints.",
    author: "Dr. Sana Malik, DVM",
    fact: "Frequent 1mm nail trims cause the sensitive quick to naturally recede back, keeping paws tight and healthy."
  },
  {
    id: "tip-6",
    category: "Feline Wellness",
    icon: "fa-cat",
    badgeColor: "var(--accent-teal)",
    tip: "Place feline water bowls at least 3 to 5 feet away from food dishes and litter trays. Cats instinctually avoid drinking water located near food sources in nature.",
    author: "Hira Malik, Shelter Lead",
    fact: "Cats are desert-descended obligate carnivores with a naturally low thirst drive; wide ceramic or fountain bowls increase water consumption."
  },
  {
    id: "tip-7",
    category: "Summer Heat Safety",
    icon: "fa-sun",
    badgeColor: "var(--accent-amber)",
    tip: "Test pavement temperature with the back of your hand for 7 seconds. If it is too hot for your skin, it is too hot for your dog's delicate paw pads.",
    author: "Dr. Areeba Khan, DVM",
    fact: "Asphalt can reach 60°C (140°F) in direct sunlight when ambient temperature is just 30°C (86°F)."
  },
  {
    id: "tip-8",
    category: "Small Pet Care",
    icon: "fa-carrot",
    badgeColor: "var(--primary-500)",
    tip: "Provide rabbits and guinea pigs with unlimited fresh Timothy or Orchard grass hay daily — it should make up at least 80% to 85% of their total food intake.",
    author: "Mahnoor Sheikh, LVT",
    fact: "Constant chewing of high-fiber long-stem hay wears down continuously growing incisors and keeps sensitive gut flora in balance."
  }
];

if (typeof window !== 'undefined') {
  window.DAILY_CARE_TIPS_DATA = DAILY_CARE_TIPS_DATA;
}
