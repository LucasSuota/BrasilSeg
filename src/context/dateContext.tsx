"use client";

import { createContext, useState } from "react";
import { DateRange } from "react-day-picker";

export const globalDateContext = createContext<{
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}>({ date: undefined, setDate: () => {} });

const DateContext = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  return (
    <globalDateContext.Provider value={{ date, setDate }}>
      {children}
    </globalDateContext.Provider>
  );
};

export default DateContext;
