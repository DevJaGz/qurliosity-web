export const getExtensionFromName = (fileName: string): string | null => {
  const extension = fileName.split('.').pop();
  return extension || null;
};
