/**
 * FurEver Care - Static Data Store: Pet Care Educational Journal Articles
 */
const JOURNAL_ARTICLES_DATA = [
  {
    id: "art-1",
    title: "The Science of Canine Hydration: Electrolytes, Bowls, & Summer Heat",
    category: "Nutrition",
    readTime: "5 min read",
    author: "Dr. Hamza Ahmed, DVM",
    authorTitle: "Preventive Diagnostics Lead",
    date: "Aug 20, 2026",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    featured: true,
    excerpt: "Understanding how dehydration impacts canine kidney filtration, signs of heat stress, and how stainless steel fountains encourage higher daily water intake.",
    content: [
      "Water is the single most critical nutrient in your companion's daily biological function. A dog's body is composed of approximately 60% to 70% water, and even a modest 5% fluid deficit can lead to lethargy, reduced tissue perfusion, and concentrated urine that elevates the risk of bladder crystal formation.",
      "Stainless steel and ceramic drinking bowls are vastly superior to plastic alternatives, which can harbor microscopic bacterial colonies inside hairline scratches. Circulating fountain bowls stimulate natural drinking instincts through gentle oxygenating aeration.",
      "During hot or humid weather, incorporate moisture-rich dietary toppers such as bone broth (free from onion, garlic, or excessive sodium) or wet food toppers to ensure optimal daily fluid balance."
    ],
    takeaways: [
      "Average daily water need: 50-60ml of water per kg of body weight.",
      "Perform the skin turgor test: gently lift the skin over the shoulder blades; it should snap back instantly.",
      "Clean drinking receptacles daily with hot water and pet-safe enzymatic soap."
    ],
    tags: ["Hydration", "Canine Health", "Summer Care", "Kidney Support"]
  },
  {
    id: "art-2",
    title: "Mastering Feline Coat Care: Brushing Without Stress",
    category: "Grooming",
    readTime: "4 min read",
    author: "Hira Malik",
    authorTitle: "Feline Shelter Lead",
    date: "Aug 18, 2026",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    featured: false,
    excerpt: "Turn routine grooming into a soothing bonding ritual while preventing painful hair mats and dangerous trichobezoar (hairball) intestinal blockages.",
    content: [
      "Cats spend up to 30% to 50% of their waking hours self-grooming. However, during seasonal shedding phases, the ingestion of dead hair can accumulate into hard hairballs in the stomach or intestinal tract, leading to vomiting or digestive obstruction.",
      "Begin with short 2-minute desensitization sessions. Allow your cat to inspect the silicone grooming glove or soft-bristle brush, paired with high-value lickable treats. Always brush in the natural direction of coat growth.",
      "Never attempt to cut severe mats with scissors; feline skin is extremely thin and pliable. Use a specialized de-shedding undercoat rake or consult a fear-free feline certified groomer."
    ],
    takeaways: [
      "Short-haired cats benefit from weekly brushing; long-haired breeds require daily combing.",
      "Focus along the chin, cheeks, and base of the neck where scent glands are concentrated.",
      "Consistent grooming reduces shedding around the home by up to 80%."
    ],
    tags: ["Cats", "Coat Health", "Hairball Prevention", "Fear-Free"]
  },
  {
    id: "art-3",
    title: "Positive Reinforcement 101: The Marker Signal Revolution",
    category: "Training",
    readTime: "6 min read",
    author: "Bilal Hassan",
    authorTitle: "Master Behavioral Trainer",
    date: "Aug 15, 2026",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
    featured: false,
    excerpt: "Why timing your reward marker (clicker or verbal 'Yes!') within 0.8 seconds accelerates learning and builds enthusiastic cooperation.",
    content: [
      "Marker-based positive reinforcement training creates clear two-way communication between guardian and pet. When a dog performs a desired behavior, an immediate distinct marker signal pinpoints the exact millisecond of success.",
      "Follow the marker with a high-value treat within 1 to 2 seconds. The marker serves as a bridge of certainty, preventing confusion and eliminating the need for punitive or aversive corrections.",
      "Keep training sessions concise — 3 to 5 minutes multiple times a day is significantly more effective than one exhausting 30-minute block."
    ],
    takeaways: [
      "Timing is everything: deliver the marker at the exact climax of the correct action.",
      "Use pea-sized, soft treats to maintain high training cadence without overfeeding.",
      "End every training sequence on an effortless, successful repetition."
    ],
    tags: ["Positive Reinforcement", "Clicker Training", "Canine Behavior", "Puppy Fundamentals"]
  },
  {
    id: "art-4",
    title: "Decoding Pet Food Labels: Protein Percentages & Fillers",
    category: "Nutrition",
    readTime: "7 min read",
    author: "Dr. Sana Malik, DVM",
    authorTitle: "Clinical Dermatology & Nutrition",
    date: "Aug 12, 2026",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
    featured: false,
    excerpt: "Learn how to read guaranteed analysis panels, evaluate crude protein on a dry-matter basis, and identify whole-food animal ingredients.",
    content: [
      "Pet nutrition packaging can often feature marketing claims like 'human-grade' or 'all-natural'. To objectively evaluate a food, turn straight to the ingredient list and the Guaranteed Analysis panel.",
      "Ingredients are listed by weight prior to processing. Fresh deboned meat contains up to 70% water, meaning its weight drops significantly after dehydration. Named meat meals (e.g. 'Salmon Meal' or 'Deboned Lamb') provide concentrated protein density.",
      "Ensure the formulation complies with AAFCO or FEDIAF nutritional profiles for your pet's specific life stage (Growth, Adult Maintenance, or All Life Stages)."
    ],
    takeaways: [
      "Verify the AAFCO nutritional adequacy statement on every bag or can.",
      "Calculate protein on a Dry Matter basis: divide crude protein % by (100 - moisture %).",
      "Avoid vague non-specific ingredients like 'animal fat' or 'meat by-products' of undefined origin."
    ],
    tags: ["Pet Food", "Nutrition Analysis", "AAFCO Standards", "Ingredient Transparency"]
  },
  {
    id: "art-5",
    title: "Preventive Dental Health: Why Oral Care Adds Years to Life",
    category: "Wellness",
    readTime: "5 min read",
    author: "Dr. Areeba Khan, DVM",
    authorTitle: "Senior Veterinary Surgeon",
    date: "Aug 08, 2026",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
    featured: false,
    excerpt: "Over 80% of dogs and cats over the age of three suffer from periodontal disease. Here is how daily enzymatic brushing shields heart and kidney health.",
    content: [
      "Periodontal bacteria does not remain confined to the mouth. Chronic oral inflammation allows subgingival bacteria to enter the bloodstream, continuously showering vital organs like the heart valves and kidneys with inflammatory cytokines.",
      "Daily brushing with enzymatic pet toothpaste (never human toothpaste containing foaming agents or toxic xylitol) breaks down plaque before it calcifies into rock-hard calculus.",
      "Complement mechanical brushing with VOHC-approved (Veterinary Oral Health Council) dental chews and schedule annual veterinary dental cleanings under anesthesia."
    ],
    takeaways: [
      "Never use human toothpaste; fluoride and xylitol are dangerous toxins for pets.",
      "Enzymatic pet toothpastes break down plaque chemically through natural glucose oxidase.",
      "Look for the official VOHC seal of acceptance when selecting dental chews."
    ],
    tags: ["Dental Health", "Periodontal Care", "Preventive Medicine", "Senior Pets"]
  },
  {
    id: "art-6",
    title: "Welcoming a Rescue Pet: The 3-3-3 Decompression Rule",
    category: "Adoption",
    readTime: "5 min read",
    author: "Mahnoor Sheikh",
    authorTitle: "Head Vet Tech & Shelter Coordinator",
    date: "Aug 04, 2026",
    image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80",
    featured: false,
    excerpt: "A supportive roadmap for the first 3 days, 3 weeks, and 3 months of introducing your newly adopted dog or cat to their forever home.",
    content: [
      "Shelter environments are noisy and sensory-overloading. When a companion animal arrives in a new home, their cortisol levels remain elevated for days. The 3-3-3 rule provides realistic behavioral expectations.",
      "During the First 3 Days: The pet is overwhelmed, may hide under beds, refuse food, or sleep excessively. Provide a quiet, low-traffic safe zone.",
      "During the First 3 Weeks: The pet begins learning routines, testing boundaries, and revealing their genuine personality. Consistent feeding schedules and gentle positive reinforcement establish security.",
      "During the First 3 Months: The pet feels completely secure, forms deep emotional bonds, and recognizes their home as their forever sanctuary."
    ],
    takeaways: [
      "Do not host large family gatherings or dog park visits during the first 3 weeks.",
      "Set predictable routines for meals, potty breaks, and rest from day one.",
      "Patience and quiet affection build lifelong trust and security."
    ],
    tags: ["Rescue Adoption", "3-3-3 Rule", "Decompression", "Shelter Support"]
  },
  {
    id: "art-7",
    title: "Small Pet Enrichment: Mental Stimulation for Rabbits & Guinea Pigs",
    category: "Pet Lifestyle",
    readTime: "4 min read",
    author: "Mahnoor Sheikh",
    authorTitle: "Companion Care Specialist",
    date: "Jul 29, 2026",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80",
    featured: false,
    excerpt: "Foraging mats, timothy hay tunnels, and cardboard puzzle boxes: how to keep small herbivore minds engaged and active.",
    content: [
      "Rabbits, guinea pigs, and small mammals possess natural foraging and burrowing instincts that cannot be satisfied by standard wire cages alone.",
      "Create DIY foraging puzzles by hiding fragrant orchard grass and dried chamomile inside toilet paper tubes or unbleached cardboard boxes. Foraging stimulates natural problem-solving and prevents destructive boredom behaviors.",
      "Provide daily supervised free-roaming exercise in a bunny-proofed room with carpeted floor grip, chew-safe applewood sticks, and hidey tunnels."
    ],
    takeaways: [
      "80% of a rabbit's daily diet must consist of fresh, high-fiber Timothy or Orchard grass hay.",
      "Rotate toys weekly so novel scents and textures maintain cognitive engagement.",
      "Ensure all electrical cables in free-roaming spaces are encased in hard plastic cord protectors."
    ],
    tags: ["Rabbits", "Small Pets", "Foraging Enrichment", "Habitat Design"]
  }
];

if (typeof window !== 'undefined') {
  window.JOURNAL_ARTICLES_DATA = JOURNAL_ARTICLES_DATA;
}
