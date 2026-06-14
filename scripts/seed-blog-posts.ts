// scripts/seed-blog-posts.ts
// Run this with: npx ts-node scripts/seed-blog-posts.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing posts (optional)
  // await prisma.blogPost.deleteMany({});

  const posts = [
    {
      title: "1 Year since Hatake was born.",
      slug: "hatake-1-year",
      content: `In February 2025 me and my partner Mark Jensen had been running through ideas of how to put together a physical store to bring together a community. To level up my passion from sorting through cards and selling them on SvenskaMagic and we begun researching what was actually needed in order to start a business.

The goal was to engage in a local community in a Swedish city in order to accumulate a crowd big enough to make it worthwhile to not bankrupt us when opening running the shop.

At that point, we suddenly had a realisation that the proper thing would be to start an online business first of all. Then my idea was that I could distribute order of products in China that wanted to export their products to Europe and when I noticed them, we could then research on the market there wasn't any top-loader binders within Sweden and my friends in Sweden imported them from UK 250-700 crowns.

I talked to my friend that runs a shop in Skåne as well as another associate of mine and we decided that it could be a good start to order:

- 3 x 480 slots top-loader binders engraved with the Hatake logo,
- 3 x 130pt top-loaders in a packs of 10,
- 3 x 35pt top-loaders in packs of 25,
- 3 x 160+ Deckboxes (Susanoo)

That order allowed us to give out samples to different people within the Trading Card Game communities and put together pre-orders, haven't even registered a company yet but we had a thought to order:

1250 x 35pt top-loader packages
100 x 480 slots top-loader binders

For a while, all of this was started by me, a nobody with a great ambition that has been assisted every moment along the way by a genuine sincere partner that never lets me down.

I remember before the order of these products went through, I posted in Facebook asking if someone were able to make a logo and a childhood friend Richard replied and designed us the most amazing logo we ever could have imagined of.

He also introduced us to a friend of his that is in the same council of SvenskaMagic, Discus that was protagonist.se and makes really cool Commander Decks (a type of format in Magic: The Gathering) which also was interested in becoming products through us.

He insisted on having one logo on the playmats on as well, so we are able to push advertisement for our brand now. I am so grateful for him. This is how his beautiful playmats looks:

[Image: Colorful spiral artwork]

All together the order was weighing over 1 tonnes and we are still selling the last portions of it, it arrived in October 2025 roughly 10 days past the SvenskaMagic convention where we were supposed to introduce our products to the Swedish Market and make a grand opening. How sad...

There is very many people that I need to give shoutouts to, but, the most important ones are:

Hampus 216 @xrrogxst
Daniel Discus Åkerlöm @ PetDragon.se
and my mother Patricia Andersson alongside her partner Göran Andersson for making a duo.

Mark you got enough credit as it is, haha, sorry I am just joking your great too thanks a lot for everything.`,
      excerpt: "In February 2025 me and my partner Mark Jensen had been running through ideas of how to put together a physical store to bring together a community.",
      published: true,
      createdAt: new Date("2026-02-03"),
      project: "Hatake",
    },
    {
      title: "Progress is being made :)",
      slug: "hatake-progress",
      content: `I am genuine happy about the entire situation, how we are progressing and together with our associates getting somewhere. We ordered 200 binders and out of them we have already gotten rid of 150.`,
      excerpt: "I am genuine happy about the entire situation, how we are progressing and together with our associates getting somewhere.",
      published: true,
      createdAt: new Date("2026-02-03"),
      project: "Hatake",
    },
    {
      title: "Is it worthwhile to engage in the snus-industry?",
      slug: "snus-industry",
      content: `Snus, a product that has a wide range of different varieties. You can never be sure to please another mans snus needs, does he utilise tobacco-free nicotine pouches? Tobacco pouches? Tobacco with lower portions or high portions?

It is a complex industry and nobody can tell you what your customer will prefer due to the circumstances of different individuals with different genetics and experiences.`,
      excerpt: "Snus, a product that has a wide range of different varieties.",
      published: true,
      createdAt: new Date("2026-02-03"),
      project: "Snus",
    },
    {
      title: "We are living in an entirely new era.",
      slug: "ai-era",
      content: `The era of AI is here, you are able to utilize these massive machines in order to do anything for you. I couldn't afford a proofreader for my book so I utilized AI to properly format and clean the text.`,
      excerpt: "The era of AI is here, you are able to utilize these massive machines in order to do anything for you.",
      published: true,
      createdAt: new Date("2026-02-03"),
      project: "LinuxPhones",
    },
    {
      title: "CT-ChinaTown. Lego building blocks to build in rural areas.",
      slug: "chinatown",
      content: `Growing up I have always been fascinated by lego building blocks and I want to utilise that technology to, later on in life populate rural areas with buildings. Luckily enough I haven't been alone with this interest, and I have had the pleasure of encountering people of the same wavelength.`,
      excerpt: "Growing up I have always been fascinated by lego building blocks and I want to utilise that technology to build in rural areas.",
      published: true,
      createdAt: new Date("2026-02-03"),
      project: "ChinaTown",
    },
    {
      title: "BestBuds — what ever happened with it?",
      slug: "bestbuds",
      content: `What ever occurred with the multinational business that I spent years developing but never had the chance to fly to the moon with? We had 17 domain names, and well, when I am saying "We" I am referring to a bunch of different people that I engaged with in the business.

The idea originated from Crete, Greece when I encountered a highly smart individual from England (Nathan). He had the entrepreneurial spirit and we both shared the same ambitions of creating something.`,
      excerpt: "What ever occurred with the multinational business that I spent years developing but never had the chance to fly to the moon with?",
      published: true,
      createdAt: new Date("2026-02-03"),
      project: "BestBuds",
    },
  ];

  for (const post of posts) {
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    });

    if (!existingPost) {
      await prisma.blogPost.create({
        data: post,
      });
      console.log(`✓ Created post: ${post.title}`);
    } else {
      console.log(`✓ Post already exists: ${post.title}`);
    }
  }

  console.log("\n✅ Blog posts seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding posts:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
