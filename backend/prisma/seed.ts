import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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

  //   Categories
  const stationary = await prisma.category.create({
    data: { name: 'Stationary' },
  });
  const snacks = await prisma.category.create({ data: { name: 'Snacks' } });

  // Products
  const productsData = [
    {
      name: 'Notebook',
      categoryId: stationary.id,
      variants: [
        {
          name: 'Notebook (100 pages)',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxCW2Murm-RXIpEl2q3TSqfe43pqRhkbD1Q&s',
          admin1Price: 15,
          admin2Price: 17,
        },
        {
          name: 'Notebook (200 pages)',
          image:
            'https://i.etsystatic.com/18836762/r/il/c6770f/3642026487/il_570xN.3642026487_phv0.jpg',
          admin1Price: 20,
          admin2Price: 22,
        },
        {
          name: 'Notebook (300 pages)',
          image:
            'https://i.etsystatic.com/18836762/r/il/20897e/3571286260/il_570xN.3571286260_6hxn.jpg',
          admin1Price: 25,
          admin2Price: 28,
        },
        {
          name: 'Notebook (Spiral)',
          image:
            'https://rukminim2.flixcart.com/image/850/1000/xif0q/diary-notebook/v/m/y/a4-notebook-smooth-paper-a4-soft-cover-spiral-notebook-4-pack-original-imagmey3hpjnhyf7.jpeg',
          admin1Price: 30,
          admin2Price: 32,
        },
        {
          name: 'Mini Notebook',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxCW2Murm-RXIpEl2q3TSqfe43pqRhkbD1Q&s',
          admin1Price: 10,
          admin2Price: 12,
        },
      ],
    },
    {
      name: 'Pen',
      categoryId: stationary.id,
      variants: [
        {
          name: 'Blue Pen',
          image: 'https://m.media-amazon.com/images/I/81jBTYQeR0L.jpg',
          admin1Price: 10,
          admin2Price: 12,
        },
        {
          name: 'Black Pen',
          image:
            'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=2817&auto=format',
          admin1Price: 11,
          admin2Price: 13,
        },
        {
          name: 'Ball Pen',
          image: 'https://m.media-amazon.com/images/I/81jBTYQeR0L.jpg',
          admin1Price: 10,
          admin2Price: 12,
        },
        {
          name: 'Fountain Pen',
          image:
            'https://images-cdn.ubuy.co.in/633b4ae5f945a92e376cda0a-dryden-designs-fountain-pen-medium-nib.jpg',
          admin1Price: 50,
          admin2Price: 55,
        },
      ],
    },
    {
      name: 'Pencil',
      categoryId: stationary.id,
      variants: [
        {
          name: 'HB Pencil',
          image:
            'https://5.imimg.com/data5/SELLER/Default/2021/3/JA/BE/UW/102845696/webp-net-resizeimage-6-.jpg',
          admin1Price: 5,
          admin2Price: 6,
        },
        {
          name: '2B Pencil',
          image:
            'https://www.alotmall.com/cdn/shop/files/Pastel-Black-Wood-HB-2B-Pencil-12-Pcs-Set-2.jpg',
          admin1Price: 6,
          admin2Price: 6,
        },
        {
          name: 'Mechanical Pencil',
          image:
            'https://helloaugust.in/wp-content/uploads/2023/11/brustro-mechanical-pencil-with-eraser-0-7-mm.jpg',
          admin1Price: 178,
          admin2Price: 170,
        },
      ],
    },
    {
      name: 'Scale',
      categoryId: stationary.id,
      variants: [
        {
          name: 'Plastic Scale',
          image:
            'https://www.kokuyocamlin.com/camlin/camel-access/image/catalog/assets/camlin/geometry-box/scales/plastic-scale/individual-scale-of-15-cm/2.JPG',
          admin1Price: 5,
          admin2Price: 6,
        },
      ],
    },
    {
      name: 'Eraser',
      categoryId: stationary.id,
      variants: [
        {
          name: 'Eraser',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwOmRqal3WOOev7LeDIrL92yoUGBGZSLcwYw&s',
          admin1Price: 5,
          admin2Price: 5,
        },
      ],
    },
    {
      name: 'Lays',
      categoryId: snacks.id,
      variants: [
        {
          name: 'Lays Classic',
          image: 'https://m.media-amazon.com/images/I/71oPL6sEwHL.jpg',
          admin1Price: 20,
          admin2Price: 22,
        },
        {
          name: 'Lays Masala',
          image:
            'https://m.media-amazon.com/images/I/71HyeSkXm0L._AC_UF1000,1000_QL80_.jpg',
          admin1Price: 22,
          admin2Price: 23,
        },
        {
          name: 'Lays Sour Cream',
          image:
            'https://www.lays.com/sites/lays.com/files/2020-11/sour-cream.jpg',
          admin1Price: 24,
          admin2Price: 26,
        },
        {
          name: 'Lays Chile Lemon',
          image:
            'https://m.media-amazon.com/images/I/71DCs2yzAwL._AC_UF1000,1000_QL80_.jpg',
          admin1Price: 25,
          admin2Price: 27,
        },
      ],
    },
    {
      name: 'Kurkure',
      categoryId: snacks.id,
      variants: [
        {
          name: 'Kurkure Masala Munch',
          image:
            'https://m.media-amazon.com/images/I/71sOPzrW0mL._AC_UF1000,1000_QL80_.jpg',
          admin1Price: 20,
          admin2Price: 22,
        },
        {
          name: 'Kurkure Green Chutney',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeuihe5zgTnknu9ctLnYrzO8STE3RWJNyhyg&s',
          admin1Price: 21,
          admin2Price: 22,
        },
        {
          name: 'Kurkure Chilli Chatka',
          image:
            'https://m.media-amazon.com/images/I/71GN9iowhxL._AC_UF1000,1000_QL80_.jpg',
          admin1Price: 22,
          admin2Price: 23,
        },
      ],
    },
  ];

  for (const product of productsData) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: `${product.name} description`,
        categoryId: product.categoryId,
      },
    });

    for (const variant of product.variants) {
      const createdVariant = await prisma.productVariant.create({
        data: {
          name: variant.name,
          productId: createdProduct.id,
          image: variant.image,
        },
      });

      await prisma.productVariantPrice.createMany({
        data: [
          {
            shopId: shop1.id,
            productVariantId: createdVariant.id,
            price: variant.admin1Price,
          },
          {
            shopId: shop2.id,
            productVariantId: createdVariant.id,
            price: variant.admin2Price,
          },
        ],
      });
    }
  }

  console.log('Seeded products and variants with prices.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
