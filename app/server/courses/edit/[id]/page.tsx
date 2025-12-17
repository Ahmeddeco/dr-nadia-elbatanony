import EditCourse from "@/components/forms/EditCourse"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getOneCourse } from "@/dl/courseData"
import { getAllMaterialForCoursesPage } from "@/dl/materialData"
import { isAdmin } from "@/functions/isAdmin"
import { getOneCourseType } from "@/types/courseTypes"
import { CircleChevronLeft } from "lucide-react"

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
	await isAdmin()
	const id = (await params).id
	const course: getOneCourseType = await getOneCourse(id)
	const allMaterials = await getAllMaterialForCoursesPage()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit course"}
			description={"edit a course to the database."}
			btnTitle={"back"}
			href="/server/courses"
		>
			<EditCourse defaultValues={course} allMaterials={allMaterials} />
		</ServerPageCard>
	)
}
