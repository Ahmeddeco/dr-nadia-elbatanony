'use server'

import prisma from "@/lib/prisma"
import { MaterialSchema } from "@/schemas/materialSchema"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"

export const addMaterialAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: MaterialSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const courses = formData.get("courses")
  const  splittedCourses= JSON.parse(courses as string)

  try {
    await prisma.material.upsert({
      where: { title: submission.value.title },
      create: {
        title: submission.value.title,
        author: submission.value.author,
        description: submission.value.description ?? "",
        url: submission.value.url,
        course: {
          connect: splittedCourses.map((course: { id: string; title: string }) => ({
            id: course.id as string,
            title: course.title as string,
          }))
        }
      },
      update: {
        author: submission.value.author,
        description: submission.value.description ?? "",
        url: submission.value.url,
        course: {
          set: splittedCourses.map((course: { id: string; title: string }) => ({
            id: course.id as string,
            title: course.title as string,
          }))
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/materials")
}

/* ---------------------------- editStudentAction --------------------------- */
export const editMaterialAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: MaterialSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    const courses = formData.get("courses")
    const splittedCourses = JSON.parse(courses as string)

    await prisma.material.update({
      where: { id: submission.value.id! },
      data: {
        title: submission.value.title,
        author: submission.value.author,
        description: submission.value.description ?? "",
        url: submission.value.url,
        course: {
          set: splittedCourses.map((id: string) => ({
            id: id
          }))
        }
      },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/materials")
}

/* --------------------------- deleteCourseAction -------------------------- */
export const deleteCourseMaterialAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.material.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/materials")
}