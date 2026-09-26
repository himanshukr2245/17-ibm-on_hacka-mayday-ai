// Shopfront Inventory Service
// Warehouse inventory tracking & reservation module

const inventoryDb: Record<string, number> = {
  'SKU-HOODIE-BLACK': 10,
  'SKU-TSHIRT-BLUE': 50,
};

export function resetInventory(sku: string, initialStock: number) {
  inventoryDb[sku] = initialStock;
}

export function getCurrentStock(sku: string): number {
  return inventoryDb[sku] ?? 0;
}

/**
 * Reserves inventory for a checkout request.
 * 
 * BUG (Incident B - INC-2042): Check-then-act concurrency race condition!
 * A recent commit replaced serial checkout with concurrent batching.
 * Between reading `currentStock` and decrementing it, an asynchronous I/O delay
 * allows concurrent requests to interleave, resulting in ghost 500 errors and negative stock.
 */
export async function reserveStock(
  sku: string, 
  qty: number
): Promise<{ success: boolean; remaining: number }> {
  // 1. Check current stock
  const currentStock = inventoryDb[sku] ?? 0;

  // Simulated async database / remote storage latency gap (10ms)
  await new Promise((resolve) => setTimeout(resolve, 10));

  // 2. Validate availability
  if (currentStock < qty) {
    return { success: false, remaining: currentStock };
  }

  // 3. Decrement stock (RACE: Multiple requests reach here with stale currentStock)
  inventoryDb[sku] = currentStock - qty;
  return { success: true, remaining: inventoryDb[sku] };
}
