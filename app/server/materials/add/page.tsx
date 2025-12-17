import AddMaterial from "@/components/forms/AddMaterial"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllCoursesForMaterialPage } from "@/dl/courseData"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function AddCourseMaterialPage() {
	await isAdmin()
	const allCourses = await getAllCoursesForMaterialPage()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"Add Course material"}
			description={"Add a material the database."}
			btnTitle={"back"}
			href="/server/material"
		>
			<AddMaterial allCourses={allCourses!} />
		</ServerPageCard>
	)
}
