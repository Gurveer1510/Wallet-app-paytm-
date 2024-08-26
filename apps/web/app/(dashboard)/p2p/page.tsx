import SendCard from "../../../components/SendCard"
import {prisma} from "@repo/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import TransferTransactions from "../../../components/TransferTransactions"

async function getP2PTransactions(){
    const session = await getServerSession(authOptions)
    const result = await prisma.p2pTransfer.findMany({
        where:{
            OR:[
                {
                    fromUserId: Number(session?.user?.id)
                },
                {
                    toUserId: Number(session?.user?.id)
                }
            ]
        }
    })
    return result
}

export default async function () {
    const transactions = await getP2PTransactions()
    return (
        <div className="grid grid-cols-2 h-[90vh] w-[80vw] ml-10  justify-center items-center">
            <div className="col-span-1  border-r-2">
                <SendCard />
            </div>
            <div className="col-span-1 ml-4">
                <TransferTransactions transactions={transactions}/>
            </div>
        </div>
    )
}