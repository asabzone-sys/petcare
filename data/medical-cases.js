/**
 * FurEver Care - Static Data Store: Clinical Medical Cases
 * Professional veterinary case summaries for clinician review and education.
 */
const MEDICAL_CASES_DATA = [
  {
    id: "case-01",
    petName: "Bella",
    species: "Canine",
    breed: "German Shepherd Dog",
    age: "5 Years",
    gender: "Female (Spayed)",
    admissionDate: "August 12, 2026",
    chiefComplaint: "Acute non-weight bearing lameness on right hind leg following agility jump.",
    diagnosticFindings: "Positive cranial drawer and tibial compression tests. Orthogonal stifle radiographs revealed joint effusion and cranial displacement of tibia.",
    diagnosis: "Complete Cranial Cruciate Ligament (CCL) Rupture with Medial Meniscal Tear.",
    treatmentProtocol: "Successful Tibial Plateau Leveling Osteotomy (TPLO) performed by Dr. Areeba Khan. Meniscectomy of torn caudal horn. Post-operative cold compression therapy and multimodal analgesia (Carprofen & Gabapentin).",
    outcome: "Week 6 post-op evaluation: 90% weight bearing restored, excellent bone union on follow-up radiographs, progressing smoothly through targeted physical therapy.",
    statusBadge: "Recovered / Rehabilitation"
  },
  {
    id: "case-02",
    petName: "Simba",
    species: "Feline",
    breed: "Domestic Long Hair",
    age: "4 Years",
    gender: "Male (Neutered)",
    admissionDate: "August 18, 2026",
    chiefComplaint: "Stranguria, vocalization in litter box, hematuria for 18 hours.",
    diagnosticFindings: "Tense, painful bladder on palpation. Point-of-care ultrasound confirmed bladder wall thickening and urethral micro-calculi. Serum potassium elevated (5.8 mEq/L).",
    diagnosis: "Feline Idiopathic Cystitis (FIC) with Obstructive Urolithiasis (Struvite).",
    treatmentProtocol: "Emergency atraumatic urethral unblocking under sedation by Dr. Hamza Ahmed. Indwelling urinary catheter placed for 36 hours with continuous closed drainage. IV fluid therapy, Prazosin for urethral antispasmodic effect, and transition to therapeutic wet urinary S/O diet.",
    outcome: "Normal voluntary voiding achieved after catheter removal. Electrolytes normalized. Discharged on environmental enrichment protocol and prescription wet diet with zero recurrence.",
    statusBadge: "Resolved / Monitored"
  },
  {
    id: "case-03",
    petName: "Archie",
    species: "Canine",
    breed: "Cavalier King Charles Spaniel",
    age: "7 Years",
    gender: "Male (Intact)",
    admissionDate: "August 21, 2026",
    chiefComplaint: "Chronic bilateral otitis externa and intense generalized pododermatitis.",
    diagnosticFindings: "Ear cytology demonstrated 4+ Malassezia pachydermatis yeast and mixed cocci. Intradermal skin testing identified severe seasonal dust mite and pollen allergies.",
    diagnosis: "Severe Atopic Dermatitis with Secondary Malassezia Otitis Externa.",
    treatmentProtocol: "Deep ear flushing under sedation by Dr. Sana Malik, long-acting florfenicol/terbinafine ear gel, initiated sublingual allergen-specific immunotherapy (SLIT) and once-monthly Lokivetmab (Cytopoint) injection.",
    outcome: "Marked 80% reduction in pruritus score within 72 hours. Ear canals clear on 14-day recheck cytology. Owner reports dramatically improved sleep and comfort.",
    statusBadge: "Under Maintenance Therapy"
  }
];

if (typeof window !== 'undefined') {
  window.MEDICAL_CASES_DATA = MEDICAL_CASES_DATA;
}
