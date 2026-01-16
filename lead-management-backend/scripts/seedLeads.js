const mongoose = require("mongoose");
const Lead = require("../models/Lead");
require("dotenv").config();

const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Sarah",
  "Robert",
  "Emma",
  "David",
  "Olivia",
  "James",
  "Ava",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];
const companies = [
  "Tech Corp",
  "Innovation Inc",
  "Digital Solutions",
  "Cloud Systems",
  "Data Analytics",
  "Mobile Apps",
  "AI Labs",
  "Web Services",
  "Enterprise Tech",
  "StartUp Hub",
];
const stages = ["New", "Contacted", "Qualified", "Negotiation", "Converted"];
const sources = [
  "Website",
  "Email",
  "Phone",
  "Referral",
  "Event",
  "Social Media",
];

async function seedLeads() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing leads
    await Lead.deleteMany({});

    const leads = [];
    for (let i = 0; i < 500; i++) {
      leads.push({
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        email: `lead${i}@example.com`,
        phone: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        company: companies[Math.floor(Math.random() * companies.length)],
        stage: stages[Math.floor(Math.random() * stages.length)],
        value: Math.floor(Math.random() * 500000) + 10000,
        source: sources[Math.floor(Math.random() * sources.length)],
        notes: `Lead generated on ${new Date().toLocaleDateString()}`,
      });
    }

    await Lead.insertMany(leads);
    console.log(`${leads.length} leads seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding leads:", error);
    process.exit(1);
  }
}

seedLeads();
