import { Request, Response } from 'express';
import prisma from '../config/db';

type CartItem = {
  id: number; // product variant ID
  name: string;
  price: number;
  quantity: number;
  shopId: number;
};

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const items: CartItem[] = req.body.items;
  const shippingAddress = req.body.shippingAddress;
  const paymentMethod = req.body.paymentMethod;

  // Group items by shopId
  const groupedByShop = items.reduce((acc, item) => {
    if (!acc[item.shopId]) acc[item.shopId] = [];
    acc[item.shopId].push(item);
    return acc;
  }, {} as Record<number, CartItem[]>);

  const createdOrders = [];
  for (const [shopIdStr, shopItems] of Object.entries(groupedByShop)) {
    const shopId = parseInt(shopIdStr, 10);
    const totalAmount = shopItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order and its order lines in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          customerId: userId,
          shopId,
          totalAmount: totalAmount + 10, // Assuming a flat shipping charge of 10
          status: 'pending',
          shippingAddress,
          paymentMethod,
          lines: {
            create: shopItems.map((item) => ({
              name: item.name,
              productVariantId: item.id,
              quantity: item.quantity,
              lineTotal: item.price * item.quantity,
            })),
          },
        },
        include: {
          lines: true,
        },
      });

      return createdOrder;
    });
    createdOrders.push(order);
  }
  res
    .status(201)
    .json({ message: 'Orders created successfully', orders: createdOrders });
};

export const getOrders = async (req: Request, res: Response) => {
  // if user is admin then get all orders owned by the admin (shop owner)
  const isAdmin = req.user?.role === 'admin';
  if (isAdmin) {
    const orders = await prisma.order.findMany({
      where: {
        shop: {
          ownerId: req.user?.id,
        },
      },
      include: {
        lines: true,
        shop: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json({ orders });
    return;
  }

  // else get orders for the logged in user
  const userId = req.user?.id;
  const orders = await prisma.order.findMany({
    where: {
      customerId: userId,
    },
    include: {
      lines: true,
      shop: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.status(200).json({ orders });
};
