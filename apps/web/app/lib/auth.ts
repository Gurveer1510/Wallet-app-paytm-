import { prisma } from "@repo/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

type Credentials = {
    phone: string,
    password: string
}

type CustomUser = {
    id: string
} & User

type CustomSession = Session & {
    user: CustomUser
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "987456321", required: true },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Credentials | undefined) {

                if (!credentials) return null

                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await prisma.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null
                }

                try {
                    const user = await prisma.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    })
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }

                } catch (error) {
                    console.error(error)
                }

                return null
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: { token: JWT, session: Session  }) {
            if (session.user) {
                const customSession = session as CustomSession
                customSession.user.id = token.sub || ''; 
            }
            return session;
        }
    }
}
