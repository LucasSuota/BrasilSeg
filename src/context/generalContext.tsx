"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { globalDateContext } from "./dateContext";
import { globalLoadsContext } from "./loadsContext";
import { filterLoadData } from "@/utils/filterLoadData";
import { Load } from "@/types/types";
import { globalClientsContext } from "./clientsContext";
import { convertIdIntoClient } from "@/utils/convertIdIntoClient";
import { getPayloads } from "@/services/firebaseFunction";

export const generalContext = createContext<{
  updatedLoads: Load[];
  setUpdatedLoads: React.Dispatch<React.SetStateAction<Load[]>>;
}>({ updatedLoads: [], setUpdatedLoads: () => {} });

const GeneralContext = ({ children }: { children: React.ReactNode }) => {
  const dateContext = useContext(globalDateContext);
  const loads = useContext(globalLoadsContext);
  const clients = useContext(globalClientsContext);

  const [updatedLoads, setUpdatedLoads] = useState<Load[]>([]);

  useEffect(() => {
    const fetchLoads = async () => {
      let allLoads: Load[] = [];
      for (const client of clients.clients) {
        const payload = await getPayloads(client.cnpjcpf);
        allLoads = [...allLoads, ...payload];
      }
      console.log(allLoads);
      setUpdatedLoads(allLoads);
    };

    fetchLoads();
  }, [dateContext.date, loads.loads, clients.clients]);

  return (
    <generalContext.Provider value={{ updatedLoads, setUpdatedLoads }}>
      {children}
    </generalContext.Provider>
  );
};

export default GeneralContext;
