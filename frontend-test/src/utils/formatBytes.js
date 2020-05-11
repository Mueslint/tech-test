// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

export function formatBytes(bytes) {
  if (bytes === 0) return 0;
  return parseFloat((bytes / 1073741824).toFixed(2));
}
