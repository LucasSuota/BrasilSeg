"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { globalDateContext } from "./dateContext";
import { globalLoadsContext } from "./loadsContext";
import { filterLoadData } from "@/utils/filterLoadData";
import { Load } from "@/types/types";
import { globalClientsContext } from "./clientsContext";
import { convertIdIntoClient } from "@/utils/convertIdIntoClient";

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
    const getFilteredLoads = async () => {
      const convertedLoads = convertIdIntoClient(clients.clients, loads.loads);
      const filteredData = filterLoadData(
        dateContext.date!,
        convertedLoads as Load[]
      );

      if (filteredData) setUpdatedLoads(filteredData as Load[]);
    };

    getFilteredLoads();
  }, [dateContext.date, loads.loads, clients.clients]);

  return (
    <generalContext.Provider value={{ updatedLoads, setUpdatedLoads }}>
      {children}
    </generalContext.Provider>
  );
};

export default GeneralContext;
