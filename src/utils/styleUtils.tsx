export const generateGradient = (name: string) => {
    // Generate a hash based on the name
    const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
    // Generate colors based on the hash
    const color1 = `hsl(${hash % 360}, 70%, 70%)`; // Hue from 0-360
    const color2 = `hsl(${(hash + 180) % 360}, 70%, 50%)`; // Opposite hue for contrast
  
    // Return the linear gradient
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  };