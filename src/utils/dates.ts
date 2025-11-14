/**
 * Utilidades de fechas
 */
export const nowIso = (): string => new Date().toISOString().replace(/[:]/g, '-');

export const addDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};