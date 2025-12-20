'use server'

import prisma from "@/lib/prisma"
import ProfessorSchema from "@/schemas/ProfessorSchema"
import StudentSchema from "@/schemas/StudentSchema"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"

export const addProfessorAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProfessorSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  console.log("submission from addProfessorAction", submission)


  try {
    await prisma.professor.upsert({
      where: { email: submission.value.email },
      create: {
        name: submission.value.name,
        email: submission.value.email,
        mobile: submission.value.mobile,
        age: submission.value.age,
        gender: submission.value.gender,
        country: submission.value.country ?? "",
        state: submission.value.state ?? "",
        city: submission.value.city ?? "",
        image: submission.value.image,
      },
      update: {
        name: submission.value.name,
        mobile: submission.value.mobile,
        age: submission.value.age,
        gender: submission.value.gender,
        country: submission.value.country ?? "",
        state: submission.value.state ?? "",
        city: submission.value.city ?? "",
        image: submission.value.image,
      }
    })
  } catch (error) {
    console.error(error)
  }
  // redirect("/server/professors")
}

/* ---------------------------- editStudentAction --------------------------- */
export const editProfessorAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ProfessorSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.professor.update({
      where: { id: submission.value.id! },
      data: {
        name: submission.value.name,
        email: submission.value.email,
        mobile: submission.value.mobile,
        age: submission.value.age,
        gender: submission.value.gender,
        country: submission.value.country ?? "",
        state: submission.value.state ?? "",
        city: submission.value.city ?? "",
        image: submission.value.image,
      },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/professors")
}

/* --------------------------- deleteStudentAction -------------------------- */
export const deleteProfessorAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.professor.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/professors")
}