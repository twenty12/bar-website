export const formatEventDate = (date: string | null | undefined): string => {
  if (!date) return "--"; // Return fallback if the date is null or undefined

  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  } catch (error) {
    console.error("Invalid date passed to formatEventDate:", date);
    return "--"; // Fallback for invalid date
  }
};

export const formatEventTime = (date: string | null | undefined): string => {
    if (!date) return "--"; // Return fallback if the date is null or undefined
  
    try {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(date));
    } catch (error) {
      console.error("Invalid date passed to formatEventTime:", date);
      return "--"; // Fallback for invalid date
    }
  };