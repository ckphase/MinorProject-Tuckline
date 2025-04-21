import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function randomPrice(min = 10, max = 100) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

async function main() {
  const hashedpassword = await bcrypt.hash('password123', 10);

  // Users
  const admin1 = await prisma.user.create({
    data: {
      name: 'Admin One',
      email: 'admin1@mail.com',
      password: hashedpassword,
      role: 'admin',
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      name: 'Admin Two',
      email: 'admin2@mail.com',
      password: hashedpassword,
      role: 'admin',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Test Customer',
      email: 'customer@mail.com',
      password: hashedpassword,
      role: 'customer',
    },
  });

  // Shops
  const shop1 = await prisma.shop.create({
    data: {
      name: 'Block 55 Tuckshop',
      description: 'All things stationery and tasty snacks',
      location: 'Block 55, LPU',
      ownerId: admin1.id,
    },
  });

  const shop2 = await prisma.shop.create({
    data: {
      name: 'Block 34 Tuckshop',
      description: 'All things stationery and tasty snacks',
      location: 'Block 34, LPU',
      ownerId: admin2.id,
    },
  });

  // Categories
  const stationary = await prisma.category.create({
    data: { name: 'Stationary' },
  });
  const snacks = await prisma.category.create({ data: { name: 'Snacks' } });

  // Products & Variants
  const productsData = [
    {
      name: 'Notebook',
      categoryId: stationary.id,
      // image: ,
      variants: [
        'Notebook (100 pages)',
        'Notebook (200 pages)',
        'Notebook (300 pages)',
        'Notebook (Spiral)',
        'Mini Notebook',
      ],
    },
    {
      name: 'Pen',
      categoryId: stationary.id,
      variants: ['Blue Pen', 'Black Pen', 'Red Pen', 'Gel Pen', 'Ball Pen'],
    },
    {
      name: 'Pencil',
      categoryId: stationary.id,
      variants: ['HB Pencil', '2B Pencil', 'Mechanical Pencil'],
    },
    {
      name: 'Lays',
      categoryId: snacks.id,
      variants: [
        'Lays Classic',
        'Lays Masala',
        'Lays Sour Cream',
        'Lays Chile Lemon',
      ],
    },
    {
      name: 'Kurkure',
      categoryId: snacks.id,
      variants: [
        'Kurkure Masala Munch',
        'Kurkure Green Chutney',
        'Kurkure Chilli Chatka',
      ],
    },
  ];

  const allVariants: any = [];

  for (const product of productsData) {
    const created = await prisma.product.create({
      data: {
        name: product.name,
        description: `${product.name} description`,
        categoryId: product.categoryId,
        variants: {
          create: product.variants.map((v) => ({ name: v })),
        },
      },
      include: { variants: true },
    });

    allVariants.push(...created.variants);
  }

  // Prices for each variant in both shops (random per shop)
  for (const variant of allVariants) {
    await prisma.productVariantPrice.create({
      data: {
        shopId: shop1.id,
        productVariantId: variant.id,
        price: randomPrice(),
      },
    });

    await prisma.productVariantPrice.create({
      data: {
        shopId: shop2.id,
        productVariantId: variant.id,
        price: randomPrice(),
      },
    });
  }

  console.log(
    `Seeded ${allVariants.length} product variants with prices for two shops.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
