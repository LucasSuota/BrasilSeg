"use client";

import { Load, LoadInputs } from "@/types/types";
import { createContext, useEffect, useState } from "react";

export const globalLoadsContext = createContext<{
  loads: Load[];
  setLoads: React.Dispatch<React.SetStateAction<Load[]>>;
  fetchLoads: () => Promise<void>;
}>({ loads: [], setLoads: () => {}, fetchLoads: async () => {} });

const LoadsContext = ({ children }: { children: React.ReactNode }) => {
  const [loads, setLoads] = useState<Load[]>([]);

  const fetchLoads = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  return (
    <globalLoadsContext.Provider value={{ loads, setLoads, fetchLoads }}>
      {children}
    </globalLoadsContext.Provider>
  );
};

export default LoadsContext;
