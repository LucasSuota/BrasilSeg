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

import { DatePickerWithRange } from "../DatePicker/DatePickerWithRange";
import AddNewLoad from "./CompleteTableComponents/AddNewLoad";
import GenerateSheet from "./CompleteTableComponents/GenerateSheet";
import Sheet from "./CompleteTableComponents/Sheet";
import FilterInput from "./CompleteTableComponents/FilterInput";
import PreviousNext from "./CompleteTableComponents/PreviousNext";
import { GetRowsValue } from "./GetRowsValue";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CompleteTable<TData, TValue>({
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
      <div className="flex flex-row justify-between w-full py-4">
        <DatePickerWithRange />
        <div className="flex flex-row">
          <AddNewLoad />
          <GenerateSheet />
        </div>
      </div>
      <Sheet table={table} />
      <GetRowsValue table={table} />
      <div className="flex items-center justify-between">
        <FilterInput table={table} columnToFilter="clientId" />
        <PreviousNext table={table} />
      </div>
    </div>
  );
}
