'use server'

import prisma from "@/lib/prisma"
import CourseSchema from "@/schemas/CourseSchema"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"

export const addCourseAction = async (prevState: unknown, formData: FormData) => {

  console.log("formData from addCourseAction", formData)


  const submission = parseWithZod(formData, {
    schema: CourseSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  const materials = formData.get("materials")
  const splittedMaterials = JSON.parse(materials as string)

  try {
    await prisma.course.upsert({
      where: { code: submission.value.code },
      create: {
        title: submission.value.title,
        author: submission.value.author,
        description: submission.value.description ?? "",
        code: submission.value.code,
        level: submission.value.level,
        materials: {
          connect: splittedMaterials.map((material: { id: string; title: string }) => ({
            id: material.id as string,
            title: material.title as string,
          }))
        }
      },
      update: {
        title: submission.value.title,
        author: submission.value.author,
        description: submission.value.description ?? "",
        level: submission.value.level,
        materials: {
          set: splittedMaterials.map((material: { id: string; title: string }) => ({
            id: material.id as string,
            title: material.title as string,
          }))
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/courses")
}

/* ---------------------------- editStudentAction --------------------------- */
export const editCourseAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: CourseSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  const materials = formData.get("materials")
  const splittedMaterials = JSON.parse(materials as string)

  try {
    await prisma.course.update({
      where: { id: submission.value.id! },
      data: {
        title: submission.value.title,
        author: submission.value.author,
        description: submission.value.description ?? "",
        code: submission.value.code,
        level: submission.value.level,
        materials: {
          set: splittedMaterials?.map((id: string) => ({
            id: id
          }))
        }
      },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/courses")
}

/* --------------------------- deleteCourseAction -------------------------- */
export const deleteCourseAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.course.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/courses")
}