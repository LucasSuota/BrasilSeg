"use client";

import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { siglasEstadosBrasil } from "@/constants";
import { useContext, useEffect, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandList } from "cmdk";

import { LoadInputs } from "@/types/types";
import { globalClientsContext } from "@/context/clientsContext";
import { globalLoadsContext } from "@/context/loadsContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

const AddNewLoadForm = () => {
  const { register, handleSubmit, watch, setValue } = useForm<LoadInputs>();

  const clientsContext = useContext(globalClientsContext);
  const context = useContext(globalLoadsContext);

  const [clientValue, setClientValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleGetClients = async () => {};

    handleGetClients();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (clientValue !== "") {
        const selectedClient = clientsContext.clients.find(
          (client) => client.name === clientValue
        );

        await setDoc(doc(db, "payloads", data.cte), {
          date: data.date,
          cte: data.cte,
          truckPlate: data.truckPlate,
          sender: data.sender,
          senderUf: data.senderUf,
          receiver: data.receiver,
          receiverUf: data.receiverUf,
          insuranceAmount: getInsuranceAmount(),
          invoiceAmount: data.invoiceAmount,
          taxAmount: data.taxAmount,
          clientId: selectedClient?.name,
        });
      }
      toast.success("Carga adicionada com sucesso", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.warning("Verifique os dados", {
        position: "top-center",
      });
    }
  });

  const getInsuranceAmount = () => {
    let insuranceAmount = 0;
    const invoiceAmount = watch("invoiceAmount");
    const taxAmount = watch("taxAmount");

    if (invoiceAmount && taxAmount) {
      insuranceAmount =
        (parseFloat(invoiceAmount) * parseFloat(taxAmount)) / 100;
      return insuranceAmount.toFixed(2);
    }
  };

  return (
    <div className="w-2/5">
      <form onSubmit={onSubmit} autoComplete="off" className="mt-2">
        <Label htmlFor="date" className="mb-1">
          Data
          <Input
            className="w-full mt-1"
            type="date"
            id="date"
            {...register("date", { required: true })}
          />
        </Label>
        <div className="flex gap-2 mt-2">
          <Label htmlFor="cte" className="w-2/4 mb-1">
            CT-e
            <Input
              className="w-full mt-1"
              type="number"
              id="cte"
              {...register("cte", { required: true })}
            />
          </Label>
          <Label htmlFor="truckPlate" className="w-2/4 mb-1">
            Placa
            <Input
              className="mt-1"
              type="text"
              id="truckPlate"
              {...register("truckPlate", { required: true })}
            />
          </Label>
        </div>
        <div className="flex gap-2 mt-2">
          <Label htmlFor="sender" className="w-2/4 mb-1">
            Remetente
            <Input
              className="mt-1"
              type="text"
              id="sender"
              {...register("sender", { required: true })}
            />
          </Label>
          <Label htmlFor="senderUf" className="w-2/4 mb-1">
            UF do Remetente
            <select
              className="flex h-10 w-full rounded-md border mt-1 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("senderUf", { required: true })}
            >
              {siglasEstadosBrasil.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </Label>
        </div>
        <div className="flex gap-2 mt-2">
          <Label htmlFor="receiver" className="w-2/4 mb-1">
            Destinatário
            <Input
              className="mt-1"
              type="text"
              id="recipient"
              {...register("receiver", { required: true })}
            />
          </Label>
          <Label htmlFor="receiverUf" className="w-2/4 mb-1">
            UF do Destinatário
            <select
              className="flex h-10 w-full rounded-md mt-1 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("receiverUf", { required: true })}
            >
              {siglasEstadosBrasil.map((state) => (
                <option key={state} value={state} className="mt-1">
                  {state}
                </option>
              ))}
            </select>
          </Label>
        </div>
        <div className="flex mt-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {clientValue
                  ? clientsContext.clients.find(
                      (client) => client.name === clientValue
                    )?.name
                  : "Selecione o cliente..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0">
              <Command>
                <CommandInput
                  placeholder="Selecione um cliente..."
                  onValueChange={(value) => setValue("clientId", value)} // Set the value in the form state
                />
                <CommandEmpty>
                  Cadastre um cliente, nenhum encontrado
                </CommandEmpty>
                <CommandList>
                  {clientsContext.clients.map((client, index) => (
                    <CommandItem
                      key={index}
                      value={client.name}
                      onSelect={(currentValue) => {
                        setClientValue(
                          currentValue === clientValue ? "" : currentValue
                        );
                        setValue("clientId", currentValue); // Set the value in the form state
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          clientValue === client.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {client.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex mt-2 gap-2">
          <Label htmlFor="invoiceAmount" className="w-2/4 mb-1">
            Valor da NF (R$)
            <Input
              className="mt-1"
              placeholder="2000,00"
              type="number"
              id="invoiceAmount"
              step={0.01}
              {...register("invoiceAmount", { required: true })}
            />
          </Label>
          <Label htmlFor="taxAmount" className="w-2/4 mb-1">
            Taxa (%)
            <Input
              className="mt-1"
              placeholder="0,6"
              type="number"
              id="taxAmount"
              step={0.01}
              {...register("taxAmount", { required: true })}
            />
          </Label>
        </div>
        <div>
          <span className="text-sm text-[#177B3D] font-semibold mb-1">
            {getInsuranceAmount() && `Total seguro: R$${getInsuranceAmount()}`}
          </span>
        </div>
        <Button className="bg-[#177B3D] mt-10 w-full" type="submit">
          Adicionar
        </Button>
      </form>

      <ToastContainer autoClose={4000} />
    </div>
  );
};

export default AddNewLoadForm;
