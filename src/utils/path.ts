export function getFileName(filepath:string) {
  const pathParts = filepath.split("/");
  const fullFilename = pathParts[pathParts.length-1];
  return fullFilename.split(".").slice(0, -1).join(".")
}