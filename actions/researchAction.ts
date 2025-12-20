'use server'

import prisma from "@/lib/prisma"
import ResearchSchema from "@/schemas/ResearchSchema"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"

/* ----------------------------- addResearchAction ---------------------------- */
export const addResearchAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ResearchSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  const authors = formData.get("authors")
  const splittedAuthors = JSON.parse(authors as string)



  try {
    await prisma.research.upsert({
      where: { title: submission.value.title },
      create: {
        title: submission.value.title,
        description: submission.value.description ?? "",
        publicationDate: submission.value.publicationDate,
        journal: submission.value.journal,
        volume: submission.value.volume,
        issue: submission.value.issue,
        link: submission.value.link,
        authors: {
          connect: splittedAuthors.map((id: string) => ({ id }))
        }
      },
      update: {
        description: submission.value.description ?? "",
        publicationDate: submission.value.publicationDate,
        journal: submission.value.journal,
        volume: submission.value.volume,
        issue: submission.value.issue,
        link: submission.value.link,
        authors: {
          set: splittedAuthors.map((id: string) => ({ id }))
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/researches")
}

/* ---------------------------- editResearchAction --------------------------- */
export const editResearchAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ResearchSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  const authors = formData.get("authors")
  const splittedAuthors = JSON.parse(authors as string)

  try {
    await prisma.research.update({
      where: { id: submission.value.id! },
      data: {
        title: submission.value.title,
        description: submission.value.description ?? "",
        publicationDate: submission.value.publicationDate,
        journal: submission.value.journal,
        volume: submission.value.volume,
        issue: submission.value.issue,
        link: submission.value.link,
        authors: {
          set: splittedAuthors.map((id: string) => ({ id }))
        }
      },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/researches")
}

/* --------------------------- deleteResearchAction -------------------------- */
export const deleteResearchAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.research.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/researches")
}