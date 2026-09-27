/**
 * MAYDAY Telemetry & Financial Modeling
 * Centralized economic equations and MTTR metrics
 */

export const BLEED_RATE_PER_TICK = 1.45; // $1.45 per 100ms tick (~$14.50/s)
export const BLEED_START_AMOUNT = 145.0; // Initial outage baseline damage
export const HUMAN_COST_PER_INCIDENT = 900; // 3 SREs * 2.5 hrs * $120/hr
export const BOB_COST_PER_INCIDENT = 0.38; // ~0.38 Bobcoins / $0.38 USD

export function formatTimer(ms: number): string {
  const totalSecs = Math.floor(ms / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  const millis = Math.floor((ms % 1000) / 10);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
}

export function calcAnnualSavings(monthlyIncidents: number): number {
  return monthlyIncidents * (HUMAN_COST_PER_INCIDENT - BOB_COST_PER_INCIDENT) * 12;
}

export function calcOutageLoss(elapsedMs: number, speedMultiplier = 1): number {
  const ticks = elapsedMs / 100;
  return BLEED_START_AMOUNT + ticks * BLEED_RATE_PER_TICK * speedMultiplier;
}
