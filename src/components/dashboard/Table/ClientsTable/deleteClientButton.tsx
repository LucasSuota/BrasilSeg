import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { globalLoadsContext } from "@/context/loadsContext";
import { Client } from "@/types/types";

import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

export function DeleteClientButton({ client }: { client: Client }) {
  const loads = useContext(globalLoadsContext);

  const handleDeleteLoad = async () => {
    try {
      const checkIfUserHasLoads = loads.loads.filter(
        (load) => load.clientId === String(client.id)
      );
      if (checkIfUserHasLoads.length > 0) {
        toast.warning(
          "Cliente possui cargas cadastradas, exclua as cargas antes de excluir o cliente"
        );
      } else {
        if (client.id)
          toast.success("Cliente excluído com sucesso", {
            position: "top-center",
          });
      }
    } catch (error) {
      toast.error("Erro ao excluir carga", {
        position: "top-center",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="text-xs px-4 py-2 border rounded-md hover hover:bg-red-100 hover:text-red-600 cursor-pointer">
          Excluir
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir o cliente {client.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Uma vez excluído não será possível recuperar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <form action={handleDeleteLoad}>
            <AlertDialogAction type="submit">Deletar</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
      <ToastContainer autoClose={4000} />
    </AlertDialog>
  );
}
