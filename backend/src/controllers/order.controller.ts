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
