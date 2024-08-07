import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

const FilterInput = ({
  table,
  columnToFilter,
}: {
  table: Table<any>;
  columnToFilter: string;
}) => {
  return (
    <Input
      placeholder="Filtrar por cliente..."
      value={
        (table.getColumn(columnToFilter)?.getFilterValue() as string) ?? ""
      }
      onChange={(event) =>
        table.getColumn(columnToFilter)?.setFilterValue(event.target.value)
      }
      className="max-w-sm w-3/4"
    />
  );
};

export default FilterInput;
