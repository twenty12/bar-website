import React from "react";

export const formatEventDate = (date: string | null | undefined): string => {
  if (!date) return "--";

  let parsedDate: Date;
  if (date.length === 10) {
    const [year, month, day] = date.split("-").map(Number);
    parsedDate = new Date(year, month - 1, day);
  } else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date passed to formatEventDate:", date);
    return "--";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(parsedDate);
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
    if (date.length === 10) {
      return '';
    }
    const result = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date));

    try {
      return result;
    } catch (error) {
      console.error("Invalid date passed to formatEventTime:", date);
      return "--"; // Fallback for invalid date
    }
  };