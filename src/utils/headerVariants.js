/**
 * Utility to assign random geometric shapes to headers
 * Each page gets unique shapes positioned around the edges based on the Figma design
 */

/**
 * Generate unique shapes data for a given pathname
 * Returns an object with shapes to render
 */
export function getHeaderShapes(pathname) {
  if (!pathname || pathname === "/") {
    return generateShapes(0);
  }

  // Simple hash function to convert pathname to a number
  let hash = 0;
  for (let i = 0; i < pathname.length; i++) {
    const char = pathname.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return generateShapes(Math.abs(hash));
}

function generateShapes(seed) {
  // Use seed to generate consistent but varied shapes
  const shapes = [];
  const colors = [
    "#00D4FF",
    "#3B82F6",
    "#06B6D4",
    "#8B5CF6",
    "#6366F1",
    "#EC4899",
    "#F472B6",
    "#DB2777",
  ];

  // Generate circles
  for (let i = 0; i < 4; i++) {
    const x = (seed + i * 23) % 95;
    const y = (seed + i * 37) % 90;
    const size = 6 + ((seed + i * 7) % 8);
    const color = colors[(seed + i * 3) % colors.length];
    shapes.push({ type: "circle", x, y, size, color });
  }

  // Generate triangles
  for (let i = 0; i < 5; i++) {
    const x = (seed + i * 19) % 95;
    const y = (seed + i * 41) % 90;
    const size = 5 + ((seed + i * 11) % 6);
    const color = colors[(seed + i * 5) % colors.length];
    shapes.push({ type: "triangle", x, y, size, color });
  }

  // Generate lines (dashes)
  for (let i = 0; i < 6; i++) {
    const x = (seed + i * 31) % 95;
    const y = (seed + i * 17) % 90;
    const length = 8 + ((seed + i * 13) % 10);
    const angle = (seed + i * 29) % 360;
    const color = colors[(seed + i * 7) % colors.length];
    shapes.push({ type: "line", x, y, length, angle, color });
  }

  return shapes;
}
