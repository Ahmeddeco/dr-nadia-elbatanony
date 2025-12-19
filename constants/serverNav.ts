import { BookType, ChartNoAxesCombined, LibraryBig, SearchCheck, Users } from "lucide-react"

export const serverNav = [
  {
    title: "dashboard",
    href: "/server/dashboard",
    icon: ChartNoAxesCombined
  },
  {
    title: "students",
    href: "/server/students",
    icon: Users
  },
  {
    title: "courses",
    href: "/server/courses",
    icon: BookType
  },
  {
    title: "materials",
    href: "/server/materials",
    icon: LibraryBig
  },
  {
    title: "researches",
    href: "/server/researches",
    icon: SearchCheck
  },
]