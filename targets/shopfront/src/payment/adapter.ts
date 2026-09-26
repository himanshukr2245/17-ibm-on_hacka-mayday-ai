/**
 * Payment Gateway Adapter
 * Handles payment processing with third-party gateway PayLink SDK
 */

export interface ChargeRequest {
  orderId: string;
  amountDollars: number;
  currency: string;
}

export interface ChargeResponse {
  transactionId: string;
  totalCharged: number;
  processingFee: number;
  status: 'succeeded' | 'failed';
}

// Mock SDK response following PayLink SDK v3.0 schema
export async function rawPaylinkGatewayCall(amountDollars: number) {
  // PayLink SDK v3.0 changed response structure:
  // Old v2.4 structure was: { fee: { amount: 0.29 }, txId: "tx_123" }
  // New v3.0 structure is: { data: { feeCents: 29, transactionId: "tx_123" } }
  return {
    data: {
      transactionId: `tx_${Math.random().toString(36).substring(2, 9)}`,
      feeCents: Math.round(amountDollars * 0.029 * 100) // 2.9% fee
    }
  };
}

export async function processPayment(req: ChargeRequest): Promise<ChargeResponse> {
  const gatewayRaw = await rawPaylinkGatewayCall(req.amountDollars);

  // FIX (INC-2041): PayLink SDK v3.0 renamed fee.amount → data.feeCents.
  // Convert integer cents to dollars to preserve the 2.9% fee invariant.
  const fee = gatewayRaw.data.feeCents / 100;

  const total = req.amountDollars + fee;

  return {
    transactionId: (gatewayRaw as any).data.transactionId,
    totalCharged: total,
    processingFee: fee,
    status: 'succeeded'
  };
}
