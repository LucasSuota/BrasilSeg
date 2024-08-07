"use client";

import {
  ColumnDef,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import { useState } from "react";
import Sheet from "../CompleteTableComponents/Sheet";
import FilterInput from "../CompleteTableComponents/FilterInput";
import PreviousNext from "../CompleteTableComponents/PreviousNext";

import { AddNewClient } from "./addNewClientDialog";
import { InvoiceGeneration } from "../../Invoice/InvoiceGenerator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ClientsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between w-full py-4 gap-4">
        <InvoiceGeneration />
        <AddNewClient />
      </div>
      <Sheet table={table} />
      <div className="flex items-center justify-between">
        <FilterInput table={table} columnToFilter="name" />
        <PreviousNext table={table} />
      </div>
    </div>
  );
}
