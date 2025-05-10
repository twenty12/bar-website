import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Event, Performer } from "../types";

// Context type definition
interface NotionContextType {
  events: Event[];
  eventBySlug: Record<string, Event>;
  performersByInstagram: Record<string, Performer>;
  performersById: Record<string, Performer>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Default context value
const NotionContextDefaultValue: NotionContextType = {
  events: [],
  eventBySlug: {},
  performersByInstagram: {},
  performersById: {},
  loading: true,
  error: null,
  refetch: async () => {},
};

// Create the context
const NotionContext = createContext<NotionContextType>(NotionContextDefaultValue);

// Helper function to fetch events from the API
const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch("/api/events");
  if (!response.ok) {
    throw new Error(`Error fetching events: ${response.statusText}`);
  }
  return response.json();
};

// Helper function to fetch performers from the API
const fetchPerformers = async (): Promise<Performer[]> => {
  const response = await fetch("/api/performers");
  if (!response.ok) {
    throw new Error(`Error fetching performers: ${response.statusText}`);
  }
  return response.json();
};

// Transform performers list into dictionaries
const transformPerformersToDict = (performers: Performer[]): { byId: Record<string, Performer>; byInstagram: Record<string, Performer> } => {
  return performers.reduce<{ byId: Record<string, Performer>; byInstagram: Record<string, Performer> }>(
    (acc, performer) => {
      acc.byId[performer.id] = performer;
      if (performer.instagram) {
        acc.byInstagram[performer.instagram] = performer;
      }
      return acc;
    },
    { byId: {}, byInstagram: {} }
  );
};

// Provider component
export const NotionDBProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventBySlug, setEventBySlug] = useState<Record<string, Event>>({});
  const [performersByInstagram, setPerformersByInstagram] = useState<Record<string, Performer>>({});
  const [performersById, setPerformersById] = useState<Record<string, Performer>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchData = async () => {
    if (loading && isInitialized) return; // Prevent multiple simultaneous fetches
    
    try {
      setLoading(true);
      // Fetch events and performers
      const [eventData, performerList] = await Promise.all([fetchEvents(), fetchPerformers()]);
      
      // Transform performers into lookup dictionaries
      const { byId, byInstagram } = transformPerformersToDict(performerList);
      
      // Map performers to their associated events
      const mappedEvents = eventData.map((event) => ({
        ...event,
        performers: event.performers
          ? event.performers
              .map((performerId: any) => byId[performerId] || null)
              .filter((performer) => performer !== null)
          : [],
      }));

      const eventDictionaryBySlug = mappedEvents.reduce<Record<string, Event>>((acc, event) => {
        acc[event.slug] = event;
        return acc;
      }, {});

      // Update state
      setEvents(mappedEvents);
      setEventBySlug(eventDictionaryBySlug);
      setPerformersById(byId);
      setPerformersByInstagram(byInstagram);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      fetchData();
    }
  }, [isInitialized]);

  return (
    <NotionContext.Provider value={{ 
      events, 
      eventBySlug, 
      performersByInstagram, 
      performersById, 
      loading, 
      error,
      refetch: fetchData 
    }}>
      {children}
    </NotionContext.Provider>
  );
};

// Custom hook to use the NotionContext
export const useNotionDB = () => useContext(NotionContext);