import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export const isStudent = async () => {
  const session = await auth()
  const authEmail = session?.user?.email
  if (!session) {
    redirect("/")
  } else {
    const StudentDbEmail = await prisma.student.findUnique({ where: { email: authEmail! }, select: { email: true } })
    if (StudentDbEmail || authEmail === process.env.SUPPER_ADMIN) {
      return { StudentDbEmail, session }
    } else {
      redirect("/")
    }
  }
}