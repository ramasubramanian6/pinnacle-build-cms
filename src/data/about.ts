import { Building, Users, Award, Calendar, Shield, Heart, Target, Eye } from "lucide-react";

export const aboutStats = [
  { icon: Building, value: "200+", label: "Projects Completed" },
  { icon: Users, value: "50+", label: "Expert Professionals" },
  { icon: Award, value: "150+", label: "Happy Clients" }, // Inferred, keeping placeholder or specific if found
  { icon: Calendar, value: "35+", label: "Years of Experience" },
];

export const milestones = [
  {
    year: "2010",
    title: "Company Founded",
    description: "BRIXXSPACE was established in Tirunelveli with a vision to transform the construction landscape of South Tamil Nadu."
  },
  {
    year: "2013",
    title: "First Major Project",
    description: "Completed our first large-scale residential complex, establishing our reputation for quality."
  },
  {
    year: "2016",
    title: "Commercial Expansion",
    description: "Expanded into commercial construction with landmark office and retail projects."
  },
  {
    year: "2019",
    title: "Infrastructure Division",
    description: "Launched dedicated infrastructure division for roads, bridges, and public works."
  },
  {
    year: "2022",
    title: "200th Project Milestone",
    description: "Celebrated the completion of our 200th successful project across Tamil Nadu."
  },
  {
    year: "2024",
    title: "Regional Leadership",
    description: "Recognized as the leading construction company in the Tirunelveli-Nellai region."
  },
];

export const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest ethical standards in every project and interaction."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in design, execution, and client service."
  },
  {
    icon: Heart,
    title: "Commitment",
    description: "We are committed to delivering projects on time and within budget."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in collaborative partnerships with clients and stakeholders."
  },
];

export const visionMission = {
  vision: {
    icon: Eye,
    title: "Our Vision",
    description: "To be the most trusted and preferred construction partner in South India, known for creating iconic structures that enhance communities and stand as symbols of quality, innovation, and sustainability. We envision transforming Tirunelveli into a modern hub while preserving its cultural heritage.",
  },
  mission: {
    icon: Target,
    title: "Our Mission",
    description: "To deliver exceptional construction services that exceed client expectations through innovation, integrity, and unwavering commitment to quality. We strive to build lasting relationships with our clients, partners, and communities while fostering a culture of safety, sustainability, and excellence in everything we do.",
  },
};

export const founderQuote = {
  quote: "At BRIXXSPACE, we don't just build structures—we build trust, relationships, and the future of our community. Every project we undertake is a testament to our commitment to quality and our belief that great construction can transform lives. Nellai's future is being built today, and we are proud to be leading that transformation.",
  author: "Founder & Managing Director, BRIXXSPACE",
};

export const companyIntro = {
  title: "Building Excellence in South Tamil Nadu",
  paragraphs: [
    "Brixx Space is a professional construction consultation and project advisory firm backed by 35+ years of industry expertise. Led by Mr A. Ulagu Lakshmanan, Director, the company is built on strong foundations of civil engineering, road construction, and infrastructure development across Tamil Nadu.",
    "Based in Krishnapuram, Tirunelveli, Brixx Space provides end-to-end construction consulting, technical planning, design coordination, and execution guidance for residential, commercial, and infrastructure projects.",
    "Technical operations are led by Er. Loknath S, M.E (Structural Engineering), who ensures client ideas are transformed into efficient and buildable designs through strong coordination, documentation, and value engineering. Brixx Space helps clients reduce risk, control costs, and build right—before construction begins.",
    "Trusted civil engineer and construction contractor in Tamil Nadu, with over 35 years of experience in road construction, RCC works, and large-scale infrastructure projects. Serving major government departments, the company is recognised for its high-quality construction, advanced machinery, stringent safety standards, and timely project delivery across multiple districts."
  ],
};

export const leadershipTeam = [
  {
    name: "Mr. A. Ulagu Lakshmanan",
    role: "Director",
    bio: "With over 35 years of experience in road construction, RCC works, and large-scale infrastructure projects. Serving major government departments, the company is recognised for its high-quality construction, advanced machinery, stringent safety standards, and timely project delivery across multiple districts.",
    image: null // Placeholder
  },
  {
    name: "Er. Loknath S",
    role: "Design & Technical Lead",
    bio: "Structural engineering professional with strong expertise in civil construction, design, and project execution. Holding an M.E. in Structural Engineering from Anna University and certified in advanced RCC design, he brings technical precision and modern engineering insight to every project. With hands-on experience as a Project Manager and a proven research background in materials and durability studies, he delivers solutions that blend practicality, innovation, and structural reliability. His work reflects a commitment to quality, accuracy, and engineering excellence across all construction and consultancy services.",
    image: null // Placeholder
  }
];

export const capabilities = [
  "TATA Hitachi Excavators",
  "JCBs",
  "Bulldozers",
  "Vibratory & Road Rollers",
  "Hot Mix Plant (for Bituminous Road Works)",
  "Paver Finishers",
  "Specialized Machinery for Civil & Earthwork Projects",
];

export const coreServicesList = [
  {
    title: "Design Coordination",
    description: "Transforming client vision into buildable, compliant designs.",
  },
  {
    title: "Budget Management",
    description: "Implementing automated cost control, BOQ vs. actual spend tracking, and value engineering.",
  },
  {
    title: "Scheduling",
    description: "Managing project timelines, milestones, and ensuring smooth execution from planning to handover.",
  },
  {
    title: "Contract Administration",
    description: "Overseeing all contract documentation and vendor coordination.",
  },
  {
    title: "Site Supervision",
    description: "Detailed monitoring, including daily reports, safety logs, and vendor check-ins.",
  },
];

export const packages = [
  {
    name: "Consult Package",
    description: "Basic consultancy",
    includes: [
      "Expert consultation",
      "Site feasibility guidance",
      "Basic planning advice",
    ],
  },
  {
    name: "Assist Package",
    description: "Consultancy + Labour",
    includes: [
      "Consultancy",
      "Skilled labour team",
      "Basic supervision",
      "Execution support",
    ],
  },
  {
    name: "BOQ Package",
    description: "Detailed BOQ service",
    includes: [
      "Bill of Quantity",
      "Material estimation",
      "Cost planning",
      "Optimised budget suggestions",
    ],
  },
  {
    name: "Smart Package",
    description: "Smart contract – choose services",
    includes: [
      "Consultancy",
      "Labour",
      "BOQ",
      "Site visits",
      "Quality checks",
      "Add-on services (pay-per-service)",
    ],
  },
];
