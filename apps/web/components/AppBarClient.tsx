"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Appbar } from "@repo/ui/app-bar"
import { useRouter } from "next/navigation"

export function AppbarClient() {
    const session = useSession()
    const router = useRouter()

    return (
        <div>
            <Appbar  onSignin={signIn} onSignout={async () => {
                await signOut()
                router.push("/api/auth/signin")
            }} user={session.data?.user} />
        </div>
    )
}