export default function checkIfExpired(date: Date, completed: boolean): boolean {
  const now = new Date();
  return (date < now && completed == false);
}