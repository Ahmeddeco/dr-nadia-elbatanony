import EditCourse from "@/components/forms/EditCourse"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getOneCourse } from "@/dl/courseData"
import { getAllMaterialForCoursesPage } from "@/dl/materialData"
import { getAllProfessorsForMultiSelect } from "@/dl/professorData"
import { isAdmin } from "@/functions/isAdmin"
import { CircleChevronLeft } from "lucide-react"

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
	await isAdmin()
	const id = (await params).id
	const course = await getOneCourse(id)
	const allMaterials = await getAllMaterialForCoursesPage()
	const allAuthors = await getAllProfessorsForMultiSelect()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit course"}
			description={"edit a course to the database."}
			btnTitle={"back"}
			href="/server/courses"
		>
			<EditCourse defaultValues={course!} allMaterials={allMaterials} allAuthors={allAuthors} />
		</ServerPageCard>
	)
}
