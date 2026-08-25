/**
 * FurEver Care - Static Data Store: Verified Veterinary Clinics & Emergency Centers
 */
const CLINICS_DATA = [
  {
    id: "clinic-1",
    name: "Al-Razi Companion Animal Medical Pavilion & 24/7 ER",
    city: "Islamabad",
    address: "Plot 14-B, Blue Area Commercial Zone, Sector F-6/G-6, Islamabad",
    phone: "+92 (51) 555-0192",
    emergencyPhone: "+92 (51) 555-9911",
    isOpen247: true,
    rating: 4.9,
    reviewsCount: 420,
    specializations: ["24/7 Trauma Surgery", "Digital Radiography & Ultrasound", "ICU Oxygen Therapy", "Orthopedic TPLO"],
    lat: 33.7182,
    lng: 73.0605,
    distanceDemo: "1.4 km away",
    statusBadge: "Open 24/7 Emergency",
    headVet: "Dr. Areeba Khan, DVM, DACVS"
  },
  {
    id: "clinic-2",
    name: "Gulberg Veterinary Wellness & Feline Specialty Hospital",
    city: "Lahore",
    address: "88 Main Boulevard, Block H, Gulberg III, Lahore",
    phone: "+92 (42) 555-0144",
    emergencyPhone: "+92 (42) 555-9922",
    isOpen247: true,
    rating: 4.88,
    reviewsCount: 385,
    specializations: ["Feline Internal Medicine", "In-House Bloodwork Lab", "Emergency Transfusions", "Endoscopy"],
    lat: 31.5204,
    lng: 74.3587,
    distanceDemo: "2.8 km away",
    statusBadge: "Open 24/7 Emergency",
    headVet: "Dr. Hamza Ahmed, DVM, DABVP"
  },
  {
    id: "clinic-3",
    name: "Clifton Specialty Pet Hospital & Allergy Institute",
    city: "Karachi",
    address: "Block 4, Marine Drive Promenade, Clifton, Karachi",
    phone: "+92 (21) 555-0811",
    emergencyPhone: "+92 (21) 555-9933",
    isOpen247: true,
    rating: 4.92,
    reviewsCount: 512,
    specializations: ["Dermatology & Allergy Testing", "Emergency Poison Treatment", "Advanced Dental Surgery", "Oncology"],
    lat: 24.8138,
    lng: 67.0299,
    distanceDemo: "3.2 km away",
    statusBadge: "Open 24/7 Emergency",
    headVet: "Dr. Sana Malik, DVM, DACVD"
  },
  {
    id: "clinic-4",
    name: "Cantonment Animal Sanctuary & Urgent Care Clinic",
    city: "Rawalpindi",
    address: "Mall Road Medical Enclave, Rawalpindi Cantt",
    phone: "+92 (51) 555-7297",
    emergencyPhone: "+92 (51) 555-9944",
    isOpen247: false,
    hours: "08:00 AM - 10:00 PM (Daily)",
    rating: 4.85,
    reviewsCount: 290,
    specializations: ["Preventive Care", "Vaccinations & Microchipping", "Soft Tissue Surgery", "Spay & Neuter Center"],
    lat: 33.5989,
    lng: 73.0538,
    distanceDemo: "4.5 km away",
    statusBadge: "Open Today until 10 PM",
    headVet: "Dr. Tariq Mahmood, DVM"
  },
  {
    id: "clinic-5",
    name: "University Veterinary Teaching Hospital & Referral Center",
    city: "Peshawar",
    address: "University Road, Agricultural & Veterinary Campus, Peshawar",
    phone: "+92 (91) 555-0322",
    emergencyPhone: "+92 (91) 555-9955",
    isOpen247: true,
    rating: 4.82,
    reviewsCount: 260,
    specializations: ["Diagnostic Imaging & CT", "Equine & Companion Animal ER", "Infectious Disease Isolation", "Pathology"],
    lat: 34.0151,
    lng: 71.5249,
    distanceDemo: "5.1 km away",
    statusBadge: "Open 24/7 Emergency",
    headVet: "Prof. Dr. Jamshed Iqbal, PhD, DVM"
  }
];

if (typeof window !== 'undefined') {
  window.CLINICS_DATA = CLINICS_DATA;
}
