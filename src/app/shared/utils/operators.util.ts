export const isNullish = (
  value: unknown
): value is unknown | null | undefined => {
  return value === null || value === undefined;
};
