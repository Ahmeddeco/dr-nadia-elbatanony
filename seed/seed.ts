import { DegreeProgram, Gender } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { faker } from '@faker-js/faker'


async function main() {
  console.log('--- Starting Seeding Process ---')

  /* ---------------------------- 1. Create Students --------------------------- */
  const studentData = await prisma.student.createMany({
    data: Array.from({ length: 22 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: "international" }),
      country: faker.location.country(),
      state: faker.location.state(),
      city: faker.location.city(),
      gender: faker.helpers.enumValue(Gender),
      age: faker.number.int({ min: 22, max: 60 }),
      studentIdNumber: faker.string.uuid(),
      degreeProgram: faker.helpers.enumValue(DegreeProgram),
      image: faker.image.personPortrait(),
    })),
    skipDuplicates: true
  })
  console.log(`✅ ${studentData.count} Students created.`)


  /* -------------------------- 2. Create Courses (Parent) -------------------------- */

  const courseData = Array.from({ length: 8 }).map(() => ({
    title: faker.book.title(),
    description: faker.book.author(),
    code: faker.string.nanoid(4),
    level: faker.helpers.enumValue(DegreeProgram),
  }))

  const createdCourses = await prisma.course.createManyAndReturn({
    data: courseData,
    skipDuplicates: true
  })

  // Extract all the real, database-generated IDs (These are the UUIDs/Strings needed)
  const courseIds = createdCourses.map(c => c.id)
  console.log(`✅ ${courseIds.length} Courses created.`)


  /* ------------------------------- Material ------------------------------- */

  if (courseIds.length === 0) {
    console.warn('⚠️ No courses created. Skipping material creation to avoid P2003 error.')
    return
  }

  const materialData = Array.from({ length: 8 }).map((_, index) => ({
    title: faker.book.title(),
    author: faker.person.fullName(),
    description: faker.book.author(),
    url: faker.internet.url(),
  }))

  await prisma.material.createMany({
    data: materialData,
    skipDuplicates: true
  })
  console.log(`✅ ${materialData.length} Course Materials created and linked.`)
}

/* -------------------------------- Execution ------------------------------- */
main()
  .then(() => console.log("\nSeeding complete successfully!"))
  .catch(e => {
    console.error("\n--- An Error Occurred During Seeding ---")
    // Explicitly re-throw the error for better stack tracing in the console
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })