"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Load } from "@/types/types";
import GenerateSheetButton from "./CompleteTableComponents/GenerateSheetButton";
import EditLoadButton from "./CompleteTableComponents/EditLoadButton";
import DeleteLoad from "./DeleteLoad";

export const columns: ColumnDef<Load>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = new Intl.DateTimeFormat("pt-BR").format(date);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "cte",
    header: "CT-e",
  },
  {
    accessorKey: "truckPlate",
    header: "Placa",
  },
  {
    accessorKey: "sender",
    header: "Remetente",
  },
  {
    accessorKey: "senderUf",
    header: "UF",
  },
  {
    accessorKey: "receiver",
    header: "Destinatário",
  },
  {
    accessorKey: "receiverUf",
    header: "UF",
  },
  {
    accessorKey: "insuranceAmount",
    header: "Seguro",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("insuranceAmount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "clientId",
    header: "Cliente",
  },
  {
    accessorKey: "invoiceAmount",
    header: "Valor NF",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("invoiceAmount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const load = row.original;

      return (
        <div className="flex flex-col gap-1 items-center justify-center">
          <GenerateSheetButton name={load.clientId} />
          <div className="flex flex-row gap-1">
            <EditLoadButton load={load} />
            <DeleteLoad load={load} />
          </div>
        </div>
      );
    },
  },
];
