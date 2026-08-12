export function getMonthRange(monthStr: string): { start: string; end: string } {
  const [year, month] = monthStr.split('-').map(Number);

  const start = `${year}-${String(month).padStart(2, '0')}-01`;

  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  return { start, end };
}
