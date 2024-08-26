"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { TextInput } from "@repo/ui/text-input"
import { p2pTransfer } from "../app/lib/actions/p2pTranfer"
import { useState } from "react"

function SendCard() {
    const [number, setNumber] = useState("")
    const [amount, setAmount] = useState("")
  return (
    <div className="h-full flex justify-center items-center  ">
        
            <Card className="border-2 p-4 rounded-lg" title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number (To)" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async() => {
                            await p2pTransfer(number,Number(amount)*100)
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        
    </div>
  )
}

export default SendCard