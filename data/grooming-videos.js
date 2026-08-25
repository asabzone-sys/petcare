/**
 * FurEver Care - Static Data Store: Grooming Masterclass Videos
 * Step-by-step video tutorials and fear-free grooming guides.
 */
const GROOMING_VIDEOS_DATA = [
  {
    id: "video-1",
    title: "Stress-Free Undercoat Deshedding & Matting Prevention",
    category: "brushing",
    categoryLabel: "Coat Brushing",
    duration: "8:45 mins",
    durationBadge: "8:45 mins",
    instructor: "Dr. Areeba Khan & Hamza Ahmed",
    difficulty: "All Breeds / Coat Types",
    thumbnail: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    videoUrl: "assets/videos/grooming-brushing.mp4",
    badgeColor: "var(--primary-500)",
    description: "Learn how to use slicker brushes and undercoat rakes safely without causing brush burn or discomfort. Removes dense dead undercoat while stimulating healthy skin circulation.",
    steps: [
      "Gently inspect coat for skin hotspots, burrs, and small tangled mats before brushing.",
      "Lightly mist coat with leave-in conditioning detangler spray to reduce static and friction.",
      "Brush in line sections from neck down to tail, following natural grain of coat.",
      "Reward with small healthy training treats after every completed quarter to keep session positive."
    ],
    techniqueTip: "Never pull through stubborn mats with brute force. Hold fur close to skin to prevent pulling and tease apart gently from the tips inward."
  },
  {
    id: "video-2",
    title: "Gentle Hydro-Massage Bath & Lick-Mat Distraction",
    category: "bathing",
    categoryLabel: "Bathing",
    duration: "11:20 mins",
    durationBadge: "11:20 mins",
    instructor: "Mahnoor Sheikh, Head Vet Tech",
    difficulty: "Beginner Friendly",
    thumbnail: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
    videoUrl: "assets/videos/grooming-bathing.mp4",
    badgeColor: "var(--accent-peach)",
    description: "Water temperature calibration, shielding sensitive inner ears, and using peanut-butter or wet food lick mats to create a positive, fear-free bath experience.",
    steps: [
      "Set water temperature to lukewarm (37°C / 98°F) and place rubber anti-slip mat in tub.",
      "Affix suction lick-mat with wet food or peanut butter at pet's natural eye level.",
      "Slowly wet coat starting from paws upward, completely shielding ear canals with your free hand.",
      "Lather tearless botanical shampoo from back to front, and rinse thoroughly with gentle low-pressure flow."
    ],
    techniqueTip: "Always place cotton balls lightly at the outer entrance of ear canals before washing to prevent water ingress and painful yeast infections."
  },
  {
    id: "video-3",
    title: "Safe Nail Grinding: Locating the Sensitive Quick",
    category: "nails",
    categoryLabel: "Nail Care",
    duration: "6:15 mins",
    durationBadge: "6:15 mins",
    instructor: "Dr. Sana Malik, DVM",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
    videoUrl: "assets/videos/grooming-nails.mp4",
    badgeColor: "var(--accent-amber)",
    description: "How to identify the sensitive quick on clear and dark nails using LED illuminated rotary grinders. Micro-shaving angles and styptic powder safety readiness.",
    steps: [
      "Turn on grinder motor at lowest speed nearby to acclimate pet to sound and subtle vibration.",
      "Hold paw securely but gently, isolating one toe at a time between thumb and index finger.",
      "Grind in short 2-3 second pulses at 45-degree angle to avoid thermal heat buildup.",
      "Stop immediately when a small soft gray/pinkish center circle appears in nail cross-section."
    ],
    techniqueTip: "Keep styptic powder or cornstarch within arm's reach. If you accidentally nick the quick, apply gentle direct pressure for 30 seconds."
  },
  {
    id: "video-4",
    title: "Sanitary & Paw-Pad Fur Trimming with Safety Shears",
    category: "trimming",
    categoryLabel: "Trimming",
    duration: "9:50 mins",
    durationBadge: "9:50 mins",
    instructor: "Bilal Hassan, Master Behavioral Groomer",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "assets/videos/grooming-trimming.mp4",
    badgeColor: "var(--primary-600)",
    description: "Trimming between delicate paw webbing and sanitary regions to prevent slipping on hardwood floors, snow compaction, and sticker burr accumulation.",
    steps: [
      "Use only blunt rounded ball-tip safety shears or electric low-vibration mini-trimmers.",
      "Gently spread paw pads and trim hair flush with the surface of the leather pads.",
      "Trim excess sanitary fringe hair cleanly to ensure effortless hygiene after outdoor walks.",
      "Massage paw pads with organic shea butter balm for deep moisturization and crack prevention."
    ],
    techniqueTip: "Never point scissor tips toward the skin. Always trim parallel to the foot pads with ball-tip safety scissors."
  },
  {
    id: "video-5",
    title: "Flushing & Cleansing Canine & Feline Ear Canals",
    category: "ears",
    categoryLabel: "Ear Hygiene",
    duration: "5:30 mins",
    durationBadge: "5:30 mins",
    instructor: "Dr. Areeba Khan, DVM",
    difficulty: "Beginner Friendly",
    thumbnail: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "assets/videos/grooming-ears.mp4",
    badgeColor: "var(--primary-500)",
    description: "Applying pH-balanced enzymatic ear cleanser, massaging the cartilage base until squishing sound is heard, and wiping with cotton rounds (never cotton swabs).",
    steps: [
      "Inspect ear flap for excessive redness, heat, swelling, or unusual yeasty odor.",
      "Fill ear canal with veterinary-approved pH-balanced enzymatic ear cleansing flush.",
      "Massage the base of the ear canal for 30 seconds until you hear a distinct squishing sound.",
      "Allow pet to shake head freely, then gently wipe dislodged debris with clean cotton pad."
    ],
    techniqueTip: "Never insert cotton swabs (Q-tips) into the ear canal as they can pack wax deeper against the eardrum or cause mechanical trauma."
  },
  {
    id: "video-6",
    title: "Hairball Reduction: Feline Soft-Bristle Brushing",
    category: "brushing",
    categoryLabel: "Coat Brushing",
    duration: "7:10 mins",
    durationBadge: "7:10 mins",
    instructor: "Hira Malik, Feline Shelter Lead",
    difficulty: "Beginner Friendly",
    thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    videoUrl: "assets/videos/grooming-feline.mp4",
    badgeColor: "var(--accent-peach)",
    description: "How to turn daily brushing into an affectionate bonding ritual while catching loose hairs before grooming ingestion, eliminating regurgitated hairballs.",
    steps: [
      "Present the soft-bristle brush to cat to let them sniff and scent-mark the bristles first.",
      "Begin with slow, gentle strokes along chin scent glands and top of the head.",
      "Gradually extend strokes down the spine with gentle pressure in short 2-minute sessions.",
      "Finish with high-protein puree squeeze treat to reinforce positive cooperative behavior."
    ],
    techniqueTip: "Watch feline body language carefully. If the tail begins twitching or ears rotate sideways, pause the brushing immediately."
  }
];

if (typeof window !== 'undefined') {
  window.GROOMING_VIDEOS_DATA = GROOMING_VIDEOS_DATA;
}
