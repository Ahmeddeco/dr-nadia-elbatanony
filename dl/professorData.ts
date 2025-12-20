import prisma from "@/lib/prisma"

/* -------------------- getAllProfessorsForProfessorsPage ------------------- */
export const getAllProfessorsForProfessorsPage = async (size: number, page: number) => {
  try {
    const totalStudents = await prisma.professor.count()
    const totalPages = Math.ceil(totalStudents / size)

    const data = await prisma.professor.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        age: true,
        gender: true,
        country: true,
        state: true,
        city: true,
        image: true,
      },
      orderBy: { name: "asc" },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

/* --------------------- getAllProfessorsForMultiSelect --------------------- */
export const getAllProfessorsForMultiSelect = async () => {
  try {
    const data = await prisma.professor.findMany({
      select: { id: true, name: true, image: true }, orderBy: { name: "asc" }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------ getOneProfessor ----------------------------- */
export const getOneProfessor = async (id: string) => {
  try {

    const data = await prisma.professor.findUnique({
      where: { id }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}


