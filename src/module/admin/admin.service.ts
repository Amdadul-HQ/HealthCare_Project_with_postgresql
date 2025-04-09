import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const getAdminsFromDB = async() => {
    const result = await prisma.admin.findMany()
    return result
}

export const AdminServices = {
    getAdminsFromDB
}