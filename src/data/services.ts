import { Building2, ClipboardCheck, Compass, Settings, Shield } from "lucide-react";

export const services = [
  {
    id: "construction",
    icon: Building2,
    title: "Construction Management",
    description: "End-to-end construction management services ensuring projects are delivered on time, within budget, and to the highest quality standards.",
    features: [
      "Project planning and scheduling",
      "Resource allocation and management",
      "Cost control and budget management",
      "Quality assurance protocols",
      "Site supervision and coordination",
      "Progress monitoring and reporting",
    ],
  },
  {
    id: "consultancy",
    icon: ClipboardCheck,
    title: "Project Consultancy",
    description: "Expert advisory services to guide your project from conception to completion with strategic insights and industry expertise.",
    features: [
      "Feasibility studies and analysis",
      "Project scope definition",
      "Risk assessment and mitigation",
      "Regulatory compliance guidance",
      "Vendor selection support",
      "Contract management advisory",
    ],
  },
  {
    id: "engineering",
    icon: Compass,
    title: "Structural Engineering",
    description: "Comprehensive structural engineering solutions ensuring safety, durability, and optimal design for all types of buildings.",
    features: [
      "Structural design and analysis",
      "Foundation engineering",
      "Seismic and wind load analysis",
      "Steel and concrete structures",
      "Renovation structural assessment",
      "Building code compliance",
    ],
  },
  {
    id: "planning",
    icon: Settings,
    title: "Planning & Execution",
    description: "Strategic project planning and flawless execution to transform your architectural vision into reality.",
    features: [
      "Master planning and design",
      "Timeline development",
      "Permit and approval management",
      "Material procurement",
      "Subcontractor coordination",
      "Milestone tracking",
    ],
  },
  {
    id: "safety",
    icon: Shield,
    title: "Quality & Safety Assurance",
    description: "Rigorous quality control and safety protocols to ensure every project meets the highest standards.",
    features: [
      "ISO-certified quality processes",
      "Safety training programs",
      "Regular safety audits",
      "Material quality testing",
      "Compliance documentation",
      "Incident prevention protocols",
    ],
  },
];

export const servicesCTA = {
  title: "Ready to Start Your Project?",
  description: "Contact our team of experts for a free consultation and let us help you bring your construction vision to life.",
};
