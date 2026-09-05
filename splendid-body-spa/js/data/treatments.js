const TREATMENT_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "massage", label: "Massage" },
  { id: "body", label: "Body Treatments" },
  { id: "waxing", label: "Waxing" },
];

const TREATMENTS = [
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    category: "massage",
    description:
      "Focuses on re-aligning the deeper layers of connective and muscle tissue. Slow strokes and deep finger pressure release chronic patterns of tension, following or going across the fibres of the muscle, tendons, and fascia.",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80",
    featured: true,
    options: [
      { label: "60 min", price: 100000 },
      { label: "80 min", price: 110000, note: "Deep tissue with a massage gun" },
      { label: "90 min", price: 130000, note: "Deep tissue with hot stones, mini hot towel, calabash and ghee (optional for inflammation)" },
      { label: "120 min", price: 180000, note: "Deep tissue with castor oil" },
      { label: "180 min", price: 250000 },
    ],
  },
  {
    id: "swedish-relaxation",
    name: "Swedish Massage",
    category: "massage",
    description:
      "A manual therapy emphasising long strokes, kneading, and friction to encourage proper circulation — improving blood flow, relieving muscle tension, stretching tight ligaments, and reducing emotional stress.",
    image:
      "images/Swedish Massage.jpg",
    featured: true,
    options: [
      { label: "60 min", price: 75000 },
      { label: "90 min", price: 100000 },
      { label: "120 min", price: 135000 },
      { label: "180 min", price: 195000 },
    ],
  },
  {
    id: "hot-stone",
    name: "Hot Stone Massage",
    category: "massage",
    description:
      "A therapeutic massage technique that uses heated stones to enhance relaxation and relieve muscle tension. Smooth, flat basalt stones are heated to a specific temperature and placed on targeted areas of the body.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
    featured: true,
    options: [{ label: "80 min", price: 120000 }],
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy Massage",
    category: "massage",
    description:
      "A simple and effective way to enhance your self-care routine. Essential oils like lavender, eucalyptus, and peppermint reduce stress, boost mood, and promote relaxation.",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
    featured: true,
    options: [
      { label: "60 min", price: 85000 },
      { label: "90 min", price: 115000 },
      { label: "120 min", price: 150000 },
    ],
  },
  {
    id: "body-scrub-massage",
    name: "Body Scrub 'n' Massage",
    category: "body",
    description:
      "A complete renewal — an exfoliating body scrub followed by a Swedish massage at a discounted rate, enough to fully rejuvenate you.",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80",
    featured: true,
    options: [{ label: "150 min", price: 170000 }],
  },
  {
    id: "foot-back",
    name: "Foot 'n' Back Massage",
    category: "massage",
    description:
      "A quick, soothing sole and back massage that improves sleep quality and relaxes the entire body through the connective tissue of your feet.",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
    featured: true,
    options: [{ label: "30 min", price: 50000 }],
  },
  {
    id: "wood-therapy",
    name: "Wood Therapy Massage",
    category: "body",
    description:
      "Specialised wooden tools enhance lymphatic drainage and circulation — speeding up healing and recovery, improving skin elasticity, and minimising discomfort.",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80",
    featured: true,
    options: [{ label: "90 min", price: 180000 }],
  },
  {
    id: "waxing",
    name: "Waxing",
    category: "waxing",
    description:
      "Professional waxing for smooth, hair-free skin — from quick touch-ups to full-body treatment.",
    image:
      "https://images.unsplash.com/photo-1515377901643-4a9748a5d2ab?w=600&q=80",
    featured: true,
    options: [
      { label: "Underarm", price: 25000 },
      { label: "Half leg", price: 40000 },
      { label: "Full arm", price: 40000 },
      { label: "Full leg", price: 60000 },
      { label: "Bikini", price: 60000 },
      { label: "Back / Chest", price: 50000 },
      { label: "Full body waxing", price: 200000 },
    ],
  },
  {
    id: "body-scrub",
    name: "Body Scrub",
    category: "body",
    description:
      "Exfoliating the skin removes dry, flaky, dead skin cells, leaving the skin smooth and ready to absorb moisture.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    featured: true,
    options: [{ label: "120 min", price: 130000 }],
  },
  {
    id: "sports-massage",
    name: "Sports Massage",
    category: "massage",
    description:
      "A combination of massage techniques, acupressure, and remedial exercises — ideal for injury prevention, minor injuries, and ailments that may affect your sport or quality of life.",
    image:
      "https://images.unsplash.com/photo-1515377901643-4a9748a5d2ab?w=600&q=80",
    featured: true,
    options: [{ label: "80 min", price: 150000 }],
  },
];

function getTreatmentById(id) {
  return TREATMENTS.find((t) => t.id === id);
}
