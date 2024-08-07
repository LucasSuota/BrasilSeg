"use client";

import { useContext } from "react";
import { CompleteTable } from "../Table/CompleteTable";
import { columns } from "../Table/CompleteTableColumns";
import { generalContext } from "@/context/generalContext";


const SpreadSheet = () => {
  const generalContextData = useContext(generalContext);

  return (
    <div className="flex flex-col gap-1">
      <CompleteTable
        columns={columns}
        data={generalContextData.updatedLoads.map((load) => load)}
      />
    </div>
  );
};

export default SpreadSheet;
