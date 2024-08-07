import { Client, Load } from "@/types/types";

export function convertIdIntoClient(clientList: Client[], loadsList: Load[]) {
  const converted = loadsList.map((load) => {
    const client = clientList.find(
      (client) => client.id === parseInt(load.clientId)
    );
    return {
      ...load,
      clientId: client?.name,
    };
  });

  return converted;
}
