"use client"
import { useBalance } from "@repo/recoil-store"

export default function(){
    const value = useBalance()
    return (
        <div className="bg-green-600 text-lg">
            Hello {value}
        </div>
    )
}