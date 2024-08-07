"use client";

import { clientsTableManagement } from "../Table/ClientsTable/clientsTableColumns";
import { useContext } from "react";


import { ClientsTable } from "../Table/ClientsTable/clientsTable";
import { globalClientsContext } from "@/context/clientsContext";

export function ClientsManagement() {
  const clientContextData = useContext(globalClientsContext);

  return (
    <div>
      <ClientsTable
        columns={clientsTableManagement}
        data={clientContextData.clients.map((client) => client)}
      />
    </div>
  );
}
