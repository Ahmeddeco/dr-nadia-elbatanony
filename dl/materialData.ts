import prisma from "@/lib/prisma"

/* --------------------- getAllMaterialForMaterialsPage --------------------- */
export const getAllMaterialForMaterialsPage = async (size: number, page: number) => {
  try {
    const totalMaterial = await prisma.material.count()
    const totalPages = Math.ceil(totalMaterial / size)

    const data = await prisma.material.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        url: true,
        course: { select: { id: true, title: true, } }
      },
      orderBy: { title: "asc" },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}


/* -------------------------- getOneMaterial -------------------------- */
export const getOneMaterial = async (id: string) => {
  try {

    const data = await prisma.material.findUnique({
      where: { id }, include: { course: { select: { id: true, title: true, code: true } } }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------- getAllMaterialForCoursesPage ---------------------- */
export const getAllMaterialForCoursesPage = async () => {
  try {
    const data = await prisma.material.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: { title: "asc" },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}