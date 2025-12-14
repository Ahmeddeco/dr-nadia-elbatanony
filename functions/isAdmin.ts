import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const isAdmin = async () => {
  const session = await auth()
  const authEmail = session?.user?.email
  if (!session) {
    redirect("/")
  } else {
    if (authEmail === process.env.SUPPER_ADMIN) {
      return session
    } else {
      redirect("/")
    }
  }
}
