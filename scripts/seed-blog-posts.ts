// scripts/seed-blog-posts.ts
// Run this with: npx ts-node scripts/seed-blog-posts.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: "1 Year since Hatake was born.",
    content:
      "It's been a year since Hatake was born. Time flies when you're having fun. What a journey it's been! From the early days of development to where we are now, it's been an incredible ride. Every milestone has been special, and I'm grateful for everyone who has been part of this journey.",
    project: "Hatake Social",
    published: true,
    createdAt: new Date("2026-02-03"),
  },
  {
    title: "Progress is being made :)",
    content:
      "Great progress is being made on multiple fronts. The team has been working tirelessly to bring the vision to life. New features are being developed, old code is being refactored, and the overall architecture is becoming more robust. It's exciting to see things coming together!",
    project: "Hatake Social",
    published: true,
    createdAt: new Date("2026-02-03"),
  },
  {
    title: "Is it worthwhile to engage in the snus-industry?",
    content:
      "This is an interesting question that many entrepreneurs ask themselves. The snus industry has seen significant growth over the past decade, with new players entering the market regularly. However, like any industry, it comes with its own set of challenges and opportunities. Market saturation, regulatory changes, and consumer preferences are all important factors to consider.",
    project: "Snus",
    published: true,
    createdAt: new Date("2026-02-03"),
  },
  {
    title: "We are living in an entirely new era.",
    content:
      "The technological landscape is changing at an unprecedented pace. We are witnessing a paradigm shift in how we work, communicate, and interact with technology. Mobile computing, cloud services, artificial intelligence, and blockchain are reshaping entire industries. Those who adapt quickly will thrive, while those who resist change will be left behind.",
    project: "LinuxPhones",
    published: true,
    createdAt: new Date("2026-02-03"),
  },
  {
    title: "CT-ChinaTown. Lego building blocks...",
    content:
      "The concept of using Lego-like building blocks for urban development is fascinating. China is experimenting with modular construction techniques that allow for rapid urbanization while maintaining flexibility. This approach could revolutionize how cities are built and adapted in the future. Sustainability and adaptability are key concerns for modern urban planning.",
    project: "ChinaTown",
    published: true,
    createdAt: new Date("2026-02-03"),
  },
  {
    title: "BestBuds — what ever happened with it?",
    content:
      "BestBuds was an ambitious project that aimed to connect people with similar interests. Despite initial promise and a strong user base, the project eventually wound down. This is a good reminder that execution, timing, and market fit are crucial for success. Even the best ideas need the right conditions to flourish.",
    project: "BestBuds",
    published: true,
    createdAt: new Date("2026-02-03"),
  },
];

async function main() {
  console.log("🌱 Starting database seed...\n");

  for (const post of blogPosts) {
    try {
      // Check if post with same title and date already exists
      const existing = await prisma.blogPost.findFirst({
        where: {
          title: post.title,
        },
      });

      if (existing) {
        console.log(`⏭️  Skipping "${post.title}" (already exists)`);
        continue;
      }

      const created = await prisma.blogPost.create({
        data: post,
      });

      console.log(`✅ Created: "${created.title}" (${created.id})`);
    } catch (error) {
      console.error(`❌ Error creating "${post.title}":`, error);
    }
  }

  console.log("\n✨ Seed complete!");
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
