"use server"
import { getServerSession, Session } from "next-auth"
import {prisma} from "@repo/database"
import { authOptions } from "../auth"


type CustomUser = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  
type CustomSession = Session & {
    user: CustomUser
}

export const createOnRampTxns = async ({ provider, amount }: { provider: string, amount: number }) => {
    const session = await getServerSession(authOptions)
    const customSession = session as CustomSession
    const userId = customSession?.user?.id

    if(!userId){
        return {
            message: "User not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
            provider,
            amount: amount * 100,
            startTime: new Date(),
            status: "Processing",
            userId: Number(userId),
            token: (Math.random()*1000).toString()
        }
    })

    return {
        message: "On ramp transaction added"
    }
}   