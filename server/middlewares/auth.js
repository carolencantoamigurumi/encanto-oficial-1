import { clerkClient } from '@clerk/express'


export const protectUser = async (req, res, next) => {

    try {
        const { userId } = await req.auth()
        if (!userId) {
            return res.status(401).json({ success: false, message: "Usuário não autenticado" });
        }

        const user = await clerkClient.users.getUser(userId)
        req.user = user;
        next()

    } catch (error) {
        return res.status(500).json({success: false, message: "Erro interno do servidor"})        
    }
}