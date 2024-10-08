"use server"
import { getServerSession, Session } from "next-auth"
import { authOptions } from "../auth"
import {prisma} from "@repo/database"

type CustomUser = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  
type CustomSession = Session & {
    user: CustomUser
}
export const p2pTransfer = async(to: string, amount: number) => {
    const session = await getServerSession(authOptions)
    const customSession = session as CustomSession
    const from = customSession?.user?.id
    if(!from){
        return {
            message: "Error while sending"
        }
    }

    const toUser = await prisma.user.findFirst({
        where:{
            number: to
        }
    })

    if(!toUser){
        return{
            message: "user not found"
        }
    }

    await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`
        const fromBalance = await tx.balance.findFirst({
            where:{
                userId: Number(from)
            }
        })
        if(!fromBalance || fromBalance.amount < amount){
            throw new Error("Insuffiecient funds")
        }
        
        await tx.balance.update({
            where:{userId: Number(from)},
            data:{ amount: { decrement: amount}}
        })
        await tx.balance.update({
            where:{userId: Number(toUser.id)},
            data:{amount: {increment: amount}}
        })

        await tx.p2pTransfer.create({
            data:{
                toUserId: toUser.id,
                fromUserId: Number(from),
                amount,
                timestamp: new Date()
            }
        })
    })
}