
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth"

export const GET = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 403
        })
    }
    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }

    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })

}