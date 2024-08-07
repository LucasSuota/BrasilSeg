import ClientesContext from "@/context/clientsContext";
import DateContext from "@/context/dateContext";
import GeneralContext from "@/context/generalContext";
import LoadsContext from "@/context/loadsContext";
import MenuControl from "./MenuControl/MenuControl";

export function Dashboard(){

  return (
    <section className="w-full h-dvh flex flex-col items-center justify-center">
      <DateContext>
        <LoadsContext>
          <ClientesContext>
            <GeneralContext>
              <MenuControl />
            </GeneralContext>
          </ClientesContext>
        </LoadsContext>
      </DateContext>
    </section>
  );
};

export default Dashboard;
