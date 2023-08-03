export default function checkIfExpired(date: Date): boolean {
  const now = new Date();
  return date < now;
}