import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext } from "react";
import { generalContext } from "@/context/generalContext";

const TableSheet = () => {
  const context = useContext(generalContext);

  return (
    <ScrollArea className="h-[350px] w-2/4 rounded-md border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>CT-e</TableHead>
            <TableHead className="text-right">Seguro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {context.updatedLoads &&
            context.updatedLoads.map((load, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{load.clientId}</TableCell>
                <TableCell>
                  {Intl.DateTimeFormat("pt-BR").format(new Date(load.date))}
                </TableCell>
                <TableCell>{load.cte}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(parseFloat(load.insuranceAmount))}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default TableSheet;
