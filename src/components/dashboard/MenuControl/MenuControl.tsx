import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "../Overview/Overview";
import SpreadSheet from "../SpreadSheet/SpreadSheet";
import { ClientsManagement } from "../Invoice/ClientsManagement";

const MenuControl = () => {
  return (
    <Tabs
      defaultValue="general"
      className="w-full flex items-center justify-center z-40"
    >
      <TabsList className="absolute top-10">
        <TabsTrigger value="general">Visão Geral</TabsTrigger>
        <TabsTrigger value="sheets">Planilha</TabsTrigger>
        <TabsTrigger value="invoice">Gerenciar Clientes</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="w-3/4">
        <Overview />
      </TabsContent>
      <TabsContent value="sheets" className="w-3/4">
        <SpreadSheet />
      </TabsContent>
      <TabsContent value="invoice" className="w-3/4">
        <ClientsManagement />
      </TabsContent>
    </Tabs>
  );
};

export default MenuControl;
