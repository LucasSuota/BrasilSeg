
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Image } from "@radix-ui/react-avatar";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { NotebookText } from "lucide-react";

export function InvoiceGeneration() {
  return (
    <Dialog>
      <DialogTrigger>
        <DialogHeader>
          <span className="flex px-4 border rounded-md items-center justify-start text-left font-normal text-muted-foreground hover:bg-green-100 h-10">
            <NotebookText className="mr-2 h-4 w-4" />
            <span>Gerar Notas</span>
          </span>
        </DialogHeader>
      </DialogTrigger>
      <DialogContent className="min-w-full h-dvh flex flex-col justify-center items-center gap-2">
        <DialogTitle className="text-brasilGreen font-semibold"></DialogTitle>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
