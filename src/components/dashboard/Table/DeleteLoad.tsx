"use client";

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

import { Load } from "@/types/types";
import { useContext } from "react";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const DeleteLoad = ({ load }: { load: Load }) => {
  const context = useContext(globalLoadsContext);

  const handleDeleteLoad = async () => {
    try {

      toast.success("Carga excluída com sucesso", {
        position: "top-center",
      });

      await context.fetchLoads();
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
            Tem certeza que deseja excluir a carga {load.cte}?
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
};

export default DeleteLoad;
