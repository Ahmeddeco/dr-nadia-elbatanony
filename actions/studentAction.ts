'use server'

import prisma from "@/lib/prisma"
import StudentSchema from "@/schemas/StudentSchema"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"

export const addStudentAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: StudentSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.student.upsert({
      where: { email: submission.value.email },
      create: {
        name: submission.value.name,
        email: submission.value.email,
        mobile: submission.value.mobile,
        age: submission.value.age,
        gender: submission.value.gender,
        degreeProgram: submission.value.degreeProgram,
        studentIdNumber: submission.value.studentIdNumber ?? "",
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
        degreeProgram: submission.value.degreeProgram,
        studentIdNumber: submission.value.studentIdNumber ?? "",
        country: submission.value.country ?? "",
        state: submission.value.state ?? "",
        city: submission.value.city ?? "",
        image: submission.value.image,
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/students")
}

/* ---------------------------- editStudentAction --------------------------- */
export const editStudentAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: StudentSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  try {
    await prisma.student.update({
      where: { id: submission.value.id! },
      data: {
        name: submission.value.name,
        email: submission.value.email,
        mobile: submission.value.mobile,
        age: submission.value.age,
        gender: submission.value.gender,
        degreeProgram: submission.value.degreeProgram,
        studentIdNumber: submission.value.studentIdNumber ?? "",
        country: submission.value.country ?? "",
        state: submission.value.state ?? "",
        city: submission.value.city ?? "",
        image: submission.value.image,
      },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/students")
}

/* --------------------------- deleteStudentAction -------------------------- */
export const deleteStudentAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.student.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/students")
}