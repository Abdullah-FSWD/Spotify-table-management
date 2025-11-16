export const formatYear = (dateString: string | null | undefined): number => {
  if (!dateString || typeof dateString !== "string") return 0;

  try {
    const year = parseInt(dateString.split("-")[0], 10);
    return isNaN(year) ? 0 : year;
  } catch (error: unknown) {
    console.warn("Failed to parse year from:", dateString);
    console.log("error", error);
    return 0;
  }
};
