import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Event, Performer } from "../types";

// Context type definition
interface NotionContextType {
  events: Event[];
  eventBySlug: Record<string, Event>;
  loading: boolean;
  error: string | null;
}

// Default context value
const NotionContextDefaultValue: NotionContextType = {
  events: [],
  eventBySlug: {},
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
const fetchPerformers = async (): Promise<Performer[]> => {
  const response = await fetch("/api/performers"); // API endpoint for performers
  if (!response.ok) {
    throw new Error(`Error fetching performers: ${response.statusText}`);
  }
  return response.json();
};

// Transform performers list into a dictionary
const transformPerformersToDict = (performers: Performer[]): Record<string, Performer> => {
  return performers.reduce<Record<string, Performer>>((acc, performer) => {
    acc[performer.id] = performer;
    return acc;
  }, {});
};

// Provider component
export const NotionDBProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventBySlug, setEventBySlug] = useState<Record<string, Event>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events and performers
        const [eventData, performerList] = await Promise.all([fetchEvents(), fetchPerformers()]);

        // Transform performers into a dictionary
        const performerData = transformPerformersToDict(performerList);

        // Map performers to their associated events
        const mappedEvents = eventData.map((event) => ({
          ...event,
          performers: event.performers
            ? event.performers.map((performerId: any) => performerData[performerId] || null)
            : [],
        }));
        const eventDictionaryBySlug = mappedEvents.reduce<Record<string, Event>>((acc, event) => {
          acc[event.slug] = event;
          return acc;
        }, {});

        // Update state
        setEvents(mappedEvents);
        setEventBySlug(eventDictionaryBySlug);
        // setEventById(eventDictionaryById);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <NotionContext.Provider value={{ events, eventBySlug, loading, error }}>
      {children}
    </NotionContext.Provider>
  );
};

// Custom hook to use the NotionContext
export const useNotionDB = () => useContext(NotionContext);