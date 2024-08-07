import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Client } from "@/types/types";
import SingleItemClient from "./singleItemClient";

export function EditClientButton({ client }: { client: Client }) {
  return (
    <Sheet>
      <SheetTrigger>
        <span className="text-xs px-4 py-2 border rounded-md hover:bg-slate-100 hover:text-slate-600 cursor-pointer ">
          Editar
        </span>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader className="flex flex-col items-center justify-center">
          <SheetTitle>Editar</SheetTitle>
          <SheetDescription>
            Você está editando{" "}
            <span className="text-brasilGreen">{client.name}</span>
          </SheetDescription>
          <SingleItemClient client={client} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
