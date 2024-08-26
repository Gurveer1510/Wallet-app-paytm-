import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth"
import { authOptions } from "../app/lib/auth"

async function  TransferTransactions({transactions}: {
    transactions:{
        id: Number,
        amount: Number,
        timestamp: Date,
        fromUserId: Number,
        toUserId: Number
    }[]
}) {
    console.log(transactions)
    const session = await getServerSession(authOptions)
    if(!transactions.length){
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
  return (
    <Card title="Transactions">
        {transactions.map((t) => {
            const recieved: Boolean = session?.user?.id == t.fromUserId ? false : true
            return (
                <div className="flex justify-between p-2 pb-2 border-b border-b-black">
                <div>
                    {recieved ? <div className="text-sm">
                        Received INR
                    </div> : <div className="text-sm">
                        Deducted INR
                    </div>}
                    <div className="text-slate-600 text-xs">
                        {t.timestamp.toDateString()}
                    </div>
                </div>
                {
                    recieved ? <div className="flex flex-col justify-center">
                    + Rs {Number(t.amount )/ 100}
                </div> : <div className="flex flex-col justify-center">
                    - Rs {Number(t.amount )/ 100}
                </div>
                }

            </div>
            )
        } )}
    </Card>
  )
}

export default TransferTransactions