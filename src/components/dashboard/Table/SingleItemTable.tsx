"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table as MainTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { siglasEstadosBrasil } from "@/constants";

import { Load, LoadInputs } from "@/types/types";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
import { CommandList } from "cmdk";
import { cn } from "@/lib/utils";
import { globalClientsContext } from "@/context/clientsContext";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const tableRows = [
  "Data",
  "CTE",
  "Placa",
  "Remetente",
  "UF",
  "Destinatário",
  "UF",
  "Cliente",
  "Valor NF",
  "Seguro",
];

const SingleItemTable = ({ loads }: { loads: Load }) => {
  const { register, handleSubmit, setValue, watch } = useForm<LoadInputs>();

  const clientsContext = useContext(globalClientsContext);
  const [clientValue, setClientValue] = useState("");
  const [open, setOpen] = useState(false);

  const action: () => void = handleSubmit(async (data) => {
    try {
      const clientName = clientsContext.clients.find(
        (client) => client.name === clientValue
      );

      const currentDocRef = doc(db, "payloads", data.cte);
      const currentDocSnap = await getDoc(currentDocRef);

      if (currentDocSnap.exists() && data.cte !== loads.cte) {
        toast.error("CT-e já cadastrada!", {
          position: "top-center",
        });
      } else {
        await setDoc(currentDocRef, {
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
          clientId: clientName?.name,
        })
          .then(async () => {
            const oldDocRef = doc(db, "payloads", loads.cte);
            await deleteDoc(oldDocRef);
          })
          .finally(() => {
            toast.success("Sucesso ao atualizar carga", {
              position: "top-center",
            });
          });
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao atualizar carga", {
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
    <form
      action={action}
      className="flex flex-col items-center justify-center gap-8"
    >
      <MainTable className="w-full mx-2 m-auto mt-4">
        <TableHeader>
          <TableRow>
            {tableRows.map((key, index) => (
              <TableHead key={index}>{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Input
                className="w-full mt-1"
                defaultValue={new Date(loads.date)
                  .toLocaleDateString()
                  .split("/")
                  .reverse()
                  .join("-")}
                type="date"
                id="date"
                {...register("date", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Input
                defaultValue={loads.cte}
                className="w-full mt-1"
                type="number"
                id="cte"
                {...register("cte", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Input
                defaultValue={loads.truckPlate}
                className="mt-1"
                type="text"
                id="truckPlate"
                {...register("truckPlate", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Input
                defaultValue={loads.sender}
                className="mt-1"
                type="text"
                id="sender"
                {...register("sender", { required: true })}
              />
            </TableCell>
            <TableCell>
              <select
                defaultValue={loads.senderUf}
                className="flex h-10 w-full rounded-md border mt-1 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("senderUf", { required: true })}
              >
                {siglasEstadosBrasil.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </TableCell>
            <TableCell>
              <Input
                defaultValue={loads.receiver}
                className="mt-1"
                type="text"
                id="recipient"
                {...register("receiver", { required: true })}
              />
            </TableCell>
            <TableCell>
              <select
                defaultValue={loads.receiverUf}
                className="flex h-10 w-full rounded-md mt-1 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("receiverUf", { required: true })}
              >
                {siglasEstadosBrasil.map((state) => (
                  <option key={state} value={state} className="mt-1">
                    {state}
                  </option>
                ))}
              </select>
            </TableCell>
            <TableCell>
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
            </TableCell>

            <TableCell>
              <Input
                defaultValue={loads.invoiceAmount}
                className="mt-1"
                placeholder="2000,00"
                type="number"
                id="invoiceAmount"
                step={0.01}
                {...register("invoiceAmount", { required: true })}
              />
            </TableCell>

            <TableCell>
              <Input
                defaultValue={String(
                  (
                    (parseFloat(loads.insuranceAmount) /
                      parseFloat(loads.invoiceAmount)) *
                    100
                  ).toFixed(1)
                )}
                className="mt-1"
                placeholder="0,6"
                type="number"
                id="taxAmount"
                step={0.01}
                {...register("taxAmount", { required: true })}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </MainTable>
      <Button className="bg-[#177B3D] mb-4 float-end" type="submit">
        Salvar modificações
      </Button>
      <div>
        <span className="text-sm text-[#177B3D] font-semibold mb-1">
          {getInsuranceAmount() && `Total seguro: R$${getInsuranceAmount()}`}
        </span>
      </div>
      <ToastContainer autoClose={4000} />
    </form>
  );
};

export default SingleItemTable;
