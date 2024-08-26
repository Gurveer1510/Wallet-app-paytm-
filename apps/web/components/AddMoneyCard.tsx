"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/text-input";
import { createOnRampTxns } from "../app/lib/actions/createOnRampTxns";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState("")
    const [amount, setamount] = useState(0)
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setamount(Number(val))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(amount) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === amount)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === amount)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                await createOnRampTxns({provider, amount})
                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}