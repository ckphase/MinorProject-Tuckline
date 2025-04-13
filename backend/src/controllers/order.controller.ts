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

export const updateOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  const status = req.body.status;

  const isAdmin = req.user?.role === 'admin';
  if (!isAdmin) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  // Check if the order exists
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      shop: {
        ownerId: req.user?.id,
      },
    },
    select: { id: true },
  });
  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
  res.status(200).json({
    message: 'Order status updated successfully',
    order: updatedOrder,
  });
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
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        lines: {
          include: {
            productVariant: {
              select: {
                image: true,
              },
            },
          },
        },
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
      customer: true,
      lines: true,
      shop: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.status(200).json({ orders });
};
