import { Bar } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { ChartDataType, Load } from "@/types/types";
import { generalContext } from "@/context/generalContext";
import { globalDateContext } from "@/context/dateContext";


ChartJS.register(...registerables);

interface AggregatedData {
  [month: string]: number;
}

const ChartTable = () => {
  const context = useContext(generalContext);
  const dateContext = useContext(globalDateContext);

  const getMonthsDifference = (loads: Load[]): AggregatedData => {
    return loads.reduce((acc: AggregatedData, load: Load) => {
      const month = load.date.substring(0, 7); 
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += parseFloat(load.insuranceAmount);
      return acc;
    }, {});
  };

  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [
      {
        backgroundColor: "#177B3D",
        borderRadius: 5,
        label: "Valor Seguro",
        data: [],
      },
    ],
  });

  useEffect(() => {
    let filteredLoads = context.updatedLoads;

    if (dateContext.date?.from) {
      const from = new Date(dateContext.date.from);
      filteredLoads = filteredLoads.filter(
        (load) => new Date(load.date) >= from
      );
    }
    if (dateContext.date?.to) {
      const to = new Date(dateContext.date.to);
      filteredLoads = filteredLoads.filter((load) => new Date(load.date) <= to);
    }

    const aggregatedData = getMonthsDifference(filteredLoads);

    setChartData({
      labels: Object.keys(aggregatedData),
      datasets: [
        {
          backgroundColor: "#177B3D",
          borderRadius: 5,
          label: "Valor Seguro",
          data: Object.values(aggregatedData),
        },
      ],
    });
  }, [context.updatedLoads, dateContext.date?.from, dateContext.date?.to]);

  return (
    <div className="w-2/4 border rounded-md flex items-center justify-center p-4">
      <Bar data={chartData} />
    </div>
  );
};

export default ChartTable;
