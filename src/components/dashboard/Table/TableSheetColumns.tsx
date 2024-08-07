"use client";

import { PreLoad } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const SheetColumns: ColumnDef<PreLoad>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
