"use client";

import { Client } from "@/types/types";
import { createContext, useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export const globalClientsContext = createContext<{
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}>({ clients: [], setClients: () => {} });

const ClientesContext = ({ children }: { children: React.ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchLoads = async () => {
    try {
      const q = query(collection(db, "clients"));
      const querySnapshot = await getDocs(q);
      const newClients: Client[] = [];
      querySnapshot.forEach((doc) => {
        newClients.push(doc.data() as Client);
      });
      setClients(newClients);
    } catch (error) {
      console.error(error);
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  return (
    <globalClientsContext.Provider value={{ clients, setClients }}>
      {children}
    </globalClientsContext.Provider>
  );
};

export default ClientesContext;
