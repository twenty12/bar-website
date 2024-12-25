import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Event, Performer } from "../types";

// Context type definition
interface NotionContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
}

// Default context value
const NotionContextDefaultValue: NotionContextType = {
  events: [],
  loading: true,
  error: null,
};

// Create the context
const NotionContext = createContext<NotionContextType>(NotionContextDefaultValue);

// Helper function to fetch events from the API
const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch("/api/events"); // API endpoint for events
  if (!response.ok) {
    throw new Error(`Error fetching events: ${response.statusText}`);
  }
  return response.json();
};

// Helper function to fetch performers from the API
const fetchPerformers = async (): Promise<Record<string, Performer>> => {
  const response = await fetch("/api/performers"); // API endpoint for performers
  if (!response.ok) {
    throw new Error(`Error fetching performers: ${response.statusText}`);
  }
  return response.json();
};

// Provider component
export const NotionDBProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both events and performers
        const [eventData, performerData] = await Promise.all([fetchEvents(), fetchPerformers()]);

        // Map performers to their associated events
        const mappedEvents = eventData.map((event) => ({
          ...event,
          performers: event.performers ? event.performers.map((performerId: any) => performerData[performerId] || null) : [],
        }));

        setEvents(mappedEvents);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <NotionContext.Provider value={{ events, loading, error }}>
      {children}
    </NotionContext.Provider>
  );
};

// Custom hook to use the NotionContext
export const useNotionDB = () => useContext(NotionContext);