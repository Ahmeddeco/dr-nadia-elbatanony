import prisma from "@/lib/prisma"


/* ----------------------- getAllResearchesForResearchesPage ---------------------- */
export const getAllResearchesForResearchesPage = async (size: number, page: number) => {
  try {
    const totalCourses = await prisma.course.count()
    const totalPages = Math.ceil(totalCourses / size)

    const data = await prisma.research.findMany({
      orderBy: { title: "asc" },
      select: {
        id: true, title: true, publicationDate: true, journal: true, link: true, authors: { select: { id: true, name: true } }
      },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------ getOneResearch ------------------------------ */
export const getOneResearch = async (id: string) => {
  try {

    const data = await prisma.research.findUnique({
      where: { id }, include: { authors: { select: { id: true, name: true } } }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
