import { Load } from "@/types/types";
import { format } from "date-fns";
import { utils, writeFile } from "xlsx";

type GenerateSheetType = {
  loads: Load[];
  fileName: string;
};

export const generateSheet = async ({ loads, fileName }: GenerateSheetType) => {
  if (loads && loads.length > 0) {
    const transformedLoads = loads.map((load) => ({
      Data: format(new Date(load.date), "yyyy-MM-dd"),
      "CT-e": load.cte,
      Placa: load.truckPlate,
      Remetente: load.sender,
      "UF Remetente": load.senderUf,
      Destinatário: load.receiver,
      "UF Destinatário": load.receiverUf,
      "Valor Seguro": load.insuranceAmount,
      Cliente: load.clientId,
      "Valor NF": load.invoiceAmount,
    }));

    const totalInsuranceAmount = loads.reduce(
      (sum, load) => sum + parseFloat(load.insuranceAmount),
      0
    );

    const worksheetData = [
      ...transformedLoads,
      {},
      { "Valor Seguro": `Valor seguros: ${totalInsuranceAmount}` },
    ];

    const worksheet = utils.json_to_sheet(worksheetData);
    const workbook = utils.book_new();

    worksheet["!cols"] = transformedLoads[0]
      ? Object.keys(transformedLoads[0]).map(() => ({ wpx: 150 }))
      : [{ wpx: 150 }];

    utils.book_append_sheet(workbook, worksheet, "Data");
    writeFile(workbook, `${fileName}.xlsx`);
  } else {
    console.error("No loads to generate the sheet.");
  }
};
