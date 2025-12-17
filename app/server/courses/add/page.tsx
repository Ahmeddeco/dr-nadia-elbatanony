import AddCourse from "@/components/forms/AddCourse"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllMaterialForCoursesPage } from "@/dl/materialData"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function AddCoursePage() {
	await isAdmin()
	const allMaterials = await getAllMaterialForCoursesPage()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"Add Course"}
			description={"Add a Course to the database."}
			btnTitle={"back"}
			href="/server/courses"
		>
			<AddCourse allMaterials={allMaterials!} />
		</ServerPageCard>
	)
}
