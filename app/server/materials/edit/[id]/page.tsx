import EditMaterial from "@/components/forms/EditMaterial"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllCoursesForMaterialPage } from "@/dl/courseData"
import { getOneMaterial } from "@/dl/materialData"
import { isAdmin } from "@/functions/isAdmin"
import { getOneMaterialType } from "@/types/materialTypes"
import { CircleChevronLeft } from "lucide-react"

export default async function EditCourseMaterialPage({ params }: { params: Promise<{ id: string }> }) {
	await isAdmin()
	const id = (await params).id
	const material: getOneMaterialType = await getOneMaterial(id)
	const allCourses = await getAllCoursesForMaterialPage()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit material"}
			description={"edit a material to the database."}
			btnTitle={"back"}
			href="/server/materials"
		>
			<EditMaterial allCourses={allCourses} defaultValues={material} />
		</ServerPageCard>
	)
}
