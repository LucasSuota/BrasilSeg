"use client";

type Input = {
  title: string;
};

import { Button } from "@/components/ui/button";;
import { FileSpreadsheet } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import XLSX from "xlsx";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";

import { DialogDescription } from "@radix-ui/react-dialog";
import { generalContext } from "@/context/generalContext";
import { globalDateContext } from "@/context/dateContext";
import { generateSheet } from "@/utils/generateSheet";

const GenerateSheet = () => {
  const context = useContext(generalContext);
  const dateContext = useContext(globalDateContext);

  const { register, handleSubmit } = useForm<Input>();
  const [defaultValue, setDefaultValue] = useState<String>("");

  useEffect(() => {
    if (
      dateContext.date?.to !== undefined &&
      dateContext.date?.from !== undefined
    ) {
      setDefaultValue(
        `${dateContext.date?.from.toDateString()}-${dateContext.date?.to.toDateString()}`
      );
    } else if (dateContext.date?.from !== undefined) {
      setDefaultValue(`${dateContext.date?.from.toDateString()}`);
    } else {
      setDefaultValue("Todos");
    }
  }, [dateContext.date?.from, dateContext.date?.to]);

  const onSubmit = (data: Input) => {
    generateSheet({
      loads: context.updatedLoads,
      fileName: data.title,
    });
  };

  return (
    <span className="flex px-2 border rounded-md justify-start text-left font-normal text-muted-foreground ms-4 hover:bg-green-100">
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center justify-center">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            <span>Gerar Excel</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#177B3D]">
              Salvar em Excel
            </DialogTitle>
            <DialogDescription>
              Seu arquivo será salvo com este título
            </DialogDescription>
            <div className="mt-4 mb-4">
              <div className="flex mt-10 items-end justify-center">
                <Input
                  type="text"
                  className=" w-4/5"
                  defaultValue={defaultValue as string}
                  placeholder={defaultValue as string}
                  {...register("title", { required: true })}
                />
                <span className="ms-2">.xlsx</span>
              </div>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                variant="outline"
                className="mt-10 justify-end float-end text-left font-normal text-muted-foreground hover:bg-green-100"
              >
                Gerar
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </span>
  );
};

export default GenerateSheet;
