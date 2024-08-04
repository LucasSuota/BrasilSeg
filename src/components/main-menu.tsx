"use client"

import { LoadingPage } from "@/components/loading-page"
import { UserDataContext } from "@/context/AuthContext"
import { useContext } from "react"
import { GeneralDashboard } from "./general-dashboard"

export function MainMenu(){

    const userContext = useContext(UserDataContext)

    return (
        <>
           {userContext.user ? (
                <GeneralDashboard/>
            ) : (
                <LoadingPage/>
            )}
        </>
        
    )
}