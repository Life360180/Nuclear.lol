export async function compressImageFile(
  file: File,
  opts: { maxEdge: number; maxBytes: number; quality?: number } = {
    maxEdge: 1280,
    maxBytes: 140_000,
  },
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file.");
  }
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, opts.maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process that image.");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let quality = opts.quality ?? 0.82;
  let data = canvas.toDataURL("image/jpeg", quality);
  while (data.length > opts.maxBytes && quality > 0.42) {
    quality -= 0.08;
    data = canvas.toDataURL("image/jpeg", quality);
  }
  if (data.length > opts.maxBytes) {
    throw new Error("Image is still too large. Try a smaller file.");
  }
  return data;
}
