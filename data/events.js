/**
 * FurEver Care - Static Data Store: Community & Shelter Events
 */
const EVENTS_DATA = [
  {
    id: "evt-1",
    title: "Annual Paws in the Park Mega-Adoption Festival",
    category: "Adoption Drive",
    date: "Saturday, Sep 12, 2026",
    time: "10:00 AM - 04:00 PM",
    location: "Fatima Jinnah Park Central Lawn, Islamabad",
    host: "FurEver Care Sanctuary Alliance & Hira Malik",
    description: "Meet over 60 loving shelter dogs, cats, and rabbits waiting for their forever homes. Enjoy live pet training demos, organic treat stalls, and on-site adoption counselors.",
    badge: "Featured Event",
    spotsAvailable: "Free Admission / Open to Public",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "evt-2",
    title: "Community Free Rabies & Microchip Vaccination Camp",
    category: "Vaccination Camp",
    date: "Sunday, Sep 20, 2026",
    time: "09:00 AM - 01:00 PM",
    location: "Model Town Community Pavilion, Lahore",
    host: "Dr. Hamza Ahmed & Rescue Volunteers",
    description: "Free core vaccinations (Rabies, DHPP, FVRCP) and subsidized lifetime microchipping to safeguard our neighborhood pets against preventable illness and loss.",
    badge: "Free Service",
    spotsAvailable: "120 Slots Reserved",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "evt-3",
    title: "Pet CPR, First-Aid & Emergency Readiness Workshop",
    category: "Pet Awareness & Workshop",
    date: "Thursday, Oct 08, 2026",
    time: "06:30 PM - 08:30 PM",
    location: "FurEver Care Digital Studio & Karachi In-Person Lab",
    host: "Mahnoor Sheikh, LVT & Clinical Advisory Board",
    description: "Hands-on training covering vital emergency responses: choking relief (Heimlich for pets), pulse detection, bleeding management, and toxin ingestion protocols.",
    badge: "Certification Provided",
    spotsAvailable: "24 Seats Remaining",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80"
  }
];

if (typeof window !== 'undefined') {
  window.EVENTS_DATA = EVENTS_DATA;
}
