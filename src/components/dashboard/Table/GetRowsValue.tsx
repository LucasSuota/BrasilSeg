import { Table as TTable } from "@tanstack/react-table";

export function GetRowsValue({ table }: { table: TTable<any> }) {
  const calculateSelectedItemsOnTable = () => {
    let total = 0;
    table.getRowModel().rows?.length &&
      table.getRowModel().rows?.forEach((row) => {
        row.getValue("insuranceAmount") &&
          (total += parseFloat(row.getValue("insuranceAmount")));
      });

    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(total);

    return formatted;
  };

  return (
    <div className="rounded-md p-2 mt-4 flex justify-end">
      <span className="text-[#177B3D] text-sm font-semibold">{`Total valor de seguros nesta página: ${calculateSelectedItemsOnTable()}`}</span>
    </div>
  );
}
