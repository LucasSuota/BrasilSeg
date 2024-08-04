import { BrasilSegBackground } from "./_components/brasil-seg-background";
import { LoginForm } from "./_components/login-form";

export default function Login(){
  return(
    <div className="flex flex-row justify-between items-center">
      <BrasilSegBackground/>
      <LoginForm/>
    </div>
  )
}