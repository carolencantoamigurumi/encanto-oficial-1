import { clerkClient } from '@clerk/express'


export const protectAdmin = async (req, res, next) => {

    try {
        const { userId } = await req.auth()
        if (!userId) {
            return res.status(401).json({ success: false, message: "Usuário não autenticado" });
        }

        const user = await clerkClient.users.getUser(userId)
        if (user.privateMetadata.role !== 'admin') {
            return res.status(403).json({success: false, message: 'Somente Administradores'})
        }
        next()

    } catch (error) {
        return res.status(500).json({success: false, message: "Erro interno do servidor"})        
    }
}