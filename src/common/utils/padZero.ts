export const padZero = (value: string | number | undefined) => {
  return String(value ?? 0).padStart(2, "0");
};
