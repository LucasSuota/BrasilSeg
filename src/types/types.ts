import { DateRange } from "react-day-picker";

export type DatePickerType = {
  from: String;
  to?: String;
};

export type DataType = {
  date: DateRange[];
  data: Load[];
};

export type ChartDataType = {
  labels: string[];
  datasets: {
    backgroundColor: string;
    borderRadius: number;
    label: string;
    data: number[];
  }[];
};

export type MonthsInsuranceAmountType = {
  month: string;
  insuranceAmount: number;
};

export type PreLoad = {
  client: string;
  date: string;
  cte: number;
  insuranceAmount: number;
};

export type Load = {
  date: string;
  cte: string;
  truckPlate: string;
  sender: string;
  senderUf: string;
  receiver: string;
  receiverUf: string;
  insuranceAmount: string;
  clientId: string;
  invoiceAmount: string;
};

export type LoadInputs = {
  date: string;
  cte: string;
  truckPlate: string;
  sender: string;
  senderUf: string;
  receiver: string;
  receiverUf: string;
  taxAmount: string;
  clientId: string;
  invoiceAmount: string;
};

export type Client = {
  id?: number;
  name: string;
  address: string;
  county: string;
  cnpjcpf: string;
  state: string;
  country: string;
  zip: string;
  ie: string;
  telephone?: string | null;
};
