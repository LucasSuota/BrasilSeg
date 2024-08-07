"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/types/types";
import EditLoadButton from "../CompleteTableComponents/EditLoadButton";
import DeleteLoad from "../DeleteLoad";
import { EditClientButton } from "./editClientButton";
import { DeleteClientButton } from "./deleteClientButton";

export const clientsTableManagement: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "county",
    header: "Município",
  },
  {
    accessorKey: "cnpjcpf",
    header: "CPF/CNPJ",
  },
  {
    accessorKey: "state",
    header: "UF",
  },
  {
    accessorKey: "country",
    header: "País",
  },
  {
    accessorKey: "zip",
    header: "CEP",
  },

  {
    accessorKey: "ie",
    header: "IE",
  },
  {
    accessorKey: "telephone",
    header: "Telefone",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1">
            <EditClientButton client={client} />
            <DeleteClientButton client={client} />
          </div>
        </div>
      );
    },
  },
];
