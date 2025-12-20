import { BookType, ChartNoAxesCombined, GraduationCap, LibraryBig, SearchCheck, Users } from "lucide-react"

export const serverNav = [
  {
    title: "dashboard",
    href: "/server/dashboard",
    icon: ChartNoAxesCombined
  },
  {
    title: "professors",
    href: "/server/professors",
    icon: GraduationCap
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