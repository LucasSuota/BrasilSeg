"use client";

import { useForm } from "react-hook-form";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Client } from "@/types/types";
import { db } from "@/firebase";

const AddClient = () => {
  const { register, handleSubmit } = useForm<Client>();

  const action: () => void = handleSubmit(async (data) => {
    try {
      await setDoc(doc(db, "clients", data.name), {
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

      toast.success("Cliente adicionado com sucesso", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar cliente", {
        position: "top-center",
      });
    }
  });

  return (
    <>
      <form action={action} className="min-w-2/5 w-2/5 grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="João"
              {...register("name", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              placeholder="Avenida ..."
              {...register("address", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="county">Município</Label>
            <Input
              id="county"
              placeholder="Curitiba"
              {...register("county", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cnpjcpf">CNPJ/CPF</Label>
            <Input
              id="cnpjcpf"
              placeholder="12345678910"
              {...register("cnpjcpf", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="state">UF</Label>
            <Input
              id="state"
              placeholder="PR"
              {...register("state", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              placeholder="Brasil"
              {...register("country", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="zip">CEP</Label>
            <Input
              id="zip"
              placeholder="83730000"
              {...register("zip", { required: true })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ie">IE</Label>
            <Input
              id="ie"
              placeholder="1234567890"
              {...register("ie", { required: true })}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="telephone">Telefone (opcional)</Label>
          <Input
            id="telephone"
            placeholder="(12)123456789"
            {...register("telephone", { required: false })}
          />
        </div>
        <Button type="submit" className="w-full ml-auto bg-brasilgreen">
          Adicionar Cliente
        </Button>
      </form>
      <ToastContainer autoClose={4000} />
    </>
  );
};

export default AddClient;
