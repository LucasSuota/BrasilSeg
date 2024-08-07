import AddClient from "@/components/Forms/AddClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { UserRoundPlus } from "lucide-react";

export function AddNewClient() {
  return (
    <Dialog>
      <DialogTrigger>
        <DialogHeader>
          <span className="flex px-4 border rounded-md items-center justify-start text-left font-normal text-muted-foreground hover:bg-green-100 h-10">
            <UserRoundPlus className="mr-2 h-4 w-4" />
            <span>Adicionar Cliente</span>
          </span>
        </DialogHeader>
      </DialogTrigger>
      <DialogContent className="min-w-full h-dvh flex flex-col justify-center items-center gap-10">
        <DialogTitle className="text-brasilGreen font-semibold">
          Adicione um novo cliente
        </DialogTitle>
        <DialogDescription />
        <AddClient />
      </DialogContent>
    </Dialog>
  );
}
