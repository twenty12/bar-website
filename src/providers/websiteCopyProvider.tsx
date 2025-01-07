import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { WebsiteCopy } from "../types";

type WebsiteCopyContextType = {
  websiteCopies: WebsiteCopy[];
  fetchWebsiteCopies: () => Promise<void>;
};

const WebsiteCopyContext = createContext<WebsiteCopyContextType | undefined>(undefined);

export const WebsiteCopyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [websiteCopies, setWebsiteCopy] = useState<WebsiteCopy[]>([]);

  useEffect(() => {
    fetchWebsiteCopies();
  }, []);

  const fetchWebsiteCopies = async () => {
    console.log("fetching website copy");
    try {
      const response = await fetch(`/api/website-copy`);
      if (!response.ok) {
        throw new Error(`Error fetching website copy: ${response.statusText}`);
      }
      const data: WebsiteCopy[] = await response.json();
    setWebsiteCopy(data);
    } catch (error) {
      console.error("Failed to fetch website copy:", error);
    }
  };

  return (
    <WebsiteCopyContext.Provider
      value={{
        websiteCopies,
        fetchWebsiteCopies
      }}
    >
      {children}
    </WebsiteCopyContext.Provider>
  );
};

export const useWebsiteCopy = () => {
  const context = useContext(WebsiteCopyContext);
  if (!context) {
    throw new Error("useWebsiteCopy must be used within a WebsiteCopyProvider");
  }
  return context;
};