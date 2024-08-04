"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Inputs = {
    email: string,
    password: string
}

export function LoginFormInputs(){

    const router = useRouter();

    const {
        register,
        handleSubmit,
      } = useForm<Inputs>()

    function handleSubmitForm(data: Inputs){
        try{
            signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                toast.success("Sucesso, redirecionando para a página principal");
                router.push("/");
            }).catch(() => {
                toast.error("Erro ao logar, verifique suas credenciais");
            })
        } catch(error){
            console.error(error)
        }
    }

    return(
        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-2 w-full mt-10">
            <Input type="email" placeholder="Email" className="w-[400px] mx-auto" {...register("email", {required: true})}/>
            <Input type="password" placeholder="Senha" className="w-[400px] mx-auto" {...register("password", {required: true})}/>
            <Button type="submit" className="w-[400px] mx-auto bg-brasilgreen">Entrar</Button>
            <ToastContainer/>
        </form>
    )
}