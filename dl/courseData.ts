import prisma from "@/lib/prisma"


/* ----------------------- getAllCoursesForCoursesPage ---------------------- */
export const getAllCoursesForCoursesPage = async (size: number, page: number) => {
  try {
    const totalCourses = await prisma.course.count()
    const totalPages = Math.ceil(totalCourses / size)

    const data = await prisma.course.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true, code: true, level: true, author: true, description: true, materials: { select: { id: true, title: true, url: true } }, },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------ getOneCourse ------------------------------ */
export const getOneCourse = async (id: string) => {
  try {

    const data = await prisma.course.findUnique({
      where: { id }, include: { materials: { select: { id: true, title: true } }, author: { select: { id: true, name: true } } }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------- getAllCoursesForMaterialPage ---------------------- */
export const getAllCoursesForMaterialPage = async () => {
  try {
    const data = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        code: true,
      },
      orderBy: { title: "asc" },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}