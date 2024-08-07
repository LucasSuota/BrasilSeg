"use client";

import { DatePickerWithRange } from "../DatePicker/DatePickerWithRange";
import ValueCard from "../Cards/ValueCard/ValueCard";
import TableSheet from "../Table/TableSheet";
import ChartTable from "../Chart/ChartTable";
import { useContext } from "react";
import { Load } from "@/types/types";
import { generalContext } from "@/context/generalContext";


const Overview = () => {
  const context = useContext(generalContext);

  const setLoadAmount = (loads: Load[]) => {
    let amount = 0;
    if (loads) {
      loads.forEach((load) => {
        amount += parseFloat(load.insuranceAmount);
      });
    }
    return amount;
  };

  const setLoadQty = (loads: Load[]) => {
    let qty = 0;
    if (loads) {
      loads.forEach(() => {
        qty++;
      });
    }
    return qty;
  };

  return (
    <div className="flex flex-col gap-4">
      <DatePickerWithRange />
      <div className="grid grid-cols-2 grid-flow-row gap-4">
        <ValueCard
          type={"MONEY"}
          amount={setLoadAmount(context.updatedLoads).toString()}
          title="Total do valor de seguros "
        />
        <ValueCard
          type="NOTMONEY"
          amount={setLoadQty(context.updatedLoads).toString()}
          title="Total de cargas"
        />
      </div>
      <div className="flex flex-row gap-4">
        <TableSheet />
        <ChartTable />
      </div>
    </div>
  );
};

export default Overview;
