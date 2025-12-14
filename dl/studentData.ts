import prisma from "@/lib/prisma"

export const getAllStudentsForStudentsPage = async (size: number, page: number) => {
  try {
    const totalStudents = await prisma.student.count()
    const totalPages = Math.ceil(totalStudents / size)

    const data = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        age: true,
        gender: true,
        degreeProgram: true,
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

/* ------------------------------ getOneStudent ----------------------------- */
export const getOneStudent = async (id: string) => {
  try {

    const data = await prisma.student.findUnique({
      where: { id }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}


