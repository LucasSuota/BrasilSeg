"use client";

import { Load } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";
import { globalClientsContext } from "./clientsContext";
import { getPayloads } from "@/services/firebaseFunction";

export const globalLoadsContext = createContext<{
  loads: Load[];
  setLoads: React.Dispatch<React.SetStateAction<Load[]>>;
  fetchLoads: () => Promise<void>;
}>({ loads: [], setLoads: () => {}, fetchLoads: async () => {} });

const LoadsContext = ({ children }: { children: React.ReactNode }) => {
  const [loads, setLoads] = useState<Load[]>([]);

  const clients = useContext(globalClientsContext);

  const fetchLoads = async () => {
    try {
      let allLoads: Load[] = [];
      clients.clients.forEach(async (client) => {
        const payload = await getPayloads(client.cnpjcpf);
        allLoads = [...allLoads, ...payload];
      });

      console.log(allLoads);
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
