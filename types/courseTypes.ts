import { DegreeProgram } from "@/generated/prisma/enums"

export type getOneCourseType = ({
  materials: {
    id: string
    title: string
    author: string
    description: string | null
    url: string
    createdAt: Date
    updatedAt: Date
  }[]
} & {
  level: DegreeProgram
  id: string
  title: string
  author: string
  description: string | null
  code: string
  createdAt: Date
  updatedAt: Date
}) | null | undefined