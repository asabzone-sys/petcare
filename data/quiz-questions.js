/**
 * FurEver Care - Static Data Store: Pet Care Knowledge Quiz Questions
 */
const QUIZ_QUESTIONS_DATA = [
  {
    id: 1,
    topic: "Feeding & Nutrition",
    icon: "fa-bowl-food",
    question: "Which of the following common human foods is severely toxic to both dogs and cats even in tiny quantities?",
    options: [
      "Steamed carrots without salt",
      "Cooked pumpkin purée",
      "Xylitol (birch bark sweetener / artificial sweetener)",
      "Plain skinless boiled chicken"
    ],
    correctIndex: 2,
    explanation: "Xylitol causes rapid, life-threatening insulin release resulting in severe hypoglycemia and acute hepatic necrosis (liver failure) in companion animals. Plain pumpkin and boiled chicken are safe digestive aids."
  },
  {
    id: 2,
    topic: "Hydration Science",
    icon: "fa-droplet",
    question: "What is the recommended daily baseline water intake for a healthy companion animal under normal temperature conditions?",
    options: [
      "5 to 10 ml per kilogram of body weight",
      "50 to 60 ml per kilogram of body weight",
      "250 to 300 ml per kilogram of body weight",
      "Pets only need water after heavy exercise"
    ],
    correctIndex: 1,
    explanation: "Veterinary consensus states that a healthy dog or cat requires approximately 50–60 ml of fresh water per kilogram of body weight daily (about 1 ounce per pound) to maintain renal filtration and cellular hydration."
  },
  {
    id: 3,
    topic: "Grooming & Hygiene",
    icon: "fa-scissors",
    question: "When trimming a dog or cat's claws, what is the 'quick' and why must you avoid cutting it?",
    options: [
      "The hard outer keratin layer which protects against slipping",
      "A living blood vessel and nerve bundle running through the nail core",
      "A harmless air pocket inside the claw tip",
      "A fungal spore build-up that should be clipped off entirely"
    ],
    correctIndex: 1,
    explanation: "The quick contains live capillaries and nerve endings. Cutting into the quick causes immediate pain and bleeding. Trimming in small 1mm angled micro-slices or using an LED grinder prevents quick injuries."
  },
  {
    id: 4,
    topic: "Exercise & Physical Wellness",
    icon: "fa-heart-pulse",
    question: "What is the safest approach to exercising high-energy puppies while their growth plates are still developing?",
    options: [
      "Continuous 10-mile distance jogging on asphalt",
      "Using weighted vests to tire them out quickly",
      "The 5-minute rule: ~5 minutes of structured exercise per month of age, twice daily",
      "No movement or walking whatsoever until 2 years of age"
    ],
    correctIndex: 2,
    explanation: "Puppy growth plates remain open until approximately 12–18 months depending on breed size. Excessive repetitive pounding on hard pavement risks musculoskeletal deformity; short interactive bursts and free play on grass are optimal."
  },
  {
    id: 5,
    topic: "Positive Training",
    icon: "fa-graduation-cap",
    question: "In positive reinforcement marker training, within what time window should your marker signal (click or 'Yes!') occur after the desired behavior?",
    options: [
      "Within 0.5 to 1 second of the action",
      "5 to 10 minutes later once you return home",
      "The next morning during breakfast",
      "Only after the pet repeats the action 10 times in a row"
    ],
    correctIndex: 0,
    explanation: "Animals learn through immediate contingency. Delivering the marker signal within 0.8–1 second pinpoints the exact physical movement being rewarded, drastically speeding up comprehension."
  },
  {
    id: 6,
    topic: "Preventive Care",
    icon: "fa-shield-virus",
    question: "Why are routine annual heartworm preventive medications essential for companion animals?",
    options: [
      "Heartworms are transmitted by fleas and only affect the stomach",
      "Heartworms are transmitted by mosquito bites and migrate to pulmonary arteries, causing irreversible cardiopulmonary damage",
      "Heartworm disease is easily cured at home with natural herbal teas",
      "Indoor cats and dogs are completely immune to mosquito bites"
    ],
    correctIndex: 1,
    explanation: "Microscopic heartworm larvae are injected by common mosquitoes. Once matured, adult worms live in the pulmonary vessels and heart chambers. Prevention is safe, simple, and far more effective than high-risk adulticidal treatment."
  },
  {
    id: 7,
    topic: "Emergency Warning Signs",
    icon: "fa-triangle-exclamation",
    question: "Which of the following symptoms represents a critical, immediate veterinary emergency requiring no-delay hospital transit?",
    options: [
      "A single sneeze after sniffing garden grass",
      "Sleeping 30 minutes longer on a rainy afternoon",
      "Non-productive retching, pacing, and a distended, firm abdomen (suspected GDV / Bloat)",
      "Shedding more fur in the spring"
    ],
    correctIndex: 2,
    explanation: "Gastric Dilatation-Volvulus (GDV/Bloat) involves acute stomach twisting and rapid blood flow restriction. It is a fatal condition within hours without immediate emergency decompression and surgical gastropexy."
  },
  {
    id: 8,
    topic: "Responsible Pet Ownership",
    icon: "fa-house-chimney-medical",
    question: "What does the '3-3-3 Rule' describe when adopting a shelter rescue pet?",
    options: [
      "Feeding 3 meals a day for 3 days to 3 different bowls",
      "The decompression timeline: 3 days to de-stress, 3 weeks to learn routines, 3 months to feel fully at home",
      "Walking the pet 3 miles 3 times a week at 3:00 PM",
      "Waiting 3 months before giving any vaccinations"
    ],
    correctIndex: 1,
    explanation: "The 3-3-3 rule sets compassionate behavioral benchmarks for rescue animals transition: initial decompression (first 3 days), establishing family rhythm (3 weeks), and reaching complete emotional security (3 months)."
  },
  {
    id: 9,
    topic: "Dental Health",
    icon: "fa-tooth",
    question: "Why should you NEVER use regular human fluoride toothpaste when brushing a pet's teeth?",
    options: [
      "Human toothpaste tastes too sweet for animals",
      "Pets swallow toothpaste rather than spitting, and human formulations contain toxic fluoride and foaming agents (SLS) that cause gastric and systemic poisoning",
      "Human toothpaste turns pet fur bright blue permanently",
      "Pet toothbrushes cannot fit human toothpaste tubes"
    ],
    correctIndex: 1,
    explanation: "Pets lack the anatomical ability to spit out toothpaste. Human toothpaste contains fluoride, sodium lauryl sulfate, and artificial sweeteners (like xylitol) which are highly toxic when swallowed. Enzymatic pet toothpastes are formulated to be safely ingested."
  },
  {
    id: 10,
    topic: "Feline Behavior & Health",
    icon: "fa-cat",
    question: "If a male cat is frequently straining in the litter box, crying out in pain, or repeatedly licking his genitals without producing urine, what is the situation?",
    options: [
      "Normal seasonal behavioral marking",
      "Mild constipation that will resolve spontaneously in a week",
      "A life-threatening feline urethral obstruction (blocked cat) requiring emergency catheterization immediately",
      "A sign that the litter box brand should be changed tomorrow"
    ],
    correctIndex: 2,
    explanation: "Urethral obstruction in male cats prevents urine excretion, leading to toxic potassium buildup (hyperkalemia), cardiac arrest, and bladder rupture within 24 to 48 hours. It is an urgent red-alert emergency."
  }
];

if (typeof window !== 'undefined') {
  window.QUIZ_QUESTIONS_DATA = QUIZ_QUESTIONS_DATA;
}
