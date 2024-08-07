"use client";

import { generalContext } from "@/context/generalContext";
import { generateSheet } from "@/utils/generateSheet";
import { loadListByClient } from "@/utils/loadListByClient";
import { useContext } from "react";

const GenerateSheetButton = ({ name }: { name: string }) => {
  const context = useContext(generalContext);

  const handleGenerateSheet = async () => {
    const filterLoad = context.updatedLoads.filter(
      (load) => load.clientId === name
    );
    await generateSheet({ loads: filterLoad, fileName: name });
  };

  return (
    <span
      className="text-xs px-4 py-2 border rounded-md hover hover:bg-green-100 hover:text-green-600 cursor-pointer"
      onClick={handleGenerateSheet}
    >
      Excel com {name}
    </span>
  );
};

export default GenerateSheetButton;
