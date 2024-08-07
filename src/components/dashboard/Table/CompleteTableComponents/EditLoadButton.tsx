import { Load } from "@/types/types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SingleItemTable from "../SingleItemTable";

const EditLoadButton = ({ load }: { load: Load }) => {
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
            Você está editando a carga{" "}
            <span className="text-brasilGreen">{load.cte}</span>
          </SheetDescription>
          <SingleItemTable loads={load} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EditLoadButton;
