// Helper function to generate random colors
export const generateColors = (count: number) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
  }
  return colors;
};

export function arrayToIndexedObject<T>(array: T[]): Record<number, T> {
  return array.reduce((acc, value, index) => {
    acc[index] = value;
    return acc;
  }, {} as Record<number, T>);
}

export function objectToArray<T>(obj: Record<number, T>): T[] {
  return Object.values(obj);
}


export function stringToBoolean(input: string): boolean {
  if (input == "true") {
      return true;
  } else if (input == "false") {
      return false;
  }
  return false;
}