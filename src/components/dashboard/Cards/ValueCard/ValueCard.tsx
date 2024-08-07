"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { globalDateContext } from "@/context/dateContext";
import { useContext } from "react";


const ValueCard = ({
  title,
  amount = "0",
  type,
}: {
  title: string;
  amount: string;
  type: string;
}) => {
  const { date } = useContext(globalDateContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md m-[0px]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl text-[#177B3D] font-bold">
          {type == "MONEY"
            ? `${new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(parseFloat(amount))}`
            : `${amount}`}
        </p>
      </CardContent>
      <CardFooter className="text-sm">
        {date ? (
          date.to ? (
            <p className="text-[#AAAAAA]">{`${date.from?.toLocaleDateString()} - ${date.to?.toLocaleDateString()}`}</p>
          ) : (
            <p className="text-[#AAAAAA]">{`${date.from?.toLocaleDateString()}`}</p>
          )
        ) : (
          <p className="text-[#AAAAAA]">{`Todos`}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default ValueCard;
