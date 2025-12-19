import { MdScience } from "react-icons/md"
import { HiAcademicCap } from "react-icons/hi2"
import { FaBrain } from "react-icons/fa6"

export const categoriesConstant = [
  { name: "dinning", image: "/images/dinning.webp" },
  { name: "living", image: "/images/living.webp" },
  { name: "bedroom", image: "/images/bedroom.webp" },
]


export const expertise = [
  {
    point: "Agricultural Microbiology",
    description: "Extensive research on Rhizobia (nitrogen-fixing bacteria) and their symbiotic relationships with wild Egyptian legumes.",
  },
  {
    point: "Plant Growth Promotion",
    description: "Studying the synergetic effects of plant-growth-promoting rhizobacteria (PGPR) and Arbuscular Mycorrhiza Fungi (AMF) on crops like peanuts, onions, and snap beans.",
  },
  {
    point: "Biofertilizers",
    description: "Investigating sustainable alternatives to chemical fertilizers to improve soil productivity.",
  },
  {
    point: "Antimicrobial Activity",
    description: "Researching the effectiveness of various compounds (including thienopyrimidines and actinomycetes) against human and plant pathogens.",
  },
  {
    point: "Nanobiotechnology",
    description: "Recent collaborative work involves the green synthesis of silver nanoparticles (AgNPs) and their applications as anticancer and antifungal agents.",
  },
]

export const services = [
  {
    title: "Scientific Advisory",
    description: "Expert consultant on microbial soil health and bio-remediation.",
    icon: MdScience
  },
  {
    title: "Academic Leadership",
    description: "Extensive experience in faculty administration and curriculum development.",
    icon: HiAcademicCap
  },
  {
    title: "Innovation",
    description: "Pioneer in the 'Green Synthesis' of nanoparticles for antifungal and anticancer applications.",
    icon: FaBrain
  },
]