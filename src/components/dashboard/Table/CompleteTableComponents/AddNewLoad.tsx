import { Truck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddNewLoadForm from "@/components/Forms/AddNewLoadForm";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const AddNewLoad = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <DialogHeader>
          <span className="flex px-4 border rounded-md items-center justify-start text-left font-normal text-muted-foreground ms-4 hover:bg-green-100 h-10">
            <Truck className="mr-2 h-4 w-4" />
            <span>Adicionar Carga</span>
          </span>
        </DialogHeader>
      </DialogTrigger>
      <DialogContent className="min-w-full h-dvh flex flex-col justify-center items-center gap-10">
        <DialogTitle className="text-brasilGreen font-semibold">
          Adicione uma nova carga
        </DialogTitle>
        <DialogDescription />
        <AddNewLoadForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewLoad;
