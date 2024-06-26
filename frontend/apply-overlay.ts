export function applyOverlay(
  data: Uint8ClampedArray,
  info: {
    center: number[];
    color: number[];
    width: number;
    radius: number;
  },
): void {
  const { center, color, radius, width } = info;
  for (let i = 0; i < data.length; i += 4) {
    const x = Math.floor(i / (width * 4));
    const y = (i % (width * 4)) / 4;
    const alignedCenter = [center[0] - 0.5, center[1] - 0.5];
    if (
      Math.abs(alignedCenter[1] - x) <= radius &&
      Math.abs(alignedCenter[0] - y) <= radius
    ) {
      // do some extra blocking here
      if (
        Math.abs(alignedCenter[1] - x) + Math.abs(alignedCenter[0] - y) <
        radius
      ) {
        continue;
      }
      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
    }
  }
}
