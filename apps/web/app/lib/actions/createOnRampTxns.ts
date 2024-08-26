"use server"
import { getServerSession } from "next-auth"
import {prisma} from "@repo/database"
import { authOptions } from "../auth"

export const createOnRampTxns = async ({ provider, amount }: { provider: string, amount: number }) => {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

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