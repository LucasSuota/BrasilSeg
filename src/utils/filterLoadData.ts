import { Load } from "@/types/types";
import { DateRange } from "react-day-picker";

export function filterLoadData(date: DateRange, loads: Load[]) {
  const filteredData = loads.filter((load) => {
    try {
      if (date?.from != undefined && date?.to != undefined) {
        return (
          new Date(load.date) >= new Date(String(date?.from)) &&
          new Date(load.date) <= new Date(String(date?.to))
        );
      } else if (date?.from != undefined && date?.to == undefined) {
        return (
          new Date(load.date) >= new Date(String(date?.from)) &&
          new Date(load.date) <= new Date(String(date?.from))
        );
      } else {
        return loads;
      }
    } catch (err) {
      console.error(err);
    }
  });

  return filteredData;
}
