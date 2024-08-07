import { Client } from "@/types/types";

export function returnUserInfo(clients: Client[], clientId: number) {
  const clientInfo = clients.find((client) => client.id === clientId);

  return clientInfo?.id;
}
