import { processPayment } from '../payment/adapter';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
}

export interface CheckoutRequest {
  orderId: string;
  userId: string;
  items: OrderItem[];
}

export async function handleCheckout(req: CheckoutRequest) {
  const subtotal = req.items.reduce((sum, item) => sum + item.price, 0);

  // Calls payment adapter
  const paymentResult = await processPayment({
    orderId: req.orderId,
    amountDollars: subtotal,
    currency: 'USD'
  });

  return {
    orderId: req.orderId,
    status: 'CONFIRMED',
    subtotal: subtotal,
    fee: paymentResult.processingFee,
    totalCharged: paymentResult.totalCharged,
    transactionId: paymentResult.transactionId
  };
}
