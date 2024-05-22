export const removeNullablesProps = <T extends object>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== null && value !== undefined
    )
  ) as T;
};
