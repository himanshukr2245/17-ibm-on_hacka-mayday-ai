// Shopfront Inventory Service
// Warehouse inventory tracking & reservation module

const inventoryDb: Record<string, number> = {
  'SKU-HOODIE-BLACK': 10,
  'SKU-TSHIRT-BLUE': 50,
};

export function resetInventory(sku: string, initialStock: number) {
  inventoryDb[sku] = initialStock;
  // Clear any pending queue tail for this SKU so tests start fresh
  skuQueue.delete(sku);
}

export function getCurrentStock(sku: string): number {
  return inventoryDb[sku] ?? 0;
}

/**
 * Per-SKU async mutex: maps each SKU to the tail of its serialised promise chain.
 * Every new reservation atomically appends itself to the chain so that concurrent
 * calls are queued and execute one-at-a-time per SKU, eliminating the
 * check-then-act race condition that caused INC-2042.
 */
const skuQueue = new Map<string, Promise<unknown>>();

export async function reserveStock(
  sku: string,
  qty: number
): Promise<{ success: boolean; remaining: number }> {
  // Grab the current tail (or a resolved promise if the queue is empty)
  const tail = skuQueue.get(sku) ?? Promise.resolve();

  // Build the next task: wait for the previous one, then run our critical section
  const next = tail.then(async () => {
    // 1. Read stock – now guaranteed to see all previous writes for this SKU
    const currentStock = inventoryDb[sku] ?? 0;

    // Simulated async database / remote storage latency gap (10ms)
    await new Promise((resolve) => setTimeout(resolve, 10));

    // 2. Validate availability
    if (currentStock < qty) {
      return { success: false, remaining: currentStock };
    }

    // 3. Decrement stock – no concurrent request can interleave here
    inventoryDb[sku] = currentStock - qty;
    return { success: true, remaining: inventoryDb[sku] };
  });

  // Advance the tail; swallow errors so a failed reservation never stalls the queue
  skuQueue.set(sku, next.catch(() => {}));

  return next;
}
