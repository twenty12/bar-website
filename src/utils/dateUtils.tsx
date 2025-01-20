import React from "react";

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

export const formatArchivedEventDate = (date: string | null | undefined): React.ReactNode => {
  if (!date) return "--"; // Return fallback if the date is null or undefined

  try {
    const parsedDate = new Date(date);
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(parsedDate);
    const year = parsedDate.getFullYear().toString(); // Full year
    return (
      <>
        {month}
        <br />
        {year}
      </>
    );
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