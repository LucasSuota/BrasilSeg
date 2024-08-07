import { Load } from "@/types/types";

export const loadListByClient = ({
  loads,
  client,
}: {
  loads: Load[];
  client: string;
}) => {
  return loads.filter((load) => {
    load.clientId === client;
  });
};
