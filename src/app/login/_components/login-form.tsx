import { LoginFormInputs } from "./login-form-inputs";

export function LoginForm(){
    return(
        <div className="min-w-[100%] h-dvh flex flex-col items-center justify-center">
            <p className="text-lg text-brasilgreen font-semibold">Bem-vindo ao sistema da BrasilSeg</p>
            <p className="font-light">Insira suas informações para entrar</p>
            <LoginFormInputs/>
       </div>
    )
}