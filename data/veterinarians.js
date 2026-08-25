/**
 * FurEver Care - Static Data Store: Veterinarians & Clinical Schedules
 */
const VETERINARIANS_DATA = [
  {
    id: "vet-1",
    name: "Dr. Areeba Khan, DVM, DACVS",
    title: "Senior Veterinary Surgeon & Orthopedics Specialist",
    clinic: "Al-Razi Companion Animal Medical Pavilion",
    location: "Blue Area Medical Center, Suite 100, Islamabad",
    experience: "14 Years Experience",
    rating: 4.98,
    reviewsCount: 310,
    specializations: ["Orthopedic Surgery", "Reconstructive Soft Tissue", "Joint Health", "Post-Op Rehabilitation"],
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    bio: "Dr. Areeba is a board-certified veterinary surgeon dedicated to minimally invasive surgical solutions, complex TPLO cruciate restorations, and canine joint health.",
    phone: "+92 (51) 555-PAWS (Ext 102)",
    email: "areeba.khan@furevercare.org",
    availableSlots: ["09:30 AM", "11:00 AM", "02:15 PM", "04:00 PM"]
  },
  {
    id: "vet-2",
    name: "Dr. Hamza Ahmed, DVM, DABVP (Canine/Feline)",
    title: "Chief of Internal Medicine & Preventive Wellness",
    clinic: "Gulberg Veterinary Wellness & Feline Center",
    location: "Main Boulevard, Gulberg III, Lahore",
    experience: "11 Years Experience",
    rating: 4.95,
    reviewsCount: 245,
    specializations: ["Preventive Diagnostics", "Feline Internal Medicine", "Geriatric Pet Care", "Cardiology Screening"],
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    bio: "Dr. Hamza focuses on lifelong proactive pet wellness, feline renal disease management, early metabolic screenings, and stress-free handling.",
    phone: "+92 (42) 555-PAWS (Ext 104)",
    email: "hamza.ahmed@furevercare.org",
    availableSlots: ["10:00 AM", "01:30 PM", "03:00 PM", "05:15 PM"]
  },
  {
    id: "vet-3",
    name: "Dr. Sana Malik, DVM, DACVD",
    title: "Veterinary Dermatologist & Allergy Specialist",
    clinic: "Clifton Specialty Pet Hospital",
    location: "Marine Drive, Block 4, Clifton, Karachi",
    experience: "9 Years Experience",
    rating: 4.92,
    reviewsCount: 188,
    specializations: ["Allergy Immunotherapy", "Chronic Ear Care", "Autoimmune Skin Conditions", "Nutritional Dermatology"],
    avatar: "assets/images/dr-sana-malik.jpg",
    bio: "Dr. Sana helps companion animals overcome chronic pruritus, environmental allergies, and recurring dermatological issues through targeted immunotherapy.",
    phone: "+92 (21) 555-PAWS (Ext 108)",
    email: "sana.malik@furevercare.org",
    availableSlots: ["08:45 AM", "11:30 AM", "02:00 PM", "03:45 PM"]
  }
];

const SAMPLE_APPOINTMENTS_DATA = [
  {
    id: "apt-101",
    petName: "Milo",
    species: "Dog (Golden Retriever)",
    ownerName: "Ayesha Khan",
    vetId: "vet-1",
    vetName: "Dr. Areeba Khan",
    time: "Today, 09:30 AM",
    type: "Post-Op TPLO Checkup",
    status: "Confirmed",
    room: "Examination Room 2"
  },
  {
    id: "apt-102",
    petName: "Cleo",
    species: "Cat (Siamese)",
    ownerName: "Zain Ahmed",
    vetId: "vet-2",
    vetName: "Dr. Hamza Ahmed",
    time: "Today, 11:00 AM",
    type: "Annual Preventive Wellness & Bloodwork",
    status: "In-Progress",
    room: "Feline Quiet Suite 1"
  },
  {
    id: "apt-103",
    petName: "Buster",
    species: "Dog (French Bulldog)",
    ownerName: "Mahnoor Sheikh",
    vetId: "vet-3",
    vetName: "Dr. Sana Malik",
    time: "Today, 02:15 PM",
    type: "Atopic Dermatitis Follow-up",
    status: "Confirmed",
    room: "Consultation Room 4"
  },
  {
    id: "apt-104",
    petName: "Jasper",
    species: "Dog (Labrador)",
    ownerName: "Bilal Hassan",
    vetId: "vet-1",
    vetName: "Dr. Areeba Khan",
    time: "Tomorrow, 10:00 AM",
    type: "Limping / Left Stifle Evaluation",
    status: "Confirmed",
    room: "Orthopedic Suite"
  }
];

if (typeof window !== 'undefined') {
  window.VETERINARIANS_DATA = VETERINARIANS_DATA;
  window.SAMPLE_APPOINTMENTS_DATA = SAMPLE_APPOINTMENTS_DATA;
}
