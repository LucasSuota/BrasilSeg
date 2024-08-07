"use client";

import { db } from "@/firebase";
import { Load, LoadInputs } from "@/types/types";
import { collection, getDocs, query } from "firebase/firestore";
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
      const q = query(collection(db, "payloads"));
      const querySnapshot = await getDocs(q);
      const newLoads: Load[] = [];
      querySnapshot.forEach((doc) => {
        newLoads.push(doc.data() as Load);
      });
      setLoads(newLoads);
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
