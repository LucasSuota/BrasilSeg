import { MainMenu } from "@/components/main-menu";
import { UserDataProvider } from "@/context/AuthContext";


export default function Home() {
  return (
    <UserDataProvider>
      <MainMenu/>
    </UserDataProvider>
  );
}
