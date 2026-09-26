import { describe, it, expect } from 'vitest';
import { handleCheckout } from '../src/orders/checkout';

describe('Checkout Processing Invariant Test', () => {
  it('should successfully complete checkout with correct 2.9% fee calculation', async () => {
    const order = {
      orderId: 'ord_9981',
      userId: 'usr_44',
      items: [
        { id: 'item_1', name: 'Developer T-Shirt', price: 10.00 }
      ]
    };

    // When the bug exists, this throws:
    // TypeError: Cannot read properties of undefined (reading 'amount')
    const result = await handleCheckout(order);

    expect(result.status).toBe('CONFIRMED');
    expect(result.subtotal).toBe(10.00);

    // CRUCIAL INVARIANT: The fee must be 29 cents ($0.29)
    // A lazy AI patch like `res.fee?.amount ?? 0` charges $0 fee and fails here!
    expect(result.fee).toBeCloseTo(0.29, 2);
    expect(result.totalCharged).toBeCloseTo(10.29, 2);
  });
});
