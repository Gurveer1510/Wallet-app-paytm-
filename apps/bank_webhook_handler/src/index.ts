import  express from "express"
import { prisma } from "@repo/database"
const app  = express()
app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    }

    try {
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ])

        res.json({
            message: "Captured"
        })
    } catch (error) {
        console.error(error)
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})


app.listen(3003, () => console.log("server started at 3003"))