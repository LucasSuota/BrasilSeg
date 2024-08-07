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
import { db } from "@/firebase";

import { Client } from "@/types/types";
import { doc, updateDoc } from "firebase/firestore";

import { useForm } from "react-hook-form";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const tableRows = [
  "Name",
  "Address",
  "County",
  "CNPJ/CPF",
  "Estado",
  "País",
  "CEP",
  "IE",
  "Telefone",
];

const SingleItemClient = ({ client }: { client: Client }) => {
  const { register, handleSubmit } = useForm<Client>();

  const getClientName = client.name;

  const action: () => void = handleSubmit(async (data) => {
    try {
      const ref = doc(db, "clients", getClientName);

      await updateDoc(ref, {
        name: data.name,
        address: data.address,
        county: data.county,
        cnpjcpf: data.cnpjcpf,
        state: data.state,
        country: data.country,
        zip: data.zip,
        ie: data.ie,
        telephone: data.telephone,
      });

      toast.success("Cliente atualizado com sucesso", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Erro ao atualizar cliente", {
        position: "top-center",
      });
      console.error(error);
    }
  });

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
                defaultValue={client.name}
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Input
                defaultValue={client.address}
                className="w-full mt-1"
                type="text"
                id="address"
                {...register("address", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Input
                defaultValue={client.county}
                className="mt-1"
                type="text"
                id="county"
                {...register("county", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Input
                defaultValue={client.cnpjcpf}
                className="mt-1"
                type="text"
                id="cnpjcpf"
                {...register("cnpjcpf", { required: true })}
              />
            </TableCell>

            <TableCell>
              <Input
                defaultValue={client.state}
                className="mt-1"
                type="text"
                id="state"
                {...register("state", { required: true })}
              />
            </TableCell>

            <TableCell>
              <Input
                defaultValue={client.country}
                className="mt-1"
                type="text"
                id="country"
                {...register("country", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Input
                defaultValue={client.zip}
                className="mt-1"
                type="text"
                id="zip"
                {...register("zip", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Input
                defaultValue={client.ie}
                className="mt-1"
                type="text"
                id="ie"
                {...register("ie", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Input
                defaultValue={client.telephone ? client.telephone : ""}
                className="mt-1"
                type="text"
                id="telephone"
                {...register("telephone", { required: true })}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </MainTable>
      <Button className="bg-[#177B3D] mb-4 float-end" type="submit">
        Salvar modificações
      </Button>

      <ToastContainer autoClose={4000} />
    </form>
  );
};

export default SingleItemClient;
