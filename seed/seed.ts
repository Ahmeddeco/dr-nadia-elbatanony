import { DegreeProgram, Gender, PrismaClient, } from '@/generated/prisma/client'
import { faker } from '@faker-js/faker'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  /* ---------------------------- Create a Students --------------------------- */
  await prisma.student.createMany({
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
    })), skipDuplicates: true
  })
}

/* --------------------------------- course --------------------------------- */
await prisma.course.createMany({
  data: Array.from({ length: 22 }).map(() => ({
    title: faker.book.title(),
    description: faker.book.author(),
    code: faker.string.nanoid(4),
    level: faker.helpers.enumValue(DegreeProgram),
  })), skipDuplicates: true
})


main()
  .then(() => console.log("Seeding complete"))
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })