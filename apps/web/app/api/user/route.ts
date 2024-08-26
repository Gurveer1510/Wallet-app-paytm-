
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth"
import { User, Session } from "next-auth";



type CustomUser = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  
type CustomSession = Session & {
    user: CustomUser
}


export const GET = async () => {
    const session  = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 403
        })
    }
    const customSession  = session as CustomSession
    if (customSession.user) {
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