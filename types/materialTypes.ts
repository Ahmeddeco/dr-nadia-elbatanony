/* --------------------------- getOneMaterialType --------------------------- */

export type getOneMaterialType = ({
  course: {
    id: string
    title: string
    code: string
  }[]
} & {
  id: string
  title: string
  author: string
  description: string | null
  url: string
  createdAt: Date
  updatedAt: Date
}) | null | undefined