import { describe, it, expect, beforeEach } from 'vitest';
import { reserveStock, resetInventory, getCurrentStock } from '../src/inventory/service';

describe('Inventory Reservation Concurrency Invariant Test', () => {
  beforeEach(() => {
    // Reset warehouse inventory to 10 hoodies before each test
    resetInventory('SKU-HOODIE-BLACK', 10);
  });

  it('should prevent overselling and negative stock under high concurrency (INC-2042)', async () => {
    const initialStock = 10;
    const concurrentRequests = 20;

    // Fire 20 concurrent reservation requests for 1 hoodie each
    const results = await Promise.all(
      Array.from({ length: concurrentRequests }, () => 
        reserveStock('SKU-HOODIE-BLACK', 1)
      )
    );

    const successful = results.filter((r) => r.success);
    const rejected = results.filter((r) => !r.success);
    const finalStock = getCurrentStock('SKU-HOODIE-BLACK');

    // INVARIANT 1: We must NEVER sell more items than available
    expect(successful.length).toBe(initialStock);

    // INVARIANT 2: Excess requests must fail gracefully with stock-exhausted
    expect(rejected.length).toBe(concurrentRequests - initialStock);

    // INVARIANT 3: Inventory balance must NEVER become negative
    expect(finalStock).toBe(0);
    expect(finalStock).toBeGreaterThanOrEqual(0);
  });
});
