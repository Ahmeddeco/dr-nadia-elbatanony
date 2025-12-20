import AddCourse from "@/components/forms/AddCourse"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllMaterialForCoursesPage } from "@/dl/materialData"
import { getAllProfessorsForMultiSelect } from "@/dl/professorData"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function AddCoursePage() {
	await isAdmin()
	const allMaterials = await getAllMaterialForCoursesPage()
	const allAuthors = await getAllProfessorsForMultiSelect()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"Add Course"}
			description={"Add a Course to the database."}
			btnTitle={"back"}
			href="/server/courses"
		>
			<AddCourse allMaterials={allMaterials!} allAuthors={allAuthors} />
		</ServerPageCard>
	)
}
