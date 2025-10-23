export function generateID() {
  return Date.now().toString() + Math.random().toString();
}
