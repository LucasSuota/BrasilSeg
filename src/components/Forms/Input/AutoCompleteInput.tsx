"use client";
import { useState, useContext, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { globalDataContext } from "@/contexts/dateContext";
import { DataType } from "@/types/types";

export function AutoCompleteInput() {
  const context = useContext(globalDataContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filteredClients, setFilteredClients] = useState<DataType[]>([]);

  useEffect(() => {
    const filtered = context.loads.filter(
      (client, index) =>
        client.data.client.indexOf(client.data.client) === index
    );

    setFilteredClients(filtered);
  }, [context.loads]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? context.loads.find((load) => load.data.client === value)?.data
                .client
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />

          <CommandGroup>
            {filteredClients.map((load) => (
              <CommandItem
                key={load.data.client}
                value={load.data.client}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === load.data.client ? "opacity-100" : "opacity-0"
                  )}
                />
                {load.data.client}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
