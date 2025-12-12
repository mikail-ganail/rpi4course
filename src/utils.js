export function generateID() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// Alias with lower-case d to match existing imports
export const generateId = generateID;