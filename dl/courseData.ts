import prisma from "@/lib/prisma"


/* ----------------------- getAllCoursesForCoursesPage ---------------------- */
export const getAllCoursesForCoursesPage = async (size: number, page: number) => {
  try {
    const totalCourses = await prisma.course.count()
    const totalPages = Math.ceil(totalCourses / size)

    const data = await prisma.course.findMany({
      orderBy: { title: "asc" },
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
      where: { id }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}